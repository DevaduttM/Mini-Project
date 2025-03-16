"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';  
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseconfig"; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signup = () => {
    const router = useRouter();  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 📌 Function to handle email/password login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !password) {
            setError("⚠️ All fields are required.");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ User logged in:", userCredential.user);
            alert("🎉 Login Successful!");
            setTimeout(() => router.replace("/home"), 500); // ✅ Smooth redirection
        } catch (error) {
            console.error("❌ Login Error:", error.message);
            setError("⚠️ Invalid email or password. Try again.");
        }

        setLoading(false);
    };

    // 📌 Function to handle Google Sign-In
    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("✅ Google Sign-In User:", result.user);
            alert("🎉 Google Sign-In Successful!");
            setTimeout(() => router.replace("/home"), 500); // ✅ Smooth redirection
        } catch (error) {
            console.error("❌ Google Sign-In Error:", error.message);
            setError("⚠️ Google Sign-In failed. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="w-screen h-screen flex justify-start items-center bg-[#F9F7F2]">
            <div className="md:flex hidden w-1/2 h-screen bg-[url('/signup_img.jpeg')] bg-cover bg-center" />
            <div className="h-screen md:w-1/2 w-full flex justify-center items-center md:bg-none bg-[url('/signup_img.jpeg')] bg-cover bg-center">
                <div className="h-3/4 lg:w-[60%] w-[80%] flex justify-end items-center border-2 border-[#5E3D22] rounded-2xl flex-col py-5 md:bg-none bg-[#F9F7F2]">
                    <h1 className="font-Antic text-[#5E3D22] text-4xl">Log In</h1>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-[90%] w-[100%] gap-5">
                        {/* Google Sign-In Button */}
                        <button 
                            type="button" 
                            onClick={handleGoogleLogin} 
                            className="w-[80%] h-[10%] text-black border-[1px] border-[#000000] rounded-xl flex items-center justify-center gap-4 mb-5 hover:bg-gray-200 transition"
                            disabled={loading}
                        >
                            <FcGoogle className="text-2xl" /> 
                            {loading ? "Signing in..." : "Sign In with Google"}
                        </button>

                        {/* Email Input */}
                        <input 
                            className="w-[80%] h-[10%] rounded-2xl px-5 text-black text-sm lg:text-lg bg-[#f7c9bb] focus:border-[#5E3D22]"
                            type="email" 
                            placeholder="Enter Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* Password Input */}
                        <input 
                            className="w-[80%] h-[10%] rounded-2xl px-5 text-black text-sm lg:text-lg bg-[#f7c9bb] focus:border-[#5E3D22]" 
                            type="password" 
                            placeholder="Enter Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {/* Redirect to Sign Up */}
                        <h2 className="text-black p-1 text-sm lg:text-[1rem]">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-blue-500 cursor-pointer hover:underline"> Sign Up</Link>
                        </h2>

                        {/* Login Button */}
                        <button 
                            type="submit"
                            className={`w-[80%] h-[10%] rounded-2xl px-5 text-white text-sm lg:text-lg bg-[#c97a62] focus:border-[#5E3D22] cursor-pointer hover:bg-[#a35a48] transition ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
