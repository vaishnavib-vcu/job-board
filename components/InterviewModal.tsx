"use client";

import React, { useState, useEffect } from 'react';
import { X, Send, Mic, Video, ShieldCheck, Loader2, Zap } from 'lucide-react';

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectionData: {
    token: string;
    url?: string;
  } | null;
}

export default function InterviewModal({ isOpen, onClose, connectionData }: InterviewModalProps) {
  const [chatInput, setChatInput] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);

  // Monitor connection status
  useEffect(() => {
    if (isOpen && connectionData?.token) {
      setIsConnecting(true);
      
      // LOGIC: Once the LiveKit Room connects, we set connecting to false.
      // For now, we simulate the 'room.on(RoomEvent.Connected)' event:
      const connectionTimer = setTimeout(() => {
        setIsConnecting(false);
        console.log("Nova Persona is now LIVE");
      }, 2500);

      return () => clearTimeout(connectionTimer);
    }
  }, [isOpen, connectionData]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // 1. Update UI locally
    setChatHistory(prev => [...prev, { role: 'user', text: chatInput }]);
    
    // 2. Clear input
    setChatInput("");

    // 3. Logic to send to Data Channel
    // room.localParticipant.publishData(new TextEncoder().encode(chatInput))
    console.log("Sent to Nova:", chatInput);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
      
      <div className="bg-[#0B0D17] w-full max-w-6xl h-full max-h-[850px] rounded-[3.5rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header Section */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-400" size={18} />
              <span className="text-white/70 font-black text-[10px] uppercase tracking-widest">Encrypted Interview Session</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="bg-white/5 hover:bg-rose-500/20 p-4 rounded-full text-white/50 hover:text-rose-500 transition-all border border-white/10 group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Main Interaction Stage */}
        <div className="flex-1 flex flex-col items-center justify-center relative p-10">
          
          {isConnecting ? (
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 bg-indigo-600/10 rounded-full flex items-center justify-center border border-indigo-500/20 animate-pulse" />
                <Loader2 className="text-indigo-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={48} />
              </div>
              <div className="text-center">
                <h3 className="text-white font-black text-2xl tracking-tight mb-2">LOADING PERSONA...</h3>
                <p className="text-indigo-400/60 font-bold uppercase tracking-[0.3em] text-[10px]">Initializing Neural Link</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
              {/* AI Avatar Display Area */}
              <div className="w-full max-w-4xl aspect-video rounded-[3rem] bg-gradient-to-b from-indigo-500/10 to-transparent border border-white/5 flex items-center justify-center relative overflow-hidden shadow-inner">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                 
                 <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/40 animate-bounce">
                        <Zap size={40} fill="white" className="text-white" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-white font-black text-xl tracking-tight">Nova AI is Ready</p>
                      <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Listening for audio...</p>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Interaction Bar */}
        <div className="p-10 pt-0">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-40 transition-all" />
              <div className="relative flex items-center gap-4 bg-[#141624] border border-white/10 rounded-[2.5rem] p-4 pl-10">
                
                <input 
                  autoFocus
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Nova anything about the role..."
                  className="flex-1 bg-transparent border-none text-white font-bold placeholder:text-white/20 outline-none py-4 text-lg"
                />

                <div className="flex items-center gap-3">
                  <button className="p-4 text-white/20 hover:text-indigo-400 transition-colors">
                    <Mic size={24} />
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isConnecting}
                    className="bg-[#D9F99D] text-slate-900 px-8 py-4 rounded-3xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-30 disabled:grayscale"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">SEND</span>
                      <Send size={18} />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Metrics */}
            <div className="flex justify-center gap-10 text-[9px] font-black uppercase tracking-[0.25em] text-white/20">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" /> Mic: Active</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Camera: Ready</span>
              <span className="flex items-center gap-2">Latency: 38ms</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
