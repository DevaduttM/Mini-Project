# models/evaluate_answers.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def evaluate_answers(user_answer, extracted_keywords):
    # """
    # Compares the user's transcribed answer with the extracted keywords from Google API.
    # Returns the highest similarity percentage.
    # """

    # # Convert keywords into a meaningful sentence
    # correct_answer = " ".join(extracted_keywords)

    # # Validate inputs
    # if not user_answer.strip():
    #     return 0.0  # User answer is empty
    # if not correct_answer.strip():
    #     return 0.0  # No keywords to compare

    # try:
    #     # Vectorize user's answer and expected answer
    #     vectorizer = TfidfVectorizer().fit_transform([user_answer, correct_answer])
    #     vectors = vectorizer.toarray()
    # except ValueError:
    #     return 0.0  # Handle empty vocabulary issue

    # # Compute cosine similarity
    # score = cosine_similarity([vectors[0]], [vectors[1]])[0][0]

    # return round(score * 100+10, 2)  # Convert to percentage with 2 decimal places
    count = 0
    for i in user_answer.split():
        for j in extracted_keywords:
            if (i.lower() == j.lower()):
                count += 1
    accuracy = (count / len(extracted_keywords))*100
    if accuracy > 90:
        return accuracy
    return accuracy + 10