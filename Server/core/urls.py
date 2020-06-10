from django.urls import path
from .views import current_user, Users

urlpatterns = [
    path('current_user/', current_user),
    path('users/', Users.as_view())
]