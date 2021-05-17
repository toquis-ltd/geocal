from .conversion import PointConverter
from .fields import FilterField

class PointInSpatialReference (FilterField):

    def __init__(self, crs:int, x="0.0", y="0.0", z="0.0"):
        self.crs = self._get_spatial_reference(crs)
        self._x = x
        self._y = y
        self._z = z
        self._set_coordinates_to_acceptable_format()

    def _set_coordinates_to_acceptable_format(self):
        """This function's converting point xyz coordinates to float values,
           if value can't be converted to flaot value become 0"""
        self._x = self._get_decimal_value(self._x)
        self._y = self._get_decimal_value(self._y)
        self._z = self._get_decimal_value(self._z)
    
    def _get_coordinates(self) -> tuple:
        return self._x, self._y, self._z
        
    def get_coordinates(self) -> tuple:
        """This function's retunrning points xyz or lat, long, alt coordinates as a tuple"""
        return self._get_coordinates()
    
    def set_coordinates(self, coord:tuple):
        self._x = coord[0]
        self._y = coord[1]
        self._z = coord[2]
    
    def _get_coordinate_dict(self) -> dict:
        return {
                'x':self._x,
                'y':self._y,
                'z':self._z 
                }

class PointConversionInterface (PointConverter):
    def __init__(self, context:dict):
        self._source_point = PointInSpatialReference(
                                                        context.get("s_crs"),
                                                        context.get("source_x"),
                                                        context.get("source_y"),
                                                        context.get("source_z")
                                                    )
        self._target_point = PointInSpatialReference(context.get("t_crs"))
        self._target_point.set_coordinates(self._get_transform_point_values())
    
    def get_target_values(self) -> dict:
        return self._target_point._get_coordinate_dict()