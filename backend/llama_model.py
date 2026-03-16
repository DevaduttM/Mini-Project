import ollama
import re

qn_list = []
keywords_list = []

def generate_questions(job_role):
    """
    Generate 3 technical interview questions based on the job role using Mistral via Ollama.
    """
    global qn_list, keywords_list

    prompt = f"""
Generate exactly 3 concise, one-line technical interview questions relevant to the role of {job_role}.
For each line, include answer keywords in this exact format:
1. <question text> (Keywords: <k1>, <k2>, <k3>, <k4>, <k5>, <k6>, <k7>, <k8>, <k9>, <k10>)
Return only these 3 lines.
"""
    
    # Use Ollama with Mistral
    response = ollama.chat(model='mistral', messages=[{"role": "user", "content": prompt}])
    
    # Extract generated questions
    result = response['message']['content']

    # Parse lines into separate question text and keyword arrays.
    parsed_questions = []
    parsed_keywords = []
    lines = [q.strip() for q in result.split("\n") if q.strip()]

    for line in lines:
        # Remove numeric prefix like "1."
        clean_line = re.sub(r"^\d+\.\s*", "", line)

        # Match: <question> (Keywords: a, b, c)
        match = re.match(r"^(.*?)\s*\(\s*Keywords\s*:\s*(.*?)\s*\)$", clean_line, re.IGNORECASE)
        if match:
            question_text = match.group(1).strip()
            keys = [k.strip() for k in match.group(2).split(",") if k.strip()]
        else:
            # Fallback when model does not strictly follow format.
            question_text = clean_line
            keys = []

        parsed_questions.append(question_text)
        parsed_keywords.append(keys)

        if len(parsed_questions) == 3:
            break

    qn_list = parsed_questions
    keywords_list = parsed_keywords

    return {"questions": qn_list, "keywords": keywords_list}

def get_qns():
    return qn_list


def get_keywords_list():
    return keywords_list

