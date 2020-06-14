from django.db import models


class Camera(models.Model):
    camera_id = models.CharField(verbose_name='camera_id', unique=True, max_length=255, primary_key=True)
    camera_name = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)


class Metric(models.Model):
    camera_id = models.ForeignKey(Camera, verbose_name='camera_id', related_name='metrics', on_delete=models.CASCADE)
    direction = models.CharField(max_length=10)
    timestamp = models.DateTimeField()
