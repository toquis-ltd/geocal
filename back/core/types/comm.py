from typing import Sequence, List

from pydantic import BaseModel

class TransformatioDef(BaseModel):
    pipeline:Sequence[int]
    pipe_ids:Sequence[int]

class TransformationList(BaseModel):
    transformation_pipe: List[Sequence[str]] = []