import React from 'react'

const UploadPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Upload Your Interview Recording
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section - Image */}
          <div className="rounded-xl overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
              alt="Team meeting" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Right Section - Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6">
            <p className="text-lg text-gray-700 mb-4">Drag & Drop</p>
            <div className="text-gray-600 text-4xl">
              ↑
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage