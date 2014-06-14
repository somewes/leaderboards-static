from __future__ import unicode_literals
from django.contrib.auth.models import User
from rest_framework import serializers
from leaderboards.models import Game, Speedrun, Tag, TagValue, Platform, Filter


class ModelWriteFlatSerializer(serializers.ModelSerializer):
    def from_native(self, value, *args, **kwargs):
        """
        If given an id (as a string or int), find the appropriate record and
        use that for the relationship.
        """
        if isinstance(value, (int, str, unicode)):
            return self.Meta.model.objects.get(pk=value)
        return super(ModelWriteFlatSerializer, self).from_native(value, *args, **kwargs)

    def field_from_native(self, data, files, field_name, into):
        """
        Ensure many-to-many relationships are deserialized using from_native
        """
        super(ModelWriteFlatSerializer, self).field_from_native(data, files, field_name, into)
        list_field_name = field_name + '[]'
        if data.has_key(list_field_name):
            into[field_name] = map(lambda pk: self.from_native(pk),
                data.getlist(list_field_name))


class UserSerializer(ModelWriteFlatSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class PlatformSerializer(ModelWriteFlatSerializer):
    class Meta:
        model = Platform
        fields = ('id', 'name')


class TagValueSerializer(ModelWriteFlatSerializer):
    tag = serializers.PrimaryKeyRelatedField(required=True)
    
    class Meta:
        model = TagValue
        fields = ('id', 'name', 'description', 'tag')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'type', 'timed', 'tagvalues')


class FilterSerializer(serializers.ModelSerializer):
    tags = TagValueSerializer(many=True)

    class Meta:
        model = Filter
        fields = ('id', 'name', 'tagvalues')


class SpeedrunSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    game = serializers.PrimaryKeyRelatedField(required=True)

    class Meta:
        model = Speedrun
        fields = ('id', 'user', 'time', 'game', 'platform', 'video', 'comments', 'tagvalues')


class GameSerializer(ModelWriteFlatSerializer):
    tags = TagSerializer(many=True)
    tagvalues = TagValueSerializer(many=True)
    filters = FilterSerializer(many=True)
    platforms = PlatformSerializer(many=True)
    speedruns = SpeedrunSerializer(many=True)

    class Meta:
        model = Game
        fields = ('abbreviation', 'name', 'tags', 'tagvalues', 'platforms', 'filters', 'speedruns')
