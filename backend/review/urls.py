from django.urls import path
from .views import MethodAPIView,LocationAPIView

urlpatterns=[
    path('method/',MethodAPIView.as_view()),
    path('location/',LocationAPIView.as_view()),
]