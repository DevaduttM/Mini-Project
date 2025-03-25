import whisper
from deep_translator import GoogleTranslator
import os

model = whisper.load_model("small")

AUDIO_FOLDER = "audio"
OUTPUT_FILE = "answers.txt"

def transcribe():
    
    audio_files = sorted([f for f in os.listdir(AUDIO_FOLDER) if f.endswith(".mp3")])

    transcriptions = []

    for audio_file in audio_files:
        audio_path = os.path.join(AUDIO_FOLDER, audio_file)

        result = model.transcribe(audio_path)
        tamil_text = result["text"]

        translated_text = GoogleTranslator(source="ta", target="en").translate(tamil_text)

        question_id = os.path.splitext(audio_file)[0]
        transcriptions.append(f"{question_id}: {translated_text}")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        file.write("\n".join(transcriptions))

    print(f"Transcription completed! Saved to {OUTPUT_FILE}")
