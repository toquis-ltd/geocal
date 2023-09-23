from typing import Sequence, List
from enum import Enum

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

class Unit(Enum):
    KILOMETRE = "kilometre" 
    US_SURVEY_FOOT = "US survey foot" 
    BRITISH_YARD_SEARS_1922 = "British yard (Sears 1922)" 
    METRE = "metre" 
    CLARKES_FOOT = "Clarke's foot" 
    GERMAN_LEGAL_METRE = "German legal metre" 
    BRITISH_CHAIN_SEARS_1922_TRUNCATED = "British chain (Sears 1922 truncated)" 
    BRITISH_FOOT_SEARS_1922 = "British foot (Sears 1922)" 
    CLARKES_LINK = "Clarke's link" 
    INDIAN_YARD = "Indian yard" 
    LINK = "link" 
    GRAD = "grad" 
    BRITISH_CHAIN_SEARS_1922 = "British chain (Sears 1922)" 
    BRITISH_FOOT_1936 = "British foot (1936)" 
    DEGREE = "degree" 
    GOLD_COAST_FOOT = "Gold Coast foot" 
    FOOT = "foot" 
    CLARKES_YARD = "Clarke's yard" 
