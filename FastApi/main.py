from fastapi import FastAPI, File, UploadFile
from typing import Union
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uuid

IMAGEDIR = 'images/'

app = FastAPI()

origins =[
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins
)

@app.get('/')
def read_root():
    return {"Hello": "World"}

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()

    # #save the file
    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)

    return {"fileName": file.filename}