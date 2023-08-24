from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel

from pyproj.aoi import AreaOfInterest
from pyproj.database import query_crs_info, CRSInfo
from pyproj.enums import PJType

api = APIRouter(prefix="/api/search")

class CRSModel(BaseModel):
    auth_name: str
    code: str
    name: str
    type: PJType
    deprecated: bool
    area_of_use_name: Optional[str]
    projection_method_name: Optional[str]

@api.get("/crs")
async def get_crs_from_area(lat:float, long:float):

    def get_crs_area(crs:CRSInfo) -> float:
        x1 = crs.area_of_use.bounds[0]
        x2 = crs.area_of_use.bounds[2]
        y1 = crs.area_of_use.bounds[1]
        y2 = crs.area_of_use.bounds[3]
        return abs((x1-x2)*(y1-y2))

    crs_list = list(query_crs_info(
                    auth_name='EPSG',
                    area_of_interest=AreaOfInterest(
                        north_lat_degree=lat,
                        south_lat_degree=lat,
                        west_lon_degree=long,
                        east_lon_degree=long,
                    )))
    
    crs_list.sort(key=lambda crs:get_crs_area(crs))
    response = []
    for item in crs_list:
        response.append(CRSModel(
            auth_name=item.auth_name,
            code=item.code,
            name=item.name,
            type=item.type,
            deprecated=item.deprecated,
            area_of_use_name= item.area_of_use.name,
            projection_method_name= item.projection_method_name,
            
        ))

    return {'length':len(response), "content":response}