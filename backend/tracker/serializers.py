from rest_framework import serializers
from tracker.models import Entry

class EntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Entry
        fields = ('pk', 'date','user','time','distance')
        read_only_fields = ('user', 'pk')