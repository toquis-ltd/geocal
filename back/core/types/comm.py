from typing import Sequence, List

from pydantic import BaseModel

class TransformatioDef(BaseModel):
    pipeline:Sequence[int]
    pipe_ids:Sequence[int]


class TransformationInfo(BaseModel):
    name:str
    code:str
    area:Sequence[float]

class TransformationInfoList(BaseModel):
    transformation_pipe: List[Sequence[TransformationInfo]] = []