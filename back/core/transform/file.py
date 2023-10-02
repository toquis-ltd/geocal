import os
import shutil

from pyproj import CRS, transformer

import geopandas as gpd
import pandas as pd
import fiona

from ..types.file import FileFormatEnum
from ..types.comm import TransformatioDef, Unit

from .comm import ABSTransformation, load_geometry

# By default, this file formats are disabled. 
# This allow fiona to transform this formats.
fiona.drvsupport.supported_drivers['KML'] = 'rw'
fiona.drvsupport.supported_drivers['GML'] = 'rw'
fiona.drvsupport.supported_drivers['GPX'] = 'rw'

def mk_output_dir(path) -> None:
    #create ouput file directory
    try:
        os.mkdir(f'{path}')
    except:
        shutil.rmtree(f'{path}')
        os.mkdir(f'{path}')

class FileCoordinateTransformation(ABSTransformation):
    def __init__(self, gdf:gpd.GeoDataFrame, transformation:TransformatioDef) -> None:
        super().__init__(transformation)
        self.gdf = load_geometry(gdf.rename(columns=str.lower))
    
    def transformation(self) -> gpd.GeoDataFrame:
        for source, target in self._iter_transformation_pipeline(self.pipeline):
            func = transformer.TransformerGroup(source, target, always_xy=True).transformers[self.pipe_id[self.pipeline.index(source)]]
            self.__transform(func)
            print(self.gdf)
        return self._get_output_df()
    
    def __transform(self, t_func) -> None:
        df = pd.DataFrame()
        df['x'], df['y'] = self.gdf.x, self.gdf.y

        if self.gdf.has_z[0]:
            df['z'] = self.gdf.z
            self.gdf[['x', 'y', 'z']] = df.apply(
                                            lambda row: pd.Series(t_func.transform(row['x'], row['y'], row['z'])), 
                                            axis=1
                                            )
            self.gdf['geometry'] = gpd.points_from_xy(df['x'], df['y'], df['z'])
        else:
            self.gdf[['x', 'y']] = df.apply(
                                        lambda row: pd.Series(t_func.transform(row['x'], row['y'])),
                                        axis=1
                                    )
            self.gdf['geometry'] = gpd.points_from_xy(df['x'], df['y'])
    
    def _get_output_df(self) -> pd.DataFrame:
        df = pd.DataFrame()
        output_unit = CRS.from_user_input(self.pipeline[-1]).axis_info[0].unit_name
        if output_unit == Unit.DEGREE.value or output_unit == Unit.GRAD.value:
            df['lon'], df['lat']  = self.gdf.x, self.gdf.y
        else:
            df['x'], df['y'] = self.gdf.x, self.gdf.y
        if self.gdf.has_z[0]:
            df['z'] = self.gdf.z
        print("--"*20, df)
        return df

class FileFormatTransformation:
    """This class wraps the transformation between files formats and manage files"""
    def __init__(self, gdf:gpd.GeoDataFrame, target_file_format:FileFormatEnum, output_file_path:str) -> None:
        self.gdf = load_geometry(gdf)
        self.output_path = output_file_path
        self.target_file_format = target_file_format
    
    def transformation(self) -> None:
        mk_output_dir(self.output_path)

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
        
        #compress it
        shutil.make_archive(f'{self.output_path}', 'zip', self.output_path)