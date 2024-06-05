from django.urls import path, include
from .views import CustomRegisterView, UserProfileView

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('register/', include('dj_rest_auth.registration.urls')),
    # path('register/', CustomRegisterView.as_view(), name='rest_register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
