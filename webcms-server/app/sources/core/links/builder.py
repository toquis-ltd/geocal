from django.db.models import Q

from ...models import Link, Report, Region

class LinkFab:
    def __init__(self, item):
        
        name = item.get('name')
        url = item.get('url')
        description = item.get('description')
        region = item.get('region')
        author = item.get('author')

        self.region, _ = Region.objects.get_or_create(name=region)
        if _:
            self.region.save()

        res, _ = Link.objects.get_or_create(
                                    name=name, 
                                    address=url, 
                                    description=description, 
                                    region=self.region, 
                                    author=author,
                                    is_verified=False)
        try:
            link = Link.objects.get(
                                Q(name=name) |
                                Q(address=url) |
                                Q(description=description), 
                                is_verified=True
                            )
            Report(site=link, problem=f'{link.name} has duplication problem with {res.name}', author='bot').save()
        except Link.DoesNotExist:
            pass

        res.save()