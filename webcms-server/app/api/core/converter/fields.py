from re import match

from django.contrib.gis.gdal import SpatialReference

class FilterField():

    def _get_spatial_reference(self, value) -> SpatialReference:
        """This funcion return the coordinate referance from hostmachine database
            else raise exeption"""
        try:
            return SpatialReference(value)
        except Exception as e:
            raise Exception(f'{value} coordinate system doesn\'t exist in our library')

    def _get_decimal_value(self, value) -> float:
        """ This function is filtering value, filter's overlook digits and '-' and '.' and ','
            if the resolve can be convert to float return value else raise exception.
            Should be protected from float null values"""
        
        try:
            return float(value)
        except:
            filtred_value = match(r"((^[-]|[.]|\d)+(?:\.\d+)?)", value.replace(",", "."))
            if filtred_value != None:
                return float(filtred_value[1])

        raise Exception('Wrong value input')