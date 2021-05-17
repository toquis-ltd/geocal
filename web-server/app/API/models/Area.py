from django.db import models

class Area(models.Model):

    code = models.IntegerField()
    name = models.CharField(max_length = 512, blank=True)
    area_of_use = models.CharField(max_length = 4096, blank=True)

    area_south_bound_lat = models.FloatField(null=True, blank=True)
    area_north_bound_lat = models.FloatField(null=True, blank=True)
    area_west_bound_lon = models.FloatField(null=True, blank=True)
    area_east_bound_lon = models.FloatField(null=True, blank=True)

    area_polygon_file_ref = models.CharField(max_length = 64, blank=True)
    iso_a2_code = models.CharField(max_length = 16, blank=True)
    iso_a3_code = models.CharField(max_length = 16, blank=True)
    iso_n_code = models.CharField(max_length = 16, blank=True)

    remarks = models.CharField(max_length = 256, blank=True)
    information_source = models.CharField(max_length = 256, blank=True)
    data_source = models.CharField(max_length = 16, blank=True)
    revision_date = models.DateField()
    
    change_id = models.CharField(max_length = 128, blank=True)
    deprecated = models.BooleanField()

    def __str__(self):
        return self.name