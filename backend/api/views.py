from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response

from tracker.models import Entry
from tracker.serializers import EntrySerializer
from api.serializers import UserSerializer

# Create your views here.
class EntryList(generics.ListCreateAPIView):
    serializer_class = EntrySerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
          return Entry.objects.all().order_by('-date')

        return user.entries.all().order_by('-date')

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=self.request.user)


class EntryDetail(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = EntrySerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Entry.objects.all()
        return user.entries.all()
    


class UserList(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
          return User.objects.all()

        return [user]

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_staff:
          serializer.save()


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return User.objects.all()
        return [user]
    

class Myself(generics.GenericAPIView):

    serializer_class = UserSerializer
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        #if request.user.is_authenticated():
        #    return Response(data={"is_authenticated":True}, status=status.HTTP_200_OK)
        #else:
        #    return Response(data={"is_authenticated":False}, status=status.HTTP_401_UNAUTHORIZED)
