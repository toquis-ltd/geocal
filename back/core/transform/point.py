from typing import Union

from pyproj import transformer

from ..types.point import Point2D, Point3D, TransformatioDef

from .comm import ABSTransformation 

class PointTransformation(ABSTransformation):
    def __init__(self, point: Union[Point3D, Point2D], transformation:TransformatioDef):
        super().__init__(transformation)
        self.point = point

    def transformation(self) -> Point3D:
        point = self.point.unwrap()
        print(point)
        for source, target in self._iter_transformation_pipeline(self.pipeline):
            try:
                transformation = transformer.TransformerGroup(
                                                              source, 
                                                              target, 
                                                              always_xy=True).transformers[
                                                                  self.pipe_id[self.pipeline.index(source)]
                                                                ]
                point = transformation.transform(*point)
            except Exception as e:
                print(self.pipe_id, self.pipeline.index(source))
                print(f"Can't transform {source} to {target} and at {self.point}")
                raise f"Point transformation error: {e}"
        print(point)
        if len(point) == 3:
            return Point3D(x=f'{point[0]:.8f}', y=f'{point[1]:.8f}', z=f'{point[2]:.8f}')
        else:
            return Point2D(x=f'{point[0]:.8f}', y=f'{point[1]:.8f}')