#!/usr/bin/env python

from api.models import CoordinateReferenceSystem

list_of_all = CoordinateReferenceSystem.objects.all()

for i in list_of_all:
    if i._get_unity_of_measure() == None:
        i.delete()