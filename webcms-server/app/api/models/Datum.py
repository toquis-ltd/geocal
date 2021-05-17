from django.db import models

class Datum(models.Model):

    datum_code = models.IntegerField()
    datum_name = models.CharField(max_length = 128)
    datum_type = models.CharField(max_length = 16)
    origin_description =  models.CharField(max_length = 256)
    
    realization_epoch = models.DateField(null=True, blank=True)
    ellipsoid_code =  models.IntegerField(null=True, blank=True)
    prime_meridian_code =  models.IntegerField(null=True, blank=True)
    area_of_use_code =  models.IntegerField(null=True, blank=True)
    
    datum_scope = models.CharField(max_length = 256, blank=True)
    remarks = models.CharField(max_length = 256, blank=True)
    information_source = models.CharField(max_length = 256, blank=True)
    data_source = models.CharField(max_length = 16, blank=True)
    
    revision_date = models.DateField(blank=True)
    change_id = models.CharField(max_length = 128)
    deprecated = models.BooleanField()

    def __str__(self):
        return self.datum_name