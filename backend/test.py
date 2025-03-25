resume_content = """
Name: John Doe
Skills: HTML, CSS, JavaScript, React, Redux, Node.js
Experience: 2 years working on frontend applications, developing responsive UI/UX, and maintaining code quality.
Certifications: Frontend Developer Certification by Coursera
Projects: Built a real-time chat app using React and Socket.io.
"""
job_role = "Frontend Developer"

# Test the generate_questions function
from llama_model import generate_questions

questions = generate_questions(resume_content, job_role)

# Print questions for validation
for i, question in enumerate(questions, 1):
    print(f"{i}. {question}")
