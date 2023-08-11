import os
import shutil

from typing import Union

from fastapi import APIRouter, UploadFile, Request
from fastapi.responses import FileResponse

import geopandas as gpd

from .point import Point2D, Point3D, PointTransformation
from .file import FileFormatTransformation, FileFormatEnum
from .comm import TransformatioDef

api = APIRouter(prefix="/api/transform")

async def delete_all_tmp_files(request: Request):
    path = f'{os.getcwd()}/tmpfile/{request.client.host}/'
    for file in os.listdir(path):
        try:
            os.remove(f'{path}{file}')
        except:
            shutil.rmtree(f'{path}{file}')

@api.post("/upload")
async def upload_file(request: Request, file:UploadFile):
    await delete_all_tmp_files(request=request)

    path = f'{os.getcwd()}/tmpfile/{request.client.host}/'
    file_name = f'{"mapless"}{os.path.splitext(file.filename)[-1]}'

    if not os.path.exists(path):
        os.makedirs(path)

    with open(f'{path}{file_name}', 'wb+') as local_file:
        local_file.write(file.file.read())
    return {'status_code':200, 'file_id':file_name}

@api.post("/download")
async def download_transformed_file(request: Request, transformation:TransformatioDef, file_format:Union[FileFormatEnum, None]=None):

    dir_path:str = f'{os.getcwd()}/tmpfile/{request.client.host}/'    
    file_extension:str = os.path.splitext(list(filter(lambda n: n.startswith("mapless"), os.listdir(dir_path)))[0])[1]
    file_name:str = f'mapless'
    file_path:str = f'{dir_path}{file_name}{file_extension}'
    output_file_path:str = f'{dir_path}{file_name}_out'

    gdf:gpd.GeoDataFrame = gpd.read_file(file_path)
    
    if file_format != None:
        file_format_transformation = FileFormatTransformation(gdf, output_file_path, file_format)
        file_format_transformation.transformation()
    
    shutil.make_archive(f"{output_file_path}", "zip", output_file_path)
    return FileResponse(f"{output_file_path}.zip", media_type='application/octet-stream', filename='mapless-download.zip')

@api.post("/point")
async def transform_point(point:Union[Point3D, Point2D], transformation:TransformatioDef):
    transformed_point = PointTransformation(point, transformation.pipeline).get_transformed_point()
    return {'status_code':200, 'point':transformed_point}
