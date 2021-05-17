from django.db import models

class UnityOfMeasure(models.Model):  

    uom_code = models.IntegerField()
    unit_of_meas_name = models.CharField(max_length = 64)
    unit_of_meas_type = models.CharField(max_length = 16)
    target_uom_code = models.IntegerField()

    factor_b = models.CharField(max_length = 16)
    factor_c = models.CharField(max_length = 32)
    remarks = models.CharField(max_length = 256)
    information_source = models.CharField(max_length = 256)

    data_source =  models.CharField(max_length = 16)
    revision_date = models.DateField()
    change_id = models.CharField(max_length = 64)
    deprecated = models.BooleanField()

    def __str__(self):
        return self.unit_of_meas_name