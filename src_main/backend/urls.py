from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import ClassificationModelViewSet, upload_video, get_latest_video_url
# from api.views import SendOTPView, VerifyOTPView
from api.views import verify_id
from api.views import upload_video
from django.conf.urls.static import static
from django.conf import settings
router = routers.DefaultRouter()
router.register(r'classify', ClassificationModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # path('api/send-otp/', SendOTPView.as_view(), name='send_otp'),
    # path('api/verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('api/verify-id', verify_id, name='verify-id'),
    path('api/upload-video', upload_video, name='upload-video'),
    path('api/get-latest-video-url/', get_latest_video_url, name='get-latest-video-url'),
    path('api/get-latest-video-url/', get_latest_video_url, name='get_latest_video_url'),
    path('api/upload-video/', upload_video, name='upload_video'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

