from prediction import tot_emotion

total_score_sum = 0
total_calls = 0

def calculate_emotion_score():
    global total_score_sum, total_calls

    emotion_data_list = tot_emotion()

    if not emotion_data_list:
        print("No emotion data available yet.")
        return None

    emotion_percentages = emotion_data_list[-1]

    emotion_weights = {
        "Happy": 40,
        "Neutral": 35,
        "Surprise": 15,
        "Sad": 8,
        "Fear": 5,
        "Angry": 3,
        "Disgust": 2
    }

    weighted_score = sum(emotion_percentages.get(emotion, 0) * weight for emotion, weight in emotion_weights.items())

    max_possible_weight = sum(emotion_weights.values())

    final_score = (weighted_score / (max_possible_weight * 100)) * 100

    total_score_sum += final_score
    total_calls += 1

    average_score = total_score_sum / total_calls

    print(f"Current Score: {round(final_score, 2)}")
    print(f"Average Emotion Score: {round(average_score, 2)}")

    return round(average_score, 2)

