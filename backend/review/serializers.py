from rest_framework import serializers
from .models import method_reivew, location_review

class methodReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=method_reivew
        fields="__all__"

        
class locationReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=location_review
        fields="__all__"
    