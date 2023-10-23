from typing import  Sequence

from fastapi import APIRouter
from pyproj import transformer

from ..types.comm import TransformationInfo, TransformationInfoList

api = APIRouter(prefix="/api/search")


def build_trs(item) -> TransformationInfo:
    return TransformationInfo(
        name="\n".join(item.description.split(" + ")),
        code=str(item.operations[1].to_json_dict().get("id", {'code':'unknow'}).get('code')),
        area=item.area_of_use.bounds
    )

@api.post("/transformation")
async def list_transformations(pipeline:Sequence[int]):
    transformations = TransformationInfoList()
    for source, target in zip(pipeline[:-1],  pipeline[1:]):
        transformations.transformation_pipe.append((tuple(map(
                    lambda item: build_trs(item),
                    transformer.TransformerGroup(source, target, always_xy=True).transformers
        ))))
    return transformations