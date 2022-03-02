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

def ajax_get_hero(request):
    data = HeroSerializer
    return HttpResponse(data, content_type='application/json')

def ajax_add_hero(request):
    data = {}
    if request.method == 'POST':
        print(request.POST)
        hero = request.POST.get('hero')
        form = HeroForm(request.POST)
        if form.is_valid():
            new_hero = form.save()
            data['saved'] = True
        data['hero'] = hero

    else:
        data['response': 'nothing to get']
    return JsonResponse(data)
