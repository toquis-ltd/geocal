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


def load_geometry(gdf) -> gpd.GeoDataFrame:
    df = gpd.GeoDataFrame()

    if 'lat' in gdf.columns:
        try:
            df.geometry = gpd.points_from_xy(gdf['lon'], gdf['lat'], gdf['z'])
        except:
            df.geometry = gpd.points_from_xy(gdf['lon'], gdf['lat'])
    elif 'x' in gdf.columns:
        try:
            df.geometry = gpd.points_from_xy(gdf['x'], gdf['y'], gdf['z'])
        except:
            df.geometry = gpd.points_from_xy(gdf['x'], gdf['y'])
    else:
        df = df.set_geometry(gdf.geometry)
        print('direct geometry load')
    return df

class FileCoordinateTransformation(ABSTransformation):
    def __init__(self, gdf:gpd.GeoDataFrame, transformation:TransformatioDef) -> None:
        super().__init__(transformation)
        self.gdf = gdf.set_geometry(load_geometry(gdf.rename(columns=str.lower)).geometry)
        self.gdf.crs = CRS.from_user_input(transformation.pipeline[0])
    
    def transformation(self):
        for source, target in self._iter_transformation_pipeline(self.pipeline):
            func = transformer.TransformerGroup(source, target, always_xy=True).transformers[self.pipe_id[self.pipeline.index(source)]]
            self.__transform(func)

        return self._get_output_df()
    
    def __transform(self, t_func):
        df = pd.DataFrame()
        is_3d = False

        df['x'], df['y'] = self.gdf.geometry.x, self.gdf.geometry.y

        if self.gdf.geometry.has_z[1]:
            is_3d = True
            df['z'] = self.gdf.geometry.z

        if is_3d:
            df[['x', 'y', 'z']] = df.apply(
                                            lambda row: pd.Series(t_func.transform(row['x'], row['y'], row['z'])), 
                                            axis=1
                                            )
            self.gdf.geometry = gpd.points_from_xy(df['x'], df['y'], df['z'])
        else:
            df[['x', 'y']] = df.apply(
                                        lambda row: pd.Series(t_func.transform(row['x'], row['y'])),
                                        axis=1
                                    )
            self.gdf.geometry = gpd.points_from_xy(df['x'], df['y'])
    
    def _get_output_df(self):
        df = gpd.GeoDataFrame()
        
        if CRS.from_user_input(self.pipeline[-1]).axis_info[0].unit_name == "degree":
            df['lon'], df['lat']  = self.gdf.geometry.x, self.gdf.geometry.y
        else:
            df['x'], df['y'] = self.gdf.geometry.x, self.gdf.geometry.y
        
        if self.gdf.geometry.has_z[1]:
            df['z'] = self.gdf.geometry.z
        
        df = df.set_geometry(self.gdf.geometry)
        return df

class FileFormatTransformation:
    """This class wraps the transformation between files formats and manage files"""
    def __init__(self, gdf:gpd.GeoDataFrame, output_file_path:str, target_file_format:FileFormatEnum) -> None:
        self.gdf = gdf.set_geometry(load_geometry(gdf.rename(columns=str.lower)).geometry)
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
                self.gdf = self.gdf.drop('geometry', axis=1)
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