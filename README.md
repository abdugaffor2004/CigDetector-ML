# Проект React + FastAPI

### Требования

Для развертывания и запуска проекта вам потребуется:

- Node.js (v20.8.0)
- Python (3.12.2)
- npm


### Установка

1. Клонируйте репозиторий на ваш компьютер:
```bash
git clone https://github.com/abdugaffor2004/urban-broccoli
```

2. Перейдите в каталог проекта:
```bash
cd /urban-broccoli/
```

3. Установите зависимости для клиентской части:
```bash
cd /CigDetector
npm install
```

4. Установите зависимости для серверной части:
```bash
cd /FastApi
pip install -r requirements.txt
```


### Запуск проекта

1. Запустите серверную часть:
```bash
cd /FastApi
uvicorn main:app --reload
```
Сервер FastAPI будет запущен по адресу http://localhost:8000.

2. Запустите клиентскую часть:
```bash
cd /CigDetector
npm run dev
```
Клиентское приложение React будет запущено по адресу http://localhost:3000.