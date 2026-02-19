import React from 'react';

// 1. Define the TypeScript interface for the step data
interface TimelineStepProps {
  number: string;
  title: string;
  description: string;
}

// 2. Apply the type to your data array
const timelineData: TimelineStepProps[] = [
  {
    number: '01',
    title: 'Create your account',
    description: 'Sign up and verify your identity securely.',
  },
  {
    number: '02',
    title: 'Connect your bank',
    description: 'Link your bank for seamless transactions.',
  },
  {
    number: '03',
    title: 'Buy or receive crypto',
    description: 'Move funds instantly across chains.',
  },
  {
    number: '04',
    title: 'Spend anywhere',
    description: 'Pay bills and use crypto like cash.',
  },
];

export default function GetStartedSection() {
  return (
    <section className="bg-[#050505] py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Column: Title and Image Placeholder */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-16 leading-tight">
            Get started in <br /> minutes
          </h2>
          
          {/* PLACEHOLDER FOR YOUR IMAGE */}
          <div className="relative h-[450px] w-full flex items-center justify-center">
            <div className="w-full h-full border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-center text-zinc-500 relative overflow-hidden p-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/10 -z-10 blur-3xl opacity-50"></div>
              <p className="text-center font-medium">Place your glowing graphic image here</p>
            </div>
          </div>
        </div>

        {/* Right Column: Vertical Timeline */}
        <div className="relative pl-2">
          
          {/* The 'x' icon at the very top of the timeline line */}
          <div className="absolute -top-1 left-[21px] flex h-6 w-6 items-center justify-center rounded-full bg-[#050505] border border-blue-500/50 text-blue-400 z-10">
             <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          
          {/* The vertical connecting line */}
          <div className="absolute left-[24px] top-5 bottom-10 w-[2px] bg-gradient-to-b from-blue-500 via-blue-700/50 to-transparent -z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

          {/* Timeline Steps */}
          <div className="space-y-12 pt-10">
            {timelineData.map((step, index) => (
              <TimelineStep key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Apply the type to the component props
function TimelineStep({ number, title, description }: TimelineStepProps) {
  return (
    <div className="flex items-start">
      {/* Number Circle */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-lg"></div>
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-500 bg-[#0a1020] text-xl font-bold text-white shadow-[inset_0_0_12px_rgba(59,130,246,0.4)] z-10">
          {number}
        </div>
      </div>

      {/* Text Content */}
      <div className="ml-8 pt-2">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-zinc-400 leading-relaxed pr-4 text-base">{description}</p>
      </div>
    </div>
  );
}