from typing import Sequence

from pydantic import BaseModel


class TransformatioDef(BaseModel):
    pipeline:Sequence[int]
    pipe_ids:Sequence[int]

class Point2D(BaseModel):
    x:float
    y:float

    def unwrap(self) -> Sequence[float]:
        return self.x, self.y

class Point3D(Point2D):
    z:float

    def unwrap(self) -> Sequence[float]:
        return self.x, self.y, self.z