from django.db import models

# Create your models here.
class fishing_bait(models.Model):
    #id=models.IntegerField(primary_key=True)
    title = models.CharField(max_length=10)
    subtitle = models.TextField()
    document = models.TextField()
    
class fishing_area(models.Model):
    #id=models.IntegerField(primary_key=True)
    title = models.CharField(max_length=10)
    subtitle = models.TextField()
    document  =models.TextField()
    
class fishing_method(models.Model):
    #id=models.IntegerField(primary_key=True)
    title = models.CharField(max_length=10)
    subtitle = models.TextField()
    document  =models.TextField()
    
class fishing_equipment(models.Model):
    #id=models.IntegerField(primary_key=True)
    title = models.CharField(max_length=10)
    subtitle = models.TextField()
    document  =models.TextField()
    
class release_fish(models.Model):
    #id=models.IntegerField(primary_key=True)
    name_kor = models.CharField(max_length=40)
    name_eng = models.CharField(max_length=50, null=True, blank=True)
    standard = models.FloatField(null=True)
    
class prohibit_fish(models.Model):
    #id=models.IntegerField(primary_key=True)
    name_kor = models.CharField(max_length=40)
    name_eng = models.CharField(max_length=50, null=True, blank=True)
    standard_start = models.DateField(null=True)
    standard_end = models.DateField(null=True)
    
    
    
