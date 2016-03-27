from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
import datetime

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    activation_key = models.CharField(max_length = 40, blank = True)
    key_expires = models.DateTimeField(default = datetime.date.today())

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = u'User profiles'
# class UserProfile(models.Model):
# 	#user = models.OneToOneField(settings.AUTH_USER_MODEL)
# 	user = models.OneToOneField(User, related_name="profil")
# 	activation_key = models.CharField(max_length = 40)#, blank = True)
# 	key_expires = models.DateTimeField(default = datetime.date.today())


#from django.contrib.auth.models import User, check_password

# class SettingsBackend(object):
#     def authenticate(self, username = None, password = none):
#         if ...: //check
#
# Create your models here.
# class Login(models.Model):
#     username = models.CharField(max_length = 200)
#     password = models.CharField(max_length = 200)
#
#     def authenticatePassword(self, password):
#         if self.password == password:
#             return True
#         return False
