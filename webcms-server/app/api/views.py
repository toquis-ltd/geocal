import json

from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response

from .core.converter.interface import PointConversionInterface
from .core.search.search import CoordinateReferenceSystemSearch
from .core.service.interface import Service

from .models.Popular import Popular
from .interfaces import CoordinateReferenceSystemInterface

def render_page(func):
    def wrapper(self, request):
        # try:
            responce = func(self=self, request=request)
            return Response(responce)
        # except Exception as e:
        #     return HttpResponse(e, status=404)
    return wrapper

class About(APIView):

    @render_page
    def get(self, request, format=None):
        self.context = CoordinateReferenceSystemInterface(request.GET.get('code'))
        return self.__get_responce()

    def __get_responce(self):
        try:
            return {
                        'epsg_exist': True,
                        'message':{
                                    'code': self.context.get_code(),
                                    'name': self.context.get_name(),
                                    'bounds': self.context.get_bounds(),
                                    'unityOfMeasure': self.context.get_unity_of_measure(), 
                                  },
                    }
        except:
            raise Exception ("About API error in message composing")
   
class Search(APIView):

    @render_page
    def get(self, request, format=None):
        # try:
        return CoordinateReferenceSystemSearch(request).get()
        # except:
        #     return {
        #             'epsg_exist': False,
        #         }

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
        get_item = lambda item:{
                    'code':item.crs.coord_ref_sys_code,
                    'name':item.crs.coord_ref_sys_name,
                    'area':item.crs.area_name,
                    'unityOfMeasure': CoordinateReferenceSystemInterface(item.crs.coord_ref_sys_code).get_unity_of_measure(), 
                }
        find_popular_crs = list(map(get_item, Popular.objects.all()))
        return [find_popular_crs]