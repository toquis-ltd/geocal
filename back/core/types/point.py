from typing import Sequence

from pydantic import BaseModel
from lat_lon_parser import parse


class TransformatioDef(BaseModel):
    pipeline:Sequence[int]
    pipe_ids:Sequence[int]

class Point2D(BaseModel):
    x:str
    y:str

    def unwrap(self) -> Sequence[float]:
        try:
            return parse(self.x), parse(self.y)
        except:
            return self.x, self.y

class Point3D(Point2D):
    z:str
    def unwrap(self) -> Sequence[float]:
        return *super().unwrap(), self.z