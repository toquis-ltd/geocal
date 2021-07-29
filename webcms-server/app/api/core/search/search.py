from re import match

from django.db.models import Q
from django.db.models.functions import Greatest
from django.contrib.postgres.search import TrigramSimilarity
from django.db.models.query import QuerySet, EmptyQuerySet

from django.http.request import HttpRequest

from api.core.service.interface import Service
from api.models import CoordinateReferenceSystem

class CoordinateReferenceSystemSearch(Service):

    get_item_parameters = lambda item: {
                                        'code': item.coord_ref_sys_code,
                                        'name': item.coord_ref_sys_name,
                                        'area': item.area_name,
                                        'unityOfMeasure': item.get_unity_of_measure()
                                    }

    def _get_result(self) -> QuerySet:
        if self._query.isdigit() and len(self._query) >= 4:
            return CoordinateReferenceSystem.objects.filter(coord_ref_sys_code=self._query)
        
        params = Greatest(
                    TrigramSimilarity('coord_ref_sys_name', self._query),
                    TrigramSimilarity('area_name', self._query)
                    )
        
        return CoordinateReferenceSystem.objects.annotate(similarity=params).filter(similarity__gte=0.1).order_by('-similarity')
        
    def _get_queryset(self, request:HttpRequest) -> str:
        return request.GET.get('q')

    def _get_response(self) -> dict:
        
        find_crs = map(CoordinateReferenceSystemSearch.get_item_parameters, self._result)
        return  {
                    'epsg_exist': True,
                    'find': len(self._result),
                    'findCRS': find_crs,
                }