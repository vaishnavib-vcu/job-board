"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Zap, 
  MapPin, 
  DollarSign, 
  Building2, 
  Globe, 
  Users, 
  Briefcase 
} from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const id = params.jobId;

  // Comprehensive Job Database
  const jobDetails: any = {
    "web-dev": {
      title: "UI/UX Developer",
      company: "Kforce",
      location: "Madison, WI",
      salary: "$110k - $140k",
      founded: "1979",
      employees: "1001-5000",
      overview: "Kforce has a client seeking a UI/UX Developer to lead a facelift of AI-powered tools.",
      qualifications: ["AWS", "Analysis Skills", "DevOps", "API", "Change Control"],
      required: [
        "3+ years of design experience",
        "3+ years of delivering design solutions as a UX designer",
        "Available online portfolio",
        "Experience prototyping (HTML, JavaScript, CSS)"
      ],
      responsibilities: [
        "Collaborate closely with product management and engineering teams",
        "Work in a start-up style environment where iteration is encouraged",
        "Communicate complex design concepts clearly"
      ],
      benefits: [
        "🏠 Remote Flexibility: Work from wherever you're productive.",
        "📈 Equity Options: Become a shareholder.",
        "🏥 Health Coverage: Comprehensive support.",
        "🧠 Mental Wellness: Free access to iFeel platform."
      ]
    },
    "software-eng": {
      title: "Software Engineer",
      company: "Cursor AI",
      location: "Sunnyvale, CA",
      salary: "$161k - $239k",
      founded: "2022",
      employees: "51-200",
      qualifications: ["TypeScript", "Rust", "LLMs", "Distributed Systems"],
      required: ["5+ years of software engineering experience", "Expertise in systems programming"],
      responsibilities: ["Architect core AI features", "Optimize codebase for performance"],
      benefits: ["🏠 Fully Remote", "💻 Hardware Stipend", "🌴 Unlimited PTO"]
    },
    "mobile-dev": {
      title: "Mobile App Developer (iOS)",
      company: "Swiftly",
      location: "Remote",
      salary: "$130k - $160k",
      qualifications: ["Swift", "SwiftUI", "Combine", "CoreData"],
      required: ["4+ years iOS experience", "Published apps on App Store"],
      responsibilities: ["Lead mobile architectural decisions", "Implement smooth UI animations"],
      benefits: ["🏠 100% Remote", "💻 Equipment Budget", "🏥 Premium Health"]
    },
    "backend-eng": {
      title: "Backend Engineer (Go)",
      company: "Stream",
      location: "Boulder, CO",
      salary: "$150k - $190k",
      qualifications: ["Go", "Kubernetes", "Redis", "PostgreSQL"],
      required: ["Proficiency in Golang", "Experience with high-throughput systems"],
      responsibilities: ["Maintain real-time chat APIs", "Optimize database queries"],
      benefits: ["📈 Equity", "🏔️ Mountain Office", "🔋 Unlimited PTO"]
    }
  };

  const job = jobDetails[id as string] || jobDetails["web-dev"];

  const handleStartInterview = () => {
    window.dispatchEvent(new Event("openInterview"));
  };

  const handleApplyNow = () => {
    alert(`Success! Your application for ${job.title} has been sent to ${job.company}.`);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile-Friendly Header Navigation */}
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 font-bold mb-6 hover:text-indigo-600 transition-colors">
          <ChevronLeft size={20} /> <span className="text-sm md:text-base">Back to Job Board</span>
        </Link>
        
        {/* Title Section */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-4 md:gap-8 text-slate-500 font-bold text-sm md:text-base">
             <span className="flex items-center gap-2 text-indigo-600"><Building2 size={18}/> {job.company}</span>
             <span className="flex items-center gap-2"><MapPin size={18}/> {job.location}</span>
             <span className="flex items-center gap-2"><DollarSign size={18}/> {job.salary}</span>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h3 className="text-xl md:text-2xl font-black mb-4 text-slate-900">Qualification</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {job.qualifications.map((q: string) => (
                  <span key={q} className="bg-slate-50 px-4 py-2 rounded-full text-xs md:text-sm font-bold text-slate-600 border border-slate-100">
                    {q}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl md:text-2xl font-black mb-4 text-slate-900">Required</h3>
              <ul className="list-disc ml-5 space-y-3 text-slate-600 font-medium text-sm md:text-lg leading-relaxed">
                {job.required.map((item: string) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h3 className="text-xl md:text-2xl font-black mb-4 text-slate-900">Responsibilities</h3>
              <ul className="list-disc ml-5 space-y-3 text-slate-600 font-medium text-sm md:text-lg leading-relaxed">
                {job.responsibilities.map((item: string) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h3 className="text-xl md:text-2xl font-black mb-6 text-slate-900">Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((item: string) => (
                  <div key={item} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm md:text-base font-medium text-slate-600 italic">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / H5 Bottom Actions (Right) */}
          <div className="space-y-8">
            <div className="bg-slate-900 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white">
              <h4 className="font-black text-lg md:text-xl mb-6">Company Overview</h4>
              <div className="space-y-4 text-xs md:text-sm font-bold opacity-80">
                <p className="flex justify-between border-b border-white/10 pb-2">Founded <span className="text-white">{job.founded || "N/A"}</span></p>
                <p className="flex justify-between border-b border-white/10 pb-2">Size <span className="text-white">{job.employees || "N/A"}</span></p>
                <p className="flex justify-between">Sector <span className="text-white">Technology</span></p>
              </div>
              <div className="mt-6 flex gap-4">
                 <Globe className="text-indigo-400 cursor-pointer hover:text-white" size={20} />
                 <Users className="text-indigo-400 cursor-pointer hover:text-white" size={20} />
                 <Briefcase className="text-indigo-400 cursor-pointer hover:text-white" size={20} />
              </div>
            </div>

            {/* Actions: Sticky/Fixed style for H5 if desired, or standard block */}
            <div className="flex flex-col gap-4 sticky top-6">
              <button 
                onClick={handleStartInterview}
                className="w-full bg-[#D9F99D] text-slate-900 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-lime-100/50"
              >
                <Zap size={22} fill="currentColor" /> Mock Interview
              </button>
              
              <button 
                onClick={handleApplyNow}
                className="w-full bg-white border-2 border-slate-200 text-slate-900 py-5 rounded-2xl font-black hover:bg-slate-50 active:scale-95 transition-all"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
