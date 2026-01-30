"use client";

import React, { useState } from 'react';
import { Bell, Shield, Cpu, Moon } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    aiDifficulty: "Normal",
    notifications: true,
    darkMode: false
  });

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-4xl font-black text-slate-900 mb-2">Settings</h1>
      <p className="text-slate-500 font-bold mb-10">Configure your Nova AI experience.</p>

      <div className="space-y-4">
        {/* AI Setting */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-lime rounded-xl text-slate-900"><Cpu size={20} /></div>
            <div>
              <p className="font-black text-slate-800">AI Interview Difficulty</p>
              <p className="text-xs text-slate-400 font-bold">Adjust how tough Nova's questions are.</p>
            </div>
          </div>
          <select 
            value={settings.aiDifficulty}
            onChange={(e) => setSettings({...settings, aiDifficulty: e.target.value})}
            className="bg-slate-50 border-none rounded-xl font-bold text-sm px-4 py-2"
          >
            <option>Easy</option>
            <option>Normal</option>
            <option>Hard</option>
          </select>
        </div>

        {/* Toggle Setting */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><Bell size={20} /></div>
            <p className="font-black text-slate-800">Email Notifications</p>
          </div>
          <button 
            onClick={() => setSettings({...settings, notifications: !settings.notifications})}
            className={`w-14 h-8 rounded-full transition-all relative ${settings.notifications ? 'bg-indigo-600' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.notifications ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
