from django.contrib import admin
from leaderboards.models import Platform, Game, Tag, TagValue, Speedrun, Filter

admin.site.register(Platform)
admin.site.register(Game)
admin.site.register(Tag)
admin.site.register(TagValue)
admin.site.register(Speedrun)
admin.site.register(Filter)
