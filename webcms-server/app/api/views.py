from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .core.converter.interface import PointConversionInterface
from .core.search.search import CoordinateReferenceSystemSearch as CRSS
from .core.popular.popular import PopularCoordinateReferenceSystem as PCRS
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
    return Response(message)

@api_view(['GET'])
def get_transform(request):
    try:
        transformation = PointConversionInterface({
                                                "s_crs":request.GET.get("s_crs"),
                                                "t_crs":request.GET.get("t_crs"),
                                                "source_x":request.GET.get("x", "0"),
                                                "source_y":request.GET.get("y", "0"),
                                                "source_z":request.GET.get("z", "0"),
                                            })

        response = transformation.get_target_values()
        return Response(response)
    except:
        return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)