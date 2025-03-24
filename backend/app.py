from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from face_det import detect_faces
from prediction import predict_emotion
import subprocess

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def get_next_filename():
    existing_files = [f for f in os.listdir(UPLOAD_FOLDER) if f.startswith("qn") and f.endswith(".webm")]
    
    existing_numbers = [int(f[2:-5]) for f in existing_files if f[2:-5].isdigit()]
    next_number = max(existing_numbers, default=0) + 1

    return f"qn{next_number}.webm"

def delete_images_in_directory(directory_path):
   try:
     files = os.listdir(directory_path)
     for file in files:
       file_path = os.path.join(directory_path, file)
       if os.path.isfile(file_path):
         os.remove(file_path)
     print("All files deleted successfully.")
   except OSError:
     print("Error occurred while deleting files.")

def merge_webm_to_mp4(folder, output):
    video_files = sorted([f for f in os.listdir(folder) if f.endswith(".webm")])

    if len(video_files) < 2:
        print("Not enough .webm files to merge.")
        return
    
    list_file_path = os.path.join(folder, "file_list.txt")
    with open(list_file_path, "w") as f:
        for video in video_files:
            f.write(f"file '{os.path.join(folder, video)}'\n")

    try:
        subprocess.run([
            "ffmpeg", "-f", "concat", "-safe", "0",
            "-i", list_file_path, "-c:v", "libx264", "-preset", "fast",
            "-crf", "23", "-c:a", "aac", "-b:a", "192k",
            output, "-y"
        ], check=True)
        print(f"Merged video saved as {output}")
    except subprocess.CalledProcessError as e:
        print("Error during merging:", e)
    finally:
        os.remove(list_file_path)

@app.route("/uploadvideo", methods=["POST"])
def upload_video():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    filename = get_next_filename()
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    try:
        output_dir = detect_faces(file_path)

        if output_dir is None:
            return jsonify({"error": "Face detection failed"}), 500

        results = predict_emotion(output_dir)
        delete_images_in_directory(output_dir)

        print("Predictions:", results)
        return jsonify({"message": "Success", "predictions": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


#     try:
#         face_count = count_face(file_path)

#         if face_count is None:
#             return jsonify({"error": "Face counting failed"}), 500

#         return jsonify({"message": "Success", "face_count": face_count})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
