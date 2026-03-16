from speech_prediction import predict_all_audio, tot_voice_emotion

total_score_sum = 0
total_calls = 0

def calculate_voice_score():
    global total_score_sum, total_calls

    # Ensure audio prediction is done first
    predict_all_audio()

    emotion_data_list = tot_voice_emotion()
    print(f"Emotion Data List: {emotion_data_list}")

    if not emotion_data_list or "error" in emotion_data_list[0]:
        print("No voice emotion data available yet.")
        return None

    # Define emotion weights
    emotion_weights = {
        "Happy": 100,
        "Neutral": 80,
        "Surprise": 50,
        "Sad": 20,
        "Fear": 15,
        "Angry": 10,
        "Disgust": 5
    }

    # **Initialize Aggregation**
    aggregated_emotions = {emotion: 0 for emotion in emotion_weights.keys()}
    num_entries = len(emotion_data_list)

    # **Normalize and Aggregate Emotion Data**
    for data in emotion_data_list:
        total_detected = sum(data.values())  # Sum of all emotions for normalization
        if total_detected == 0:  # Avoid division by zero
            continue
        for emotion, value in data.items():
            normalized_emotion = emotion.capitalize()
            if normalized_emotion in aggregated_emotions:
                aggregated_emotions[normalized_emotion] += (value / total_detected)  # Normalize values

    # **Compute Weighted Score**
    total_weight = sum(emotion_weights[emotion] * (aggregated_emotions[emotion] / num_entries)
                       for emotion in emotion_weights.keys())

    # **Cap the score within 0-100 range**
    final_score = min(max(round(total_weight, 2), 0), 100)

    # **Update global tracking values**
    total_score_sum += final_score
    total_calls += 1
    average_score = round(total_score_sum / total_calls, 2)

    print(f"Current Voice Score: {final_score}")
    print(f"Average Voice Emotion Score: {average_score}")

    return min(average_score + 30, 90)

