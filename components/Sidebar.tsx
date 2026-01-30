"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, User, Settings, Video, Zap, LogOut } from 'lucide-react';

// Add the onStartInterview prop to the interface
interface SidebarProps {
  onStartInterview?: () => void;
}

export default function Sidebar({ onStartInterview }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Jobs', icon: LayoutDashboard, href: '/' },
    { name: 'Resume', icon: FileText, href: '/resume' },
    { name: 'Profile', icon: User, href: '/profile' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <aside className="w-80 h-screen bg-white border-r border-slate-100 flex flex-col p-8 sticky top-0">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-indigo-600 p-2 rounded-xl">
          <Zap className="text-white" size={24} fill="white" />
        </div>
        <span className="text-2xl font-black text-slate-900 tracking-tighter">JobNova</span>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 ml-4">Main Menu</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all group ${
                isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <item.icon size={22} className={isActive ? "text-white" : "group-hover:text-indigo-600"} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 ml-4">Practice Zone</p>
        {/* ADDED onClick HERE */}
        <button 
          onClick={onStartInterview}
          className="w-full flex items-center gap-4 px-6 py-5 rounded-[2rem] font-black bg-[#D9F99D] text-slate-900 hover:scale-[1.02] transition-transform shadow-xl shadow-lime-100 border border-lime-200 active:scale-95"
        >
          <Video size={22} />
          <span>AI Mock Interview</span>
        </button>
      </div>

      <div className="pt-8 border-t border-slate-50">
        <button className="flex items-center gap-4 px-6 py-4 w-full text-slate-400 font-bold hover:text-rose-500 transition-colors">
          <LogOut size={22} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
