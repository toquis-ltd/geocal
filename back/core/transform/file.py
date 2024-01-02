import os
import shutil

from pyproj import CRS

import geopandas as gpd
import pandas as pd
import fiona

from ..types.file import FileFormatEnum
from ..types.comm import TransformatioDef, UnitEnum

from .comm import ABSTransformation, load_geometry, format_point

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
        for func in self._iter_transformation_pipeline():
            self.__transform(func)
        return self._get_output_df()
    
    def __transform(self, t_func) -> None:
        """This function does not change any colomn except geometry """
        df = pd.DataFrame()
        df['x'], df['y'] = self.gdf.geometry.x, self.gdf.geometry.y
        
        if self.gdf.has_z[0]:
            df['z'] = self.gdf.geometry.z
            df[['x', 'y', 'z']] = df.apply(
                                            lambda row: pd.Series(t_func.transform(row['x'], row['y'], row['z'])), 
                                            axis=1
                                            )
            self.gdf['geometry'] = gpd.points_from_xy(df['x'], df['y'], df['z'])
            return
        
        df[['x', 'y']] = df.apply(
                                    lambda row: pd.Series(t_func.transform(row['x'], row['y'])),
                                    axis=1
                                )
        self.gdf['geometry'] = gpd.points_from_xy(df['x'], df['y'])
    
    def _get_output_df(self) -> pd.DataFrame:
        """This function builds a new data frame from geogeometry. 
        The output dataframe looks like this:s

           easting |  northing | z
            val_x  | val_y | val_z

        or like this:

             lon   | lat   |    z
            val_x  | val_y | val_z

        Note that lon and lat could be in any possible format, like 15.45° or 15°27', 
        so it is recommended to use load_geometry before interacting with the output table
        """
        df = pd.DataFrame()
        output_unit = CRS.from_user_input(self.td.pipeline[-1]).axis_info[0].unit_name
        
        if output_unit in [UnitEnum.DEGREE.value, UnitEnum.GRAD.value]:
            df['lon'] = self.gdf.geometry.x.apply(lambda value:format_point(float(value), self.td))
            df['lat'] = self.gdf.geometry.y.apply(lambda value:format_point(float(value), self.td))
        else:
            df['easting'], df['northing'] = self.gdf.geometry.x, self.gdf.geometry.y

        if self.gdf.has_z[0]:
            df['z'] = self.gdf.geometry.z.apply(lambda value: f"{value:.{self.td.result_length}f}")

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
                # I'm dropping geogeometry because geopandas can't load CSV with a geogeometry column.
                # It's not a problem on export, but otherwise, it requires the user to manually delete the geogeometry column
                # before each use.
                self.gdf = self.gdf.drop('geometry', axis=1)
                self.gdf.to_csv(self.output_path+'/mapless.csv', index=False)
        
        #compress it
        shutil.make_archive(f'{self.output_path}', 'zip', self.output_path)