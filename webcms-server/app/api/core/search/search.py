from django.db.models import Q

from api.models import *

from .interface import Isearch

class CoordinateReferenceSystemSearch(Isearch):

    def __init__(self, request):
        if request.isdigit() and len(request) >= 4:
            self.find = CoordinateReferenceSystem.objects.filter(coord_ref_sys_code=request)
            return
        
        self.find = CoordinateReferenceSystem.objects.filter(
                                                                Q(coord_ref_sys_name__icontains=request) |
                                                                Q(area_name__icontains=request) |
                                                                Q(area__area_of_use__icontains=request)
                                                            )