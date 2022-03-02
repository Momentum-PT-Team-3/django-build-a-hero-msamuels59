import json
import myapi
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from myapi.models import Hero
from myapi.serializers import HeroSerializer



def index(request):
    return render(request, 'index.html')

def ajax_get_hero(request):
    heroes = Hero.objects.all()
    data = HeroSerializer
    return HttpResponse(data, content_type='application/json')
