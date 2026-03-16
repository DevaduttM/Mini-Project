import React from "react";

const About = () => {
  return (
    <section id="about" className="relative w-full px-4 py-16 md:py-24">
      <div className="pointer-events-none absolute left-0 top-12 h-56 w-56 rounded-full bg-[#EFDCCB]/55 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-0 h-64 w-64 rounded-full bg-[#D9B18B]/35 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 rounded-3xl border border-[#E4CDBB] bg-[#FFF9F4]/95 p-5 shadow-[0_18px_45px_-34px_rgba(67,37,13,0.55)] md:grid-cols-12 md:gap-8 md:p-8">
        <div className="md:col-span-5">
          <div className="relative h-[280px] overflow-hidden rounded-2xl md:h-full md:min-h-[360px]">
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
              alt="Interview preparation and collaboration"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F1B0F]/35 via-transparent to-transparent" />
            <div className="absolute left-3 top-3 rounded-full border border-[#f4d8c2] bg-[#fff1e7]/90 px-3 py-1 font-Convergence text-[10px] uppercase tracking-[0.14em] text-[#5E3D22] md:text-xs">
              About Oraculum
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-7">
          <p className="w-fit rounded-full border border-[#D7BBA4] bg-[#F8EDE4] px-4 py-1 font-Convergence text-[10px] uppercase tracking-[0.16em] text-[#7A5638] md:text-xs">
            Mock Interview Platform
          </p>

          <h2 className="mt-4 font-Antic text-3xl leading-tight text-[#43250D] md:text-5xl">
            Built to turn interview practice into real progress.
          </h2>

          <p className="mt-4 max-w-2xl font-Convergence text-sm leading-relaxed text-[#5E3D22] md:text-base">
            Oraculum combines role-based mock questions with voice and facial
            response analysis to help you understand how you communicate under
            interview conditions.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E8D5C8] bg-white/80 px-4 py-3">
              <p className="font-Convergence text-[10px] uppercase tracking-[0.14em] text-[#8A5A36]">
                Step 01
              </p>
              <p className="mt-1 font-Antic text-xl text-[#43250D]">Generate</p>
            </div>
            <div className="rounded-xl border border-[#E8D5C8] bg-white/80 px-4 py-3">
              <p className="font-Convergence text-[10px] uppercase tracking-[0.14em] text-[#8A5A36]">
                Step 02
              </p>
              <p className="mt-1 font-Antic text-xl text-[#43250D]">Respond</p>
            </div>
            <div className="rounded-xl border border-[#E8D5C8] bg-white/80 px-4 py-3">
              <p className="font-Convergence text-[10px] uppercase tracking-[0.14em] text-[#8A5A36]">
                Step 03
              </p>
              <p className="mt-1 font-Antic text-xl text-[#43250D]">Improve</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
