from django.urls import path
from .views import  find

app_name = "search" 
urlpatterns = [
    path('', find, name="find"),
] 