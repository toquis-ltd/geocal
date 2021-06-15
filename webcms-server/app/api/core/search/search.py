from re import match

from django.db.models import Q

from api.models import *

from .interface import Isearch

class CoordinateReferenceSystemSearch(Isearch):

    def __init__(self, request):
        
        if match("\W + \S", request) or len(request)==0:
            self.find = []
            return

        if request.isdigit() and len(request) >= 4:
            self.find = CoordinateReferenceSystem.objects.filter(coord_ref_sys_code=request)
            return

        q = fr'\y({request})\y'
        self.find = CoordinateReferenceSystem.objects.filter(
                                                                Q(coord_ref_sys_name__iregex=q) |
                                                                Q(area_name__iregex=q) |
                                                                Q(area__area_of_use__iregex=q)
                                                            )