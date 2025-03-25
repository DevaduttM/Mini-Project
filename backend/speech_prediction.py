import joblib
import numpy as np
import librosa
import os

model = joblib.load('logistic_regression_model.pkl')
scaler = joblib.load('scaler.pkl')
pca = joblib.load('pca.pkl')
label_encoder = joblib.load('label_encoder.pkl')

results = []  # Ensure this is a global variable

def extract_features(audio_path):
    y, sr = librosa.load(audio_path, sr=None)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfccs_mean = np.mean(mfccs, axis=1)
    return mfccs_mean.reshape(1, -1)

def predict_all_audio(directory="audio"):
    global results
    results.clear()  # Clear previous results

    files = [f for f in os.listdir(directory) if f.endswith(".mp3")]

    if not files:
        print("No audio files found.")
        return [{"error": "No audio files found"}]

    for file in files:
        audio_path = os.path.join(directory, file)
        X_new = extract_features(audio_path)
        X_new_scaled = scaler.transform(X_new)
        X_new_pca = pca.transform(X_new_scaled)
        prediction_encoded = model.predict(X_new_pca)
        prediction_label = label_encoder.inverse_transform(prediction_encoded)[0]
        print(f"Prediction for {file}: {prediction_label}")

        results.append({prediction_label: 100})  # Store results correctly

    return results  # Return updated results

def tot_voice_emotion():
    return results  # This will now return correctly updated results

if __name__ == "__main__":
    predict_all_audio()
    print("Predictions:", results)
