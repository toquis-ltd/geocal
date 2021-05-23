from api.interfaces import DatumInterface
from .model import Attributes, Propretie

class Datum(Attributes):

  def __init__(self, code):
    interface = DatumInterface(code)
    self.datum = interface.datum
    self.ellipsoid = interface.ellipsoid
    self.prime_meridian = interface.prime_meridian
    self.area = interface.area

    self.base_list = self._get_base_list()

  def _get_propreties(self):
    if (self.ellipsoid != None):
      self._add_ellipsoid()

    if (self.prime_meridian != None):
      self._add_prime_meridian()

    return self.base_list

  def _get_base_list(self):
    return [
            Propretie(
                      'Type',
                      self.datum.datum_type,
                      ),

            Propretie(
                      'Description',
                      self.datum.origin_description, 
                      ),

            Propretie(
                      'Information source',
                      self.area.information_source, 
                      ),

            Propretie(
                      'Revision date',
                      self.datum.revision_date,
                      ),

            Propretie(
                      'Area of use',
                      self.area.area_of_use,
                      ),

            Propretie(
                      'Remarks',
                      self.datum.remarks,
                      ),
          ]

  def _add_ellipsoid(self):
    self.base_list.insert(0, Propretie('Ellipsoid', self.ellipsoid.ellipsoid_name, self.ellipsoid.ellipsoid_code, 'wiki:Ellipsoid'))
  
  def _add_prime_meridian(self):
    self.base_list.insert(0, Propretie('Prime meridian', self.prime_meridian.prime_meridian_name,
                                        self.prime_meridian.prime_meridian_code, 'wiki:PrimeMeridian'))
  
  def _get_name(self) -> str:
    return self.datum.datum_name

  def _is_deprecated(self) -> bool:
    return self.datum.deprecated