from django.conf.urls import url
from django.contrib import admin

from . import views

admin.autodiscover()

urlpatterns = [
    #url(r"^$", views.index, name="index"),

    url(r"^clinician/login/$", "clinician.views.login"),
    url(r"^clinician/auth/$", "clinician.views.auth_view"),
    url(r"^clinician/logout/$", "clinician.views.logout"),
    url(r"^clinician/loggedin/$", "clinician.views.loggedin"),
    url(r"^clinician/invalid/$", "clinician.views.invalid_login"),

    url(r"^clinician/register/$", "clinician.views.register_user"),
    url(r"^clinician/register_success/$", "clinician.views.register_success"),
	url(r"^clinician/confirm/(?P<activation_key>\w+)/$", "clinician.views.register_confirm"),

    url(r"^clinician/(?P<patient_name>.*)/getpatientscore/$", "clinician.views.get_patient_score", name="patient_score"),
    url(r"^clinician/(?P<patient_name>.*)/$", "clinician.views.patient_results", name="patient_results"),
	
	url(r"^patient/eswyc/$", "clinician.views.patient_eswyc")
]
