"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { 
  Briefcase, Mic2, FileText, User, Settings, 
  Smartphone, Monitor, Sparkles, LogOut 
} from 'lucide-react';
import "./globals.css";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Detect if we are in mobile preview mode via URL
  const isMobileView = searchParams.get('view') === 'mobile';
  const viewParam = isMobileView ? '?view=mobile' : '';

  // Helper to determine if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className={`min-h-screen flex transition-all duration-500 ${isMobileView ? 'bg-slate-200 justify-center py-10' : 'bg-[#F8FAFC]'}`}>
      
      {/* 1. LEFT SIDEBAR (Hidden in Mobile Preview) */}
      {!isMobileView && (
        <aside className="w-72 bg-white border-r border-slate-100 flex flex-col p-8 hidden lg:flex h-screen sticky top-0">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Sparkles size={20} fill="white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">JobNova</span>
          </div>
          
          <nav className="space-y-3 flex-1">
            <Link href={`/${viewParam}`} className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${isActive('/') ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
              <Briefcase size={22}/> Jobs
            </Link>
            <Link href={`/interview${viewParam}`} className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${isActive('/mock-interview') ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
              <Mic2 size={22}/> AI Mock Interview
            </Link>
            <Link href={`/resume${viewParam}`} className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${isActive('/resume') ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
              <FileText size={22}/> Resume
            </Link>
            <Link href={`/profile${viewParam}`} className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${isActive('/profile') ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
              <User size={22}/> Profile
            </Link>
            <Link href={`/settings${viewParam}`} className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${isActive('/settings') ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
              <Settings size={22}/> Setting
            </Link>
          </nav>

          {/* Upgrade Card */}
          <div className="mt-auto p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Upgrade Plan</p>
              <p className="text-xs font-bold mb-4">Boost your success rate now!</p>
              <button className="w-full bg-white/20 backdrop-blur-md text-white py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-white hover:text-indigo-600 transition-all">
                Subscription
              </button>
            </div>
            <Sparkles className="absolute -bottom-2 -right-2 text-white/10 w-20 h-20 group-hover:scale-110 transition-transform" />
          </div>
        </aside>
      )}

      {/* 2. MAIN VIEWPORT (The Phone Frame or Full Page) */}
      <main className={`transition-all duration-500 ${
        isMobileView 
        ? 'w-[390px] h-[844px] rounded-[3.5rem] border-[10px] border-slate-900 shadow-[0_0_0_10px_rgba(0,0,0,0.05),0_30px_60px_rgba(0,0,0,0.3)] bg-white overflow-hidden relative' 
        : 'flex-1 flex overflow-hidden'
      }`}>
        
        {/* Scrollable Content Area */}
        <div className={`flex-1 overflow-y-auto no-scrollbar ${!isMobileView ? 'p-4 md:p-8' : ''}`}>
          {children}
        </div>

        {/* 3. RIGHT SIDEBAR (Desktop Only - Clean Version) */}
        {!isMobileView && (
          <aside className="w-80 bg-white border-l border-slate-100 p-8 hidden xl:flex flex-col h-screen sticky top-0">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                <Sparkles className="text-indigo-500" size={32} />
              </div>
              <h4 className="font-black text-slate-900 mb-3 leading-tight">Ace Your Interviews with AI Sessions!</h4>
              <p className="text-xs text-slate-400 font-bold leading-relaxed mb-8">
                Let our cutting-edge AI mock interviews help you shine.
              </p>
              <Link href={`/mock-interview${viewParam}`} className="w-full">
                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg shadow-slate-200">
                  Mock Interview
                </button>
              </Link>
            </div>
            
            <div className="mt-10 p-4 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-center opacity-50">
               <p className="text-[10px] font-black text-slate-300 uppercase italic">Ad Space / Future Extension</p>
            </div>
          </aside>
        )}
      </main>

      {/* VIEW TOGGLE (Floating Action Button) */}
      <button 
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          if (isMobileView) params.delete('view');
          else params.set('view', 'mobile');
          window.location.search = params.toString();
        }}
        className="fixed bottom-8 right-8 z-[100] bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-3"
      >
        {isMobileView ? <Monitor size={20} /> : <Smartphone size={20} />}
        <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
          {isMobileView ? "Desktop Mode" : "H5 Preview"}
        </span>
      </button>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-indigo-100">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen font-black text-slate-200">LOADING...</div>}>
          <LayoutContent>{children}</LayoutContent>
        </Suspense>
      </body>
    </html>
  );
}
