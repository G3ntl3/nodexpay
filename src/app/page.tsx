"use client";
import React, { useState } from "react";
import {
  AlertCircle,
  TrendingUp,
  Ban,
  ArrowRightLeft,
  CreditCard,
  Wallet,
  Shield,
} from "lucide-react";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen  pb-20  text-white relative overflow-hidden selection:bg-blue-500/30">
      <div className="10 mx-auto pb-24">
        <div className=" herobg ">
          {/* Navigation / Logo */}
          <nav className="lg:mb-30 pt-12 lg:ms-20">
            <img src="/logo.png" className="w-18 lg:w-20 " alt="" />
          </nav>

          {/* Hero Content */}
          <section className="flex  flex-col  items-center text-center">
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
              <button className="rounded-xl bg-blue-900 text-xl text-gray-500 px-3 py-4 hadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-900 active:scale-95">
                Join the waitlist
              </button>
            </div>

            <div className="mb-25 mt-8  mx-auto">
              <img src="/join.png" alt="" />
            </div>
          </section>
        </div>
        {/* Problem Section (Cards from image 2) */}
        <section className=" pt-20 pb-10  px-6  bg-[#161719]  w-full">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-white">
              Crypto access in Africa is broken.
            </h2>

            <div className="grid gap-16 md:grid-cols-3 md:gap-8">
              <ProblemCard
                icon={<AlertCircle size={24} strokeWidth={2.5} />}
                image="/block.png"
                title="Hard to buy crypto without exchanges"
                desc="Most platforms rely on exchanges and unreliable P2P systems."
              />
              <ProblemCard
                icon={<TrendingUp size={24} strokeWidth={2.5} />}
                image="/high.png"
                title="High fees & friction"
                desc="Multiple steps, swaps, and delays make simple transactions stressful."
              />
              <ProblemCard
                icon={<Ban size={24} strokeWidth={2.5} />}
                image="/error.png"
                title="No real-world utility"
                desc="Crypto is hard to spend on everyday needs."
              />
            </div>
          </div>
        </section>
        {/* Problem Section */}

        {/* Middle Section - Value Proposition */}
        <section className="p bg-[#161719]  px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-xl md:text-xl font-bold tracking-tight text-white">
              Nodexpay turns crypto into everyday spending power.
            </h2>
            <p className=" w-120 italic mx-auto pb-20">
              With Nodexpay, users can move seamlessly between banks and crypto,
              pay bills, and manage digital assets in one simple app — designed
              for real-world <br /> use
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-[#161719]">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-16 text-center text-xl md:text-3xl font-bold tracking-tight text-white">
              Everything you need in one powerful app
            </h2>

            <div className="grid mx-auto gap-8 lg:mb-40 mb-10 md:grid-cols-2 lg:gap-100  ">
              {/* Card 1: Bank to Crypto Instantly */}
              <div className="group relative rounded-[16px] lg:max-w-90 border border-blue-500/40 bg-[#172644] p-8 transition-all duration-500 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 mb-5 text-blue-400">
                  <ArrowRightLeft size={32} strokeWidth={2} />
                </div>
                <div className="relative z-10">
                  <h3 className="mb-3 text-lg font-semibold text-white tracking-tight">
                    Bank to Crypto Instantly
                  </h3>
                  <p className="text-[15px] leading-relaxed text-gray-300">
                    Buy and sell crypto directly from your bank, without
                    centralized exchanges.
                  </p>
                </div>
              </div>

              {/* Card 2: Pay Bills with Crypto */}
              <div className="group relative rounded-[16px] lg:max-w-90  border border-blue-500/40 bg-[#172644] p-8 transition-all duration-500 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 mb-5 text-blue-400">
                  <CreditCard size={32} strokeWidth={2} />
                </div>
                <div className="relative z-10">
                  <h3 className="mb-3 text-lg font-semibold text-white tracking-tight">
                    Pay Bills with Crypto
                  </h3>
                  <p className="text-[15px] leading-relaxed text-gray-300">
                    Airtime, data, subscriptions, and utilities — all in one
                    place.
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto  lg:ps-20  gap-8 md:grid-cols-2 lg:gap-70 flex justify-center flex-col lg:flex-row">
              {/* Card 3: Multi-chain Wallet */}
              <div className="group relative  rounded-[16px] lg:max-w-90  border border-blue-500/40 bg-[#172644] p-8 transition-all duration-500 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 mb-5 text-blue-400">
                  <Wallet size={32} strokeWidth={2} />
                </div>
                <div className="relative z-10">
                  <h3 className="mb-3 text-lg font-semibold text-white tracking-tight">
                    Multi-chain Wallet
                  </h3>
                  <p className="text-[15px] leading-relaxed text-gray-300">
                    Manage assets across multiple blockchains with a unified
                    wallet experience.
                  </p>
                </div>
              </div>

              {/* Card 4: Secure Identity Integration */}
              <div className="group relative rounded-[16px] lg:ms-10 lg:max-w-90  border border-blue-500/40 bg-[#172644] p-8 transition-all duration-500 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 mb-5 text-blue-400">
                  <Shield size={32} strokeWidth={2} />
                </div>
                <div className="relative z-10">
                  <h3 className="mb-3 text-lg font-semibold text-white tracking-tight">
                    Secure Identity Integration
                  </h3>
                  <p className="text-[15px] leading-relaxed text-gray-300">
                    Built-in compliance and decentralized identity for safe
                    transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="bg-[#161719] py-24 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Column: Title and Image Placeholder */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-16 leading-tight">
                Get started in <br /> minutes
              </h2>
              
              {/* Image Placeholder - Add your image here */}
              <div className="relative h-[450px] w-full flex items-center justify-center">
                <div className="w-full h-full rounded-3xl flex items-center justify-center relative overflow-hidden p-8">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/10 -z-10 blur-3xl opacity-50"></div>
                  {/* Add your image here */}
                  <img src="/shield.png" alt="Get Started Visual" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            {/* Right Column: Curved SVG Timeline (numbers sit on the curve; labels to the right) */}
            <div className="relative w-full">
              <svg viewBox="0 0 600 760" className="w-full h-[760px]" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* main curved path (left-facing C) — passes through the circle Y positions */}
                <path d="M500 20 C 360 120, 360 240, 500 320 C 360 400, 360 520, 500 600" fill="none" stroke="url(#g1)" strokeWidth="5" strokeLinecap="round" filter="url(#glow)" />
                <path d="M500 20 C 360 120, 360 240, 500 320 C 360 400, 360 520, 500 600" fill="none" stroke="#0ea5e9" strokeOpacity="0.06" strokeWidth="26" strokeLinecap="round" />

                {/* Step positions (circles placed exactly on the curve x=500) */}
                <g>
                  <circle cx="500" cy="90" r="28" fill="#0a1020" stroke="#1e40af" strokeWidth="3" filter="url(#glow)" />
                  <text x="500" y="90" fill="#93c5fd" fontSize="12" fontWeight="700" dominantBaseline="middle" textAnchor="middle">01</text>
                  <text x="540" y="82" fill="#ffffff" fontSize="16" fontWeight="700">Create your account</text>
                  <text x="540" y="98" fill="#94a3b8" fontSize="13">Sign up and verify your identity securely.</text>
                </g>

                <g>
                  <circle cx="500" cy="230" r="28" fill="#0a1020" stroke="#1e40af" strokeWidth="3" filter="url(#glow)" />
                  <text x="500" y="230" fill="#93c5fd" fontSize="12" fontWeight="700" dominantBaseline="middle" textAnchor="middle">02</text>
                  <text x="540" y="222" fill="#ffffff" fontSize="16" fontWeight="700">Connect your bank</text>
                  <text x="540" y="238" fill="#94a3b8" fontSize="13">Link your bank for seamless transactions.</text>
                </g>

                <g>
                  <circle cx="500" cy="370" r="28" fill="#0a1020" stroke="#1e40af" strokeWidth="3" filter="url(#glow)" />
                  <text x="500" y="370" fill="#93c5fd" fontSize="12" fontWeight="700" dominantBaseline="middle" textAnchor="middle">03</text>
                  <text x="540" y="362" fill="#ffffff" fontSize="16" fontWeight="700">Buy or receive crypto</text>
                  <text x="540" y="378" fill="#94a3b8" fontSize="13">Move funds instantly across chains.</text>
                </g>

                <g>
                  <circle cx="500" cy="510" r="28" fill="#0a1020" stroke="#1e40af" strokeWidth="3" filter="url(#glow)" />
                  <text x="500" y="510" fill="#93c5fd" fontSize="12" fontWeight="700" dominantBaseline="middle" textAnchor="middle">04</text>
                  <text x="540" y="502" fill="#ffffff" fontSize="16" fontWeight="700">Spend anywhere</text>
                  <text x="540" y="518" fill="#94a3b8" fontSize="13">Pay bills and use crypto like cash.</text>
                </g>
              </svg>
            </div>
          </div>
        </section>
         </div>
    </div>
  );
}

function ProblemCard({
  icon,
  image,
  title,
  desc,
}: {
  icon: React.ReactNode;
  image: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative pt-16">
      {/* Main Card Container with Gradient Border */}
      <div className="group relative rounded-[28px] p-[1.5px] transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 rounded-[27px] opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glassmorphism Card Content */}
        <div className="relative flex min-h-[200px] flex-col items-center rounded-[20px]    bg-[#172644] p-10  text-center backdrop-blur-2xl border border-[#17449e] shadow-2xl">
          {/* Icon Container - Positioned Above Card */}
          <div className="absolute -top-13 left-1/2 -translate-x-1/2">
            {/* Icon Background Circle with Glassmorphism */}
            <div className="relative flex h-24 w-24 items-center justify-center">
              <img
                src={image}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
          </div>

          {/* Card Content */}
          <div className="relative z-10   px-2">
            <h3 className="mb-3 text-xl font-semibold  w-50 mx-auto leading-tight text-white tracking-tight">
              {title}
            </h3>
            <p className="text-[15px] w-75 mx-auto  leading-relaxed  font-light">
              {desc}
            </p>
          </div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-8  right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}
