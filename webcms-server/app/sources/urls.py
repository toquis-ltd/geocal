from .views import *
from django.urls import path

app_name = "sources"
urlpatterns = [
    path('', LinkListView.as_view(), name='index'),
    path('suggest/', contact_form, name='suggest'),
    path('report/<int:id>/', contact_form, name='report'),
    path('add/<str:context>/', add, name='add'),
]