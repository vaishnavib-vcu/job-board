import React from 'react';

export default function RightPanel() {
  return (
    <aside className="hidden xl:block xl:col-span-4 space-y-6 sticky top-0">
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
        <h3 className="font-black text-lg mb-4 leading-tight">Ace Your Interviews with AI-Powered Mock Sessions! ✨</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">Let our cutting-edge AI mock interviews help you shine!</p>
        
        <div className="space-y-4 mb-8">
          <div className="p-5 bg-[#9333EA08] rounded-2xl border border-purple-50">
            <span className="font-bold text-sm block mb-1 text-[#9333EA]">Job-Specific Simulations:</span>
            <p className="text-xs text-slate-500">Practice with questions tailored to your target role.</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="font-bold text-sm block mb-1">Actionable Feedback</span>
            <p className="text-xs text-slate-500">Get detailed analysis of your responses.</p>
          </div>
        </div>

        <button className="w-full bg-[#1A1D21] text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">🎙️ Mock Interview</button>
      </div>
    </aside>
  );
}
