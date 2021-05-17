from django.db import models

class CoordinateSystem(models.Model):

    coord_sys_code = models.IntegerField()
    coord_sys_name = models.CharField(max_length = 256)
    coord_sys_type = models.CharField(max_length = 16)
    dimension = models.IntegerField()

    remarks = models.CharField(max_length = 256)
    information_source = models.CharField(max_length = 64)
    data_source = models.CharField(max_length = 16)
    revision_date = models.DateField()

    change_id = models.CharField(max_length = 32)
    deprecated = models.BooleanField()

    def __str__ (self):
        return self.coord_sys_name