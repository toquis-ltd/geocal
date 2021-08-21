from django.contrib.gis.gdal import SpatialReference
from django.db.models.query import QuerySet

from ..etc.crsCase import CoordinateReferenceSystemCase

class Proj4(CoordinateReferenceSystemCase):

    def _get_result(self) -> QuerySet:
        try:
            return SpatialReference(self._query).proj
        except Exception as e:
            if self._query == '':
                raise Exception ("You forget to specify EPSG code") from e
            
            raise Exception ("Your EPSG code is wrong") from e
    