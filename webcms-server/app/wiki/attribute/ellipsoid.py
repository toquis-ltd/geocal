from api import models
from .model import Attributes, Propretie

class Ellipsoid(Attributes):

  def __init__(self, code):
    self.ellipsoid = models.Ellipsoid.objects.get(ellipsoid_code = code)
        
  def _get_propreties(self):
      return [
              Propretie(
                        'Remarks',
                        self.ellipsoid.remarks          
                        ),

              Propretie(
                        'Flattening (ellipticity)',
                        self.ellipsoid.inv_flattening
                        ),

              Propretie(
                        'Semimajor axis',
                        self.ellipsoid.semi_major_axis
                        ),

              Propretie(
                        'Information source',
                        self.ellipsoid.information_source
                        ),

              Propretie(
                        'Date source',
                        self.ellipsoid.data_source
                        ),
            ]

  def _get_name(self) -> str:
    return self.ellipsoid.ellipsoid_name

  def _is_deprecated(self) -> bool:
    return self.ellipsoid.deprecated