import os, re

from abc import abstractmethod
from pyproj import Transformer

from .interface import PointInSpatialReference

projections_names = {(item := i.split(":"))[0]:item[1] for i in os.popen('proj -l').read().replace(" : ", ":").splitlines()}

class Conversion():
    def __init__(self, context:dict):
        self._source_point = PointInSpatialReference(context.get("s_crs"))
        self._target_point = PointInSpatialReference(context.get("t_crs"))
        self._transformation = Transformer.from_crs(self._source_point.crs, self._target_point.crs)
    
    @abstractmethod
    def transform(self):
        return self._transform()

    def get_transform_propreties(self) -> list:
        return self._get_transform_propreties()
    
    def _get_transform_propreties(self) -> list:
        steps = []
        for i in self._transformation.definition.replace("step ", "\n").splitlines():
            name = projections_names.get(re.search("proj=\w+", i)[0].split("proj=")[1], "unknown")
            item = re.findall("\w+=\w+", i)
            steps.append({'name':name, 'propreties':item[1:]})
        return steps[1:]

class PointConversion(Conversion):
    def __init__(self, context:dict):
        super().__init__(context)
        self._source_point.set_coordinates([context.get("source_x"), context.get("source_y"), context.get("source_z")])
        self._transform()

    def _transform(self) -> None:
        self._point = self._source_point.get_coordinates()
        self._target_point.set_coordinates(self._transformation.transform(*self._point))
    
    def get_target_values(self) -> dict:
        return self._target_point._get_coordinate_dict()