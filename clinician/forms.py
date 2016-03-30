from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile
from django.template import Template
from django.forms.formsets import formset_factory
from material import Layout, Row, Column, Fieldset, Span2, Span3, Span5, Span6, Span10
from material.fields import FormSetField

import datetime

class ClinicianRegistrationForm(UserCreationForm):
    email = forms.EmailField(
                required = True,
                widget=forms.TextInput(attrs={'placeholder': 'E-mail address'}))
    first_name = forms.CharField(
                required = True,
                widget=forms.TextInput(attrs={'placeholder': 'First name'}))
    last_name = forms.CharField(
                required = True,
                widget=forms.TextInput(attrs={'placeholder': 'Last name'}))

    layout = Layout(
        Row("first_name", "last_name"),
        "username",
        "email",
        Row("password1", "password2")
    )

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
