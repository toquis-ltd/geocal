import os
import shutil

from pyproj import CRS, transformer
import pandas as pd
import geopandas as gpd
import fiona

from ..types.file import FileFormatEnum
from ..types.comm import TransformatioDef

from .comm import ABSTransformation

# By default, this file formats are disabled. 
# This allow fiona to transform this formats.
fiona.drvsupport.supported_drivers['KML'] = 'rw'
fiona.drvsupport.supported_drivers['GML'] = 'rw'
fiona.drvsupport.supported_drivers['GPX'] = 'rw'

class FileCoordinateTransformation(ABSTransformation):
    def __init__(self, gdf:gpd.GeoDataFrame, transformation:TransformatioDef) -> None:
        super().__init__(transformation)
        self.gdf = gdf.rename(columns=str.lower)
        self.gdf.crs = CRS.from_user_input(transformation.pipeline[0])
    
    def load_geometry(self):
        if 'lat' in self.gdf.columns:
            try:
                self.gdf.geometry = gpd.points_from_xy(self.gdf['lon'], self.gdf['lat'], self.gdf['z'])
            except:
                self.gdf.geometry = gpd.points_from_xy(self.gdf['lon'], self.gdf['lat'])
        elif 'x' in self.gdf.columns:
            try:
                self.gdf.geometry = gpd.points_from_xy(self.gdf['x'], self.gdf['y'], self.gdf['z'])
            except:
                self.gdf.geometry = gpd.points_from_xy(self.gdf['x'], self.gdf['y'])
        else:
            print('direct geometry load')

    def transformation(self):
        is_3d = False
        df = pd.DataFrame()

        self.load_geometry()

        df['x'], df['y'] = self.gdf.geometry.x, self.gdf.geometry.y

        if self.gdf.geometry.has_z[1]:
            df['z'] = self.gdf.geometry.z
            is_3d = True

        for source, target in self._iter_transformation_pipeline(self.pipeline):
            func = transformer.TransformerGroup(source, target).transformers[self.pipe_id[self.pipeline.index(source)]]
            if is_3d:
                df['x'], df['y'], df['z'] = func.transform(df['x'].to_list(), df['y'].to_list(), df['z'].to_list())
            else:
                df['x'], df['y'] = func.transform(df['x'].to_list(), df['y'].to_list())
                

        if CRS.from_user_input(self.pipeline[-1]).axis_info[0].unit_name == "degree":
            self.gdf['lat_out'], self.gdf['lon_out'] = df['x'], df['y']
        else:
            self.gdf['x_out'], self.gdf['y_out'] = df['x'], df['y']
        
        if is_3d: 
            self.gdf['z_out'] = self.gdf.geometry.z

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