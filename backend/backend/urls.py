# urls.py

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
# 이미지 저장을 위한 코드(지용)
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
    openapi.Info(
        title="FUBAO",
        default_version='0.0.0',
        description="FUBAO API 문서",
        # terms_of_service="https://www.google.com/policies/terms/",
        # contact=openapi.Contact(email=""), # 부가정보
        # license=openapi.License(name=""),     # 부가정보
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('schedule/', include('schedule.urls')),
    path('user/', include('user.urls')),
    # path('user/', include('allauth.urls')),
    path('fish/', include('fish.urls')),
    path('information/',include('information.urls')),
    path('location/',include('location.urls')),
    path('review/',include('review.urls')),

    # swagger
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('favicon.ico', RedirectView.as_view(url='/static/favicon.ico'), name='favicon'),
# 이미지 저장을 위한 코드(지용)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
