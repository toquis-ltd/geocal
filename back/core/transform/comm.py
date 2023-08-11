from typing import Sequence
from pydantic import BaseModel

class TransformatioDef(BaseModel):
    pipeline:Sequence[int]
    pipe_ids:Sequence[int]