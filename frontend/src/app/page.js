"use client"
import Landing from "@/components/Landing";
import Image from "next/image";
import  {motion}  from "framer-motion";

export default function Home() {
  return (
    <>
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-screen h-screen justify-center items-center flex bg-[#F9F7F2]">
        <Landing />
      </motion.div>
    </>
  );
}
