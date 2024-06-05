from rest_framework import serializers
from .models import location
    
class locationMapSerializer(serializers.ModelSerializer):
    
    lat = serializers.FloatField(source="lattitude")
    lng = serializers.FloatField(source="longitude")
     
    class Meta:
        model = location
        fields = ('id','name','address','lat','lng')

        
class locationSchduleModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = location
        fields = ('id','address','lattitude','longitude')