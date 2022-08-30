import csv

from api.models import Datum

with open("crs.csv", "w") as file:
    writer = csv.writer(file)
    title = ["datum_name", "datum_code", "datum_type", "origin_description", "realization_epoch",
             "ellipsoid_code", "prime_meridian_code", "area_of_use_code", "datum_scope"]
    
    writer.writerow(title)
    for i in Datum.objects.all():
        line = [
                i.datum_name,
                i.datum_code,
                i.datum_type,
                i.origin_description,
                i.realization_epoch,
                i.ellipsoid_code,
                i.prime_meridian_code,
                i.area_of_use_code,
                i.datum_scope,
        ]
        writer.writerow(line)