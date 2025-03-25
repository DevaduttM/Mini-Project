# models/evaluate_answers.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def evaluate_answers(user_answer, correct_answers):
    vectorizer = TfidfVectorizer().fit_transform([user_answer] + correct_answers)
    vectors = vectorizer.toarray()

    user_vector = vectors[0]
    scores = []
    
    for i in range(1, len(vectors)):
        score = cosine_similarity([user_vector], [vectors[i]])[0][0]
        scores.append(score)
    
    return max(scores) * 100  # Return highest similarity as percentage
