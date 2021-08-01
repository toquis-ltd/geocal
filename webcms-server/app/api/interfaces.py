from django.contrib.gis.gdal import SpatialReference

from .models import *

class DatumInterface():
    def __init__(self, code):
        self.datum = Datum.objects.get(datum_code = code)
        self.ellipsoid = self._get_ellipsoid()
        self.prime_meridian = self._get_prime_meridian()
        self.area  = self._get_area()
    
    def _get_ellipsoid(self):
        try:
            return Ellipsoid.objects.get(ellipsoid_code = self.datum.ellipsoid_code)
        except:
            return None

    def _get_prime_meridian(self):
        try:
            return PrimeMeridian.objects.get(prime_meridian_code = self.datum.prime_meridian_code)
        except:
            return None

    def _get_area(self):
        return Area.objects.get(code = self.datum.area_of_use_code)