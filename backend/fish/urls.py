from django.urls import path
from .views import FishView, FishListView, MyFishView, MyFishListView

urlpatterns = [
    path('', FishListView.as_view(), name='fishlist'),
    path('<int:pk>/', FishView.as_view(), name='fish'),
    path('myfish/', MyFishListView.as_view(), name='userfish'),
    path('myfish/<int:pk>/', MyFishView.as_view(), name='userfish_detail'),
]