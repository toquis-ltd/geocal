from django.db import models

class NamingSystem(models.Model):

    naming_system_code = models.IntegerField()
    naming_system_name = models.CharField(max_length = 56)
    remarks = models.CharField(max_length = 256)
    information_source = models.CharField(max_length = 64)

    data_source = models.CharField(max_length = 16)
    revision_date = models.DateField()
    change_id = models.CharField(max_length = 24)
    deprecated = models.BooleanField()

    def __str__(self):
        return self.naming_system_name