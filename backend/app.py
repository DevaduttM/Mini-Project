from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
from prediction import predict_emotion

app = Flask(__name__)
CORS(app) 

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    try:
        face_det_process = subprocess.run(["python", "face_det.py", file_path], capture_output=True, text=True)

        if face_det_process.returncode != 0:
            return jsonify({"error": "Face detection failed", "details": face_det_process.stderr}), 500

        results = predict_emotion("faces")

        print("Predictions:", results) 
        return jsonify({"message": "Success", "predictions": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
