from django.db.models import Q

from ...models import Link, Report, Region

class LinkFab:
    def __init__(self, item):
        
        name = item.get('name')
        url = item.get('url')
        description = item.get('description')
        region = item.get('region')
        author = item.get('author')

        self.region, _   = Region.objects.get_or_create(name=region)
        if _:
            self.region.save()
 
        obj = Region.objects.filter(name=name)
        if obj != None:
            Report(broken_link)
        
        res = Link(name=name, address=url, description=description, region=self.region, author=author, is_verified=False)
        res.save()