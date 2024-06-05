from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import locationMapSerializer
from .models import location
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema,no_body

# Create your views here.
    
class locationMapAPIView(APIView):
    @swagger_auto_schema(request_body=no_body,responses={"200": locationMapSerializer})
    def get(self, request):
        maps=location.objects.values()
        map_serializer=locationMapSerializer(maps,many=True)
        return Response(map_serializer.data,status=status.HTTP_200_OK)
    
    
        
        
        
        

