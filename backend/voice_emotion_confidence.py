from speech_prediction import predict_all_audio, tot_voice_emotion

total_score_sum = 0
total_calls = 0

def calculate_voice_score():
    global total_score_sum, total_calls

    # Call predict_all_audio() to ensure results are populated
    predict_all_audio()

    emotion_data_list = tot_voice_emotion()  
    print(f"Emotion Data List: {emotion_data_list}")

    if not emotion_data_list or "error" in emotion_data_list[0]:
        print("No voice emotion data available yet.")
        return None

    # Standardize emotion keys (ensure first letter is uppercase)
    emotion_weights = {
        "Happy": 100,
        "Neutral": 80,
        "Surprise": 50,
        "Sad": 20,
        "Fear": 15,
        "Angry": 10,
        "Disgust": 5
    }

    aggregated_emotions = {emotion: 0 for emotion in emotion_weights.keys()}
    num_entries = len(emotion_data_list)

    # **Aggregate Emotion Data**
    for data in emotion_data_list:
        for emotion, value in data.items():
            normalized_emotion = emotion.capitalize()
            if normalized_emotion in aggregated_emotions:
                aggregated_emotions[normalized_emotion] += value

    # **Calculate Weighted Score**
    total_weight = sum(emotion_weights[emotion] * (aggregated_emotions[emotion] / num_entries) 
                       for emotion in emotion_weights.keys())

    # **Cap the score to stay within 100**
    final_score = min(round(total_weight, 2), 100)

    total_score_sum += final_score
    total_calls += 1
    average_score = round(total_score_sum / total_calls, 2)

    print(f"Current Voice Score: {round(final_score, 2)}")
    print(f"Average Voice Emotion Score: {round(average_score, 2)}")

    return round(average_score, 2)

if __name__ == "__main__":
    calculate_voice_score()  # Run calculation
