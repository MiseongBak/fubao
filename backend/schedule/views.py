from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated

from .models import schedule
from .serializers import ScheduleAllSerializer, ScheduleDoneSerializer,ScheduleSerializer


# Create your views here.
class NewScheduleAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # 새 일정 등록 
    @swagger_auto_schema(request_body=ScheduleAllSerializer, responses={"201": ScheduleAllSerializer})
    def post(self, request):
        serializer = ScheduleAllSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ScheduleAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    # 일정 조회(단일)
    @swagger_auto_schema(responses={"200": ScheduleAllSerializer})
    def get(self, request):
        try:   
            schedule_instance=schedule.objects.filter(user=request.user, done=False).latest('date')
            serializer = ScheduleSerializer(schedule_instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # schedule_instance = get_object_or_404(schedule, user=request.user, done=False)
        # print(schedule_instance)
        except schedule.DoesNotExist:
            context={
                "schedule":None
            }
            return Response(context, status=status.HTTP_200_OK)
        
    @swagger_auto_schema(request_body=ScheduleSerializer, responses={"200": ScheduleSerializer})
    def patch(self,request,pk):
        schedule_instance=get_object_or_404(schedule,id=pk,user=request.user)
        serializer=ScheduleAllSerializer(schedule_instance,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
            
        
       
class ScheduleDoneAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    #해당 일정 완료 처리  
    @swagger_auto_schema(request_body=ScheduleDoneSerializer, responses={"200": ScheduleDoneSerializer})
    def patch(self, request,pk):
        schedule_instance = get_object_or_404(schedule, id=pk,user=request.user)
        serializer = ScheduleDoneSerializer(schedule_instance, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 일정 삭제  
    @swagger_auto_schema(responses={"204": ScheduleAllSerializer})
    def delete(self, request, pk):
        schedule_instance = schedule.objects.get(id=pk,user=request.user)
        schedule_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

       
    