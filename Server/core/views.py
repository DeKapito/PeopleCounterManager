from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import UserSerializer, UserSerializerWithToken, CameraSerializer, MetricSerializer
from .models import Camera, Metric


@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class Users(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class CameraView(APIView):
    def get(self, request, format=None):
        cameras = Camera.objects.all()
        serializer = CameraSerializer(cameras, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CameraSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        camera = get_object_or_404(Camera.objects.all(), pk=pk)
        camera.delete()
        return Response({
            "message": "Camera with id `{}` has been deleted.".format(pk)
        }, status=200)


class MetricView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        metrics = Metric.objects.all()
        serializer = MetricSerializer(metrics, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = MetricSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)