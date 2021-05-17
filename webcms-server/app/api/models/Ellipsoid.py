from django.db import models

class Ellipsoid(models.Model):

    ellipsoid_code = models.IntegerField()
    ellipsoid_name = models.CharField(max_length = 64)
    semi_major_axis = models.CharField(max_length = 16)
    uom_code = models.IntegerField()

    inv_flattening = models.CharField(max_length = 16)
    semi_minor_axis = models.CharField(max_length = 16)
    ellipsoid_shape = models.BooleanField()
    remarks = models.CharField(max_length = 256)
    
    information_source = models.CharField(max_length = 256)
    data_source = models.CharField(max_length = 16)
    revision_date = models.DateField()
    change_id = models.CharField(max_length = 64)
    
    deprecated = models.BooleanField()

    def __str__(self):
        return self.ellipsoid_name