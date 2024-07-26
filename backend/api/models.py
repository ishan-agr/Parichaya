from django.db import models
from django.contrib.auth.models import User
from django_otp.plugins.otp_email.models import EmailDevice


class ClassificationModel(models.Model):
    input_data = models.CharField(max_length=100)
    prediction = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


class UserOTP(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp_device = models.OneToOneField(EmailDevice, on_delete=models.CASCADE, null=True, blank=True)
    otp_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
class Video(models.Model):
    url = models.URLField(max_length=200)
    is_verified = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)
# class UploadedVideo(models.Model):
#     video = models.FileField(upload_to='videos/')
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Video uploaded at {self.uploaded_at}"
# class UploadedVideo(models.Model):
#     video = models.FileField(upload_to='videos/')
#     is_verified = models.BooleanField(default=False)
#     uploaded_at = models.DateTimeField(auto_now_add=True)
class UploadedVideo(models.Model):
    video = models.FileField(upload_to='videos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)  # Add this line

    def __str__(self):
        return f"Video uploaded at {self.uploaded_at}, Verified: {self.is_verified}"