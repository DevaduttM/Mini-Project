import React from 'react'

const About = () => {
  return (
<div id="about" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-xl p-6 w-full h-3/4 flex items-center justify-center max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Section - Image */}
          <div className="rounded-xl overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg" 
              alt="Team collaboration" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Right Section - Text */}
          <div className="text-gray-800">
            <h2 className="text-3xl font-Antic text-[#5E3D22] mb-4">About Us</h2>
            <p className="text-lg font-Antic tracking-wider">
              Oraculum is an AI-powered mock interview platform that analyzes speech, expressions, and responses to provide real-time insights and feedback, helping you interview with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About