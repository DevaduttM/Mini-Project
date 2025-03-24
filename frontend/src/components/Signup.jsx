"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';  
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";

const Signup = ({ onSignup, onGoogleSignup, loading, error }) => {
    const router = useRouter();  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 📌 Function to handle signup submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSignup(email, password); // Calls the actual signup function
    };

    return (
        <div className="w-screen h-screen flex justify-start items-center bg-[#F9F7F2]">
            <div className="md:flex hidden w-1/2 h-screen bg-[url('/signup_img.jpeg')] bg-cover bg-center" />
            <div className="h-screen md:w-1/2 w-full flex justify-center items-center md:bg-none bg-[url('/signup_img.jpeg')] bg-cover bg-center">
                <div className="h-3/4 lg:w-[60%] w-[80%] flex justify-end items-center border-2 border-[#5E3D22] rounded-2xl flex-col py-5 md:bg-none bg-[#F9F7F2]">
                    <h1 className="font-Antic text-[#5E3D22] text-4xl">Sign Up</h1>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-[90%] w-[100%] gap-5">
                        {/* Google Sign-Up Button */}
                        <button 
                            type="button" 
                            onClick={onGoogleSignup} 
                            className="w-[80%] h-[10%] text-black border-[1px] border-[#000000] rounded-xl flex items-center justify-center gap-4 mb-5 hover:bg-gray-200 transition"
                            disabled={loading}
                        >
                            <FcGoogle className="text-2xl" /> 
                            {loading ? "Signing up..." : "Sign Up with Google"}
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

                        {/* Redirect to Login */}
                        <h2 className="text-black p-1 text-sm lg:text-[1rem]">
                            Already have an account?{" "}
                            <Link href="/signin" className="text-blue-500 cursor-pointer hover:underline"> Sign In</Link>
                        </h2>

                        {/* Sign Up Button */}
                        <button 
                            type="submit"
                            className={`w-[80%] h-[10%] rounded-2xl px-5 text-white text-sm lg:text-lg bg-[#c97a62] focus:border-[#5E3D22] cursor-pointer hover:bg-[#a35a48] transition ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
