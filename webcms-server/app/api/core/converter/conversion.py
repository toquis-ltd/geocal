import os, re

from abc import abstractmethod
from pyproj import Transformer
from pyproj.transformer import TransformerGroup

from .interface import PointInSpatialReference

projections_names = {(item := i.split(":"))[0]:item[1] for i in os.popen('proj -l').read().replace(" : ", ":").splitlines()}

class Conversion():
    def __init__(self, context:dict):
        self._source_point = PointInSpatialReference(context.get("s_crs"))
        self._target_point = PointInSpatialReference(context.get("t_crs"))
        if (proj := context.get("proj", None)) != None:
            self._transformation = Transformer.from_pipeline(proj)
        else:
            self._transformation = Transformer.from_crs(self._source_point.crs, self._target_point.crs)

    @abstractmethod
    def get_transform(self):
        return self._transform()

    def get_transform_propreties(self) -> list:
        return self._get_transform_propreties()
    
    def get_transformation_name(self, id=0) -> str:
        return self._get_transformation_name(id=0)

    def get_transformation_list(self) -> str:
        return self._get_transformation_list()

    def _get_transform_propreties(self) -> list:
        steps = []
        for i in self._transformation.definition.replace("step ", "\n").splitlines():
            name = projections_names.get(re.search("proj=\w+", i)[0].split("proj=")[1], "unknown")
            item = re.findall("\w+=\w+", i)
            steps.append({'name':name, 'propreties':item[1:]})
        return steps[1:]

    def _get_transformation_name(self, id:int) -> str:        
        try:
            pipeline = TransformerGroup(self._source_point.crs, self._target_point.crs).transformers[id]
            return {
                'name': pipeline.description,
                'area': pipeline.area_of_use.name,
                'wkt': pipeline.to_json(),
                'accuracy': (f'{pipeline.accuracy}m' if pipeline.accuracy > 0 else 'unknow'),
            }
        except Exception as e:
            return f"No transformation available for EPSG:{self._source_point.crs} to EPSG:{self._target_point.crs} {e}"
    
    def _get_transformation_list(self) -> str:
        items = []
        pipelines = TransformerGroup(self._source_point.crs, self._target_point.crs).transformers
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
        self._source_point.set_coordinates([context.get("source_x"), context.get("source_y"), context.get("source_z")])
        self._transform()

    def _transform(self) -> None:
        self._target_point.set_coordinates(self._transformation.transform(*self._source_point.get_coordinates()))
    
    def get_target_values(self) -> dict:
        return self._target_point._get_coordinate_dict()