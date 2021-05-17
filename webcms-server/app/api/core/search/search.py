from django.db.models import Q

from api.models import *

class CoordinateReferenceSystemSearch():

    def __init__(self, request):
        if request.isdigit() and len(request) >= 4:
            self.find = CoordinateReferenceSystem.objects.filter(coord_ref_sys_code=request)
            return

        quest = fr'(?i)\b{request}\b'
        
        self.find = CoordinateReferenceSystem.objects.filter(
                                                                Q(coord_ref_sys_name__regex=quest) |
                                                                Q(area_name__regex=quest)|
                                                                Q(area__area_of_use__contains=request)

                                                            )

    def _get_list_of_find_crs(self):
        return self.find

    def get_list_of_find_crs(self):
        return self._get_list_of_find_crs()

    def __len__(self):
        return len(self.find)