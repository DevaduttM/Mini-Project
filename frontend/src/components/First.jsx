"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

const First = () => {
  return (
    <div id = "home" className="relative w-full h-screen bg-[#F9F7F2] flex flex-col items-center overflow-hidden">
      <Navbar />
      <div className="absolute top-[25%] left-0 w-full h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-40"></div>
      <div className="absolute top-[40%] left-0 w-full h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-30"></div>
      <div className="absolute top-[55%] left-0 w-full h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-20"></div>
      <div className="absolute top-[70%] left-0 w-full h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-10"></div>
      <div className="absolute top-[85%] right-0 w-1/2 h-14 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] opacity-10"></div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mt-16">
        <div className="w-full md:w-1/2 text-center">
          <h2 className="text-4xl md:text-7xl text-left font-Convergence text-[#4C2E15] drop-shadow-lg leading-10">
            CONFIDENCE THROUGH <br /> PRACTICE
          </h2>
          <p className="mt-4 text-lg md:text-2xl font-Antic text-left text-[#6C3E18]">
            Train with AI, refine your responses, and <br /> build confidence
            for your next <br /> interview.
          </p>
          <div className="w-full flex justify-center">
            <div className="mt-8 w-48 md:w-64 h-12 md:h-16 bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6C3E18] shadow-lg flex justify-center items-center rounded-md cursor-pointer">
              <p className="text-lg md:text-2xl font-Antic text-white shadow-md">
                Login
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-center mt-10 md:mt-0 z-10">
          <Image
            src="/professionalwoman.png"
            alt="Professional Woman"
            width={604}
            height={906}
            className="w-auto h-auto drop-shadow-md"
          />
        </div>
        <Image
      src="/star.svg"
      alt="Star"
      width={100}
      height={100}
      className="absolute bottom-0 w-1/2 aspect-square right-[10rem]"
      />
      </div>
    </div>
  );
};

export default First;
