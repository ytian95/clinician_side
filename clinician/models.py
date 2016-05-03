# models.py
# Creates sqlite tables
#
# The UserProfile contains information relating to the registration form
# and stores the user's activation key as well as the expiration date of the key

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
import datetime

# The UserProfile links the User created from registration with a key for activation
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    activation_key = models.CharField(max_length = 40, blank = True)
    key_expires = models.DateTimeField(default = datetime.date.today())

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = u'User profiles'
