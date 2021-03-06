# views.py
# Contains all the information on the pages of the entire interface such as
# any actions of the page as well as what each page should display

from django.shortcuts import get_object_or_404, render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader, RequestContext
from django.contrib import auth
from django.contrib.auth.forms import UserCreationForm
from .forms import *
from .models import *
from django.core.mail import send_mail
from django.utils import timezone
from django.core.context_processors import csrf # security
from django.core.files import File

import urllib
import json
import os
import hashlib
import datetime
import random

import logging

logger = logging.getLogger(__name__)

#from .models import Login
# Create your views here.
# def index(request):
#	 template = loader.get_template("clinician/login.html")
#	 context = {}
#	 return HttpResponse(template.render(context, request))

# Loads the login.html page. Checks if the user is already loggin in. If so, then
# automatically redirects the user to the logged in page. Else would ask for the
# user to login
def login(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect("/eswyc/clinician/loggedin")
	c = {}
	c.update(csrf(request))
	return render_to_response("clinician/login.html", c)

# The page used to authenticate the user. If valid login information has been
# provided then will redirect to the logged in page. Else would tell the user
# an invalid login has been provided
def auth_view(request):
	username = request.POST.get("username", "")
	password = request.POST.get("password", "")
	user = auth.authenticate(username = username, password = password)

	if user is not None:
		auth.login(request, user)
		return HttpResponseRedirect("/eswyc/clinician/loggedin")
	else:
		return HttpResponseRedirect("/eswyc/clinician/invalid")

# Gets the patient namse of all patients who have finished the SWYC and displays
# the links to redirect to each data visualization
def loggedin(request):
	#todo
	logger.info(os.getcwd())
	if request.user.is_authenticated():
		patients = {}
		patients["entries"] = []
		for root, dirs, files in os.walk("clinician\\static\\patients"):
			for name in files:
				#Convert into "first last"
				name = " ".join(name[:-5].split("_"))
				patients["entries"].append(name)
		return render_to_response("clinician/loggedin.html", patients)

		# with open("clinician\\static\\names.JSON", "r") as f:
		#	 # file walker
		#	 data = json.load(f)
		#	 age = data["names"][0]
		#	 month = data["names"][1]
		#	 f.close()
		#	 return render_to_response("clinician/loggedin.html",
		#						 {"age": age})
	return HttpResponseRedirect("/eswyc/clinician/invalid")
	#return render_to_response("clinician/loggedin.html", {"age": os.getcwd()})

# Displays the invalid login page
def invalid_login(request):
	return render_to_response("clinician/invalid_login.html")

# Loggs the user out and redirects to the login page
def logout(request):
	auth.logout(request)
	return render_to_response("clinician/login.html")

# Used to register the user. If a form has been rubmitted, then it will create
# a user profile and send a confirmation email with an activation link
def register_user(request):
	args = {}
	args.update(csrf(request))

	if request.method == "POST":
		form = ClinicianRegistrationForm(request.POST)
		args["form"] = form
		if form.is_valid() && form.cleaned_data["email"].contains("@baystatehealth.org"):
			form.save() #save user to database if form is valid

			username = form.cleaned_data["username"]
			email = form.cleaned_data["email"]
			salt = hashlib.sha1(str(random.random()).encode("utf8")).hexdigest()[:5]
			activation_key = hashlib.sha1((salt + email).encode("utf8")).hexdigest()
			key_expires = datetime.datetime.today() + datetime.timedelta(2)

			#get user by username
			user = User.objects.get(username = username)

			#create and save user profile
			new_profile = UserProfile(user = user, activation_key = activation_key,
										key_expires = key_expires)
			new_profile.save()

			#send email with activation key
			#fix the link
			logger.error("the form is valid??")
			link = "http://127.0.0.1:8000/clinician/confirm/"
			email_subject = "eSWYC Account Confirmation"
			email_body = ("Hello %s, thank you for signing up. To activate your account, " +
							"please click this like within 48 hours " + link + "%s") % (username, activation_key)
			send_mail(email_subject, email_body, "smithbaystateteam2015@gmail.com", [email], fail_silently = False)
			return HttpResponseRedirect("/clinician/register_success")
		logger.error("form is not valid??")
	#for the first time
	else:
		args["form"] = ClinicianRegistrationForm()
		logger.error("this is not a post request")
	return render_to_response("clinician/register.html", args, RequestContext(request))

# Page that shows following a successful registration. Does not say if the account
# has been authenticated
def register_success(request):
	return render_to_response("clinician/register_success.html")

# Activated the user based on the activation key in the link
def register_confirm(request, activation_key):
	#check if the user is already loggedin
	if request.user.is_authenticated():
		HttpResponseRedirect("/eswyc/clinician/loggedin")

	#check if there is a UserProfile which matches the activation key
	user_profile = get_object_or_404(UserProfile, activation_key = activation_key)

	#check if the activation key has expired
	if user_profile.key_expires < timezone.now():
		return render_to_response("clinician/confirm_expired.html")
	#if the key has not expired save the user and activate
	user = user_profile.user
	user.is_active = True
	user.save()
	return render_to_response("clinician/confirm.html")

# displays the data visualization of the patient
def patient_results(request, patient_name):
	if request.user.is_authenticated():
		return render(request, "clinician/stackedCharts.html", {"name": patient_name})

# returns the json of the patient data
def get_patient_score(request, patient_name):
	json_data = open("clinician\\static\\patients\\" + patient_name.replace(" ", "_") + ".JSON")
	data = json.load(json_data)
	json_data.close()
	return JsonResponse(data)

# displas the patient interface
def patient_eswyc(request):
	return render_to_response("clinician/index.html")
