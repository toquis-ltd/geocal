from typing import Union

from pyproj import transformer

from ..types.point import Point2D, Point3D, TransformatioDef

class PointTransformation:
    def __init__(self, point: Union[Point3D, Point2D], transformation:TransformatioDef):
        self.point = point
        self.pipline = transformation.pipeline
        self.pipe_id = transformation.pipe_ids
    
    def get_transformed_point(self) -> Point3D:
        point = self.point.unwrap()

        for source, target in zip(self.pipline[:-1], self.pipline[1:]):
            try:
                transformation = transformer.TransformerGroup(source,
                                                              target).transformers[self.pipe_id[self.pipline.index(source)]]
                point = transformation.transform(*point)
            except Exception as e:
                print(self.pipe_id, self.pipline.index(source))

                print(f"Can't transform {source} to {target} and at {self.point}")
                raise f"Point transformation error: {e}"

        print(point)
        if isinstance(self.point, Point3D):
            return Point3D(x=point[0], y=point[1], z=point[2])
        else:
            return Point2D(x=point[0], y=point[1])
