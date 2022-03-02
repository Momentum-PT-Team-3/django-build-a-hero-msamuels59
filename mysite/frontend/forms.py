from django import forms
from myapi.models import Hero

class HeroForm(forms.ModelForm):
    class Meta:
        model = Hero
        fields = ('name', 'alias')