from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class ClinicianRegistrationForm(UserCreationForm):
    email = forms.EmailField(required = True)
    first_name = forms.CharField(label = "first name", max_length = 100)
    last_name = forms.CharField(label = "last name", max_length = 100)

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit = True):
        user = super(ClinicianRegistrationForm, self).save(commit = False)
        user.email = self.cleaned_data["email"]

        if commit:
            user.save()
        return user
