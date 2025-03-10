import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="absolute top-[-8rem] w-full h-screen flex justify-center items-center">
        <div className="w-[90vw] h-[55vh] rounded-3xl relative overflow-hidden">
          <Image
            src="/landing_img.jpeg"
            alt="Landing Image"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-[90vw] h-[25%] rounded-3xl absolute bottom-10 flex justify-between items-center">
        <div className="w-[20%] h-[98%] rounded-3xl relative overflow-hidden">
            <Image
                src="/landing_img2.jpeg"
                alt="Landing Image"
                fill
                className="object-cover"
            />
        </div>
        <div className="w-[70%] h-[98%] rounded-3xl bg-gradient-to-r from-[#EFEBE2] via-[#DAAF88] to-[#6c3e185d] relative overflow-hidden flex justify-center items-center">
            <h1 className="font-Antic text-[#43250D] text-5xl">Unlock Your Interview Potential with AI-Powered Insights</h1>
      </div>
    </div>
    </>
  );
};

export default Landing;
