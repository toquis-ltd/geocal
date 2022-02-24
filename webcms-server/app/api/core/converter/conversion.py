import os, re

from abc import abstractmethod
from pyproj import Transformer, CRS
from pyproj.transformer import TransformerGroup

class Conversion():
    def __init__(self, context:dict):
        self._source_point = CRS.from_user_input(int(context.get("s_crs")))
        self._target_point = CRS.from_user_input(int(context.get("t_crs")))

        if (proj := context.get("proj", None)) != None:
            self._transformation = Transformer.from_pipeline(proj)
        else:
            self._transformation = Transformer.from_crs(self._source_point, self._target_point)

    @abstractmethod
    def get_transform(self):
        return self._transform()
    
    def get_transformation_name(self, id=0) -> str:
        return self._get_transformation_name(id=0)

    def get_transformation_list(self) -> str:
        return self._get_transformation_list()

    def _get_transformation_name(self, id:int) -> str:        
        try:
            pipeline = TransformerGroup(self._source_point, self._target_point).transformers[id]
            return {
                'name': pipeline.description,
                'area': pipeline.area_of_use.name,
                'wkt': pipeline.to_json(),
                'accuracy': (f'{pipeline.accuracy}m' if pipeline.accuracy > 0 else 'unknow'),
            }
        except Exception as e:
            return f"No transformation available for EPSG:{self._source_point} to EPSG:{self._target_point} {e}"
    
    def _get_transformation_list(self) -> list:
        items = []
        pipelines = TransformerGroup(self._source_point, self._target_point).transformers
        for i in pipelines:
            items.append({
                'name': i.description, 
                'area': i.area_of_use.name,
                'wkt': i.to_json(),
                'accuracy': (f'{i.accuracy}m' if i.accuracy > 0 else 'unknow'),
            })
        return items

class PointConversion(Conversion):
    def __init__(self, context:dict):
        super().__init__(context)
        point = (context.get("source_x"), context.get("source_y"), context.get("source_z"))
    
    def get_target_values(self) -> dict:
        return self._transformation.transform(*point)