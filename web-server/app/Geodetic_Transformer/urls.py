from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('API.urls')),
    path('about/', include('wiki.urls')),
    path('search/', include('search.urls')),
    path('converter/', include('converter.urls')),
    path('sources/', include('sources.urls')),
    path('', include('home.urls')),
]
