"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const First = () => {
  const router = useRouter();

  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden bg-[#F9F7F2]">
      <div className="pointer-events-none absolute -left-20 top-6 h-72 w-72 rounded-full bg-[#E9D6C5]/65 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#D9B18B]/45 blur-3xl" />

      <div className="relative mx-auto flex w-[92vw] max-w-7xl flex-col justify-center py-20 md:py-24">

        <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 mt-16">
          <div>
            <p className="w-fit rounded-full border border-[#D6BCA6] bg-[#F5ECE3] px-4 py-1 font-Convergence text-xs uppercase tracking-[0.16em] text-[#5E3D22]">
              AI Interview Preparation
            </p>

            <h2 className="mt-5 font-Convergence text-4xl leading-[1.06] text-[#4C2E15] md:text-7xl">
              Confidence Through Practice
            </h2>

            <p className="mt-5 max-w-xl font-Antic text-xl leading-relaxed text-[#6C3E18] md:text-2xl">
              Train with realistic mock interviews, improve delivery, and step
              into your next interview fully prepared.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => router.push("/signin")}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#5E3D22] px-8 font-Antic text-xl text-white shadow-[0_14px_30px_-20px_rgba(67,37,13,0.8)] transition duration-200 hover:bg-[#492b14]"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#EFEBE2] via-[#DAAF88]/70 to-[#6C3E18]/35 blur-2xl" />
            <div className="relative h-[390px] md:h-[600px]">
              <Image
                src="/professionalwoman.png"
                alt="Professional woman prepared for interview"
                fill
                className="object-contain object-bottom drop-shadow-[0_22px_36px_rgba(67,37,13,0.32)]"
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default First;
