# apps.py
# Contains information for Django to identify the project
# in this case, the clinician and patient interface are both under one project
# called "clinician"

from django.apps import AppConfig

class ClinicianConfig(AppConfig):
    name = 'clinician'
