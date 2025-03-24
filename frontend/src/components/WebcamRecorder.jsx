"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loading from "./Loading";

const VideoRecorder = ({ message }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [initial, setInitial] = useState(true);
  const [jobRole, setJobRole] = useState("");
  const [qnIndex, setQnIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const Questions = [
    { qn1: "What are the key differences between Next.js and React?" },
    { qn2: "How does useEffect work in React and when should you use it?" },
    {
      qn3: "What are the advantages of using Docker in a web development project?",
    },
    { qn4: "Can you explain the concept of memoization in JavaScript?" },
    {
      qn5: "What are the different types of HTTP status codes and their meanings?",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          setError(
            "Error accessing camera and microphone. Please allow permissions."
          );
          console.error("Error accessing media devices:", err);
        });
    }
  }, []);

  const handleStartCapture = useCallback(() => {
    if (!stream) {
      setError("No webcam stream available.");
      return;
    }

    setCapturing(true);
    setVideoBlob(null);
    setUploadStatus(null);
    setQnIndex((prevIndex) => (prevIndex === -1 ? 0 : prevIndex));

    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = recorder;

    const chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      console.log("Video recorded successfully:", blob);

      // Wait for state update to complete before setting the blob
      await new Promise((resolve) => setTimeout(resolve, 500));

      setVideoBlob(blob);
    };

    recorder.start();
    console.log("Recording started...");
  }, [stream]);

  const handleStopCapture = useCallback(() => {
    setCapturing(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      console.log("Recording stopped...");
    }
  }, []);

  const handleStopAllCapture = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      console.log("Stopping recording...");
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      console.log("Media stream stopped.");
    }
  }, [stream]);

  useEffect(() => {
    if (videoBlob) {
      console.log("Uploading video...");
      uploadVideo(videoBlob);
    }
  }, [videoBlob]);

  const handleNextCapture = useCallback(() => {
    setQnIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      console.log("Next Question Index:", nextIndex);

      if (nextIndex < Questions.length) {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          handleStopCapture();
          console.log("Stopping recording before uploading...");
        } else if (videoBlob) {
          uploadVideo(videoBlob);
        } else {
          console.log("No video to upload. Starting new recording...");
          startNewRecording();
        }
        return nextIndex;
      }

      console.log("Interview completed.");
      return prevIndex;
    });
  }, [videoBlob, Questions.length]);

  const startNewRecording = () => {
    setTimeout(() => {
      handleStartCapture();
    }, 500);
  };

  const uploadVideo = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "recorded-video.webm");

    setLoading(true);
    setUploadStatus("Uploading...");

    try {
      const response = await axios.post(
        "http://localhost:5000/uploadvideo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("Upload successful!");
      console.log("Upload Response:", response.data);
      setLoading(false);

      setTimeout(() => {
        startNewRecording();
      }, 1000);
    } catch (error) {
      setUploadStatus("Upload failed!");
      console.error("Error uploading video:", error);
    }
  };

  const handleStartInterview = (e) => {
    jobRole === "" ? alert("Please enter your job role.") : setInitial(false);
    console.log("Job Role:", jobRole);
  };
  console.log("Upload Status:", uploadStatus);

  return (
    <>
      {loading && <Loading />}
      <div
        className={`relative h-screen w-screen flex items-start justify-center bg-[#F9F7F2] overflow-hidden`}
      >
        <div
          className={`${
            initial ? `h-full justify-center` : `h-3/4 justify-start`
          } w-full flex items-center flex-col gap-10 mt-[2%]`}
        >
          <h1
            className={`${
              initial ? `absolute top-3` : ``
            } text-4xl font-Convergence text-black`}
          >
            Interview Session Page
          </h1>
          <div
            className={`relative ${
              initial ? `w-1/3 aspect-square flex-col` : `w-[90%] h-[10rem]`
            } bg-[#ebecde] rounded-xl flex justify-center items-center`}
          >
            <p
              className={`${
                initial ? `hidden` : `flex`
              } absolute text-lg font-Convergence text-[#555555dc] text-center top-2 left-5`}
            >
              {Object.values(`Qn ${qnIndex + 1}/${Questions.length}`)}
            </p>
            <p
              className={`${
                initial ? `hidden` : `flex`
              } text-2xl font-Antic text-black text-center`}
            >
              {qnIndex === -1
                ? Object.values("Interview Questions")
                : Object.values(Questions[qnIndex])}
            </p>
            <p
              className={`${
                initial ? `flex` : `hidden`
              } text-2xl font-Antic text-black text-center`}
            >
              Your Job Role
            </p>
            <input
              type="text"
              className={`${
                initial ? `flex` : `hidden`
              } text-xl text-gray-800 px-3 rounded-lg mt-5 h-10 w-[59%]`}
              onChange={(e) => setJobRole(e.target.value)}
            />
            <button
              className={`${
                initial ? `flex` : `hidden`
              } bg-[#696969] text-white px-4 py-2 rounded-lg mt-5`}
              onClick={(e) => handleStartInterview()}
            >
              Start Interview
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          initial ? `hidden` : `flex`
        } absolute top-0 left-0 h-screen w-screen flex flex-col items-center justify-center bg-transparent`}
      >
        {error && <p className="text-red-500">{error}</p>}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute bottom-[10%] rounded-lg w-auto h-1/2 bg-transparent"
        />

        <div className="absolute bottom-[3%] w-full flex justify-center items-center">
          {capturing ? (
            <>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2"
                onClick={handleStopAllCapture}
              >
                Stop Capture
              </button>
              <button
                className={`${
                  qnIndex >= Questions.length - 1 ? `hidden` : `flex`
                } 
                bg-blue-500 text-white px-4 py-2 rounded-lg mx-2`}
                onClick={handleNextCapture}
              >
                Next (Upload & Record)
              </button>
            </>
          ) : (
            <button
              className="mt-4 lg:w-[10%] md:w-[15%] h-[3rem] bg-[#696969] rounded-xl text-white"
              onClick={handleStartCapture}
            >
              Start Capture
            </button>
          )}
        </div>

        {/* {uploadStatus && <p className="absolute bottom-4 right-0 text-black">{uploadStatus}</p>} */}
      </div>
    </>
  );
};

export default VideoRecorder;
