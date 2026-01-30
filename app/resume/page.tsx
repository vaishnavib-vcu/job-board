"use client";

import React, { useState, useRef } from 'react';
import { 
  FileText, Upload, MoreVertical, Eye, X, 
  Loader2, Zap, Sparkles, Download, Share2 
} from 'lucide-react';

export default function ResumePage() {
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate AI analysis time
      setTimeout(() => {
        setIsUploading(false);
        alert(`${file.name} has been successfully parsed and synced with your AI profile!`);
      }, 2500);
    }
  };

  return (
    <div className="p-4 md:p-10 animate-in fade-in duration-700 min-h-screen">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.doc,.docx" 
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Resume Center</h1>
          <p className="text-slate-500 font-bold text-lg">Manage your documents for AI job matching.</p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-70"
        >
          {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
          {isUploading ? "Analyzing with AI..." : "Upload New Resume"}
        </button>
      </div>

      {/* Resume Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
              <FileText size={28} />
            </div>
            <button className="text-slate-300 hover:text-slate-600 p-2">
              <MoreVertical size={24}/>
            </button>
          </div>
          
          <h3 className="font-black text-slate-800 text-lg mb-1 truncate">Alex_Rivera_UX_2026.pdf</h3>
          <div className="flex items-center gap-2 mb-8">
            <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest">Active</span>
            <span className="text-slate-300 text-[10px] font-bold">Uploaded 2 days ago</span>
          </div>

          <button 
            onClick={() => setSelectedResume("Alex_Rivera_UX_2026.pdf")}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
          >
            <Eye size={16} /> View & Edit
          </button>
        </div>

        {/* Empty State / Add Placeholder */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-4 border-dashed border-slate-100 rounded-[3rem] p-8 flex flex-col items-center justify-center text-slate-300 hover:border-indigo-100 hover:text-indigo-200 transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
            <Upload size={32} />
          </div>
          <p className="font-black text-sm">Add Secondary Resume</p>
        </div>
      </div>

      {/* FULL SCREEN RESUME VIEWER MODAL */}
      {selectedResume && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[150] flex items-center justify-center p-4 md:p-8">
          <div className="bg-white rounded-[3rem] w-full max-w-5xl h-full md:h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="px-6 md:px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 hidden md:block">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-lg md:text-xl leading-none mb-1">{selectedResume}</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AI-Parsed Document</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors hidden md:block"><Download size={20}/></button>
                <button className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors hidden md:block"><Share2 size={20}/></button>
                <button onClick={() => setSelectedResume(null)} className="p-3 bg-slate-100 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            {/* Modal Content - The Resume Itself */}
            <div className="flex-1 bg-slate-100 overflow-y-auto p-4 md:p-12 no-scrollbar">
              <div className="bg-white w-full max-w-[800px] mx-auto shadow-2xl rounded-sm p-8 md:p-16 min-h-[1100px] border border-slate-200">
                
                {/* Professional Resume Design */}
                <header className="border-b-4 border-slate-900 pb-8 mb-10">
                  <h1 className="text-5xl font-black text-slate-900 mb-2">Alex Rivera</h1>
                  <p className="text-indigo-600 font-black text-xl mb-4 uppercase tracking-tighter">Senior UX Designer</p>
                  <p className="text-slate-400 font-bold text-sm">Richmond, VA • alex.rivera@design.com • (555) 123-4567</p>
                </header>
                
                <div className="space-y-12">
                  <section>
                    <h3 className="font-black text-slate-900 uppercase text-sm mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-slate-900"></span> Professional Summary
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Strategic Design Leader with 8+ years of experience in AI-driven interfaces and complex design systems. 
                      Expert in bridging the gap between user needs and technical feasibility using modern frameworks like React and LangGraph.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-black text-slate-900 uppercase text-sm mb-6 flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-slate-900"></span> Experience
                    </h3>
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between font-black text-slate-800 mb-1">
                          <span>Lead Product Designer • TechFlow AI</span>
                          <span className="text-slate-400 text-xs tracking-tighter">2022 - PRESENT</span>
                        </div>
                        <ul className="list-disc ml-4 text-sm text-slate-500 space-y-2 font-medium">
                          <li>Led the redesign of the core AI dashboard, increasing retention by 40%.</li>
                          <li>Established a design-to-code pipeline that improved dev velocity by 30%.</li>
                          <li>Mentored a team of 5 junior designers across 3 time zones.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex justify-between font-black text-slate-800 mb-1">
                          <span>Senior UX Researcher • DesignScale</span>
                          <span className="text-slate-400 text-xs tracking-tighter">2019 - 2022</span>
                        </div>
                        <ul className="list-disc ml-4 text-sm text-slate-500 space-y-2 font-medium">
                          <li>Conducted 100+ usability tests for Fortune 500 fintech applications.</li>
                          <li>Reduced customer support tickets by 15% through data-driven UX refinements.</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* AI TALENT INSIGHT SECTION */}
                  <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden mt-10">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={20} className="text-amber-300" />
                        <h4 className="font-black text-lg uppercase tracking-tighter">Nova's Smart Insight</h4>
                      </div>
                      <p className="text-indigo-50 font-bold text-sm leading-relaxed">
                        Your specific experience with <span className="text-amber-300 underline">TechFlow AI</span> aligns 
                        perfectly with the "Lead Web App Developer" roles currently on your board. 
                        We recommend emphasizing your **Design Systems** experience during your mock interview.
                      </p>
                    </div>
                    <Zap className="absolute -bottom-4 -right-4 text-white/10 w-32 h-32 rotate-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
