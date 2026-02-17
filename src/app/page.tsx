"use client";
import React, { useState } from "react";
import { AlertCircle, TrendingUp, Ban } from "lucide-react";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden selection:bg-blue-500/30">
      <div className="relative z-10 mx-auto px-6 pt-10 pb-24">
        {/* Navigation / Logo */}
        <nav className="lg:mb-30 lg:ms-20">
          <img src="/logo.png" className="w-18 lg:w-20 " alt="" />
        </nav>

        {/* Hero Content */}
        <section className="flex flex-col items-center text-center">
          <div className="lg:mb-15 w-50">
            <img src="/wait.png" alt="" />
          </div>

          <h1 className="mb-5 max-w-4xl text-4xl  font-bold md:text-5xl">
            Finance without borders.
          </h1>
          <h1 className="mb-5 max-w-4xl text-4xl  font-bold md:text-5xl">
            <span className="text-white/90   ">
              Crypto that works in real life.
            </span>
          </h1>

          <p className="mb-15 max-w-150 text-lg ">
            Nodexpay is Africa's first multi-chain crypto utility app — buy,
            send, and spend crypto directly from your bank. No exchanges. No
            friction.
          </p>

          {/* Input Group */}
          <div className="mb-10 w-170 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 rounded-3xl border  border-white/10 bg-white/7   p-4  outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
            />
            <button className="rounded-xl bg-blue-900/60 text-xl text-gray-500 px-3 py-4 hadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-900 active:scale-95">
              Join the waitlist
            </button>
          </div>

          {/* Social Proof */}
          {/* <div className="mb-32 flex items-center gap-3">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="h-9 w-9 rounded-full border-2 border-[#0a0a0a] bg-gradient-to-tr from-gray-700 to-gray-400" />
               ))}
            </div>
            <p className="text-sm text-gray-400 font-medium">Join + 500 others</p>
          </div> */}
          <div className="mb-50 mt-10  mx-auto">
            <img src="/join.png" alt="" />
          </div>
          {/* Problem Section (Cards from image 2) */}
      <section className="bg-[#050505] py-20 px-6 red">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-20 text-center text-3xl font-bold tracking-tight text-white">
          Crypto access in Africa is broken.
        </h2>

        <div className="grid gap-16 md:grid-cols-3 md:gap-8">
          <ProblemCard
            icon={<AlertCircle size={24} strokeWidth={2.5} />}
            title="Hard to buy crypto without exchanges"
            desc="Most platforms rely on exchanges and unreliable P2P systems."
          />
          <ProblemCard
            icon={<TrendingUp size={24} strokeWidth={2.5} />}
            title="High fees & friction"
            desc="Multiple steps, swaps, and delays make simple transactions stressful."
          />
          <ProblemCard
            icon={<Ban size={24} strokeWidth={2.5} />}
            title="No real-world utility"
            desc="Crypto is hard to spend on everyday needs."
          />
        </div>
      </div>
    </section>
    {/* Problem Section */}

        </section>
      </div>
    </div>
  );
}

function ProblemCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="relative pt-8">
      {/* GRADIENT BORDER WRAPPER 
          Note: We use a pseudo-element or a nested div because standard 'border-image' 
          doesn't support 'border-radius'.
      */}
      <div className="group relative rounded-[24px] p-[2px] transition-all duration-300 hover:scale-[1.02]">
        {/* The Gradient Border Layer */}
        <div 
          className="absolute inset-0 rounded-[24px]" 
          style={{
            background: 'linear-gradient(106.77deg, rgba(31, 106, 255, 0.5) 81.96%, rgba(29, 191, 115, 0.5) 100.99%)',
          }}
        />

        {/* Inner Card Content */}
        <div className="relative flex min-h-[220px] flex-col items-center rounded-[22px] bg-[#172644] p-8 pt-12 text-center backdrop-blur-xl">
          
          {/* Glass Icon Container */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2">
             {/* Outer Glow/Shadow Circle */}
            <div className="relative flex h-19 w-19 items-center justify-center rounded-full border border-white/10   bg-[#172644] ">
              
              {/* Top Highlight (The "Glass" shine) */}
              <div className="absolute   inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
              
              {/* Inner Icon */}
              <div className="relative z-10 text-white red text-10xl">
                {icon  } 
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-4 text-[20px] font-bold leading-tight text-white px-2">
              {title}
            </h3>
            <p className="text-[15px] leading-relaxed text-zinc-400">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

