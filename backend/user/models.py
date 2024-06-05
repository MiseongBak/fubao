from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import UserManager

# Create your models here.
class User(AbstractUser):
    GENDER_CHOICES = [
        ('선택하지 않음', '선택하지 않음'),
        ('남성', '남성'),
        ('여성', '여성'),
    ]
    username = None
    first_name = None
    last_name = None
    
    age = models.IntegerField(null=True)
    name = models.CharField(max_length=10, null=True)
    email = models.EmailField(unique=True)
    gender = models.CharField(
        max_length=10, 
        choices = GENDER_CHOICES, 
        default='선택하지 않음'
    )
    date_of_birth = models.DateField(blank=True, null=True)
    nickname = models.CharField(null=True, unique=True, max_length=8)
    profile_img = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    presurvey = models.BooleanField(default = False)
    fish_survey = models.BooleanField(default = False)

    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email