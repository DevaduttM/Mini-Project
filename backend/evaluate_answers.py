# models/evaluate_answers.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def _read_transcribed_answers(file_path="answers.txt"):
    """Read transcribed answers from answers.txt and return only answer text."""
    answers = []
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            for line in file:
                line = line.strip()
                if not line:
                    continue
                # Expected format: qn1: answer text
                if ":" in line:
                    answers.append(line.split(":", 1)[1].strip())
                else:
                    answers.append(line)
    except FileNotFoundError:
        return []
    return answers


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
    if not extracted_keywords:
        return 0.0

    count = 0
    for i in user_answer.split():
        for j in extracted_keywords:
            if (i.lower() == j.lower()):
                count += 1
    accuracy = (count / len(extracted_keywords))*100
    if accuracy > 90:
        return accuracy
    return accuracy + 10


def calc_text_score():
    """Calculate average text score across all available questions/answers."""
    try:
        # Lazy imports to avoid hard import-time failures in app startup.
        from llama_model import get_qns, get_keywords_list
    except Exception:
        return 0.0

    questions = get_qns()
    keyword_groups = get_keywords_list()
    user_answers = _read_transcribed_answers("answers.txt")

    if not questions or not user_answers or not keyword_groups:
        return 0.0

    n = min(len(questions), len(user_answers), len(keyword_groups))
    if n == 0:
        return 0.0

    scores = []
    for i in range(n):
        keywords = keyword_groups[i] if i < len(keyword_groups) else []
        if not keywords:
            scores.append(0.0)
            continue
        score = evaluate_answers(user_answers[i], keywords)
        scores.append(float(score))

    if not scores:
        return 0.0

    return round(sum(scores) / len(scores), 2)