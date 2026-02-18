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
              <p className="text-lg w-120 italic mx-auto ">
                With Nodexpay, users can move seamlessly between crypto and fiat
                assets in one simple app — designed for real-world spending.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 px-6 bg-[#161719]">
            <div className="max-w-6xl mx-auto">
              <h2 className="mb-16 text-center text-2xl md:text-4xl font-bold tracking-tight text-white">
                Everything you need in one powerful app
              </h2>

              <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
                <FeatureCard
                  icon={<ArrowRightLeft size={32} strokeWidth={2} />}
                  title="Bank to Crypto Instantly"
                  desc="Buy and sell crypto directly from your bank, without centralized exchanges."
                />
                <FeatureCard
                  icon={<CreditCard size={32} strokeWidth={2} />}
                  title="Pay Bills with Crypto"
                  desc="Airtime, data, subscriptions, and utilities — all in one place."
                />
                <FeatureCard
                  icon={<Wallet size={32} strokeWidth={2} />}
                  title="Multi-chain Wallet"
                  desc="Manage assets across multiple blockchains with a unified wallet experience."
                />
                <FeatureCard
                  icon={<Shield size={32} strokeWidth={2} />}
                  title="Secure Identity Integration"
                  desc="Built-in compliance and decentralized identity for safe transactions."
                />
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
        <div
          className="absolute inset-0 rounded-[27px] opacity-75 group-hover:opacity-100 transition-opacity duration-500"
          
        />

        {/* Glassmorphism Card Content */}
        <div className="relative flex min-h-[200px] flex-col items-center rounded-[20px]    bg-[#172644] p-10  text-center backdrop-blur-2xl border border-[#17449e] shadow-2xl">
          {/* Icon Container - Positioned Above Card */}
          <div className="absolute -top-13 left-1/2 -translate-x-1/2">
            {/* Icon Background Circle with Glassmorphism */}
            <div className="relative flex h-24 w-24 items-center justify-center">
              <img src={image} className="w-full h-full object-contain" alt="" />
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
//  second function to map the card 2
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative rounded-[16px] border border-blue-500/40 bg-[#172644] p-8 transition-all duration-500 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="relative z-10 mb-5 text-blue-400">{icon}</div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="mb-3 text-lg font-semibold text-white tracking-tight">
          {title}
        </h3>
        <p className="text-[15px] leading-relaxed text-gray-300">{desc}</p>
      </div>
    </div>
  );
}
