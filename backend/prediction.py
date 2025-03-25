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

total_emotions = []

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

    emotion_percentages = {emotion: round((count / total_images) * 100, 2) for emotion, count in emotion_count.items()} if total_images > 0 else {}
    total_emotions.append(emotion_percentages)

    return emotion_percentages


def tot_emotion():
    return total_emotions


if __name__ == "__main__":
    results, percentages = predict_emotion()
    
    print("Predictions:")
    for res in results:
        print(res)
    
    print("\nEmotion Percentages:")
    for emotion, percentage in percentages.items():
        print(f"{emotion}: {percentage:.2f}%")
