from django.shortcuts import get_object_or_404, render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.contrib import auth
from django.contrib.auth.forms import UserCreationForm
from .forms import ClinicianRegistrationForm
from django.core.context_processors import csrf # security
from django.core.files import File

import urllib
import json
import os

import logging

logger = logging.getLogger(__name__)

#from .models import Login
# Create your views here.
# def index(request):
#     template = loader.get_template("clinician/login.html")
#     context = {}
#     return HttpResponse(template.render(context, request))

def login(request):
    c = {}
    c.update(csrf(request))
    return render_to_response("clinician/login.html", c)

def auth_view(request):
    username = request.POST.get("username", "")
    password = request.POST.get("password", "")
    user = auth.authenticate(username = username, password = password)

    if user is not None:
        auth.login(request, user)
        return HttpResponseRedirect("/clinician/loggedin")
    else:
        return HttpResponseRedirect("/clinician/invalid")

def loggedin(request):
    #todo
    #logger.info(os.getcwd())
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
        #     # file walker
        #     data = json.load(f)
        #     age = data["names"][0]
        #     month = data["names"][1]
        #     f.close()
        #     return render_to_response("clinician/loggedin.html",
        #                         {"age": age})
    return HttpResponseRedirect("/clinician/invalid")
    #return render_to_response("clinician/loggedin.html", {"age": os.getcwd()})

def invalid_login(request):
    return render_to_response("clinician/invalid_login.html")

def logout(request):
    auth.logout(request)
    return render_to_response("clinician/login.html")

def register_user(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/clinician/register_success")

    #for the first time
    args = {}
    args.update(csrf(request))
    args["form"] = UserCreationForm()
    return render_to_response("clinician/register.html", args)

def register_success(request):
    return render_to_response("clinician/register_success.html")

def patient_results(request, patient_name):
    return render(request, "clinician/stackedCharts.html", {"name": patient_name})

def get_patient_score(request, patient_name):
    json_data = open("clinician\\static\\patients\\" + patient_name.replace(" ", "_") + ".JSON")
    data = json.load(json_data)
    json_data.close()
    return JsonResponse(data)
#
# def loggedIn(request):
#     if request.POST:
#         uname = request.POST.getlist("username")[0]
#         pword = request.POST.getlist("password")[0]
#
#         login_info = get_object_or_404(Login, username = uname)
#         if login_info.authenticatePassword(pword):
#             logger.debug("inside the post")
#             return render(request, "clinician/in.html", {"saying": "welcome," + uname + "!"})
#
#     if request.GET:
#         uname = request.GET.getlist("username")[0]
#         pword = request.GET.getlist("password")[0]
#
#         login_info = get_object_or_404(Login, username = uname)
#         if login_info.authenticatePassword(pword):
#             logger.debug("inside the post")
#             return render(request, "clinician/in.html", {"saying": "welcome, " + uname + "!"})
#
#     logger.debug("not a post")
#     return render(request, "clinician/in.html", {"saying": "problem, wrong username or password"})
