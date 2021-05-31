from .models import *
from django.contrib.gis.gdal import SpatialReference

class CoordinateReferenceSystemInterface():
    def __init__(self, code):
        try:
            self.crs = CoordinateReferenceSystem.objects.get(coord_ref_sys_code = code)
        except:
            raise Exception("This crs doen't exist ")

        self.area_of_use_code = self.crs.area_of_use_code
        self.datum_code = self.crs.datum_code
        self.base_crs_code = self.crs.base_crs_code

    def _get_area(self):
        try:
            return Area.objects.get(code = self.area_of_use_code)
        except:
            return None

    def _get_bounds(self):
        if (area := self._get_area()) is None: return None
        return {
                                'southBoundLat':area.area_south_bound_lat,
                                'northBoundLat':area.area_north_bound_lat,
                                'westBoundLon':area.area_west_bound_lon,
                                'eastBoundLon':area.area_east_bound_lon,
        }

    def _get_coordinate_system(self):
        try:
            return CoordinateSystem.objects.get(coord_sys_code = self.crs.coord_sys_code)
        except:
            return None

    def _get_code(self):
        return self.crs.coord_ref_sys_code

    def _get_data_source(self):
        return self.crs.data_source 
    
    def _get_datum(self):
        try:
            return Datum.objects.get(datum_code = self.crs.datum_code)
        except Exception as e:
            if self.datum_code == None:
                return None
            source = CoordinateReferenceSystem.objects.get(coord_ref_sys_code = self.base_crs_code)
            return Datum.objects.get(datum_code = source.datum_code)

    def _get_ellipsoid(self):
        try:
            return Ellipsoid.objects.get(ellipsoid_code = self._get_datum().ellipsoid_code)
        except:
            return None
    
    def _get_geodetic_coordinate_reference_system(self):
        try:
            return CoordinateReferenceSystem.objects.get(coord_ref_sys_code = self.base_crs_code)
        except:
            if self.base_crs_code == None:
                return self.crs
            return None
            
    def _get_name(self):
        return self.crs.coord_ref_sys_name

    def _get_primem_meridian(self):
        try:
            return PrimeMeridian.objects.get(prime_meridian_code = self._get_datum().prime_meridian_code)
        except:
            return None

    def _get_remarks(self):
        return self.crs.remarks

    def _get_revision_date(self):
        return self.crs.revision_date

    def _get_unity_of_measure(self):
        try:
            return SpatialReference(str(self.crs.coord_ref_sys_code)).units[1] 
        except:
            return 'unknown'

    def _is_deprecated(self):
        return self.crs.deprecated


    def get_area(self):
        return self._get_area()

    def get_bounds(self):
        return self._get_bounds()
    
    def get_coordinate_system(self):
        return self._get_coordinate_system()
    
    def get_code(self):
        return self._get_code()

    def get_data_source(self):
        return self._get_data_source()

    def get_datum(self):
        return self._get_datum()

    def get_ellipsoid(self):
        return self._get_ellipsoid()
    
    def get_geodetic_coordinate_reference_system(self):
        return self._get_geodetic_coordinate_reference_system()

    def get_name(self):
        return self._get_name()

    def get_primem_meridian(self):
        return self._get_primem_meridian()

    def get_remarks(self):
        return self._get_remarks()

    def get_revision_date(self):
        return self._get_revision_date()

    def get_unity_of_measure(self):
        return self._get_unity_of_measure()
    
    def is_deprecated(self):
        return self._is_deprecated()

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