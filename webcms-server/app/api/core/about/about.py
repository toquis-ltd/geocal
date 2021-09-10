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
                    'ellipsoid': item.get_ellipsoid(),
                    'kind': item.coord_ref_sys_kind,
                    'coordinateSystem': item.get_coordinate_system(),
                    'projectionMethod': item.get_projection_method(),
                    'proj4': item.get_proj4(),
                    'wkt': item.get_wkt(),
                }
