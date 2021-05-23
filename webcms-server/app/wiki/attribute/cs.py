from api import models
from .model import Attributes, Propretie

class Coordinate_System(Attributes):

  def __init__(self, code):
    self.coordinate_system = models.CoordinateSystem.objects.get(coord_sys_code = code)
        
  def _get_propreties(self):
    return [

            Propretie(
                      'Type',
                      self.coordinate_system.coord_sys_type,
                      ),

            Propretie(
                      'Dimension',
                      self.coordinate_system.dimension,      
                      ),

            Propretie(
                      'Remarks',
                      self.coordinate_system.remarks,      
                      ),

            Propretie(
                      'Information source',
                      self.coordinate_system.information_source,      
                      ),

            Propretie(
                      'Data source',
                      self.coordinate_system.data_source,      
                      ),

            Propretie(
                      'Revision date',
                      self.coordinate_system.revision_date,      
                      ),
            ]

  def _get_name(self) -> str:
    return self.coordinate_system.coord_sys_name

  def _is_deprecated(self) -> bool:
    return self.coordinate_system.deprecated
