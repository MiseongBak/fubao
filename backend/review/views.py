from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import methodReviewSerializer,locationReviewSerializer
from .models import method_reivew, location_review
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema

# Create your views here.
class MethodAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(request_body=methodReviewSerializer, responses={"200": methodReviewSerializer})
    def post(self, request):
        user_id=request.user
        # print(user)
        method_instance=method_reivew.objects.filter(method=request.data['method'],user=user_id).first()
        # print(method_instance)
        
        # 이미 존재하는 방법에 대한 리뷰 갱신일 때 
        if method_instance:
            #put
            serializer=methodReviewSerializer(method_instance,data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)        
        
        #새로운 방법에 대한 리뷰일 때 
        else:         
            serializer=methodReviewSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)  
        
class LocationAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user_id=request.user
        location_instance=location_review.objects.filter(user=user_id,location=request.data['location']).first() #filter로 queryset을 불러올 때 
        
                # 이미 존재하는 방법에 대한 리뷰 갱신일 때 
        if location_instance:
            #put
            serializer=locationReviewSerializer(location_instance,data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)        
        
        #새로운 방법에 대한 리뷰일 때 
        else:         
            serializer=locationReviewSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        
