"use client";
import Signup from "@/components/Signup";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { signupUser, loginWithGoogle } from "@/firebaseconfig"; 
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 📌 Function to handle email/password signup
  const handleSignup = async (email, password) => {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("⚠️ Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const user = await signupUser(email, password);
      console.log("✅ User signed up:", user);
      alert("🎉 Signup Successful!");
      router.replace("/home"); // ✅ Prevents users from going back to signup after signup
    } catch (error) {
      console.error("❌ Signup Error:", error.message);
      setError("⚠️ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Function to handle Google Sign-Up
  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const user = await loginWithGoogle();
      console.log("✅ Google Sign-In Successful:", user);
      alert("🎉 Google Sign-In Successful!");
      router.replace("/home"); // ✅ Prevents users from going back to signup after Google sign-in
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
      {/* Passing authentication functions to Signup component */}
      <Signup 
        onSignup={handleSignup} 
        onGoogleSignup={handleGoogleSignup} 
        loading={loading} 
        error={error} 
      />
    </motion.div>
  );
};

export default Page;
