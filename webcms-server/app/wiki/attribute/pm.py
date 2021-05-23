from api import models
from .model import Attributes, Propretie

class Prime_Meridian(Attributes):

  def __init__(self, code):
      self.prime_meridian = models.PrimeMeridian.objects.get(prime_meridian_code = code)

  def _get_propreties(self):
    return [
            Propretie(
                      'Longitude',
                      self.prime_meridian.greenwich_longitude,
                      ),

            Propretie(
                      'Remarks',
                      self.prime_meridian.remarks,
                      ),

            Propretie(
                      'Information source',
                      self.prime_meridian.information_source,
                      ),

            Propretie(
                      'Revision date',
                      self.prime_meridian.information_source,
                      ),
          ]

  def _get_name(self) -> str:
    return self.prime_meridian.prime_meridian_name

  def _is_deprecated(self) -> bool:
    return self.prime_meridian.deprecated