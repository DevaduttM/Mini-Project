import ollama

def generate_questions(job_role):
    """
    Generate 5 technical interview questions based on the resume and job role using Mistral via Ollama.
    """
    prompt = f"""
Generate 5 concise, one-line technical interview questions relevant to the role of {job_role}
"""
    
    # Use Ollama with Mistral
    response = ollama.chat(model='mistral', messages=[{"role": "user", "content": prompt}])
    
    # Extract generated questions
    result = response['message']['content']

    # Split questions by newline and return
    questions = [q.strip() for q in result.split("\n") if q.strip()]
    
    return questions[:5]  # Return only 5 questions
