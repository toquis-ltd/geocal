import os

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


from core.transform import api as transform_api

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/api/transform/", transform_api)

templates = Jinja2Templates(directory="./template")

@app.get("/", response_class=HTMLResponse)
@app.get("/about", response_class=HTMLResponse)
@app.get("/settings", response_class=HTMLResponse)
@app.get("/transform", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

try:
    if bool(int(os.environ.get("DEBUG"))):
        from fastapi.middleware.cors import CORSMiddleware

        ORIGINS = [
            "http://localhost.tiangolo.com",
            "https://localhost.tiangolo.com",
            "http://localhost",
            "http://localhost:8080",
        ]

        app.add_middleware(
            CORSMiddleware,
            allow_origins=ORIGINS,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
except:
    print("DEBUG variable is not setup")