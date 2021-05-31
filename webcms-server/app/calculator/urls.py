from .views import *
from django.urls import path

app_name = 'calculator'
urlpatterns = [
    path('', index, name='main'),

]