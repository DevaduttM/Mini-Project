# Mini-Project

AI-assisted interview practice platform with a Flask backend (video, audio, and text analysis) and a Next.js frontend. The system records interview answers, extracts facial and vocal signals, evaluates content quality, and returns a combined scorecard to help users improve.

## What This Project Does
- Simulates interview sessions with role-based questions.
- Records user video responses and analyzes facial emotion distribution.
- Extracts audio, transcribes speech, and evaluates voice confidence.
- Scores text answers by comparing to expected keyword sets.
- Presents results in a clean UI for iterative practice.

## Project Overview
- **Facial analysis**: Detects faces from recorded video and predicts emotions using a CNN model.
- **Speech analysis**: Extracts audio from video, transcribes Tamil to English, and estimates voice emotion confidence.
- **Answer quality**: Evaluates transcribed answers against keyword lists generated for interview questions.
- **Question generation**: Uses Ollama (Mistral) to generate role-based technical questions.

## High-Level Flow
1. Frontend starts an interview session and captures user recordings.
2. Backend receives `.webm` uploads and stores them in `backend/uploads/`.
3. Face frames are extracted to `backend/faces/` and scored for emotion distribution.
4. Audio is extracted to `backend/audio/`, transcribed, and translated to English.
5. Voice emotion confidence is computed from extracted audio features.
6. Text score is computed by comparing user answers with keyword lists.
7. Backend returns a combined score summary to the frontend.

## Repository Structure
- `backend/` Flask API and ML inference utilities.
- `frontend/` Next.js UI.

## Backend Components (Quick Map)
- **API**: [backend/app.py](backend/app.py)
- **Face detection**: [backend/face_det.py](backend/face_det.py)
- **Emotion prediction**: [backend/prediction.py](backend/prediction.py)
- **Emotion score aggregation**: [backend/emotion_confidence.py](backend/emotion_confidence.py)
- **Audio extraction**: [backend/voice.py](backend/voice.py)
- **Transcription + translation**: [backend/speechrec.py](backend/speechrec.py)
- **Voice emotion prediction**: [backend/speech_prediction.py](backend/speech_prediction.py)
- **Voice score aggregation**: [backend/voice_emotion_confidence.py](backend/voice_emotion_confidence.py)
- **Answer scoring**: [backend/evaluate_answers.py](backend/evaluate_answers.py)
- **Question generation**: [backend/llama_model.py](backend/llama_model.py)

## Backend Setup (Windows PowerShell)

### Prerequisites
- **Python 3.10.11** (required)
- **ffmpeg** (for audio extraction and video processing)
- **Ollama** (for question generation) with model `mistral`

### One-Command Setup and Run
The backend has a PowerShell script that installs dependencies, verifies prerequisites, starts Ollama, pulls the model, and runs the API.

```powershell
cd "d:\MEC\College Projects\Mini Project\Program\Mini-Project\backend"
.\setup_and_run_backend.ps1
```

If you need to specify the Python launcher:

```powershell
.\setup_and_run_backend.ps1 -PythonCmd py
```

### Manual Setup (Optional)
If you prefer to run steps manually:

```powershell
cd "d:\MEC\College Projects\Mini Project\Program\Mini-Project\backend"
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m spacy download en_core_web_sm
.\.venv\Scripts\python.exe app.py
```

### Notes
- Ollama must be running locally for the `/question` endpoint to work.
- Ensure the model files exist in `backend/Models/` and voice model pickles are in `backend/`.

## Required Model Artifacts
These files are expected at runtime:
- `backend/Models/model_filter.h5` (facial emotion CNN)
- `backend/logistic_regression_model.pkl`
- `backend/scaler.pkl`
- `backend/pca.pkl`
- `backend/label_encoder.pkl`

If these are missing, the API will fail when running predictions.

## Frontend Setup

### Prerequisites
- **Node.js 18+**

### Install and Run

```powershell
cd "d:\MEC\College Projects\Mini Project\Program\Mini-Project\frontend"
npm install
npm run dev
```

The frontend will start on `http://localhost:3000` by default.

## Backend API (Detailed)

### `POST /uploadvideo`
**Purpose**: Upload a single `.webm` response for facial analysis.

**Request**: `multipart/form-data` with `file` field.

**Response**:
- `predictions`: emotion distribution by percentage
- `score`: aggregated facial confidence score

### `GET /results`
**Purpose**: Process the first three uploaded videos, compute audio + text + face scores.

**Response**:
- `Face score`
- `Voice score`
- `Text score`

### `GET /question?job_role=...`
**Purpose**: Generate three role-specific interview questions and keywords.

**Response**:
- `questions`: array of questions
- `keywords`: array of keyword lists aligned with each question

## Backend API (Quick Reference)
- `POST /uploadvideo` - Upload a `.webm` recording and get facial emotion predictions.
- `GET /results` - Process saved videos, extract audio, and return face/voice/text scores.
- `GET /question?job_role=...` - Generate interview questions and keywords via Ollama.

## Troubleshooting
- **Ollama not responding**: Ensure Ollama is installed, running, and `mistral` is pulled.
- **ffmpeg missing**: Install ffmpeg and ensure it is on PATH.
- **TensorFlow install errors**: Verify Python version is **3.10.11**.
- **Missing model files**: Confirm required artifacts are present in `backend/Models/` and `backend/`.

## Development Tips
- Use the provided script to avoid missing dependency steps.
- Keep uploads small when testing to reduce processing time.
- Clear `backend/uploads/`, `backend/faces/`, and `backend/audio/` between test runs if needed.