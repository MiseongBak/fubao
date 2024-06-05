from allauth.account.adapter import DefaultAccountAdapter
from django.core.exceptions import ValidationError as DjangoValidationError
from .models import User

class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data

        # Call the superclass method
        user = super().save_user(request, user, form, commit=False)

        email = data.get("email")
        name = data.get("name")
        nickname = data.get("nickname")
        age = data.get("age")
        gender = data.get("gender")
        date_of_birth = data.get("date_of_birth")
        profile_img = data.get("profile_img")
        presurvey = data.get("presurvey")
        fish_survey = data.get("fish_survey")

        user.email = email
        user.username = email  # Assuming email is used as the username, change it if necessary

        if name:
            user.name = name
        if nickname:
            user.nickname = nickname
        if age:
            user.age = age
        if gender:
            user.gender = gender
        if date_of_birth:
            user.date_of_birth = date_of_birth
        if profile_img:
            user.profile_img = profile_img
        if presurvey:
            user.presurvey = presurvey
        if fish_survey:
            user.fish_survey = fish_survey

        if "password1" in data:
            user.set_password(data["password1"])
        else:
            user.set_unusable_password()

        self.populate_username(request, user)

        if commit:
            user.save()

        return user
