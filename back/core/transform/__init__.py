from fastapi import APIRouter, UploadFile, HTTPException

api = APIRouter()

@api.post("/upload")
async def upload_file(file:UploadFile):
    print(file.filename, file.size)
    if file.size > 5120:
        return HTTPException(status_code=500, detail="File too large. Consider subscribing to process bigger files")
    return {'status_code':200}