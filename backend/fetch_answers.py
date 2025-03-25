import requests

GOOGLE_API_KEY = "AIzaSyBsqm0mKymLXHD9ySg6JP34QRkOIFyz2Bg"
SEARCH_ENGINE_ID = "0208b4c23e9174f06"

def search_answer(question):
    """Fetches the top answer from Google Search API."""
    url = f"https://www.googleapis.com/customsearch/v1?q={question}&key={GOOGLE_API_KEY}&cx={SEARCH_ENGINE_ID}"
    response = requests.get(url).json()
    if "items" in response:
        return response["items"][0]["snippet"]
    return "No answer found."

if __name__ == "__main__":
    print(search_answer("What is a neural network?"))
