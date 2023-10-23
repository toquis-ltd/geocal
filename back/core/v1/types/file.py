from enum import Enum
from typing import Sequence

from .comm import TransformatioDef

class FileFormatEnum(str, Enum):
    shp = 'shp'
    csv  = 'csv'
    geojson = 'geojson'
    kml  = 'kml'
    gml = 'gml'
    gpx = 'gpx'
    tif  ='tif'
    nc  = 'nc'

class FileTransformatioDef(TransformatioDef):
    file_format:FileFormatEnum
    pipeline:Sequence[int]
    pipe_ids:Sequence[int]