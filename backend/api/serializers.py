from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('pk', 'username','first_name','last_name','is_staff', 'is_superuser')
        read_only_fields = ('username', 'pk','is_staff', 'is_superuser')
