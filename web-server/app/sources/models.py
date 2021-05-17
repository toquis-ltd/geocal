from django.db import models
from django.utils import timezone

class Link(models.Model):
    
    site_name = models.CharField(max_length = 64)
    site_discription = models.TextField(max_length=3072)
    site_address = models.URLField()
    author = models.CharField(max_length=32)
    date = models.DateField(default=timezone.now)
    is_verified = models.BooleanField()

    def __str__(self):
        return self.site_name

class Report(models.Model):

    site = models.ForeignKey('Link', on_delete=models.CASCADE)
    problem = models.TextField(max_length=300, null=True, blank=True)
    author = models.CharField(max_length=32)
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.site.site_name