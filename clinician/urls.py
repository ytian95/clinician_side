from django.conf.urls import url
from django.contrib import admin

from . import views

admin.autodiscover()

urlpatterns = [
    #url(r"^$", views.index, name="index"),

    url(r"^login/$", "clinician.views.login"),
    url(r"^auth/$", "clinician.views.auth_view"),
    url(r"^logout/$", "clinician.views.logout"),
    url(r"^loggedin/$", "clinician.views.loggedin"),
    url(r"^invalid/$", "clinician.views.invalid_login"),

    url(r"^register/$", "clinician.views.register_user"),
    url(r"^register_success/$", "clinician.views.register_success"),
	url(r"^confirm/(?P<activation_key>\w+)/$", "clinician.views.register_confirm"),

    url(r"^(?P<patient_name>.*)/getpatientscore/$", "clinician.views.get_patient_score", name="patient_score"),
    url(r"^(?P<patient_name>.*)/$", "clinician.views.patient_results", name="patient_results")
]
