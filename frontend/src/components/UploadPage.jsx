"use client";
import React, { useState, useRef } from "react";
import { CloudUpload } from "lucide-react";

const UploadPage = () => {
  const [file, setFile] = useState("");
  const fileInputRef = useRef("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F7F3F0] p-6">
      <div className="bg-white shadow-md rounded-xl h-[90%] p-6 w-full max-w-4xl border border-gray-300 relative">
        <h2 className="text-center text-xl font-serif text-[#A5755F] mb-4 border-b pb-2 tracking-wide ">
          <span className="border px-4 py-1 font-Antic rounded-full border-[#A5755F]">
            Upload Your Interview Recording
          </span>
        </h2>

        <div className="grid grid-cols-1 h-3/4 md:grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden border-2 bg-[url('/upload_img.jpg')] bg-cover p-1"></div>

          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed cursor-pointer border-gray-400 rounded-xl flex flex-col items-center justify-center p-6 bg-[#FDFBFA] shadow-sm relative"
          >
            <p className="text-lg text-gray-700 mb-4 font-serif">
              Upload Video
            </p>
            <div className="text-[#723B29] mb-4">
              <CloudUpload className="text-[3rem] text-black" />
            </div>
            <div className="border border-gray-400 rounded-md w-36 h-20 flex justify-center items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="w-full hidden"
              />
            </div>
            <p className="text-black">
              {file ? file.name : "No file selected"}
            </p>
            <button
              className="w-[30%] h-10 text-black bg-[#dfb8a6] mt-5 rounded-xl"
              onClick={handleFileUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
