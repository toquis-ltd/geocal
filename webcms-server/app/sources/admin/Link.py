from django.contrib import admin, messages
from django.contrib.auth.decorators import permission_required

from django.utils.decorators import method_decorator
from django.urls import path
from django.shortcuts import render, redirect

from ..models import Link
from ..core.csv.reader import buildFromCSV
from ..core.links.builder import LinkFab

def verify(modeladmin, request, queryset):
    queryset.update(is_verified = True)

verify.short_description = "Verify selected links"

class LinkAdmin(admin.ModelAdmin):
    search_fields = ['name', 'address', 'description', 'author']
    list_filter = ('is_verified', )
    list_display = ('name', 'is_verified', 'author', 'date')
    ordering = ['is_verified']
    actions = [verify]
    change_list_template = 'admin/sources/change_list.html'

    def get_form(self, request, obj=None, **kwargs):
        form = super(LinkAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['author'].initial = request.user.username
        form.base_fields['is_verified'].initial = request.user.is_staff
        return form

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('import-csv/', self.import_csv, name='import-links'),
        ]
        return my_urls + urls

    @method_decorator(permission_required("sources", login_url='admin:login'))
    def import_csv(self, request):
        if request.method == "POST":
            if (csv_file := buildFromCSV(request, LinkFab)) == None:
                self.message_user(request, "Can't reache the file", level=messages.ERROR)
                return redirect("..")
            self.message_user(request, "Your csv file has been imported")
            return redirect("..")
        
        return render(request, "admin/sources/csv_form.html")

admin.site.register(Link, LinkAdmin)
