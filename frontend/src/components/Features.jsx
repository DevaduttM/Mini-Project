import React from "react";
import Image from "next/image";

const Features = () => {
  const featureCards = [
    {
      id: "01",
      title: "AI-Powered Facial Analysis",
      points: [
        "Analyzes facial expressions to assess confidence, focus, and engagement.",
        "Detects emotions in real time and provides feedback on body language.",
      ],
    },
    {
      id: "02",
      title: "Speech Confidence Analysis",
      points: [
        "Evaluates tone, pace, and clarity of speech to assess confidence.",
        "Identifies hesitation and speech patterns with actionable insights.",
      ],
    },
    {
      id: "03",
      title: "Role-Based Question Generation",
      points: [
        "Generates personalized technical questions based on job role.",
        "Uses Mistral AI and Google API to ensure role-specific preparation.",
      ],
    },
  ];

  return (
    <section id="features" className="relative w-full overflow-hidden px-4 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_80%_at_0%_0%,#f6ece3_0%,#fbf7f2_100%)]" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#EED8C6]/35 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#E1C7B4] bg-[#FDF8F3] p-5 shadow-[0_18px_36px_-30px_rgba(67,37,13,0.4)] md:p-8">
          <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <p className="w-fit rounded-full border border-[#D8B9A0] bg-[#F7EADF] px-4 py-1 font-Convergence text-[10px] uppercase tracking-[0.16em] text-[#7A5638] md:text-xs">
                What Makes Oraculum Effective
              </p>
              <h2 className="mt-4 font-Antic text-3xl leading-tight text-[#43250D] md:text-5xl">
                Built to measure how you perform, not just what you know.
              </h2>
              <p className="mt-4 max-w-2xl font-Convergence text-sm leading-relaxed text-[#5E3D22] md:text-base">
                Oraculum captures real interview behavior across expression,
                speech, and content quality so each practice round delivers
                actionable insights.
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="relative h-[220px] overflow-hidden rounded-2xl border border-[#E5D0BF] md:h-[260px]">
                <Image
                  src="/featurepic.jpg"
                  alt="Interview analytics visual"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2919]/55 via-[#5E3D22]/25 to-transparent" />
                <p className="absolute bottom-3 left-3 rounded-full border border-[#f3dac8] bg-[#fff1e7]/90 px-3 py-1 font-Convergence text-[10px] uppercase tracking-[0.14em] text-[#5E3D22]">
                  Real-time Evaluation Signals
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#E6D2C2] bg-[#FFF9F4]">
          {featureCards.map((card, index) => (
            <article
              key={card.id}
              className={`grid grid-cols-1 gap-4 px-5 py-7 md:grid-cols-12 md:gap-6 md:px-7 ${
                index < featureCards.length - 1 ? "border-b border-[#E9D8CA]" : ""
              }`}
            >
              <div className="md:col-span-3">
                <p className="font-Convergence text-[10px] uppercase tracking-[0.16em] text-[#8A5A36] md:text-xs">
                  Feature {card.id}
                </p>
                <h3 className="mt-2 font-Antic text-2xl leading-tight text-[#43250D] md:text-3xl">
                  {card.title}
                </h3>
              </div>
              <div className="md:col-span-9">
                <ul className="space-y-2 font-Convergence text-sm leading-relaxed text-[#5E3D22] md:text-base">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8A5A36]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-[#D8BBA5] bg-gradient-to-r from-[#6A4224] to-[#43250D] px-6 py-8 text-[#FBF0E7] md:px-8 md:py-9">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="font-Convergence text-[10px] uppercase tracking-[0.18em] text-[#E8CAB3] md:text-xs">
                Performance Scoring
              </p>
              <h4 className="mt-2 font-Antic text-3xl leading-tight md:text-4xl">
                One scorecard across expression, speech, and answer quality.
              </h4>
            </div>
            <div className="md:col-span-4">
              <p className="font-Convergence text-sm leading-relaxed text-[#F3DED0] md:text-base">
                Track improvements over each session and focus on the exact
                signals that raise interview confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;