FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_EXTRA_INDEX_URL=https://download.pytorch.org/whl/cu118

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ffmpeg \
        libgl1 \
        libsm6 \
        libxext6 \
        libsndfile1 \
        build-essential \
        gcc \
        g++ \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
