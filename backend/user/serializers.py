from rest_framework import serializers
from allauth.account import app_settings as allauth_settings
from allauth.utils import get_username_max_length
from allauth.account.adapter import get_adapter
from django.core.exceptions import ValidationError
from django.db.models import Sum, Max
from .models import User
from fish.models import user_fish
from schedule.models import schedule
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'name', 'nickname', 'age', 'gender', 'date_of_birth', 'profile_img', 'presurvey']
        read_only_fields = ('token', )
        
    name = serializers.CharField(required=False, max_length=10)
    age = serializers.IntegerField(required=False, allow_null=True)
    gender = serializers.ChoiceField(choices=User.GENDER_CHOICES, default='선택하지 않음', required=False)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    nickname = serializers.CharField(required=True, max_length=8)
    profile_img = serializers.ImageField(required=False, allow_null=True)
    presurvey = serializers.BooleanField(default=False)
    fish_survey = serializers.BooleanField(default=False)

    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'name': self.validated_data.get('name', ''),
            'nickname': self.validated_data.get('nickname', ''),
            'age': self.validated_data.get('age', None),
            'gender': self.validated_data.get('gender', ''),
            'date_of_birth': self.validated_data.get('date_of_birth', None),
            'profile_img': self.validated_data.get('profile_img', None),
            'presurvey': self.validated_data.get('presurvey', None),
            'fish_survey': self.validated_data.get('fish_survey', None),
        }
        
    def save(self, request):
        adapter = get_adapter(request)
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        
        user.name = self.cleaned_data.get('name')
        user.nickname = self.cleaned_data.get('nickname')
        user.age = self.cleaned_data.get('age')
        user.gender = self.cleaned_data.get('gender')
        user.date_of_birth = self.cleaned_data.get('date_of_birth')
        user.profile_img = self.cleaned_data.get('profile_img')
        user.presurvey = self.cleaned_data.get('presurvey')
        user.fish_survey = self.cleaned_data.get('fish_survey')
        
        user.save()
        
        self.custom_signup(request, user)
        return user
    
    def validate_email(self, email):
        """
        이메일 중복 확인 로직 추가
        """
        try:
            User.objects.get(email=email)
            raise serializers.ValidationError("해당 이메일 주소는 이미 사용 중입니다.")
        except User.DoesNotExist:
            return email
        
    def validate_nickname(self, nickname):
        """
        닉네임 중복 확인 로직 추가
        """
        try:
            User.objects.get(nickname=nickname)
            raise serializers.ValidationError("해당 닉네임은 이미 사용 중입니다.")
        except User.DoesNotExist:
            return nickname

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'is_superuser', 'email', 'name', 'date_joined', 'nickname', 'age', 'date_of_birth', 'gender', 'profile_img', 'presurvey', 'fish_survey']
        read_only_fields = ('email', 'is_staff', 'is_active', 'date_joined', 'is_superuser'),
        
class UserProfileSerializer(serializers.ModelSerializer):
    total_fish_count = serializers.SerializerMethodField()
    total_schedules = serializers.SerializerMethodField()
    latest_schedule_date = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'is_superuser', 'email', 'name', 'date_joined', 'nickname', 'age', 'date_of_birth', 'gender', 'profile_img', 'presurvey', 'fish_survey', 'total_fish_count', 'total_schedules', 'latest_schedule_date']
        read_only_fields = ('email', 'is_staff', 'is_active', 'date_joined', 'is_superuser')

    def get_total_fish_count(self, obj):
        # user_id가 현재 사용자와 일치하는 항목들의 count의 합
        return obj.user_fish_user.filter(user=obj.id).aggregate(total_count=Sum('count'))['total_count'] or 0

    def get_total_schedules(self, obj):
        # user_id가 현재 사용자와 일치하는 항목들의 총 수
        return obj.schedule_user.filter(user=obj.id, done=True).count() or 0

    def get_latest_schedule_date(self, obj):
        # user_id가 현재 사용자와 일치하는 항목들 중에서 최근 schedule의 날짜
        latest_schedule = obj.schedule_user.filter(user=obj.id, done=True).aggregate(latest_date=Max('date'))['latest_date']
        return latest_schedule.strftime('%Y-%m-%d') if latest_schedule else None
