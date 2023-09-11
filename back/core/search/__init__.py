from typing import  Sequence
from fastapi import APIRouter

from pyproj import transformer

from ..types.comm import TransformationList


api = APIRouter(prefix="/api/search")


@api.post("/transformation")
def list_transformations(pipeline:Sequence[int]):
    transformations = TransformationList()
    try:
        for source, target in zip(pipeline[:-1],  pipeline[1:]):
            transformations.transformation_pipe.append((tuple(map(
                        lambda item:"\n".join(item.description.split(" + ")),
                        transformer.TransformerGroup(source, target).transformers
                ))))
        return transformations
    except:
        return transformations