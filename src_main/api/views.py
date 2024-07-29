from rest_framework import viewsets
from .models import ClassificationModel
from .serializers import ClassificationModelSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

class ClassificationModelViewSet(viewsets.ModelViewSet):
    queryset = ClassificationModel.objects.all()

    serializer_class = ClassificationModelSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django_otp.plugins.otp_email.models import EmailDevice
from .models import UserOTP
from .serializers import UserOTPSerializer
from django.core.files.storage import default_storage
from .models import UploadedVideo
from .serializers import UploadedVideoSerializer
# class SendOTPView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         user = User.objects.get(email=email)
#         device = EmailDevice.objects.create(user=user, confirmed=True)
#         device.generate_token()
#         device.save()
#         send_mail('Your OTP Code', f'Your OTP code is {device.token}', 'no-reply@example.com', [email])
#         user_otp, created = UserOTP.objects.get_or_create(user=user, otp_device=device)
#         if not created:
#             user_otp.otp_device = device
#             user_otp.save()
#         return Response({'message': 'OTP sent'}, status=status.HTTP_200_OK)

# class VerifyOTPView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         otp = request.data.get('otp')
#         user = User.objects.get(email=email)
#         user_otp = UserOTP.objects.get(user=user)
#         device = user_otp.otp_device
#         if device.verify_token(otp):
#             user_otp.otp_verified = True
#             user_otp.save()
#             return Response({'message': 'OTP verified'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'message': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_exempt
def upload_video(request):
    if 'video' not in request.FILES:
        return Response({'error': 'No video file provided'}, status=status.HTTP_400_BAD_REQUEST)

    video_file = request.FILES['video']
    is_verified = request.data.get('is_verified', 'true').lower() == 'true'  # Get the verification status
    file_name = default_storage.save(video_file.name, video_file)
    file_url = request.build_absolute_uri(default_storage.url(file_name))
    
    # Save the video URL and verification status to the database
    UploadedVideo.objects.create(video=video_file, is_verified=is_verified)  # Save to the database

    return Response({'file_url': file_url})


def extract_data_from_id():
    # This function should be replaced with actual logic to extract data from the ID images
    return {
        'username': 'Ishan Agrawal',
        'dateofbirth': '2001-08-10',
        'gender': 'Male'
    }

def verify_id_data(user_data, extracted_data):
    mismatched_fields = {}

    if user_data['username'] != extracted_data['username']:
        mismatched_fields['username'] = True
    if user_data['dateofbirth'] != extracted_data['dateofbirth']:
        mismatched_fields['dateofbirth'] = True
    if user_data['gender'] != extracted_data['gender']:
        mismatched_fields['gender'] = True

    return mismatched_fields

@api_view(['POST'])
@csrf_exempt

def verify_id(request):
    data = JSONParser().parse(request)
    username = data.get('username')
    dateofbirth = data.get('dateofbirth')
    gender = data.get('gender')

    user_data = {
        'username': username,
        'dateofbirth': dateofbirth,
        'gender': gender
    }

    # Extract data from ID (replace with actual extraction logic)
    extracted_data = extract_data_from_id()

    # Verify the data
    mismatched_fields = verify_id_data(user_data, extracted_data)

    return JsonResponse({'mismatchedFields': mismatched_fields})


@api_view(['GET'])
def get_latest_video_url(request):
    try:
        latest_video = UploadedVideo.objects.latest('uploaded_at')
        video_url = request.build_absolute_uri(latest_video.video.url)
        return Response({'videoUrl': video_url, 'isVerified': latest_video.is_verified})
    except UploadedVideo.DoesNotExist:
        return Response({'error': 'No video found'}, status=status.HTTP_404_NOT_FOUND)