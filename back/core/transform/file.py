import os
import shutil

from enum import Enum

import geopandas as gpd
import fiona

# By default, this file formats are disabled. 
# This allow fiona to transform to them.
fiona.drvsupport.supported_drivers['KML'] = 'rw'
fiona.drvsupport.supported_drivers['GML'] = 'rw'
fiona.drvsupport.supported_drivers['GPX'] = 'rw'


class FileCoordinateTransformation:
    pass

class FileFormatEnum(str, Enum):
    shp = 'shp',
    csv  = 'csv'
    geojson = 'geojson',
    kml  = 'kml',
    gml = 'gml',
    gpx = 'gpx',
    tif  ='tif',
    nc  = 'nc',

class FileFormatTransformation:
    """This class wraps the transformation between files formats and manage files"""
    def __init__(self, gdf:gpd.GeoDataFrame, output_file_path:str, target_file_format:FileFormatEnum) -> None:
        self.gdf = gdf
        self.output_path = output_file_path
        self.target_file_format = target_file_format
    
    def transformation(self):
        self.mk_output_dir()

        match self.target_file_format:
            case self.target_file_format.shp:
                self.gdf.to_file(self.output_path, driver='ESRI Shapefile')
            case self.target_file_format.geojson:
                self.gdf.to_file(self.output_path+'/mapless.geojson', driver='GeoJSON')
            case self.target_file_format.kml:
                self.gdf.to_file(self.output_path+'/mapless.kml', driver='KML')
            case self.target_file_format.gml:
                self.gdf.to_file(self.output_path+'/mapless.gml', driver='GML')
            case self.target_file_format.gpx:
                self.gdf.to_file(self.output_path+'/mapless.gpx', driver='GPX')
            case self.target_file_format.csv:
                self.gdf = self.gdf.set_geometry('geometry')
                self.gdf.to_csv(self.output_path+'/mapless.csv', index=False)
            
            ### They are not working
            case [ self.target_file_format.nc  | self.target_file_format.tif ]:
                raise "Can't Transformat for the moment into this formats"
    
    def mk_output_dir(self):
        #create ouput file directory
        try:
            os.mkdir(f'{self.output_path}')
        except:
            shutil.rmtree(f'{self.output_path}')
            os.mkdir(f'{self.output_path}')