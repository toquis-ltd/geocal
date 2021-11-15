from django.urls import path

from .views import *

urlpatterns = [
    path('about/', get_about),
    path('search/', get_search),
    path('popular/', get_popular),
    path('transform/', get_transform),
    path('deftransform/', get_deftransform),
]