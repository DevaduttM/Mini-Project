"use client"
import Landing from "@/components/Landing";
import Image from "next/image";
import  {motion}  from "framer-motion";
import About from "@/components/About";
import First from "@/components/First";
export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-screen justify-center items-center flex bg-[#F9F7F2] flex-col overflow-x-hidden">
        <First />
        <About />
      </motion.div>
  );
}
