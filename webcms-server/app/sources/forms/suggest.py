from django.forms import ModelForm, Textarea, TextInput

from ..models import Link

class SuggestForm(ModelForm):
    class Meta:
        model = Link
        fields = ['address', 'name', 'description']
        widgets = {
            'address': TextInput(attrs={'autocomplete':'off'}),
            'name': TextInput(attrs={'autocomplete':'off'}),
            'description': Textarea(attrs={'class': 'form__description'}),
        }
