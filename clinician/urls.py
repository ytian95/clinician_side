# views.py
# Contains all the urls of the webpage and when a matching url is entered, redirects
# the information to a specific method in views.py to process
from django.conf.urls import url
from django.contrib import admin

from . import views

admin.autodiscover()

urlpatterns = [
    #url(r"^$", views.index, name="index"),

    # Main clinician interface pages used for login
    url(r"^clinician/login/$", "clinician.views.login"),
    url(r"^clinician/auth/$", "clinician.views.auth_view"), # authorizes the user's login information
    url(r"^clinician/logout/$", "clinician.views.logout"),
    url(r"^clinician/loggedin/$", "clinician.views.loggedin"),
    url(r"^clinician/invalid/$", "clinician.views.invalid_login"),

    # Clinician interface pages used for registration
    url(r"^clinician/register/$", "clinician.views.register_user"),
    url(r"^clinician/register_success/$", "clinician.views.register_success"),
    # If the user has licked on the activation link within 2 days, then this url will activate them
	url(r"^clinician/confirm/(?P<activation_key>\w+)/$", "clinician.views.register_confirm"),

    # Urls used to display the data visualization and help the data visualization
    # pull the correct scored SWYC form
    url(r"^clinician/(?P<patient_name>.*)/getpatientscore/$", "clinician.views.get_patient_score", name="patient_score"),
    url(r"^clinician/(?P<patient_name>.*)/$", "clinician.views.patient_results", name="patient_results"),

    # Url that redirects to the patient interface
	url(r"^patient/eswyc/$", "clinician.views.patient_eswyc")
]
