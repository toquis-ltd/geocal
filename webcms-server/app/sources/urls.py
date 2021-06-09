from .views import *
from django.urls import path

app_name = "sources"
urlpatterns = [
    path('', sites_list, name='links'),
    path('suggest/', contact_form, name='suggest'),
    # path('report/', contact_form, name='report'),
    # path('add/<str:context>', add, name='add'),
    # path('download/', download, name='download')
]