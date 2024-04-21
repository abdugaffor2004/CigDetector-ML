from fastapi import FastAPI, File, UploadFile
from typing import List
import hashlib
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from ultralytics import YOLO
import os
import shutil
 
OUTPUT_DIR = '../CigDetector/public'
IMAGE_DIR = 'images/'
MODEL_PATH = "./best4.pt"

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
#         contents = await file.read()

#         filename = generate_filename(contents)
#         image_path = Path(IMAGEDIR) / filename

#         if not image_path.is_file():
#             # Сохраняем изображение, если оно еще не существует
#             with open(image_path, "wb") as f:
#                 f.write(contents)

#         uploaded_files.append({"fileName": filename})
#     return uploaded_files


# Создание экземпляра модели YOLOv5
model = YOLO(MODEL_PATH)

@app.post("/upload/")
async def upload_files(files: List[UploadFile] = File(...)):
    processed_results = []
    for file in files:
        contents = await file.read()

        filename = generate_filename(contents)
        image_path = Path(IMAGE_DIR) / filename

        if not image_path.is_file():
            # Сохраняем изображение, если оно еще не существует
            with open(image_path, "wb") as f:
                f.write(contents)

        
        # Запускаем инференс на загруженном изображении с помощью модели YOLOv5
        results = model(source=image_path, conf=0.4, save=True)

        # Перемещаем сохраненные файлы в указанный каталог
        for filename in os.listdir("../runs/detect/predict"):
            if filename.endswith(".jpg"):
                os.rename(os.path.join("../runs/detect/predict", filename), os.path.join(OUTPUT_DIR, filename))

        # Удаление папки "runs" и ее содержимого
        shutil.rmtree("../runs")

        print(results)

        # Преобразование результатов в JSON-совместимый формат
        for r in results:
            processed_results.append({
                "image_path": r.path,
                "orig_shape": r.orig_shape,
                "speed": r.speed,
                "fileName": filename
            })

    return processed_results