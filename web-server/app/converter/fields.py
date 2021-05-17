from django.contrib.gis.gdal import SpatialReference
import re

class InputField():
    def _get_spatial_reference(self, value) -> SpatialReference:
        try:
            return SpatialReference(value)
        except Exception as e:
            raise Exception(f'{value} coordinate system doesn\'t exist in our library')

class FilterField():
    def _get_desimal_value(self, value) -> float:
        """ This function is filtering value, filter's overlook digits and '-' and '.' and ','
            if the resolve can be convert to float return value else raise exception"""
        
        # need to protect from float null value
        try:
            return float(value)
        except:
            filtred_value = re.match(r"((^[-]|[.]|\d)+(?:\.\d+)?)", value.replace(",", "."))
            if filtred_value != None:
                return float(filtred_value[1])

        raise Exception('Wrong value input')
        
class PointInSpatialReference(InputField, FilterField):

    def __init__(self, crs:int, x="0.0", y="0.0", z="0.0"):
        self.crs = self._get_spatial_reference(crs)
        self._x = x
        self._y = y
        self._z = z
        self._set_coordinates_to_acceptable_format()

    def _set_coordinates_to_acceptable_format(self):
        """This function's converting point xyz coordinates to float values,
           if value can't be converted to flaot value become 0"""
        self._x = self._get_desimal_value(self._x)
        self._y = self._get_desimal_value(self._y)
        self._z = self._get_desimal_value(self._z)
    
    def _get_coordinates(self) -> tuple:
        try:
            return self._x, self._y, self._z
        except:
            raise Exception("Can't define data format")
    
    def get_coordinates(self) -> tuple:
        """This function's retunrning points xyz or lat, long, alt coordinates as a tuple"""
        return self._get_coordinates()