from django.contrib.gis.gdal import CoordTransform
from django.contrib.gis.geos import Point

class PointConverter():

    def __transform_crs(self) -> Point:
        try:
            target_point = Point(self._source_point.get_coordinates()) #point creation
            target_point.transform(CoordTransform(self._source_point.crs, self._target_point.crs)) #point get it's positions
            return target_point
        except:
            raise Exception("Transformation is imposible")
        
    def _get_transform_point(self) -> Point:
        return self.__transform_crs()
    
    def _get_transform_point_pure(self) -> tuple:
        """This function retunr target point values"""
        return self.__transform_crs().tuple
    
    def _get_transform_point_values(self) -> tuple:
        """ This function return tuple of target point values
            also arounding value to 8th digit"""
        return tuple(round(num, 8) for num in self._get_transform_point_pure())