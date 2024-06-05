from django.urls import path
from .views import NewScheduleAPIView, ScheduleAPIView,ScheduleDoneAPIView

urlpatterns=[
    path('',NewScheduleAPIView.as_view()),
    path('myschedule/',ScheduleAPIView.as_view()),
    path('done/<int:pk>/',ScheduleDoneAPIView.as_view()),
    path('myschedule/<int:pk>/',ScheduleAPIView.as_view()),
]