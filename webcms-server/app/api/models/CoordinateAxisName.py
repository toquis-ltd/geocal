from django.db import models

class CoordinateAxisName(models.Model):

    coord_axis_name_code = models.IntegerField()
    coord_axis_name = models.CharField(max_length = 32)
    description = models.CharField(max_length = 256)
    remarks = models.CharField(max_length = 256)

    information_source = models.CharField(max_length = 128)
    data_source = models.CharField(max_length = 32)
    revision_date = models.DateField()
    change_id = models.CharField(max_length = 24)
    
    deprecated = models.BooleanField()

    def __str__(self):
        return self.coord_axis_name