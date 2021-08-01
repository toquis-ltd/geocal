from django.db.models.query import QuerySet

from api.core.etc.crsList import CoordinateReferenceSystemList as CRSList

from api.models import CoordinateReferenceSystem as CRS

class PopularCoordinateReferenceSystem(CRSList):

    def _get_result(self) -> QuerySet:
        return CRS.objects.filter(popular__isnull=False)