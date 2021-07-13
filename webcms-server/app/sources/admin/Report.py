from django.contrib import admin

from ..models import Report

class ReportAdmin(admin.ModelAdmin):
    search_fields = ['site__name', 'site__description', 'site__address', 'author']
    list_display = ('site', 'author', 'date')


admin.site.register(Report, ReportAdmin)