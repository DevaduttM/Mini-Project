import React from 'react';
import {CloudUpload} from "lucide-react"

const UploadPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F7F3F0] p-6">
      <div className="bg-white shadow-md rounded-xl h-[90%] p-6 w-full max-w-4xl border border-gray-300 relative">
        {/* Header */}
        <h2 className="text-center text-xl font-serif text-[#A5755F] mb-4 border-b pb-2 tracking-wide ">
          <span className="border px-4 py-1 font-Antic rounded-full border-[#A5755F]">Upload Your Interview Recording</span>
        </h2>
        
        <div className="grid grid-cols-1 h-3/4 md:grid-cols-2 gap-6">
          {/* Left Section - Image */}
          <div className="rounded-xl overflow-hidden border-2 bg-[url('/upload_img.jpg')] bg-cover p-1">
          </div>
          
          {/* Right Section - Upload Box */}
          <div className="border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center p-6 bg-[#FDFBFA] shadow-sm relative">
            <p className="text-lg text-gray-700 mb-4 font-serif">Drag & Drop</p>
            <div className="text-[#723B29] mb-4">
            <CloudUpload className='text-[3rem] text-black'/>
            </div>
            <div className="border border-gray-400 rounded-md w-36 h-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;