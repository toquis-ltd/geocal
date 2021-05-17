from django.db import models

class PrimeMeridian(models.Model):

    prime_meridian_code = models.IntegerField()
    prime_meridian_name = models.CharField(max_length = 24)
    greenwich_longitude = models.CharField(max_length = 24)
    uom_code = models.IntegerField()

    remarks = models.CharField(max_length = 256)
    information_source =  models.CharField(max_length = 64)
    data_source = models.CharField(max_length = 24)
    revision_date = models.DateField()
    
    change_id = models.CharField(max_length = 32)
    deprecated = models.BooleanField()

    def __str__(self):
        return self.prime_meridian_name