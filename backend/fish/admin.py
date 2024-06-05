from django.contrib import admin
from .models import fish, user_fish

# Register your models here.
admin.site.register(fish)
admin.site.register(user_fish)