from django.urls import path
from .views import current_user, Users, CameraView, MetricView

urlpatterns = [
    path('current_user/', current_user),
    path('users/', Users.as_view()),
    path('cameras/', CameraView.as_view()),
    path('cameras/<str:pk>', CameraView.as_view()),
    path('metrics/', MetricView.as_view()),
]