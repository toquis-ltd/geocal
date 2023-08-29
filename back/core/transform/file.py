import os
import shutil

from typing import Sequence

from pyproj import CRS

import geopandas as gpd
import fiona

from ..types.file import FileFormatEnum

# By default, this file formats are disabled. 
# This allow fiona to transform this formats.
fiona.drvsupport.supported_drivers['KML'] = 'rw'
fiona.drvsupport.supported_drivers['GML'] = 'rw'
fiona.drvsupport.supported_drivers['GPX'] = 'rw'


class FileCoordinateTransformation:
    def __init__(self, gdf:gpd.GeoDataFrame, pipeline:Sequence[int]) -> None:
        self.gdf = gdf.rename(columns=str.lower)
        self.pipeline = pipeline
        self.gdf.crs = CRS.from_user_input(pipeline[0])

    def transformation(self):
        try:
            self.gdf.geometry = gpd.points_from_xy(self.gdf['x'], self.gdf['y'], self.gdf['z'])
        except:
            self.gdf.geometry = gpd.points_from_xy(self.gdf['x'], self.gdf['y'])
        
        for i in self.pipeline[1:]:
            self.gdf = self.gdf.to_crs(i)
        
        if self.gdf.geometry.has_z[1]:
            self.gdf['Height'] = self.gdf.geometry.z

        if CRS.from_user_input(self.pipeline[-1]).axis_info[0].unit_name == "degree":
            self.gdf['Lat'], self.gdf['Long'] = self.gdf.geometry.x, self.gdf.geometry.y
        else:
            self.gdf['X_OUT'], self.gdf['Y_OUT'] = self.gdf.geometry.x, self.gdf.geometry.y

        return self.gdf
        
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
                
                self.gdf.to_file(self.output_path, driver='ESRI Shapefile', schema={"properties": {"time": "str", "datetime": "str"}})
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