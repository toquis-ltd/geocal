from django.shortcuts import render
from django.db.models import Q
from API.models import CoordinateReferenceSystem
from .interfaces import CoordinateReferenceSystemSearch
import re

def find(request):
    region_name = request.GET.get('q', '')
    find_regions = CoordinateReferenceSystemSearch(region_name)
    context = {
                    'search_bar': region_name,
                    'find_regions': find_regions.get_list_of_find_crs(),
                    'find_number': len(find_regions),
                    'show_number': len(find_regions)>0,
              }
    return render(request, "search/index.html", context)