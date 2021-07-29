from django.db import models
from .Area import Area

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

    def get_unity_of_measure(self):
        return self._get_unity_of_measure()

    def _get_unity_of_measure(self):
        try:
            return SpatialReference(str(self.coord_ref_sys_code)).units[1] 
        except:
            return 'unknown'

    class Meta:
        ordering = ['coord_ref_sys_code']