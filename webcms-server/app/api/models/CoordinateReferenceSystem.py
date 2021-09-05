from django.contrib.gis.gdal import SpatialReference
from django.db import models

from .Area import Area
from .Datum import Datum
from .PrimeMeridian import PrimeMeridian

class CoordinateReferenceSystem(models.Model):

    coord_ref_sys_code = models.IntegerField(blank=True, null=True)
    coord_ref_sys_name = models.TextField(blank=True, null=True)
    area_of_use_code = models.IntegerField(blank=True, null=True)
    coord_ref_sys_kind = models.TextField(blank=True, null=True)

    coord_sys_code = models.IntegerField(blank=True, null=True)
    datum_code = models.IntegerField(blank=True, null=True)
    base_crs_code = models.IntegerField(blank=True, null=True)
    projection_conv_code = models.IntegerField(blank=True, null=True)
    
    cmpd_horizcrs_code = models.CharField(max_length = 128, blank=True, null=True)
    cmpd_vertcrs_code = models.CharField(max_length = 128, blank=True, null=True)
    remarks = models.TextField(blank=True)
    information_source = models.TextField(blank=True, null=True)

    data_source = models.TextField(blank=True, null=True)
    revision_date = models.DateField()
    change_id = models.TextField(null=True)
    show_crs = models.BooleanField()
    
    deprecated = models.BooleanField()
    proj4 = models.TextField(null=True, blank=True, default='1')
    area_name = models.CharField(max_length = 512, blank=True, null=True)
    area = models.ManyToManyField(Area, blank=True)

    def __str__ (self):
        return f"ESPG: {self.coord_ref_sys_code}  -  {self.coord_ref_sys_name}"

    def get_bounds(self):
        return self._get_bounds()

    def get_unity_of_measure(self):
        return self._get_unity_of_measure()
    
    def _get_bounds(self):
        area = Area.objects.get(code=self.area_of_use_code)
        return {
                    'northBoundLat': area.area_north_bound_lat,
                    'southBoundLat': area.area_south_bound_lat,
                    'westBoundLon' : area.area_west_bound_lon,
                    'eastBoundLon' : area.area_east_bound_lon,
            }
    
    def _get_datum(self):
        try:
            return Datum.objects.get(datum_code = self.crs.datum_code)
        except Exception as e:
            if self.datum_code == None:
                return None
            source = self.__class__.objects.get(coord_ref_sys_code = self.base_crs_code)
            return Datum.objects.get(datum_code = source.datum_code)

    def _get_ellipsoid(self):
        try:
            return Ellipsoid.objects.get(ellipsoid_code = self._get_datum().ellipsoid_code)
        except:
            return None

    def _get_primem_meridian(self):
        try:
            return PrimeMeridian.objects.get(prime_meridian_code = self._get_datum().prime_meridian_code)
        except:
            return None

    def _get_unity_of_measure(self):
        try:
            return SpatialReference(self.coord_ref_sys_code).units[1] 
        except:
            return None
    

    class Meta:
        ordering = ['coord_ref_sys_code']