from django.contrib.gis.gdal import CoordTransform
from django.contrib.gis.geos import Point
from .fields import PointInSpatialReference

class TransformPoint():

    def __transform_crs(self) -> Point:
        try:
            position = Point(self._source_point.get_coordinates())
            position.transform(CoordTransform(self._source_point.crs, self._target_point.crs))
            return position
        except:
            raise Exception("Transformation is imposible")
        
    def _get_transform_point(self) -> Point:
        return self.__transform_crs()

    def _get_transform_point_values(self) -> tuple:
        return (round(num, 8) for num in self.__transform_crs().tuple) 

class PointConversion(TransformPoint):
    def __init__(self, context:dict):
        self._source_point = PointInSpatialReference(context.get("s_crs"),
                                                    context.get("source_x"),
                                                    context.get("source_y"),
                                                    context.get("source_z"))

        self._target_point = PointInSpatialReference(context.get("t_crs"))
        self._context = context
        self._context['target_x'], self._context['target_y'], self._context['target_z'] = self._get_transform_point_values()
    
    def _get_context(self) -> dict:
        return self._context

    def get_converted_point_context(self) -> dict:
        return self._get_context()

    def _get_target_values(self) -> dict:
        return {
                'x':self._context['target_x'], 
                'y':self._context['target_y'],
                'z':self._context['target_z'], 
                }

    def get_target_values(self) -> dict:
        return self._get_target_values()