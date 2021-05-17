from django.db import models

class CoordinateOperation(models.Model):

    coord_op_code = models.IntegerField()
    coord_op_name = models.CharField(max_length = 128)
    coord_op_type = models.CharField(max_length = 32)

    source_crs_code = models.IntegerField(null=True)
    target_crs_code = models.IntegerField(null=True)
    coord_tfm_version = models.CharField(max_length = 32, null=True)
    coord_op_variant = models.IntegerField(null=True)

    area_of_use_code = models.IntegerField(null=True)
    coord_op_scope = models.CharField(max_length = 256, null=True)
    coord_op_accuracy = models.CharField(max_length = 32, null=True)
    coord_op_method_code = models.IntegerField(null=True)

    uom_code_source_coord_diff = models.IntegerField(null=True)
    uom_code_target_coord_diff = models.IntegerField(null=True)
    remarks = models.CharField(max_length = 256, null=True)
    information_source = models.CharField(max_length = 256, null=True)
    data_source = models.CharField(max_length = 16, null=True)

    revision_date = models.DateField()
    change_id = models.CharField(max_length = 128)
    show_operation = models.BooleanField()
    deprecated = models.BooleanField()

    def __str__(self):
        return self.coord_op_name