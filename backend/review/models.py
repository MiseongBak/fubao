from django.db import models

from user.models import User
from information.models import fishing_method
from location.models import location

# Create your models here.
class method_reivew(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    method=models.ForeignKey(fishing_method,on_delete=models.SET_NULL,null=True)
    weight=models.IntegerField(default=0)
    
class location_review(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    location=models.ForeignKey(location,on_delete=models.SET_NULL,null=True)
    weight=models.IntegerField(default=0)



