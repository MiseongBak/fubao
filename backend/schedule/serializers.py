from rest_framework import serializers
from .models import schedule
from location.serializers import locationSchduleModeSerializer
from information.serializers import FishAreaSerializer,FishMethodSerializer

class ScheduleAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = schedule
        fields = "__all__"


class ScheduleSerializer(serializers.ModelSerializer):
    location=locationSchduleModeSerializer(read_only=True)
    area=FishAreaSerializer(read_only=True)
    method=FishMethodSerializer(read_only=True)
    class Meta:
        model = schedule
        fields = "__all__"

class ScheduleDoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = schedule
        fields = ('id', 'done')