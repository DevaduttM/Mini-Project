import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";

const Landing = () => {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto bg-[#FBF0E7]">
        <div className="pointer-events-none absolute -left-24 top-6 h-72 w-72 rounded-full bg-[#DAAF88]/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-[#D28066]/20 blur-3xl" />

        <section
          id="home"
          className="relative mx-auto grid w-[92vw] max-w-7xl grid-cols-1 items-center gap-8 pb-10 pt-36 md:pt-44 lg:grid-cols-2"
        >
          <div>
            <p className="mb-3 w-fit rounded-full border border-[#D8B8A1] bg-[#F7E8DD] px-4 py-1 font-Convergence text-xs uppercase tracking-[0.2em] text-[#5E3D22]">
              Mock Interview Analysis
            </p>
            <h1 className="font-Antic text-4xl leading-[1.08] text-[#43250D] md:text-6xl">
              Practice Better, Perform Better
            </h1>
            <p className="mt-4 max-w-xl font-Convergence text-base leading-relaxed text-[#5E3D22]">
              Role-based interview questions, seamless video response capture,
              and insights that help you improve with every attempt.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/interview-session"
                className="inline-flex items-center justify-center rounded-full bg-[#5E3D22] px-7 py-3 font-Convergence text-sm uppercase tracking-[0.14em] text-[#FBF0E7] transition duration-200 hover:bg-[#43250D]"
              >
                Start Session
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-[#A46F49] bg-[#FBF0E7]/80 px-7 py-3 font-Convergence text-sm uppercase tracking-[0.14em] text-[#5E3D22] transition duration-200 hover:bg-[#F4E0D2]"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[#E8D3C4] bg-[#F7E8DD] p-3 shadow-[0_20px_50px_-35px_rgba(56,29,9,0.7)] md:p-4">
            <div className="relative h-[320px] overflow-hidden rounded-[1.6rem] md:h-[460px]">
              <Image
                src="/landing_img.jpeg"
                alt="Mock interview candidate in session"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f1b0f]/35 to-transparent" />
            </div>
          </div>
        </section>

        <section id="about" className="relative mx-auto w-[92vw] max-w-7xl py-8 md:py-12">
          <div className="grid grid-cols-1 gap-5 rounded-3xl border border-[#E4CDBB] bg-[#FFF8F2] p-6 shadow-[0_16px_40px_-30px_rgba(67,37,13,0.45)] md:grid-cols-12 md:p-8">
            <div className="md:col-span-8">
              <p className="font-Convergence text-xs uppercase tracking-[0.14em] text-[#8A5A36]">
                How It Works
              </p>
              <h2 className="mt-2 font-Antic text-3xl text-[#43250D] md:text-4xl">
                Simple workflow, clear outcomes.
              </h2>
              <p className="mt-3 max-w-3xl font-Convergence text-sm leading-relaxed text-[#5E3D22] md:text-base">
                Choose your role, answer interview questions on camera, and get
                structured analysis to improve confidence and delivery.
              </p>
            </div>
            <div className="md:col-span-4 flex items-center justify-center">
              <div className="rounded-2xl border border-[#E8D5C8] bg-[#FBF0E7] p-4">
                <p className="font-Antic text-2xl text-[#43250D]">3-Step Flow</p>
                <p className="mt-1 font-Convergence text-sm text-[#5E3D22]">
                  Select role, record responses, review analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative mx-auto w-[92vw] max-w-7xl py-2 md:py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="group rounded-2xl border border-[#E8D5C8] bg-[#FFF9F4] px-5 py-5 transition duration-200 hover:-translate-y-1 hover:border-[#D9B89E]">
              <p className="font-Convergence text-xs uppercase tracking-[0.14em] text-[#8A5A36]">
                Feature 01
              </p>
              <p className="mt-2 font-Antic text-2xl text-[#43250D]">Role-Based Prompts</p>
              <p className="mt-2 font-Convergence text-sm text-[#5E3D22]">
                Questions tailored to your target role.
              </p>
            </article>
            <article className="group rounded-2xl border border-[#E8D5C8] bg-[#FFF9F4] px-5 py-5 transition duration-200 hover:-translate-y-1 hover:border-[#D9B89E]">
              <p className="font-Convergence text-xs uppercase tracking-[0.14em] text-[#8A5A36]">
                Feature 02
              </p>
              <p className="mt-2 font-Antic text-2xl text-[#43250D]">Video Responses</p>
              <p className="mt-2 font-Convergence text-sm text-[#5E3D22]">
                Capture authentic delivery, tone, and pacing.
              </p>
            </article>
            <article className="group rounded-2xl border border-[#E8D5C8] bg-[#FFF9F4] px-5 py-5 transition duration-200 hover:-translate-y-1 hover:border-[#D9B89E]">
              <p className="font-Convergence text-xs uppercase tracking-[0.14em] text-[#8A5A36]">
                Feature 03
              </p>
              <p className="mt-2 font-Antic text-2xl text-[#43250D]">Analysis Insights</p>
              <p className="mt-2 font-Convergence text-sm text-[#5E3D22]">
                Use feedback to improve every next round.
              </p>
            </article>
          </div>
        </section>

        <section id="contact" className="relative mx-auto w-[92vw] max-w-7xl pb-16 pt-8 md:pb-20">
          <div className="rounded-3xl border border-[#DDBDA4] bg-gradient-to-r from-[#5E3D22] to-[#43250D] px-6 py-9 text-[#FBF0E7] md:px-8 md:py-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-Convergence text-xs uppercase tracking-[0.16em] text-[#E8CBB5]">
                  Start Now
                </p>
                <p className="mt-1 font-Antic text-2xl md:text-4xl">
                  Ready for your next mock interview?
                </p>
              </div>
              <Link
                href="/interview-session"
                className="inline-flex w-fit items-center justify-center rounded-full bg-[#FBF0E7] px-7 py-3 font-Convergence text-xs uppercase tracking-[0.14em] text-[#43250D] transition duration-200 hover:bg-[#F4E1D3]"
              >
                Begin Session
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Landing;
