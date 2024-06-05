from django.db import models
from fish.models import fish
from information.models import fishing_method

# Create your models here.

class location(models.Model):
    name=models.CharField (max_length=50)
    address=models.CharField(max_length=100)
    lattitude=models.FloatField(max_length=30)
    longitude=models.FloatField(max_length=30)
    fish=models.ManyToManyField(fish, related_name="related_fish")
    method = models.ManyToManyField(fishing_method)
    
