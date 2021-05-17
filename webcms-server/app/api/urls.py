from .views import *
from django.urls import path

urlpatterns = [
    path('epsg/', About.as_view()),
    path('transform/', Transform.as_view()),
    path('search/', Search.as_view()),
    path('globe/', Globe.as_view()),
    path('popular/', PopularCRS.as_view()),
]