import requests
import spacy
from llama_model import get_qns

# =============================
# 🎯 GOOGLE API CONFIGURATION
# =============================

GOOGLE_API_KEY = "AIzaSyBsqm0mKymLXHD9ySg6JP34QRkOIFyz2Bg"
SEARCH_ENGINE_ID = "0208b4c23e9174f06"

# =============================
# 🔍 FUNCTION 1: Search Answer
# =============================

def search_answer(question):
    """Fetches the top answer from Google Search API."""
    # Create Google API URL
    url = f"https://www.googleapis.com/customsearch/v1?q={question}&key={GOOGLE_API_KEY}&cx={SEARCH_ENGINE_ID}"
    
    # Send request to Google API
    response = requests.get(url).json()
    
    # Check if response has 'items' (results)
    if "items" in response and len(response["items"]) > 0:
        return response["items"][0]["snippet"]  # Return the first result snippet
    return "No answer found."

# =============================
# 🧠 FUNCTION 2: Extract Keywords
# =============================

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")

def extract_keywords(text):
    """Extracts keywords from the given text using NLP."""
    # Convert the text to a spaCy Doc object
    doc = nlp(text)
    
    # Extract meaningful keywords (excluding stop words and short words)
    keywords = [token.text for token in doc if token.is_alpha and not token.is_stop and len(token.text) > 2]
    
    # Return unique keywords (remove duplicates)
    return list(set(keywords))

# =============================
# 🔄 FUNCTION 3: Fetch & Extract Keywords
# =============================

def get_keywords_for_question(question):
    """Fetches the answer and extracts keywords from the most relevant result."""
    
    # 1. Get the top answer from Google API
    answer = search_answer(question)
    
    # 2. Extract keywords if a valid answer is found
    if answer != "No answer found.":
        keywords = extract_keywords(answer)
        return {
            "question": question,
            "answer": answer,
            "keywords": keywords
        }
    else:
        return {
            "question": question,
            "answer": answer,
            "keywords": []
        }

# =============================
# 🚀 MAIN EXECUTION
# =============================

if __name__ == "__main__":
    # Define the question
    qns = get_qns()
    for i in qns:
        question = i
    
    # Get keywords from the top Google answer
        result = get_keywords_for_question(question)
    
    # Print the results
        print(f"Q: {result['question']}")
        print(f"A: {result['answer']}")
        print(f"Keywords: {result['keywords']}")
