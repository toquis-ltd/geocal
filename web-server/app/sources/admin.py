from django.contrib import admin
from .models import Link, Report

def verify(modeladmin, request, queryset):
    queryset.update(is_verified = True)

verify.short_description = "Verify selected links"

class LinkAdmin(admin.ModelAdmin):
    search_fields = ['site_name', 'author']
    list_filter = ('is_verified', )
    list_display = ('site_name', 'is_verified', 'author', 'date')
    ordering = ['is_verified']
    actions = [verify]

    def get_form(self, request, obj=None, **kwargs):
        form = super(LinkAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['author'].initial = request.user.username
        form.base_fields['is_verified'].initial = request.user.is_staff
        return form

class ReportAdmin(admin.ModelAdmin):
    search_fields = ['site_name', 'author']
    list_display = ('site', 'author', 'date')

admin.site.register(Link, LinkAdmin)
admin.site.register(Report, ReportAdmin)