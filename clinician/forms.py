from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile

import datetime

class ClinicianRegistrationForm(UserCreationForm):
    email = forms.EmailField(
                required = True,
                widget=forms.TextInput(attrs={'placeholder': 'E-mail address'}))
    first_name = forms.CharField(required = True)
    last_name = forms.CharField(required = True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'password1', 'password2')

    #clean email field
    def clean_email(self):
        email = self.cleaned_data["email"]
        try:
            User._default_manager.get(email = email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError('duplicate email')

    #modify save() method so that we can set user.is_active to False when we first create our user
    def save(self, commit=True):
        user = super(ClinicianRegistrationForm, self).save(commit = False)
        user.email = self.cleaned_data['email']
        if commit:
            user.is_active = False # not active until he opens activation link
            user.save()

        return user

# class ClinicianRegistrationForm(UserCreationForm):
#     username = forms.CharField(
#                     label = "",
#                     widget = forms.TextInput(attrs = {"placeholder": "Username", "class": "form-control input-perso"}),
#                     max_length = 30, min_length = 3) #, validators = [isValidUsername, validators.validate_slug])
#     email = forms.EmailField(
#                     required = True,
#                     widget = forms.TextInput(attrs = {"placeholder": "Email Address", "class": "form-control input-perso"}))
#     password1 = forms.CharField(
#                     label = "", max_length = 100, min_length = 6, required = True,
#                     widget = forms.PasswordInput(attrs = {"placeholder": "Password", "class": "form-control input-perso"}))
#     password2 = forms.CharField(
#                     label = "", max_length = 100, min_length = 6, required = True,
#                     widgel = forms.PasswordInput(attrs = {"placeholder": "Confirm Password", "class": "form-control input-perso"}))
#
#     # class Meta:
#     #     model = User
#     #     fields = ("first_name", "last_name", "username", "email", "password1", "password2")
#
#     def clean_email(self):
#         email = self.cleaned_data["email"]
#         try:
#             User._default_manager.get(email = email)
#         except User.DoesNotExist:
#             return email
#         raise forms.ValidationError("duplicate email")
#
#     #override save method
#     def save(self, datas):#commit = True):
#         user = User.objects.create_user(datas["username"],
#                                         datas["email"],
#                                         datas["password1"])#super(ClinicianRegistrationForm, self).save(commit = False)
#         user.email = self.cleaned_data["email"]
#
#         #if commit:
#         user.is_active = False # not active until opens activation link
#         user.save()
#
#         profile = UserProfile()
#         profile.user = user
#         prolife.activation_key = datas["activation_key"]
#         profil.key_expires = datetime.datetime.strftime(datetime.datetime.now() + datetime.timedelta(days=2), "%Y-%m-%d %H:%M:%S")
#         profile.save()
#
#         return user
#
#     def sendEmail(self, datas):
#         link = "http://127.0.0.1:8000/clinician/confirm/" + datas["activation_key"]
#         c = Context({"activation_link": link, "username": datas["username"]})
#         f = open(MEDIA_ROOT + datas["email_path"], "r")
#         t = Template(f.read())
#         message = t.render(c)
#
#         send_mail(datas["email_subject"], message, "smithbaystateteam <smithbaystateteam2015@gmail.com>", [datas["email"]], fail_silently = "False")
