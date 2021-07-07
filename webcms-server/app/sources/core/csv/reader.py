import csv

from asgiref.sync import sync_to_async

class buildFromCSV():

    def __init__(self, request, builder):
        file = request.FILES.get("csv_file", None)
        self.author = request.user.username
        try:
            self.table = csv.DictReader(file.read().decode('latin-1').split('\n'), delimiter=' ', quotechar='|')
        except AttributeError:
            return None
        
        self.builder = builder
        self.build()
    
    def build(self):
        for row in self.table:
            self.builder({**row, **{'author':self.author}})