from django.db.models.query import QuerySet

from api.models import CoordinateReferenceSystem

from ..etc.crsCase import CoordinateReferenceSystemCase

class About(CoordinateReferenceSystemCase):

    def _get_result(self) -> QuerySet:
        item = CoordinateReferenceSystem.objects.get(coord_ref_sys_code = self._query)
        return  {
                    'code': item.coord_ref_sys_code,
                    'name': item.coord_ref_sys_name,
                    'unityOfMeasure': item.get_unity_of_measure(),
                    'bounds': item.get_bounds(),
                }
