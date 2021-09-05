from django.urls import path

from .core.proj4.proj4 import Proj4

from .views import *

urlpatterns = [
    path('about/', get_about),
    path('search/', get_search),
    path('popular/', get_popular),
    path('proj4/', get_wkt)
]