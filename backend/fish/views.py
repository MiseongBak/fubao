from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from django.db import transaction
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
import json

from .serializers import FishSerializer, FishDetailSerializer, UserFishSerializer, UserFishDetailSerializer
from location.serializers import locationMapSerializer
from .models import fish, user_fish
import random

# Create your views here.
class FishListView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={"200": FishSerializer})
    def get(self, request):
        fishlist = fish.objects.all()
        serializer = FishSerializer(fishlist, many=True)
        return Response(serializer.data)

class FishView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={"200": FishDetailSerializer})
    def get(self, request, pk):
        fish_instance = get_object_or_404(fish, pk=pk)
        serializer = FishDetailSerializer(fish_instance)

        fish_locations = random.choice(fish_instance.related_fish.all())
        location_serializer = locationMapSerializer(fish_locations)

        return Response({'fish': serializer.data, 'fish_locations': location_serializer.data})
    
# @method_decorator(login_required, name='dispatch')
class MyFishListView(APIView):
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(responses={"200": UserFishSerializer})
    def get(self, request):
        fishlist = user_fish.objects.filter(user=request.user)
        myfishlist = sorted(fishlist, key=lambda x: x.fish_id)
        myfishdone = 0
        myfishall = 0
        for f in fishlist:
            if f.count > 0:
                myfishdone += 1
                myfishall += f.count
        seriarizer = UserFishSerializer(myfishlist, many=True)
        return Response([myfishdone, myfishall, seriarizer.data], status=status.HTTP_200_OK)
    
    @swagger_auto_schema(responses={"201": UserFishSerializer})
    @transaction.atomic
    def post(self, request):
        fish_ids = request.data.get('fish_ids', [])

        user = request.user.pk
        user_fish_instances = []
        for fish_id in fish_ids:
            fish_instance = user_fish(user_id=user, fish_id=fish_id)
            user_fish_instances.append(fish_instance)

        user_fish.objects.bulk_create(user_fish_instances)

        serializer = UserFishSerializer(user_fish_instances, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# @method_decorator(login_required, name='dispatch')
class MyFishView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={"201": UserFishSerializer})
    def post(self, request, pk):
        user_id = request.user.pk
        preference = request.data.get('preference', None)
        existing_instance = user_fish.objects.filter(user_id=user_id, fish_id=pk).first()

        if existing_instance:
            serializer = UserFishSerializer(existing_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            fish_instance = user_fish(user_id=user_id, fish_id=pk, preference=preference)
            fish_instance.save()

            serializer = UserFishSerializer(fish_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @swagger_auto_schema(responses={"200": UserFishDetailSerializer})
    def get(self, request, pk):
        user_id = request.user.pk
        myfish = get_object_or_404(user_fish, user_id=user_id, fish_id=pk)
        serializer = UserFishDetailSerializer(myfish)
        return Response(serializer.data)
    
    @swagger_auto_schema(responses={"200": UserFishDetailSerializer})
    def put(self, request, pk):
        myfish = get_object_or_404(user_fish, pk=pk, user=request.user)
        latest_length = request.data.get('latest_length')
        if latest_length is not None:
            latest_length = float(latest_length)
            if myfish.max_length is None or latest_length > myfish.max_length:
                myfish.max_length = latest_length
        serializer = UserFishDetailSerializer(myfish, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={"200": UserFishDetailSerializer})
    def patch(self, request, pk):
        myfish = get_object_or_404(user_fish, pk=pk, user=request.user)
        latest_length = request.data.get('latest_length')
        if latest_length is not None:
            latest_length = float(latest_length)
            if myfish.max_length is None or latest_length > myfish.max_length:
                myfish.max_length = latest_length
        serializer = UserFishDetailSerializer(myfish, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
