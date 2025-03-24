"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";  // ✅ Import useRouter

const First = () => {
  const router = useRouter(); // ✅ Initialize Router

  return (
    <div className="relative w-full min-h-screen bg-[#F9F7F2] flex flex-col items-center px-4 md:px-12">
      <div className="fixed top-3 z-20 w-full max-w-[1208px] h-[85px] mt-6 bg-white border border-black shadow-md rounded-full flex items-center justify-between px-6 md:px-10">
        <div className="flex items-center">
          <Image src="/logo.png" alt="logo" width={42} height={42} />
          <h1 className="ml-2 text-lg md:text-2xl font-Antic text-transparent bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] bg-clip-text">
            Oraculum
          </h1>
        </div>
        <nav className="flex gap-6 md:gap-10">
          {["Home", "About", "Features", "Contact us"].map((item, index) => (
            <p
              key={index}
              className="text-sm md:text-lg font-Antic text-transparent bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] bg-clip-text cursor-pointer"
            >
              {item}
            </p>
          ))}
        </nav>
      </div>
      <div className="absolute top-[25%] left-0 w-full h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-40"></div>
      <div className="absolute top-[40%] left-0 w-full h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-30"></div>
      <div className="absolute top-[55%] left-0 w-full h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-20"></div>
      <div className="absolute top-[70%] left-0 w-full h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-10"></div>
      <div className="absolute top-[85%] right-0 w-1/2 h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-10"></div>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mt-16">
        <div className="w-full md:w-1/2 text-center">
          <h2 className="text-4xl md:text-7xl text-left font-Convergence text-[#4C2E15] drop-shadow-lg leading-10">
            CONFIDENCE THROUGH <br /> PRACTICE
          </h2>
          <p className="mt-4 text-lg md:text-2xl font-Antic text-left text-[#6C3E18]">
            Train with AI, refine your responses, and <br /> build confidence
            for your next <br /> interview.
          </p>

          {/* 🚀 Login Button with Navigation */}
          <div className="w-full flex justify-center">
            <button
              onClick={() => router.push("/signin")}  // ✅ Navigates to Login Page
              className="mt-8 w-48 md:w-64 h-12 md:h-16 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] shadow-lg flex justify-center items-center rounded-md cursor-pointer hover:opacity-80 transition"
            >
              <p className="text-lg md:text-2xl font-Antic text-white shadow-md">Login</p>
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-center mt-10 md:mt-0">
          <Image
            src="/professionalwoman.png"
            alt="Professional Woman"
            width={604}
            height={906}
            className="w-auto h-auto drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default First;
