from abc import abstractmethod
from typing import  Generator

from pyproj import transformer, Transformer

import geopandas as gpd
import pandas as pd

from lat_lon_parser import parse, to_deg_min, to_deg_min_sec

from ..types.comm import TransformatioDef, ResultFormEnum

from .exceptions import TransformationException


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
        return df
    
    if 'easting' in gdf.columns:
        try:
            df['geometry'] = gpd.points_from_xy(gdf['easting'], gdf['northing'], gdf['z'])
        except:
            df['geometry'] = gpd.points_from_xy(gdf['easting'], gdf['northing'])
        return df

    if 'x' in gdf.columns:
        try:
            df['geometry'] = gpd.points_from_xy(gdf['x'], gdf['y'], gdf['z'])
        except:
            df['geometry'] = gpd.points_from_xy(gdf['x'], gdf['y'])
        
        return df

    return gdf.set_geometry('geometry')

def format_point(value:float, transformation_definition:TransformatioDef) -> str:
    td = transformation_definition
    match (td.result_form):
        case ResultFormEnum.DD:
            return f'{value:.{td.result_length}f}'
        case ResultFormEnum.DD_MM:
            out_values = to_deg_min(value)
            return f'{int(out_values[0])} {out_values[1]:.{td.result_length}f}'
        case ResultFormEnum.DD_MM_SS:
            out_values = to_deg_min_sec(value)
            return f'{int(out_values[0])} {int(out_values[1])} {out_values[2]:.{td.result_length}f}'
        case ResultFormEnum.DDdnMM:
            out_values = to_deg_min(value)
            return f'{int(out_values[0])}-{out_values[1]:4f}'
        case ResultFormEnum.DDdnMMdnSS:
            out_values = to_deg_min_sec(value)
            return f'{int(out_values[0])}-{int(out_values[1])}-{out_values[2]:.{td.result_length}f}'


class ABSTransformation:
    def __init__(self, transformation:TransformatioDef) -> None:
        self.td = transformation
    
    @abstractmethod
    def transformation(self):
        pass
    
    def _iter_transformation_pipeline(self) -> Generator[Transformer, None, None]:
        for source, target in zip(self.td.pipeline[:-1], self.td.pipeline[1:]):
            try:
                yield transformer.TransformerGroup(source, 
                                                    target, 
                                                    always_xy=True).transformers[self.td.pipe_ids[self.td.pipeline.index(source)]]
            except Exception as e:
                print(self.td.pipe_ids, self.td.pipeline.index(source))
                print(f"Can't transform {source} to {target} and at {self.point}")
                raise TransformationException(f"Transformation error: {e}")