import whisper
from deep_translator import GoogleTranslator

# Load the Whisper model
model = whisper.load_model("small")

# Transcribe the audio (original Tamil text)
result = model.transcribe("output_audio.mp3")
tamil_text = result["text"]

# Translate Tamil to English
translated_text = GoogleTranslator(source="ta", target="en").translate(tamil_text)

# Save the translated text
with open("transcription.txt", "w", encoding="utf-8") as file:
    file.write(translated_text)

n 
print("Transcription completed! Translated text saved to transcription.txt")