from django.contrib import admin

from ..models import Region

from .Link import LinkAdmin
from .Report import ReportAdmin

admin.site.register(Region)