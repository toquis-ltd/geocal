from abc import abstractmethod
from typing import Iterator, Sequence

import geopandas as gpd
import pandas as pd

from lat_lon_parser import parse, to_deg_min, to_deg_min_sec

from ..types.comm import TransformatioDef, ResultFormEnum

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
        return gdf.set_geometry('geometry')
    return df

def format_point(value:float, result:ResultFormEnum) -> str:
    match (result):
        case ResultFormEnum.DD:
            return f'{value:.8f}'
        case ResultFormEnum.DD_MM:
            out_values = to_deg_min(value)
            return f'{int(out_values[0])} {out_values[1]:4f}'
        case ResultFormEnum.DD_MM_SS:
            out_values = to_deg_min_sec(value)
            return f'{int(out_values[0])} {int(out_values[1])} {out_values[2]:3f}'
        case ResultFormEnum.DDdnMM:
            out_values = to_deg_min(value)
            return f'{int(out_values[0])}-{out_values[1]:4f}'
        case ResultFormEnum.DDdnMMdnSS:
            out_values = to_deg_min_sec(value)
            return f'{int(out_values[0])}-{int(out_values[1])}-{out_values[2]:3f}'


class ABSTransformation:
    def __init__(self, transformation:TransformatioDef) -> None:
        self.pipeline = transformation.pipeline
        self.pipe_id = transformation.pipe_ids
        self.form = transformation.result_form
    
    @abstractmethod
    def transformation(self):
        pass
    
    def _iter_transformation_pipeline(self) -> Iterator[tuple[int, int]]:
        for i, j in zip(self.pipeline[:-1], self.pipeline[1:]):
            yield i, j