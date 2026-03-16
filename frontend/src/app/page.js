"use client"
import  {motion}  from "framer-motion";
import About from "@/components/About";
import First from "@/components/First";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full justify-center items-center flex bg-[#F9F7F2] flex-col overflow-hidden">
          <First />
          <About />
          <Features />
        </motion.div>
    </>
  );
}
