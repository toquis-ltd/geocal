from django.contrib import admin
from .models import *

class PersonAdmin(admin.ModelAdmin):
    search_fields = ('coord_ref_sys_code', 'coord_ref_sys_kind', )

class PersonAdminDatum(admin.ModelAdmin):
    search_fields = ('datum_code', )

class PersonAdminEllipsoid(admin.ModelAdmin):
    search_fields = ('ellipsoid_code', )

admin.site.register(Area)
admin.site.register(CoordinateReferenceSystem, PersonAdmin)
admin.site.register(CoordinateSystem)
admin.site.register(Datum, PersonAdminDatum)
admin.site.register(Ellipsoid, PersonAdminEllipsoid)
admin.site.register(UnityOfMeasure)
admin.site.register(Popular)