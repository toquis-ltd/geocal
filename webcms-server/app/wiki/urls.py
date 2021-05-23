from .views import *
from django.urls import path

app_name = 'wiki'
urlpatterns = [
    path('crs/<int:code>/', coordinate_reference_system, name='CoordinateReferenceSystem'),
    path('cs/<int:code>/', coordinate_system, name='CoordinateSystem'),
    path('datum/<int:code>/', datum, name='Datum'),
    path('ellipsoid/<int:code>/', ellipsoid, name='Ellipsoid'),
    path('pm/<int:code>/', prime_meridian, name='PrimeMeridian'),
]