"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

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
  const [loadingqn, setLoadingQn] = useState(false);
  const [Questions, setQuestions] = useState([]);
  const questionList = Array.isArray(Questions) ? Questions : [];

  const router = useRouter();

  // const Questions = [
  //   { qn1: "What are the key differences between Next.js and React?" },
  //   { qn2: "How does useEffect work in React and when should you use it?" },
  //   {
  //     qn3: "What are the advantages of using Docker in a web development project?",
  //   },
  //   { qn4: "Can you explain the concept of memoization in JavaScript?" },
  //   {
  //     qn5: "What are the different types of HTTP status codes and their meanings?",
  //   },
  // ];

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
      router.push("/results");
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

      if (nextIndex < questionList.length) {
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
  }, [videoBlob, questionList.length]);

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

  const handleStartInterview = async (jobRole) => {
    if (jobRole === "") {
      alert("Please enter your job role.");
      return;
    }
  
    setInitial(false);
    console.log("Job Role:", jobRole);
  
    try {
      setLoadingQn(true);
      const response = await axios.get("http://127.0.0.1:5000/question", {
        params: { job_role: jobRole }, 
      });
      const payload = response?.data?.questions;
      const normalizedQuestions = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.questions)
        ? payload.questions
        : [];

      setQuestions(normalizedQuestions);
      console.log("Questions:", normalizedQuestions);
      setLoadingQn(false);
      return normalizedQuestions;
    } catch (error) {
      console.error("Error fetching questions:", error.response?.data || error.message);
      setLoadingQn(false);
      return [];
    }
  };
  
  console.log("Upload Status:", uploadStatus);
  console.log(jobRole)

  return (
    <>
      {loading && <Loading message={"Saving Your Response ..."} />}
      {loadingqn && <Loading message={"Generating Questions ..."} />}
      <div className="relative min-h-screen w-screen overflow-hidden bg-[radial-gradient(160%_130%_at_8%_8%,#f8f2e8_0%,#f2eadf_30%,#e8eadf_58%,#dfe7e3_80%,#d8e2e8_100%)] text-[#1f1f1f]">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:linear-gradient(to_right,#5f5f5810_1px,transparent_1px),linear-gradient(to_bottom,#5f5f5810_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-[#e9cf9f]/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-8 h-96 w-96 rounded-full bg-[#9fc4d2]/30 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-[52%] h-72 w-72 -translate-y-1/2 rounded-full bg-[#bfd0b0]/24 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_38%,rgba(255,255,255,0.16)_100%)]" />

        <div
          className={`${
            initial ? "min-h-screen justify-center" : "pt-6 md:pt-10"
          } relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-36`}
        >
          <h1 className="text-center font-Convergence text-3xl leading-tight text-[#272727] drop-shadow-sm md:text-6xl">
            Interview Session
          </h1>
          <p className="mt-2 text-center font-Antic text-base text-[#4e4e48] md:text-xl">
            Run a realistic mock interview and receive analysis-ready video responses for each question.
          </p>

          <div
            className={`${
              initial
                ? "mt-8 flex w-full max-w-xl flex-col items-center gap-5 rounded-3xl border border-[#fff7]/ bg-[#ffffff8c] p-8 shadow-[0_24px_65px_-34px_rgba(20,28,40,0.6)] backdrop-blur-xl md:mt-10 md:p-10"
                : "mt-5 flex w-full flex-col gap-3 rounded-3xl border border-[#ffffff94] bg-[#ffffff80] px-4 py-4 shadow-[0_24px_65px_-34px_rgba(20,28,40,0.6)] backdrop-blur-xl md:px-6"
            }`}
          >
            <p
              className={`${
                initial ? "hidden" : "flex"
              } w-fit rounded-full border border-[#f6edd9] bg-[#f6edd9] px-3 py-1 text-sm font-Convergence tracking-wide text-[#5c5a51] md:text-base`}
            >
              {`Qn ${qnIndex + 1}/${questionList.length}`}
            </p>

            <p
              className={`${
                initial ? "hidden" : "flex"
              } text-center font-Antic text-xl text-[#212121] md:text-3xl`}
            >
              {qnIndex === -1
                ? "Interview Questions"
                : questionList[qnIndex]}
            </p>

            <p
              className={`${
                initial ? "flex" : "hidden"
              } text-center font-Antic text-2xl text-[#1f1f1f] md:text-3xl`}
            >
              Enter Your Job Role
            </p>

            <input
              type="text"
              className={`${
                initial ? "flex" : "hidden"
              } h-12 w-full max-w-md rounded-xl border border-[#d8d2c2] bg-[#fdfcf9] px-4 text-lg text-gray-800 outline-none transition duration-200 placeholder:text-[#a69d89] focus:border-[#7a9578] focus:ring-4 focus:ring-[#9db88f]/25`}
              placeholder="e.g. Frontend Developer"
              onChange={(e) => setJobRole(e.target.value)}
            />

            <button
              className={`${
                initial ? "flex" : "hidden"
              } rounded-xl bg-[#5e758f] px-7 py-3 font-Convergence text-white shadow-[0_10px_24px_-14px_rgba(16,30,55,0.9)] transition duration-200 hover:scale-[1.02] hover:bg-[#4f657d] active:scale-[0.99]`}
              onClick={(e) => handleStartInterview(jobRole)}
            >
              Start Interview
            </button>
          </div>

          <div
            className={`${
              initial ? "hidden" : "mt-6 flex"
            } relative w-full max-w-4xl justify-center`}
          >
            <div className="relative w-full rounded-3xl border border-[#ffffff9f] bg-[#ffffff8a] p-3 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.58)] backdrop-blur-xl md:p-5">
              <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-[#f1ead9] bg-[#f1ead9] px-3 py-1 text-xs font-Convergence tracking-wide text-[#6d6659]">
                Live Preview
              </div>
              {error && (
                <p className="mb-3 rounded-lg border border-red-300 bg-red-100/70 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-[300px] w-full rounded-2xl border border-[#fff8] bg-[#111] object-cover ring-4 ring-[#ffffff7a] md:h-[430px]"
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            initial ? "hidden" : "flex"
          } fixed bottom-5 left-0 z-20 w-full justify-center px-4`}
        >
          <div className="flex w-full max-w-3xl flex-col items-center gap-3 rounded-2xl border border-[#ffffff96] bg-[#ffffff86] p-4 shadow-[0_22px_55px_-34px_rgba(0,0,0,0.75)] backdrop-blur-xl md:flex-row md:justify-center">
            {capturing ? (
              <>
                <button
                  className="w-full rounded-xl bg-[#cf4747] px-5 py-3 font-Convergence text-white shadow-[0_10px_24px_-14px_rgba(128,20,20,0.8)] transition duration-200 hover:scale-[1.02] hover:bg-[#b83d3d] active:scale-[0.99] md:w-auto"
                  onClick={handleStopAllCapture}
                >
                  Stop Capture
                </button>
                <button
                  className={`${
                    qnIndex >= questionList.length - 1 ? "hidden" : "flex"
                  } w-full items-center justify-center rounded-xl bg-[#3a8fca] px-5 py-3 font-Convergence text-white shadow-[0_10px_24px_-14px_rgba(14,60,125,0.7)] transition duration-200 hover:scale-[1.02] hover:bg-[#327cb0] active:scale-[0.99] md:w-auto`}
                  onClick={handleNextCapture}
                >
                  Next (Upload & Record)
                </button>
              </>
            ) : (
              <button
                className="w-full rounded-xl bg-[#5f7c97] px-6 py-3 font-Convergence text-white shadow-[0_10px_24px_-14px_rgba(16,30,55,0.9)] transition duration-200 hover:scale-[1.02] hover:bg-[#506984] active:scale-[0.99] md:w-auto"
                onClick={handleStartCapture}
              >
                Start Capture
              </button>
            )}

            {uploadStatus && (
              <p className="text-center text-sm font-Convergence text-[#4e4c45] md:ml-2">
                {uploadStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoRecorder;
