from .views import *
from django.urls import path

app_name = "sources"
urlpatterns = [
    path('', LinkListView.as_view(), name='index'),
    path('suggest/', LinkCreateView.as_view(), name='suggest'),
    path('report/<int:id>/', ReportCreateView.as_view(), name='report'),
]