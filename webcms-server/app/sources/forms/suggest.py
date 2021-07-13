from django import forms

from ..models import Link

class SuggestForm (forms.Form)
    class Meta:
        model = Link
        fields = ['address', 'name', 'description']