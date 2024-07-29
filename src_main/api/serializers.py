from rest_framework import serializers
from .models import ClassificationModel
from django.contrib.auth.models import User
from .models import UserOTP
from .models import UploadedVideo
class ClassificationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassificationModel
        fields = '__all__'


class UserOTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOTP
        fields = ['user', 'otp_verified']
class UploadedVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedVideo
        fields = ['video', 'uploaded_at']