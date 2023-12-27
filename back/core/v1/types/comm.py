from typing import Sequence, List, Union, Optional
from enum import Enum

from pydantic import BaseModel


class ResultFormEnum(Enum):
    DD = 'DD'
    DD_MM = 'DD MM'
    DD_MM_SS = 'DD MM SS'
    DDdnMM = 'DD-MM'
    DDdnMMdnSS = 'DD-MM-SS'
    DDdtMM = 'DD.MM'

class TransformatioDef(BaseModel):
    pipeline:Sequence[int]
    pipe_ids:Sequence[int]
    result_form:ResultFormEnum
    result_length:int = 3

class TransformationInfo(BaseModel):
    name:str
    code:str
    area:Sequence[float]

class TransformationInfoList(BaseModel):
    transformation_pipe: List[Sequence[TransformationInfo]] = []

class UnitEnum(Enum):
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