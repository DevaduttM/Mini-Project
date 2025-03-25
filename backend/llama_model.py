import ollama

qn_list = []

def generate_questions(job_role):
    """
    Generate 5 technical interview questions based on the resume and job role using Mistral via Ollama.
    """
    prompt = f"""
Generate 3 concise, one-line technical interview questions relevant to the role of {job_role}. Also provide the list of keywords with minimum 10 keywords to the answers to these questions.
"""
    
    # Use Ollama with Mistral
    response = ollama.chat(model='mistral', messages=[{"role": "user", "content": prompt}])
    
    # Extract generated questions
    result = response['message']['content']

    # Split questions by newline and return
    questions = [q.strip() for q in result.split("\n") if q.strip()]
    
    for i in range(5):
        qn_list.append(questions[i])
    
    return questions[:5]  # Return only 5 questions

def get_qns():
    print(qn_list)
    return qn_list

generate_questions("frontend developer")
get_qns()

