from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Entry(models.Model):
    user = models.ForeignKey(User, related_name="entries", on_delete=models.CASCADE, null=False)
    date = models.DateField()
    distance = models.FloatField()
    time = models.FloatField()
