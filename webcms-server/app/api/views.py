from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .core.search.search import CoordinateReferenceSystemSearch as CRSS
from .core.popular.popular import PopularCoordinateReferenceSystem as PCRS
from .core.proj4.proj4 import Proj4
from .core.about.about import About

def dependency_injection(*args, **kwargs):
    service = kwargs.get('service')
    def wrapper(func):
        def inner(request):
            nonlocal service
            try:
                message = service(request).get()
            except Exception as e:
                return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            return func(message)
        return inner
    return wrapper

@api_view(['GET'])
@dependency_injection(service=Proj4)
def get_wkt(message):
    return Response(message)

@api_view(['GET'])
@dependency_injection(service=CRSS)
def get_search(message):
    return Response(message)

@api_view(['GET'])
@dependency_injection(service=PCRS)
def get_popular(message):
    return Response(message)

@api_view(['GET'])
@dependency_injection(service=About)
def get_about(message):
    return Response()