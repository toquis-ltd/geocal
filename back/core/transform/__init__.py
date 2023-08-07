import os
import shutil

from typing import Union

from fastapi import APIRouter, UploadFile, Request
from fastapi.responses import FileResponse

import geopandas as gpd

from .point import Point2D, Point3D, PointTransformation
from .comm import TransformatioDef

api = APIRouter(prefix="/api/transform")

@api.post("/upload")
async def upload_file(request: Request, file:UploadFile):
    path = f'{os.getcwd()}/tmpfile/{request.client.host}/'
    file_name = f'{"mapless"}{os.path.splitext(file.filename)[-1]}'

    if not os.path.exists(path):
        os.makedirs(path)

    with open(f'{path}{file_name}', 'wb+') as local_file:
        local_file.write(file.file.read())
    return {'status_code':200, 'file_id':file_name}

@api.get("/file")
async def download_transformed_file(request: Request, file_name:str, file_format:Union[str, None]=None):
    
    path = f'{os.getcwd()}/tmpfile/{request.client.host}/'
    file_path = f'{path}{file_name}'

    if file_format == None:
        return FileResponse(f"{file_path}", media_type='application/octet-stream', filename=f"{file_name}")
    
    out_path = f'{path}{os.path.splitext(file_name)[0]}_shp'
    gdf = gpd.read_file(file_path)
    gdf.to_file(out_path, driver='ESRI Shapefile')

    shutil.make_archive(f"{out_path}", "zip", out_path)
    return FileResponse(f"{out_path}.zip", media_type='application/octet-stream', filename='mapless-download.zip')

@api.delete("/clean")
async def delete_all_tmp_files(request: Request):
    path = f'{os.getcwd()}/tmpfile/{request.client.host}/'
    for file in os.listdir(path):
        try:
            os.remove(f'{path}{file}')
        except:
            shutil.rmtree(f'{path}{file}')
    return {'status_code':200}

@api.post("/point")
async def transform_point(point:Union[Point3D, Point2D], transformation:TransformatioDef):
    transformed_point = PointTransformation(point, transformation.pipeline).get_transformed_point()
    return {'status_code':200, 'point':transformed_point}