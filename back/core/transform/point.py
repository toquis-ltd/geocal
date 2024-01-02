from typing import Union

from ..types.point import Point2D, Point3D
from ..types.comm import TransformatioDef

from .comm import ABSTransformation, format_point


class PointTransformation(ABSTransformation):
    def __init__(self, point: Union[Point3D, Point2D], transformation:TransformatioDef):
        super().__init__(transformation)
        self.point = point

    def transformation(self) -> Point3D:
        point = self.point.unwrap()
        
        for func in self._iter_transformation_pipeline():
            point = func.transform(*point)
        
        if len(point) == 3:
            return Point3D(x=f'{format_point(point[0], self.td)}', 
                           y=f'{format_point(point[1], self.td)}', 
                           z=f'{point[2]:.{self.td.result_length}f}')
        else:
            return Point2D(x=f'{format_point(point[0], self.td)}', 
                           y=f'{format_point(point[1], self.td)}')