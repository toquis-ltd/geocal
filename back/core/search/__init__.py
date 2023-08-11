from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel

from pyproj.aoi import AreaOfInterest
from pyproj.database import query_crs_info, CRSInfo, AreaOfUse
from pyproj.enums import PJType

api = APIRouter(prefix="/api/search")

class CRS(BaseModel):
    auth_name: str
    code: str
    name: str
    type: PJType
    deprecated: bool
    area_of_use: Optional[AreaOfUse]
    projection_method_name: Optional[str]


@api.get("/crs")
async def get_crs_from_point_on_globe(lat:float, lon:float, size:float=0):

    def get_crs_area(crs:CRSInfo) -> float:
        x1 = crs.area_of_use.bounds[0]
        x2 = crs.area_of_use.bounds[2]
        y1 = crs.area_of_use.bounds[1]
        y2 = crs.area_of_use.bounds[3]
        return abs((x1-x2)*(y1-y2))

    def is_area_is_too_big(crs:CRSInfo) -> bool:
        return get_crs_area(crs) < size

    utm_crs_list = list(filter(
               lambda crs: is_area_is_too_big(crs), 
               query_crs_info(
                    area_of_interest=AreaOfInterest(
                        north_lat_degree=lat,
                        south_lat_degree=lat,
                        west_lon_degree=lon,
                        east_lon_degree=lon,
                    ))
                ))

    utm_crs_list.sort(key=lambda crs: get_crs_area(crs))

    return {'length':len(utm_crs_list), "content":utm_crs_list}