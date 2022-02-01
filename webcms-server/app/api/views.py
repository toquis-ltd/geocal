from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .core.converter.conversion import Conversion, PointConversion
from .core.search.search import CoordinateReferenceSystemSearch as CRSS
from .core.repport import CreateRepport 
from .core.mail import IssueRepportMail
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

@api_view(['POST'])
def get_repport(request):
    CreateRepport(request.data)
    IssueRepportMail(request.data)
    return Response('ok')

@api_view(['GET'])
@dependency_injection(service=PCRS)
def get_popular(message):
    return Response(message)

@api_view(['GET'])
@dependency_injection(service=About)
def get_about(message):
    return Response(message)

@api_view(['GET'])
def get_transform_list(request):
    transformation = Conversion({"s_crs":request.GET.get("source"), "t_crs":request.GET.get("target")})
    response = transformation.get_transformation_list()
    return Response(response)

@api_view(['GET'])
def get_deftransform(request):
    transformation = Conversion({"s_crs":request.GET.get("source"), "t_crs":request.GET.get("target")})
    response = transformation.get_transformation_name()
    return Response(response)

@api_view(['POST'])
def get_transform(request):
    transformation = PointConversion({
                                            "s_crs":request.data.get("s_crs"),
                                            "t_crs":request.data.get("t_crs"),
                                            "source_x":request.data.get("x", "0"),
                                            "source_y":request.data.get("y", "0"),
                                            "source_z":request.data.get("z", "0"),
                                            'proj':request.data.get("proj", None),
                                        })
    
    response = transformation.get_target_values()
    return Response(response)