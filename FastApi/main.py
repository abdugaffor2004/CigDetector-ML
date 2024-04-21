from fastapi import FastAPI, File, UploadFile
from typing import Union, List
import hashlib
from fastapi.middleware.cors import CORSMiddleware
import uuid
from pathlib import Path
 
IMAGEDIR = '../CigDetector/public'

app = FastAPI()

origins =[
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins
)

def generate_filename(contents):
    # Генерируем уникальное имя файла на основе хэша содержимого изображения
    file_hash = hashlib.sha256(contents).hexdigest()
    return f"{file_hash}.jpg"

@app.get('/')
def read_root():
    return {"Hello": "World"}



# @app.post("/upload/")
# async def upload_files(files: List[UploadFile] = File(...)):
#     uploaded_files = []
#     for file in files:
#         filename = f"{uuid.uuid4()}.jpg"
#         contents = await file.read()

#         # Сохраняем изображение
#         image_path = Path(IMAGEDIR) / filename
#         with open(image_path, "wb") as f:
#             f.write(contents)

#         uploaded_files.append({"fileName": filename})
#     return uploaded_files




@app.post("/upload/")
async def upload_files(files: List[UploadFile] = File(...)):
    uploaded_files = []
    for file in files:
        contents = await file.read()

        filename = generate_filename(contents)
        image_path = Path(IMAGEDIR) / filename

        if not image_path.is_file():
            # Сохраняем изображение, если оно еще не существует
            with open(image_path, "wb") as f:
                f.write(contents)

        uploaded_files.append({"fileName": filename})
    return uploaded_files