"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  match: number;
  salary: string;
  location: string;
  tags: string[];
}

export default function JobCard({ id, title, company, match, salary, location, tags }: JobCardProps) {
  const [offset, setOffset] = useState(264); // Full circumference for r=42

  // Animate the match circle when the card mounts
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      const circumference = 2 * Math.PI * 42;
      setOffset(circumference - (circumference * match) / 100);
    }, 300);
    return () => clearTimeout(animationTimeout);
  }, [match]);

  return (
    <Link href={`/${id}`} className="group block">
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(147,51,234,0.08)] hover:border-brand-purple/20 relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          
          {/* COLUMN 1: AI MATCH CIRCLE */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90">
              {/* Background Circle */}
              <circle cx="48" cy="48" r="42" stroke="#F1F5F9" strokeWidth="8" fill="none" />
              {/* Animated Progress Circle */}
              <circle 
                cx="48" 
                cy="48" 
                r="42" 
                stroke="var(--color-brand-yellow)" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray="264" 
                style={{ 
                  strokeDashoffset: offset,
                  transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" 
                }}
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-xl font-black block leading-none">{match}%</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Match</span>
            </div>
          </div>

          {/* COLUMN 2: JOB INFO */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-brand-purple transition-colors truncate pr-4">
                {title}
              </h3>
              <div className="flex gap-2">
                <button className="p-2.5 bg-slate-50 rounded-xl text-slate-300 hover:text-brand-purple hover:bg-brand-purple-light transition-all">
                  🔗
                </button>
                <button className="p-2.5 bg-slate-50 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                  ♡
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 text-slate-500 font-bold text-sm">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-md text-[10px]">🏢</span>
              <span>{company}</span>
              <span className="text-slate-300">•</span>
              <span>{location}</span>
            </div>

            {/* TAGS & SALARY */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="bg-slate-50 text-slate-500 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-slate-100">
                  {tag}
                </span>
              ))}
              <span className="bg-slate-50 text-slate-600 px-4 py-1.5 rounded-xl text-[10px] font-bold border border-slate-100 italic">
                💰 {salary}
              </span>
            </div>
          </div>

          {/* COLUMN 3: ACTIONS */}
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto min-w-[180px]">
            <button className="w-full py-4 bg-brand-lime text-black rounded-2xl font-black text-sm shadow-sm shadow-lime-200/50 hover:brightness-95 active:scale-[0.98] transition-all">
              Mock Interview
            </button>
            <button className="w-full py-4 border-2 border-slate-100 rounded-2xl font-black text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all">
              Apply Now
            </button>
          </div>

        </div>

        {/* TIME STAMP FOOTER */}
        <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Posted 2 hours ago • 25 applicants
          </span>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <div className={`w-full h-full bg-gradient-to-tr ${i === 1 ? 'from-purple-400 to-blue-400' : 'from-green-400 to-blue-400'}`} />
              </div>
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
              +12
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
