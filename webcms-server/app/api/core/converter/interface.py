from .fields import FilterField

class PointInSpatialReference (FilterField):

    def __init__(self, crs:int, x="0.0", y="0.0", z="0.0"):
        self.crs = int(crs)
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

