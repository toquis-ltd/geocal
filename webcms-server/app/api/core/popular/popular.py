from django.db.models.query import QuerySet

from api.core.etc.list import CoordinateReferenceSystemList as CRSList

from api.models import Popular

class PopularCoordinateReferenceSystem(CRSList):

    def _get_result(self) -> QuerySet:
        return Popular.crs_set.all()