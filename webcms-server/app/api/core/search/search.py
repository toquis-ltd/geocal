from re import match

from django.db.models import Q
from django.db.models.query import QuerySet, EmptyQuerySet

from django.http.request import HttpRequest

from api.core.service.interface import Service
from api.models import CoordinateReferenceSystem

class CoordinateReferenceSystemSearch(Service):

    def _get_result(self) -> QuerySet:
        if match("\W + \S", self._query) or match("[^\S]", self._query) or len(self._query)==0:
            return EmptyQuerySet

        if self._query.isdigit() and len(self._query) >= 4:
            return CoordinateReferenceSystem.objects.filter(coord_ref_sys_code=self._query)

        q = fr'\y({self._query})\y'
        return CoordinateReferenceSystem.objects.filter(
                                                                Q(coord_ref_sys_name__iregex=q) |
                                                                Q(area_name__iregex=q) |
                                                                Q(area__area_of_use__iregex=q)
                                                            )
    def _get_queryset(self, request:HttpRequest) -> str:
        return request.GET.get('q')

    def _get_response(self) -> dict:
        get_item = lambda item:{
                    'code':item.coord_ref_sys_code,
                    'name':item.coord_ref_sys_name,
                    'area':item.area_name,
                    }
        find_crs = list(map(get_item, self._result))
        return  {
                    'epsg_exist': True,
                    'find': len(self._result),
                    'findCRS': find_crs,
                }