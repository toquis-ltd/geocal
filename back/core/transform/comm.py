from abc import abstractmethod
from typing import Sequence

import geopandas as gpd
import pandas as pd

from lat_lon_parser import parse

from ..types.comm import TransformatioDef

def load_geometry(gdf:gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    df = pd.concat([
                    gpd.GeoDataFrame({'geometry':[]}).set_geometry('geometry'), 
                    gdf
                ])
    if 'lat' in gdf.columns:
        gdf['lat'] = gdf['lat'].apply(lambda x:  parse(str(x)))
        gdf['lon'] = gdf['lon'].apply(lambda x:  parse(str(x)))
        try:
            df['geometry'] = gpd.points_from_xy(gdf['lon'], gdf['lat'], gdf['z'])
        except:
            df['geometry'] = gpd.points_from_xy(gdf['lon'], gdf['lat'])
    elif 'x' in gdf.columns:
        try:
            df['geometry'] = gpd.points_from_xy(gdf['x'], gdf['y'], gdf['z'])
        except:
            df['geometry'] = gpd.points_from_xy(gdf['x'], gdf['y'])
    else:
        return gdf
    return df

class ABSTransformation:
    def __init__(self, transformation:TransformatioDef) -> None:
        self.pipeline = transformation.pipeline
        self.pipe_id = transformation.pipe_ids
    
    @abstractmethod
    def transformation(self):
        pass
    
    @classmethod
    def _iter_transformation_pipeline(cls, pipeline:Sequence[int]):
        for i, j in zip(pipeline[:-1], pipeline[1:]):
            yield i, j