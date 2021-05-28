import json

from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response

from .core.converter.interface import PointConversionInterface
from .core.search.search import CoordinateReferenceSystemSearch

from .models.Popular import Popular
from .interfaces import CoordinateReferenceSystemInterface

def render_page(func):
    def wrapper(self, request):
        try:
            responce = func(self=self, request=request)
            return Response(responce)
        except Exception as e:
            return HttpResponse(e, status=404)
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

class Transform(APIView):
    
    @render_page
    def get(self, request):
        self.context = PointConversionInterface({
                                            "s_crs":request.GET.get("s_crs"),
                                            "t_crs":request.GET.get("t_crs"),
                                            "source_x":request.GET.get("source_x", "0"),
                                            "source_y":request.GET.get("source_y", "0"),
                                            "source_z":request.GET.get("source_z", "0"),
                                        })

        return self.__get_responce()

    def __get_responce(self) -> dict:
        try:
            return self.context.get_target_values()
        except Exception as e:
            raise e

class Search(APIView):

    @render_page
    def get(self, request, format=None):
        if ((qwest:=request.GET.get('q'))==None): 
            raise Exception ("Can't find anything for empty request")
        
        self.context = CoordinateReferenceSystemSearch(qwest)
        return self.__get_responce()

    def __get_responce(self) -> dict:
        try:
            return  {
                        'epsg_exist': True,
                        'find': len(self.context),
                        'findCRS': self.__get_crs_list(),
                    }
        except:
            return {
                        'epsg_exist': False,
                    }

    def __get_crs_list(self) -> dict:
        for i in self.context.get_list_of_find():
            yield {
                    'code':i.coord_ref_sys_code,
                    'name':i.coord_ref_sys_name,
                    'area':i.area_name,
                }

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
        return self.__get_responce()

    def __get_responce(self) -> dict:
        return {self.__get_crs_list()}
    
    def __get_crs_list(self) -> dict:
        for i in Popular.objects.all():
            yield {
                    'code':i.crs.coord_ref_sys_code,
                    'name':i.crs.coord_ref_sys_name,
                    'area':i.crs.area_name,
                }