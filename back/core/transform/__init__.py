import os
import shutil

from typing import Union

from fastapi import APIRouter, UploadFile
from fastapi.responses import FileResponse

import geopandas as gpd

from ..types.comm import TransformatioDef
from ..types.file import FileTransformatioDef

from .point import Point2D, Point3D, PointTransformation
from .file import FileFormatTransformation, FileCoordinateTransformation

api = APIRouter(prefix="/api/transform")

class UploadFileException(Exception):
    pass

def verify_uploaded_file(path: str):
    if os.path.getsize(path) == 0:
        raise UploadFileException('Uploaded file is empty')
    
    try:
        gdf:gpd.GeoDataFrame = gpd.read_file(path)
    except:
        raise UploadFileException("File is unreadable or corrupted")


def delete_all_tmp_files(path:str):
    for file in os.listdir(path):
        try:
            os.remove(f'{path}{file}')
        except:
            shutil.rmtree(f'{path}{file}')

@api.post("/upload/{id}", status_code=201)
async def upload_file(id:str, file:UploadFile):
    path = f'{os.getcwd()}/tmpfile/{id}/'
    file_name = f'{"mapless"}{os.path.splitext(file.filename)[-1]}'
    file_path = f'{path}{file_name}'

    if not os.path.exists(path):
        os.makedirs(path)
    delete_all_tmp_files(path=path)

    with open(file_path, 'wb+') as local_file:
        local_file.write(file.file.read())
    
    try:
        verify_uploaded_file(file_path)
    except UploadFileException as e:
        return {'status_code':500, 'detail': str(e)}
    
    return {'status_code':201}


@api.post("/file/{id}", status_code=202)
async def transform_file(id:str, transformation:FileTransformatioDef):
    dir_path:str = f'{os.getcwd()}/tmpfile/{id}/'    
    file_extension:str = os.path.splitext(list(filter(lambda n: n.startswith('mapless'), os.listdir(dir_path)))[0])[1]
    file_name:str = f'mapless'
    file_path:str = f'{dir_path}{file_name}{file_extension}'
    output_file_path:str = f'{dir_path}{file_name}_out'

    if len(transformation.pipeline) > 1:
        gdf:gpd.GeoDataFrame = gpd.read_file(file_path)
        gdf = FileCoordinateTransformation(gdf, transformation.pipeline).transformation()

    if transformation.file_format != None:
        file_format_transformation = FileFormatTransformation(gdf, output_file_path, transformation.file_format)
        file_format_transformation.transformation()
    
    shutil.make_archive(f'{output_file_path}', 'zip', output_file_path)

    return {}

@api.get("/download/{id}")
async def download_transformed_file(id:str):
    dir_path:str = f'{os.getcwd()}/tmpfile/{id}'    
    output_file_path:str = f'{dir_path}/mapless_out'
    return FileResponse(f'{output_file_path}.zip', media_type='application/octet-stream', filename='mapless-download.zip')

@api.post("/point")
async def transform_point(point:Union[Point3D, Point2D], transformation:TransformatioDef):
    transformed_point = PointTransformation(point, transformation).get_transformed_point()
    return {'status_code':200, 'point':transformed_point}