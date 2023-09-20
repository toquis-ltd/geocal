import os
import uvicorn

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from pyproj import network

from core.transform import api as transform_api
from core.search import api as search_api

app = FastAPI(
    title="Mapless toquis api",
    summary="",
    version="0.0.1",
    terms_of_service="https://toquis.com",
    contact={
        "name": "Jakob Oganesyan",
        "email": "jakob.oganesyan@toquis.com",
    },
    docs_url=None,
    redoc_url=None,
)
FastAPIInstrumentor(app)

templates = Jinja2Templates(directory="./template")
app.mount("/static/", StaticFiles(directory="static"), name="static")
app.include_router(transform_api)
app.include_router(search_api)

network.set_network_enabled(True)

@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

try:
    if bool(int(os.environ.get("DEBUG"))):
        from fastapi.middleware.cors import CORSMiddleware
        ORIGINS = [
            "http://localhost",
            "http://localhost:8080",
            "http://127.0.0.1:8000"
        ]
        app.add_middleware(
            CORSMiddleware,
            allow_origins=ORIGINS,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        app.docs_url="docs",
        app.redoc_url="redoc",

        if __name__ == "__main__":
            uvicorn.run("main:app", host='localhost', port=8000, reload=True)
except:
    print("DEBUG variable is not setup")