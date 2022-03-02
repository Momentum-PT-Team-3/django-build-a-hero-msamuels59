from django.urls import include, path
from rest_framework import routers
import frontend
from frontend.views import ajax_add_hero
from . import views


router = routers.DefaultRouter()
router.register(r'heroes', views.HeroViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('heroes/new/', frontend.views.ajax_add_hero, name='ajax_add_hero'),
]
