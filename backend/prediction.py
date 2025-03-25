import numpy as np
import os
import cv2
from collections import Counter
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import joblib
from sklearn.preprocessing import LabelEncoder

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

model_path = "./Models/model_filter.h5"
model = load_model(model_path)

emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

def predict_emotion(input_dir="faces"):  
    predictions = []
    emotion_count = Counter()

    total_images = 0

    for filename in sorted(os.listdir(input_dir)):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            img_path = os.path.join(input_dir, filename)

            image = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            image = cv2.resize(image, (48, 48))
            image = image.astype("float32") / 255.0

            image = np.expand_dims(image, axis=0)
            image = np.expand_dims(image, axis=-1)

            preds = model.predict(image)[0]
            emotion = emotion_labels[np.argmax(preds)]
            confidence = np.max(preds) * 100

            predictions.append(f"{filename}: {emotion} ({confidence:.2f}%)")
            emotion_count[emotion] += 1
            total_images += 1

    emotion_percentages = {emotion: str(round((count / total_images) * 100, 2)) + "%" for emotion, count in emotion_count.items()} if total_images > 0 else {}

    return emotion_percentages

# def predict_speech_emotion(audio_path):
#     log_reg = joblib.load("logistic_regression_model.pkl")
# import librosa
# from sklearn.preprocessing import StandardScaler
# from sklearn.decomposition import PCA
# label_encoder = LabelEncoder()

# def predict_emotion(audio_path, model):
#     y, sr = librosa.load(audio_path, sr=None)
#     mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
#     mfcc_mean = np.mean(mfcc, axis=1).reshape(1, -1)

#     # Apply the same preprocessing
#     scaler = StandardScaler()
#     mfcc_scaled = scaler.transform(mfcc_mean)
#     pca = PCA(n_components=10)
#     mfcc_pca = pca.transform(mfcc_scaled)

#     # Predict using the chosen model
#     predicted_label = model.predict(mfcc_pca)
#     emotion = label_encoder.inverse_transform(predicted_label)[0]
    
#     return emotion

if __name__ == "__main__":
    results, percentages = predict_emotion()
    
    print("Predictions:")
    for res in results:
        print(res)
    
    print("\nEmotion Percentages:")
    for emotion, percentage in percentages.items():
        print(f"{emotion}: {percentage:.2f}%")
