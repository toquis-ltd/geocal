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
    
    def get_transformation_name(self) -> str:
        return self._get_transformation_name()

    def _get_transform_propreties(self) -> list:
        steps = []
        for i in self._transformation.definition.replace("step ", "\n").splitlines():
            name = projections_names.get(re.search("proj=\w+", i)[0].split("proj=")[1], "unknown")
            item = re.findall("\w+=\w+", i)
            steps.append({'name':name, 'propreties':item[1:]})
        return steps[1:]

    def _get_transformation_name(self) -> str:
        try:
            response = os.popen(f"projinfo -s EPSG:{self._source_point.crs} -t EPSG:{self._target_point.crs}").read()
            return re.search( 'CONCATENATEDOPERATION\[".*"', response).group().replace('CONCATENATEDOPERATION["', '').replace('"', '')
        except Exception as e:
            return f"No transformation available for EPSG:{self._source_point.crs} to EPSG:{self._target_point.crs}"

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