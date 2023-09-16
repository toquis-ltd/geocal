from abc import abstractmethod
from typing import Sequence

from ..types.comm import TransformatioDef


class ABSTransformation:
    def __init__(self, transformation:TransformatioDef) -> None:
        self.pipeline = transformation.pipeline
        self.pipe_id = transformation.pipe_ids
    
    @abstractmethod
    def transformation(self):
        pass
    
    @classmethod
    def _iter_transformation_pipeline(cls, pipeline:Sequence[int]):
        for i, j in zip(pipeline[:-1], pipeline[1:]):
            yield j, i