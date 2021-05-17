from .views import transform_point
from django.urls import path

app_name = "converter"
urlpatterns = [
    path('', transform_point, name="PointConverter"),
]