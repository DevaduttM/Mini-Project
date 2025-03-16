"use client"; // Required for Next.js App Router
import Signin from "../../components/Login";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { loginUser, loginWithGoogle } from "@/firebaseconfig"; 
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle email/password login
  const handleLogin = async (email, password) => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("⚠️ Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const user = await loginUser(email, password);
      console.log("✅ User logged in:", user);
      alert("🎉 Login Successful!");
      router.replace("/home"); // Replaces history to prevent back navigation
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      setError("⚠️ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  //  Function to handle Google Sign-In
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const user = await loginWithGoogle();
      console.log("✅ Google Sign-In Successful:", user);
      alert("🎉 Google Sign-In Successful!");
      router.replace("/home"); // 
    } catch (error) {
      console.error("❌ Google Sign-In Error:", error.message);
      setError("⚠️ Google Sign-In failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-screen h-screen flex justify-center items-center bg-[#F9F7F2]"
    >    
      {/* Passing authentication functions to Signin component */}
      <Signin 
        onLogin={handleLogin} 
        onGoogleLogin={handleGoogleLogin} 
        loading={loading} 
        error={error} 
      />
    </motion.div>
  );
};

export default Page;
