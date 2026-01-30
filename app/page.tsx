"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, RotateCcw, Heart, MapPin, Sparkles, Briefcase, DollarSign } from 'lucide-react';

// --- 1. DATA DEFINITIONS (Outside component to prevent ReferenceError) ---
const INITIAL_JOBS = [
  { id: "web-dev", title: "UI/UX Developer", company: "Kforce", match: "64%", location: "Madison, WI", salary: "$110k - $140k", status: "Matched", isLiked: false, time: "1h ago" },
  { id: "software-eng", title: "Software Engineer", company: "Cursor AI", match: "93%", location: "Sunnyvale, CA", salary: "$161k - $239k", status: "Matched", isLiked: true, time: "2h ago" },
  { id: "frontend-engineer", title: "Frontend Engineer", company: "Vercel", match: "88%", location: "Remote", salary: "$140k - $180k", status: "Applied", isLiked: false, time: "5h ago" },
  { id: "ai-researcher", title: "AI Researcher", company: "OpenAI", match: "72%", location: "San Francisco, CA", salary: "$200k - $350k", status: "Matched", isLiked: false, time: "1d ago" }
];

const REFERENCE_JOBS = [
  { id: "mobile-dev", title: "Mobile App Developer", company: "Swiftly", match: "95%", location: "Remote", salary: "$130k - $160k", status: "Matched", isLiked: false, time: "Just now" },
  { id: "backend-eng", title: "Backend Engineer", company: "Stream", match: "82%", location: "Boulder, CO", salary: "$150k - $190k", status: "Matched", isLiked: false, time: "Just now" }
];

// --- 2. MAIN COMPONENT ---
export default function JobsPage() {
  const searchParams = useSearchParams();
  const isMobileView = searchParams.get('view') === 'mobile';
  
  const [activeTab, setActiveTab] = useState('Matched');
  const [jobList, setJobList] = useState(INITIAL_JOBS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync "View" suffix for links
  const viewParam = isMobileView ? '?view=mobile' : '';

  const handleChangeReference = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setJobList(prev => {
        const existingIds = new Set(prev.map(j => j.id));
        const uniqueNewJobs = REFERENCE_JOBS.filter(j => !existingIds.has(j.id));
        return [...uniqueNewJobs, ...prev];
      });
      setIsRefreshing(false);
    }, 600);
  };

  const toggleLike = (id: string) => {
    setJobList(prev => prev.map(job => 
      job.id === id ? { ...job, isLiked: !job.isLiked } : job
    ));
  };

  const filteredJobs = jobList.filter(job => {
    if (activeTab === 'Liked') return job.isLiked;
    if (activeTab === 'Applied') return job.status === 'Applied';
    return job.status === 'Matched';
  });

  return (
    <div className={`transition-all duration-300 ${isMobileView ? 'p-5 pb-24' : 'p-4 md:p-10'}`}>
      
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
          Job Board <span className="text-indigo-600 italic">AI</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm">Tailored matches for your profile</p>
      </header>

      {/* Navigation & Controls */}
      <div className={`flex ${isMobileView ? 'flex-col' : 'md:flex-row'} items-center justify-between mb-8 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm gap-3`}>
        <div className="flex w-full md:w-auto overflow-x-auto gap-2 no-scrollbar px-1">
          {['Matched', 'Liked', 'Applied'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab ? 'bg-[#818CF8] text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleChangeReference}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#818CF8]/10 text-[#818CF8] px-6 py-2 rounded-xl font-bold active:scale-95 transition-transform"
        >
          <RotateCcw size={18} className={isRefreshing ? 'animate-spin' : ''} />
          <span className="text-sm">Refresh Matches</span>
        </button>
      </div>

      {/* Main Grid: Responsive sidebar logic */}
      <div className={`grid grid-cols-1 ${isMobileView ? '' : 'xl:grid-cols-4'} gap-8`}>
        
        {/* Jobs List */}
        <div className={`${isMobileView ? '' : 'xl:col-span-3'} space-y-4`}>
          {filteredJobs.length > 0 ? filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 md:gap-6">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-[4px] border-amber-400 flex-shrink-0 flex items-center justify-center font-black italic text-slate-900 text-sm md:text-xl">
                    {job.match}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-slate-500 font-bold mt-1 text-[11px] md:text-sm">
                      <span className="flex items-center gap-1 text-indigo-500"><Search size={14}/> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                    </div>
                  </div>
                </div>
                <Heart 
                  size={24} 
                  onClick={() => toggleLike(job.id)}
                  className={`cursor-pointer transition-all active:scale-125 ${job.isLiked ? 'fill-red-500 text-red-500' : 'text-slate-200 hover:text-red-300'}`} 
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-50 pt-5 gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <span className="bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-400 font-bold uppercase">{job.time}</span>
                  <span className="text-slate-900 font-black text-sm md:text-lg">{job.salary}</span>
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                  <Link href={`/jobs/${job.id}${viewParam}`} className="flex-1">
                    <button className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 py-3 px-6 rounded-xl font-black text-xs md:text-sm active:scale-95 transition-transform">
                      Details
                    </button>
                  </Link>
                  <Link href={`/jobs/${job.id}${viewParam}`} className="flex-1">
                    <button className="w-full bg-[#D9F99D] text-slate-900 py-3 px-6 rounded-xl font-black text-xs md:text-sm shadow-sm active:scale-95 transition-transform border-2 border-[#D9F99D]">
                      Interview
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-white p-20 rounded-[2.5rem] border-2 border-dashed border-slate-100 text-center">
              <p className="text-slate-400 font-bold">No jobs matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Sidebar: Now stacks at the bottom in H5 mode */}
        <aside className={`${isMobileView ? 'block w-full' : 'hidden xl:block'}`}>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-10">
            <h4 className="font-black flex items-center gap-2 mb-4 text-slate-900 uppercase tracking-tighter">
              <Sparkles className="text-amber-400" size={20} /> Pro Tips
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-2xl">
                <p className="text-[11px] text-indigo-700 font-bold leading-relaxed">
                  Our AI analyzes your LangGraph profile to find matches with {'>'}80% compatibility.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                  Applying with a Mock Interview score increases callback rates by 40%.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* H5 Navigation Spacer */}
      {isMobileView && <div className="h-20" />}
    </div>
  );
}
