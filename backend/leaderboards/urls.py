from django.conf.urls import patterns, url
from django.conf.urls.defaults import include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from leaderboards import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users?', views.UserViewSet)
router.register(r'games?', views.GameViewSet)
router.register(r'speedruns?', views.SpeedrunViewSet)
router.register(r'platforms?', views.PlatformViewSet)

urlpatterns = patterns('',
    url(r'^api/login(?:\.(?P<format>[a-z0-9]+))?$', views.LoginViewSet.as_view()),
    url(r'^api/logout(?:\.(?P<format>[a-z0-9]+))?$', views.LogoutViewSet.as_view()),
    url(r'^api/', include(router.urls)),
)