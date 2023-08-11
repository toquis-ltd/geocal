from typing import Sequence

from pydantic import BaseModel

class Point2D(BaseModel):
    x:float
    y:float

    def unwrap(self) -> Sequence[float]:
        return self.x, self.y

class Point3D(Point2D):
    z:float

    def unwrap(self) -> Sequence[float]:
        return self.x, self.y, self.z