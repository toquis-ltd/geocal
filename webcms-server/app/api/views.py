import json

from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response

from .core.converter.interface import PointConversionInterface
from .core.search.search import CoordinateReferenceSystemSearch as CRSS
from .core.popular.popular import PopularCoordinateReferenceSystem as PCRS

from .interfaces import CoordinateReferenceSystemInterface

def render_page(func):
    def wrapper(self, request):
        responce = func(self=self, request=request)
        return Response(responce)
    return wrapper

class About(APIView):

    @render_page
    def get(self, request, format=None):
        self.context = CoordinateReferenceSystemInterface(request.GET.get('code'))
        return self.__get_responce()

    def __get_responce(self):
        try:
            return {
                        'code': self.context.get_code(),
                        'name': self.context.get_name(),
                        'bounds': self.context.get_bounds(),
                        'unityOfMeasure': self.context.get_unity_of_measure(), 
                    }
        except:
            raise Exception ("About API error in message composing")
   
class Search(APIView):

    @render_page
    def get(self, request, format=None):
        return CRSS(request).get()


class Globe(APIView):
    @render_page
    def get(self, request, format=None):
        try:
            with open(f'json_files/{request.GET.get("region")}.json', 'r') as data:
                return json.loads(data.read())
        except Exception as e:
            raise Exception("please select exsisting json")

class PopularCRS(APIView):
           
    @render_page
    def get(self, request, format=None):
        return PCRS(request).get() 
