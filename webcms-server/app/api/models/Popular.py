from django.db import models
from .CoordinateReferenceSystem import CoordinateReferenceSystem 

class Popular(models.Model):
    crs = models.ForeignKey(CoordinateReferenceSystem, on_delete=models.CASCADE)

    def __str__(self):
        return self.crs.coord_ref_sys_name