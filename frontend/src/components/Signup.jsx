"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";

const Signup = ({ onSignup, onGoogleSignup, loading, error }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSignup(email, password);
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-[#F9F7F2]">
            <div className="pointer-events-none absolute -left-16 top-8 h-72 w-72 rounded-full bg-[#EED9C8]/55 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#D7A883]/35 blur-3xl" />

            <div className="relative mx-auto grid min-h-screen w-[94vw] max-w-7xl grid-cols-1 gap-8 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
                <aside className="relative hidden overflow-hidden rounded-[2rem] border border-[#E2C9B6] bg-[#FFF6EE] shadow-[0_22px_48px_-34px_rgba(67,37,13,0.6)] lg:col-span-6 lg:flex">
                    <div className="relative h-full w-full">
                        <div className="absolute inset-0 bg-[url('/signup_img.jpeg')] bg-cover bg-center" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3B2313]/60 via-[#3B2313]/20 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-[#f2d8c4] bg-[#fff3e8]/88 p-5 backdrop-blur-sm">
                            <p className="font-Convergence text-[10px] uppercase tracking-[0.16em] text-[#f2a57c] md:text-xs">
                                Join Oraculum
                            </p>
                            <h2 className="mt-2 font-Antic text-4xl leading-tight text-white">
                                Build confidence before the real interview.
                            </h2>
                            <p className="mt-3 font-Convergence text-sm leading-relaxed text-[#f2a57c]">
                                Create your account to access role-based mock interviews and
                                analysis-driven feedback.
                            </p>
                        </div>
                    </div>
                </aside>

                <section className="flex items-center justify-center lg:col-span-6">
                    <div className="w-full max-w-lg rounded-[2rem] border border-[#DEC4AF] bg-[#FFF9F4] p-6 shadow-[0_20px_44px_-32px_rgba(67,37,13,0.65)] md:p-8">
                       
                        <h1 className="mt-4 font-Antic text-4xl text-[#5E3D22] md:text-5xl">
                            Sign Up
                        </h1>
                        <p className="mt-2 font-Convergence text-sm text-[#7A5638] md:text-base">
                            Start practicing smarter interviews with AI.
                        </p>

                        {error && (
                            <p className="mt-4 rounded-xl border border-red-300 bg-red-100/70 px-3 py-2 text-sm text-red-700">
                                {error}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                            <button
                                type="button"
                                onClick={onGoogleSignup}
                                className="flex h-12 items-center justify-center gap-3 rounded-xl border border-[#D8C2AF] bg-white text-[#3f2a19] transition hover:bg-[#f9f2ea] disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={loading}
                            >
                                <FcGoogle className="text-2xl" />
                                <span className="font-Convergence text-sm md:text-base">
                                    {loading ? "Signing up..." : "Sign Up with Google"}
                                </span>
                            </button>

                            <div className="relative flex items-center py-1">
                                <div className="h-px w-full bg-[#E7D5C7]" />
                                <span className="mx-3 shrink-0 font-Convergence text-xs uppercase tracking-[0.14em] text-[#96745a]">
                                    or
                                </span>
                                <div className="h-px w-full bg-[#E7D5C7]" />
                            </div>

                            <input
                                className="h-12 rounded-xl border border-[#E3CDBB] bg-[#fff3ea] px-4 text-sm text-[#3f2a19] outline-none transition placeholder:text-[#ad8b72] focus:border-[#B78663] focus:ring-4 focus:ring-[#d9b49133] md:text-base"
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                className="h-12 rounded-xl border border-[#E3CDBB] bg-[#fff3ea] px-4 text-sm text-[#3f2a19] outline-none transition placeholder:text-[#ad8b72] focus:border-[#B78663] focus:ring-4 focus:ring-[#d9b49133] md:text-base"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                className={`mt-1 h-12 rounded-xl bg-[#c97a62] font-Convergence text-sm uppercase tracking-[0.12em] text-white transition hover:bg-[#a35a48] md:text-base ${
                                    loading ? "cursor-not-allowed opacity-50" : ""
                                }`}
                                disabled={loading}
                            >
                                {loading ? "Signing up..." : "Sign Up"}
                            </button>
                        </form>

                        <p className="mt-5 text-center text-sm text-[#5e3d22] md:text-base">
                            Already have an account?
                            <Link href="/signin" className="ml-1 text-[#8e4c39] hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Signup;
