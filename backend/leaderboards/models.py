from django.db import models
from django.contrib.auth.models import User


# the Game and Platform models should not live here
class Platform(models.Model):
    name = models.CharField(max_length=128)

    def __unicode__(self):
        return self.name


class Game(models.Model):
    abbreviation = models.CharField(max_length=32, primary_key=True)
    name = models.CharField(max_length=512)
    platforms = models.ManyToManyField(Platform, related_name='platforms')

    def __unicode__(self):
        return self.name


class Tag(models.Model):
    game = models.ForeignKey(Game, related_name='tags')
    name = models.CharField(max_length=256)
    type = models.CharField(max_length=32)
    timed = models.BooleanField()

    def __unicode__(self):
        return u'%s for %s' % (self.name, str(self.game))


class TagValue(models.Model):
    game = models.ForeignKey(Game, related_name='tagvalues')
    tag = models.ForeignKey(Tag, related_name='tagvalues', blank=True)
    name = models.CharField(max_length=256)
    description = models.TextField(blank=True)

    def __unicode__(self):
        return u'%s: %s (%s)' % (self.tag.name, self.name, self.tag.game)


class Speedrun(models.Model):
    user = models.ForeignKey(User)
    time = models.PositiveIntegerField()
    game = models.ForeignKey(Game, related_name='speedruns')
    platform = models.ForeignKey(Platform, related_name='+')
    video = models.CharField(max_length=1024, blank=True)
    comments = models.TextField(blank=True)
    tagvalues = models.ManyToManyField(TagValue, related_name='speedrun')

    def __unicode__(self):
        return u'%s in %s by %s' % (
            str(self.game), self.display_time, str(self.user))

    @property
    def hours(self):
        return (self.time / 1000) / 3600 # seconds in an hour

    @property
    def minutes(self):
        return ((self.time / 1000) % 3600) / 60 # seconds in a minute

    @property
    def seconds(self):
        return (self.time / 1000) % 60

    @property
    def display_time(self):
        return u'%dh %dm %ds' % (self.hours, self.minutes, self.seconds)


class Filter(models.Model):
    name = models.CharField(max_length=256)
    displaylength = models.PositiveIntegerField()
    game = models.ForeignKey(Game, related_name='filters')
    tagvalues = models.ManyToManyField(TagValue, related_name='tagvalues')

    def __unicode__(self):
        return u'%s (%s)' % (self.name, str(self.game))
