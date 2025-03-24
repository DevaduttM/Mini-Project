import cv2
import os

video_path = "./videos/test2.mp4"
if not os.path.exists(video_path):
    raise FileNotFoundError(f"Video file not found: {video_path}")

output_dir = "./faces"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

if not cap.isOpened():
    print("Error: Could not open video file.")
    exit()

frame_rate = 30
frame_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    if frame_count % frame_rate == 0:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(
            gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE
        )

        for i, (x, y, w, h) in enumerate(faces):
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

            face_image = frame[y:y + h, x:x + w]
            face_filename = os.path.join(output_dir, f"face_{frame_count}_{i}.jpg")
            cv2.imwrite(face_filename, face_image)

        cv2.imshow("Face Detection", frame)

    frame_count += 1

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
