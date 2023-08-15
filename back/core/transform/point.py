from typing import Union, Sequence

from pyproj import Transformer

from ..types.point import Point2D, Point3D

class PointTransformation:
    def __init__(self, point: Union[Point3D, Point2D], pipline:Sequence[int]):
        self.point = point
        self.pipline = pipline
    
    def get_transformed_point(self) -> Point3D:
        point = self.point.unwrap()

        for source, target in zip(self.pipline[:-1], self.pipline[1:]):
            transformer = Transformer.from_crs(source, target)

            try:
                point = transformer.transform(*point)
            except Exception as e:
                raise f"Point transformation error: {e}"
            
        if isinstance(self.point, Point3D):
            return Point3D(x=point[0], y=point[1], z=point[2])
        else:
            return Point2D(x=point[0], y=point[1])
