from ast import alias
import json
import myapi
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from myapi.models import Hero
from myapi.serializers import HeroSerializer
from .forms import HeroForm



def index(request):
    hero_form = HeroForm()
    return render(request, 'index.html', {'hero_form' : hero_form})
