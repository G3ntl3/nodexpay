"use client"
import React, { useState } from 'react';
import { AlertCircle, TrendingUp, Ban } from 'lucide-react'; 

export default function HeroSection() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden selection:bg-blue-500/30">
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto px-6 pt-10 pb-24">
        {/* Navigation / Logo */}
        <nav className="mb-20 ms-10">
          <img src="/logo.png" className='w-20 '  alt="" />
        </nav>


        {/* Hero Content */}
        <section className="flex flex-col items-center text-center">
          <div className="mb-8 w-50">
                    <img src="/wait.png" alt="" />

          </div>

          <h1 className="mb-6 max-w-4xl text-5xl font-bold md:text-7xl">
            Finance without borders. <br />
            <span className="text-white/90">Crypto that works in real life.</span>
          </h1>

          <p className="mb-10 max-w-2xl text-lg text-gray-400">
            Nodexpay is Africa's first multi-chain crypto utility app — buy, send, and spend crypto directly from your bank. No exchanges. No friction.
          </p>

          {/* Input Group */}
          <div className="mb-10 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
            />
            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 active:scale-95">
              Join the waitlist
            </button>
          </div>

          {/* Social Proof */}
          <div className="mb-32 flex items-center gap-3">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="h-9 w-9 rounded-full border-2 border-[#0a0a0a] bg-gradient-to-tr from-gray-700 to-gray-400" />
               ))}
            </div>
            <p className="text-sm text-gray-400 font-medium">Join + 500 others</p>
          </div>

          {/* Problem Section (Cards from image 2) */}
          <div className="w-full">
            <h2 className="mb-12 text-3xl font-bold">Crypto access in Africa is broken.</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard 
                icon={<AlertCircle className="text-blue-400" />}
                title="Hard to buy crypto without exchanges"
                desc="Most platforms rely on exchanges and unreliable P2P systems."
              />
              <FeatureCard 
                icon={<TrendingUp className="text-blue-400" />}
                title="High fees & friction"
                desc="Multiple steps, swaps, and delays make simple transactions stressful."
              />
              <FeatureCard 
                icon={<Ban className="text-blue-400" />}
                title="No real-world utility"
                desc="Crypto is hard to spend on everyday needs."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:border-blue-500/30">
      <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
        {icon}
      </div>
      <h3 className="mb-3 font-bold">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}