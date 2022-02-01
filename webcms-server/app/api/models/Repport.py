from django.db import models

class Repport(models.Model):
    subject = models.CharField(max_length=256)
    email = models.EmailField()
    message = models.TextField()
    
    def __str__(self):
        return self.subject