from django.shortcuts import get_object_or_404, render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader, RequestContext
from django.contrib import auth
from django.core.context_processors import csrf # security
from django.core.files import File

# import urllib
# import json
# import os
# import hashlib
# import datetime
# import random

import logging

logger = logging.getLogger(__name__)

def index(request):
	 return render_to_response("/patient/index.html", "hex")