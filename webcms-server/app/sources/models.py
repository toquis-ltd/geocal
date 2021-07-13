from django.db import models
from django.utils import timezone

class Region(models.Model):
    name = models.CharField(max_length=128)
    
    def __str__(self):
        return self.name

class Link(models.Model):
    
    address = models.URLField()
    name = models.CharField(max_length = 128)
    region = models.ForeignKey('Region', on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(max_length=3072, null=True, blank=True)
    author = models.CharField(max_length=32)
    date = models.DateField(default=timezone.now)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Report(models.Model):

    site = models.ForeignKey('Link', on_delete=models.CASCADE)
    problem = models.TextField(max_length=300, null=True, blank=True)
    author = models.CharField(max_length=32)
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.site.name