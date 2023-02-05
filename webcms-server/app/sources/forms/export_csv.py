from django.forms import Form, BooleanField, IntegerField

from ..models import Link

class ExportCSVForm(Form):
    name = BooleanField(initial=True, required=False)
    address = BooleanField(label='URL:', initial=True, required=False)
    description = BooleanField(initial=True, required=False)
    author = BooleanField(initial=False, required=False)
    date = BooleanField(initial=False, required=False)
    numbre = IntegerField(initial=Link.objects.count(), label="Numbre of sites(by default all sites are include)")

    def get_selected_field(self):
        response = [str]
        fields = ["name", 'address', 'description', "author", "date"]
        for i in fields:
            if exec(f'self.{i}'):
                response.append(i)
        return response