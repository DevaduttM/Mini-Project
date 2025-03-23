"use client";
import First from "@/components/First"; // Import First instead of Landing
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-screen h-screen justify-center items-center flex bg-[#F9F7F2] flex-col"
    >
      <First /> {/* Render First component */}
    </motion.div>
  );
}
