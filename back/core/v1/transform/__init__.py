import os
import shutil

from typing import Union, Optional, Coroutine

from fastapi import APIRouter, UploadFile, BackgroundTasks
from fastapi.responses import FileResponse

import asyncio
import geopandas as gpd


from ..types.comm import TransformatioDef
from ..types.file import FileTransformatioDef

from .comm import load_geometry
from .point import Point2D, Point3D, PointTransformation
from .file import FileFormatTransformation, FileCoordinateTransformation

from .exceptions import UploadFileException,FileTransformationException


api = APIRouter(prefix="/api/transform")

def verify_uploaded_file(path: str):
    if os.path.getsize(path) == 0:
        raise UploadFileException('Uploaded file is empty')
    
    if os.path.splitext(path)[-1] == '.xlsx':
        raise UploadFileException('Exel file are not accepted please convert to csv')
    try:
        gdf:gpd.GeoDataFrame = gpd.read_file(path)
        gdf = load_geometry(gdf)
    except Exception as e:
        print(e)
        raise UploadFileException("File is unreadable or corrupted")

async def delete_all_user_tmp_files(path:str, timer:Optional[int]=None) -> None:
    if timer != None:
        await asyncio.sleep(timer)

    for file in os.listdir(path):
        try:
            os.remove(f'{path}/{file}')
        except:
            shutil.rmtree(f'{path}/{file}')

@api.post("/upload/{id}", status_code=201)
async def upload_file(id:str, file:UploadFile, background_tasks: BackgroundTasks):
    """This fonction create folder with uploaded file, id is a random string of any length
    all file are stocked in tmpfile folder, after creation"""
    path = f'{os.getcwd()}/tmpfile/{hash(id)}'
    file_name = f'{"mapless"}{os.path.splitext(file.filename)[-1]}'
    file_path = f'{path}/{file_name}'
    
    if not os.path.exists(path):
        os.makedirs(path)
    
    #In normal cases, this file cleaning is useless
    #but, files can persist during the development
    await delete_all_user_tmp_files(path)

    with open(file_path, 'wb+') as local_file:
        local_file.write(file.file.read())

    try:
        verify_uploaded_file(file_path)
    except UploadFileException as e:
        await delete_all_user_tmp_files(path)
        return {'status_code':500, 'detail': str(e)}
    
    # In normal cases, files are deleted upon download, but
    # if the user doesn't download the file, it will be deleted in 6 hours
    # hot reload waits for the end of this task, so for development purposes, disabled it.
    if not bool(int(os.environ.get("DEBUG"))):
        background_tasks.add_task(func=delete_all_user_tmp_files, path=path, timer=21600)
    
    return {'status_code':201}


@api.post("/file/{id}", status_code=200)
async def transform_file(id:str, transformation:FileTransformatioDef):
    path:str = f'{os.getcwd()}/tmpfile/{id}'

    file_extension:str = os.path.splitext(os.listdir(path)[0])[1]
    file_name:str = f'mapless'
    file_path:str = f'{path}/{file_name}{file_extension}'
    output_folder_path:str = f'{path}/{file_name}_out'

    gdf:gpd.GeoDataFrame = gpd.read_file(file_path)

    if len(transformation.pipeline) > 1:
        try:
            gdf = FileCoordinateTransformation(gdf, transformation).transformation()
        except Exception as e:
            print(e)
            await delete_all_user_tmp_files(path)
            raise FileTransformationException("Transformation can't complete")
    
    FileFormatTransformation(gdf, transformation.file_format, output_folder_path).transformation()
    
    return {'status_code':'200'}

@api.get("/download/{id}")
async def download_transformed_file(id:str, background_tasks: BackgroundTasks):
    path:str = f'{os.getcwd()}/tmpfile/{id}'
    output_file_path:str = f'{path}/mapless_out'
    background_tasks.add_task(func=delete_all_user_tmp_files, path=path)
    return FileResponse(f'{output_file_path}.zip', media_type='application/octet-stream', filename='mapless-download.zip')

@api.post("/point")
async def transform_point(point:Union[Point3D, Point2D], transformation:TransformatioDef):
    transformed_point = PointTransformation(point, transformation).transformation()
    return {'status_code':200, 'point':transformed_point}