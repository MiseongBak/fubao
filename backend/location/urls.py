from django.urls import path
from .views import locationMapAPIView

urlpatterns=[
    path('map/',locationMapAPIView.as_view()),
]