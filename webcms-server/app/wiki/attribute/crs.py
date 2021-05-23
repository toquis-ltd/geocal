from api.interfaces import CoordinateReferenceSystemInterface
from .model import Attributes, Propretie

class Coordinate_Reference_System(Attributes):
    
  def __init__(self, code):
    self.crs = CoordinateReferenceSystemInterface(code)
    self.gcrs = self.crs.get_geodetic_coordinate_reference_system()
    self.area = self.crs.get_area()
    self.coordinate_system = self.crs.get_coordinate_system()

    self.datum = self.crs.get_datum()
    self.ellipsoid = self.crs.get_ellipsoid()
    self.prime_meridian = self.crs.get_primem_meridian()
    self.unit_of_measure = self.crs.get_unity_of_measure()

    self.base_list = self._get_base_list()
        
  def _get_propreties(self):
    if (self.datum != None):
      self._add_datum()

    if (self.coordinate_system != None):
      self._add_cs()
    
    return self.base_list

  def _get_base_list(self):
    return [
                Propretie(
                          'Unit',
                          f'{self.unit_of_measure}',
                          ),

                Propretie(
                          'Geodetic CRS',
                          self.gcrs.coord_ref_sys_name,
                          self.gcrs.coord_ref_sys_code,
                          'wiki:CoordinateReferenceSystem'
                          ),

                Propretie(
                          'Date source',
                          self.crs.get_data_source()
                          ),

                Propretie(
                          'Revision date',
                          self.crs.get_revision_date()
                          ),

                Propretie(
                          'Area of use', 
                          self.area.area_of_use
                          ),

                Propretie(
                          'Remarks',
                          self.crs.get_remarks()
                          ),

                Propretie(
                          'WGS84 bounds', 
                          f'''<div style="width: 200px; height: 100px;">
                          {self.area.area_west_bound_lon} {self.area.area_south_bound_lat}<br/>
                          {self.area.area_east_bound_lon} {self.area.area_north_bound_lat}</div>'''
                          ),
            ]

  def _add_datum(self):
      self.base_list.insert(2, Propretie('Datum', self.datum.datum_name, self.datum.datum_code, 'wiki:Datum'))
      
      if (self.ellipsoid != None):
        self.base_list.insert(3, Propretie('Ellipsoid', self.ellipsoid.ellipsoid_name, self.ellipsoid.ellipsoid_code, 'wiki:Ellipsoid'))

      if (self.prime_meridian != None):
        self.base_list.insert(4,  Propretie('Prime Meridian', 
                                          self.prime_meridian.prime_meridian_name,
                                          self.prime_meridian.prime_meridian_code, 
                                          'wiki:PrimeMeridian'))

  def _add_cs(self):
    self.base_list.insert(5, Propretie('Coordinate system', 
                                        self.coordinate_system.coord_sys_name,
                                        self.coordinate_system.coord_sys_code,
                                        'wiki:CoordinateSystem'))

  def _get_name(self) -> str:
    return f'EPSG:{self.crs.get_code()}'
  
  def _get_description(self) -> str:
    return self.crs.get_name()

  def _is_deprecated(self) -> bool:
    return self.crs.is_deprecated()
  