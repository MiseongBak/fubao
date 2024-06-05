from .models import fishing_method, fishing_area, fishing_bait, fishing_equipment, release_fish, prohibit_fish
from rest_framework import serializers

class MethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = fishing_method
        fields = "__all__"

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = fishing_area
        fields = "__all__"

class BaitSerializer(serializers.ModelSerializer):
    class Meta:
        model = fishing_bait
        fields = "__all__"     

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = fishing_equipment
        fields = "__all__"

class ReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = release_fish
        fields = "__all__"

class ProhibitSerializer(serializers.ModelSerializer):
    class Meta:
        model = prohibit_fish
        fields = "__all__"

class ReleaseShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = release_fish
        fields = ('standard',)

class ProhibitShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = prohibit_fish
        fields = ('standard_start', 'standard_end')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        if representation['standard_start']:
            if representation['standard_start'].startswith('0000-'):
                representation['standard_start'] = representation['standard_start'][5:]  # Display only MM-DD
        if representation['standard_end']:
            if representation['standard_end'].startswith('0000-'):
                representation['standard_end'] = representation['standard_end'][5:]  # Display only MM-DD

        return representation

class FishAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model=fishing_area
        fields=("id","title")
        
class FishMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model=fishing_method
        fields=("id","title")

        
