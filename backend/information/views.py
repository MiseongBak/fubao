from rest_framework.views import APIView
import json, random
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404

from .weather import weatherAPI
from .sunset import sunsetAPI
from .models import fishing_method, fishing_area, fishing_bait, fishing_equipment, release_fish, prohibit_fish
from fish.models import fish, user_fish
from review.models import method_reivew ,location_review
from location.models import location
from schedule.models import schedule
from .models import fishing_method
from user.serializers import UserProfileSerializer
from .serializers import AreaSerializer, BaitSerializer, MethodSerializer, EquipmentSerializer, ReleaseSerializer, ProhibitSerializer
from schedule.serializers import ScheduleSerializer


class weatherSunsetAPIView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        
        lat=request.GET['lat']
        lon=request.GET['lon']
        print(lat, lon)
        
        # data=json.loads(request.body)
        
        # data=json.loads(request.body)
        # nowData=weatherAPI(data['lat'],data['lon'])
        # sunrise,sunset=sunsetAPI(data['lat'],data['lon'])  
        
        nowData=weatherAPI(lat,lon)
        sunrise,sunset=sunsetAPI(lat,lon)
        
        context={
            "weather":nowData,
            "sunrise":sunrise,
            "sunset":sunset,   
        }
                    
        return Response(context, status=status.HTTP_200_OK)


def pick_method(user):
    method_reviews = method_reivew.objects.filter(user=user)
    method_ids = [review.method_id for review in method_reviews]
    weights = [review.weight for review in method_reviews]
    # print(method_ids)

    if method_ids:
        selected_method_id = random.choices(method_ids, weights)[0]
    else:
        selected_method_id = random.choice([m.pk for m in fishing_method.objects.all()])
        
    selected_method = fishing_method.objects.get(pk=selected_method_id).title
    return selected_method_id, selected_method


def pick_fish(method_id, user):
    myfish = user_fish.objects.filter(user=user, fish__method__id=method_id)
    fishlist = [(uf.fish.pk, uf.preference) for uf in myfish]

    if fishlist:
        # preference 기준 sort
        fishlist.sort(key=lambda x: x[1], reverse=True)
        selected_fish_id = fishlist[0][0]
    else:
        # method에 맞는 fish 없으면 random
        selected_fish_id = random.choice([f.pk for f in fish.objects.all()])
        
    selected_fish = fish.objects.get(pk=selected_fish_id).name_kor
    return selected_fish_id, selected_fish

def pick_location(fish_id,user):
    # 해당 물고기를 잡을 수 있는 location_id 리스트
    location_list=location.objects.filter(fish=fish_id)
    
    #location_review에서 location_id인 것과 가중치만 모은 리스트
    for lo in location_list:
        location_ids=[review.location_id for review in location_review.objects.filter(location=lo.pk,user=user)]
        location_weight=[review.weight for review in location_review.objects.filter(location=lo.pk,user=user)]
        
    # print(location_ids)
    if location_ids:
        selected_location_id=random.choices(location_ids,location_weight)[0]    
        
    else:
        location_ids = [lo.pk for lo in location_list]
        selected_location_id=random.choice(location_ids)
        
    selected_location = location.objects.get(pk=selected_location_id).name       
    return selected_location_id, selected_location


class recommendationView(APIView):
    permission_classes = [IsAuthenticated]

    # @method_decorator(login_required)
    def get(self, request):
        method_id, selected_method = pick_method(request.user)
        fish_id, selected_fish = pick_fish(method_id, request.user)
        location_id, selected_location = pick_location(fish_id,request.user)
        location_obj = location.objects.get(id=location_id)

        location_lat = location_obj.lattitude
        location_lon = location_obj.longitude
        
        context = {
            "method_id": method_id,
            "selected_method": selected_method,
            "fish_id": fish_id,
            "selected_fish": selected_fish,
            "location_id": location_id,
            "selected_location": selected_location,
            "location_lat": location_lat,
            "location_lon": location_lon,
        }
        return Response(context, status=status.HTTP_200_OK)

class HomeView(APIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        method_id, selected_method = pick_method(request.user)
        fish_id, selected_fish = pick_fish(method_id, request.user)
        location_id, selected_location = pick_location(fish_id, request.user)
        location_obj = location.objects.get(id=location_id)

        location_lat = location_obj.lattitude
        location_lon = location_obj.longitude
        try:
            schedules_queryset = schedule.objects.filter(user=request.user, done=False).latest('date')
        except schedule.DoesNotExist:
            schedules_queryset = []

        user_profile_serializer = UserProfileSerializer(request.user)
        recommend = {
            "method_id": method_id,
            "selected_method": selected_method,
            "fish_id": fish_id,
            "selected_fish": selected_fish,
            "location_id": location_id,
            "selected_location": selected_location,
            "location_lat": location_lat,
            "location_lon": location_lon,
        }
        
        if schedules_queryset:
            schedule_serializer = ScheduleSerializer(schedules_queryset)
            context = {
                "recommendation": recommend,
                "schedule": schedule_serializer.data,
                "profile": user_profile_serializer.data,
            }
        else:
            context = {
                "recommendation": recommend,
                "schedule": None,
                "profile": user_profile_serializer.data,
            }

        return Response(context, status=status.HTTP_200_OK)

class FishMethodsView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": MethodSerializer})
    def get(self, request):
        methods = fishing_method.objects.all()
        serializer = MethodSerializer(methods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FishMethodView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": MethodSerializer})
    def get(self, request, pk):
        method = get_object_or_404(fishing_method, pk=pk)
        serializer = MethodSerializer(method)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class FishAreasView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": AreaSerializer})
    def get(self, request):
        areas = fishing_area.objects.all()
        serializer = AreaSerializer(areas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FishAreaView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": AreaSerializer})
    def get(self, request, pk):
        area = get_object_or_404(fishing_area, pk=pk)
        serializer = AreaSerializer(area)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class FishBaitsView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": BaitSerializer})
    def get(self, request):
        baits = fishing_bait.objects.all()
        serializer = BaitSerializer(baits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FishBaitView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": BaitSerializer})
    def get(self, request, pk):
        bait = get_object_or_404(fishing_bait, pk=pk)
        serializer = BaitSerializer(bait)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class FishEquipmentsView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": EquipmentSerializer})
    def get(self, request):
        equipments = fishing_equipment.objects.all()
        serializer = EquipmentSerializer(equipments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FishEquipmentView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": EquipmentSerializer})
    def get(self, request, pk):
        equipment = get_object_or_404(fishing_equipment, pk=pk)
        serializer = EquipmentSerializer(equipment)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class FishProhibitsView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": ProhibitSerializer})
    def get(self, request):
        prohibits = prohibit_fish.objects.all()
        serializer = ProhibitSerializer(prohibits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FishProhibitView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": ProhibitSerializer})
    def get(self, request, pk):
        prohibit = get_object_or_404(prohibit_fish, pk=pk)
        serializer = ProhibitSerializer(prohibit)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class FishReleasesView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": ReleaseSerializer})
    def get(self, request):
        releases = release_fish.objects.all()
        serializer = ReleaseSerializer(releases, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FishReleaseView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(responses={"200": ReleaseSerializer})
    def get(self, request, pk):
        release = get_object_or_404(release_fish, pk=pk)
        serializer = ReleaseSerializer(release)
        return Response(serializer.data, status=status.HTTP_200_OK)
     
