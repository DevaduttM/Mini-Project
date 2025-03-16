"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { loginUser, loginWithGoogle } from "../firebaseconfig"; 

const Signin = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 📌 Function to handle email/password login
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !password) {
            setError("⚠️ All fields are required.");
            setLoading(false);
            return;
        }

        try {
            const user = await loginUser(email, password);
            console.log("✅ User logged in:", user);
            alert("🎉 Login Successful!");
            router.replace('/home'); // ✅ Redirect to home
        } catch (error) {
            console.error("❌ Login Error:", error.message);
            setError("⚠️ Invalid email or password. Try again.");
        }

        setLoading(false);
    };

    // 📌 Function to handle Google Sign-In
    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const user = await loginWithGoogle();
            console.log("✅ Google Sign-In Successful:", user);
            alert("🎉 Google Sign-In Successful!");
            router.replace('/home'); // ✅ Redirect to home
        } catch (error) {
            console.error("❌ Google Login Error:", error.message);
            setError("⚠️ Google Sign-In failed. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-[#F9F7F2]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleEmailLogin}>
                    {/* Email Input */}
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email" 
                        className="border p-2 w-full mb-3 rounded focus:ring focus:ring-blue-300"
                        required
                    />

                    {/* Password Input */}
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password" 
                        className="border p-2 w-full mb-3 rounded focus:ring focus:ring-blue-300"
                        required
                    />

                    {/* Login Button */}
                    <button 
                        type="submit"
                        className={`bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Sign In"}
                    </button>
                </form>

                {/* Google Sign-In Button */}
                <button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2 hover:bg-blue-600 transition mt-2"
                    disabled={loading}
                >
                    <FcGoogle className="text-xl" />
                    {loading ? "Signing in..." : "Sign in with Google"}
                </button>

                {/* Signup Redirect Link */}
                <p className="text-center text-sm mt-3">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline cursor-pointer">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;

