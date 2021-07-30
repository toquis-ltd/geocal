from django.contrib.postgres.search import TrigramSimilarity

from django.db.models.functions import Greatest
from django.db.models.query import QuerySet

from django.http.request import HttpRequest

from api.core.etc.list import CoordinateReferenceSystemList as CRSList

from api.models import CoordinateReferenceSystem as CRS

class CoordinateReferenceSystemSearch(CRSList):

    def _get_queryset(self, request:HttpRequest) -> str:
        return request.GET.get('q')
                           
    def _get_result(self) -> QuerySet:
        """ This function is retunring QuerySet of Coordinate Referance System(to make reading easier this name gonna be abridged to CRS)
            if search keyword is empty this function return empty QuerySet
            if the search keyword is made from only digits this function will return QuerySet with only one or zero CRS
            if the search keyword is a string 
        """
        if len(self._query) == 0:
            return CRS.objects.none()

        if self._query.isdigit() and len(self._query) >= 4:
            return CRS.objects.filter(coord_ref_sys_code=self._query)
        
        params = Greatest(
                    TrigramSimilarity('coord_ref_sys_name', self._query),
                    TrigramSimilarity('area_name', self._query),
                    TrigramSimilarity('remarks', self._query)
                    )
        
        return CRS.objects.annotate(similarity=params).filter(similarity__gte=0.1).order_by('-similarity')
        
    