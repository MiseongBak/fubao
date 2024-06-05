from django.db import models

from information.models import fishing_area, fishing_method
from user.models import User
from location.models import location

# Create your models here.
class schedule(models.Model):

    user= models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='schedule_user')
    method= models.ForeignKey(fishing_method, on_delete=models.SET_NULL, null=True, blank=True) # 낚시 방법
    area= models.ForeignKey(fishing_area, on_delete=models.SET_NULL, null=True, blank=True ) # 낚시 구역 id
    date= models.DateField() # 낚시 날짜 
    location= models.ForeignKey(location,on_delete=models.SET_NULL, null=True) # 낚시 실제 장소 id
    # location_review = models.IntegerField(null=True) # 낚시 실제 장소 리뷰
    done= models.BooleanField(default=False) #낚시 일정 완료 여부


    
    
    
    
