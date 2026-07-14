"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 z-50">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse delay-750"></div>

      {/* Main Glassmorphic Container */}
      <div className="relative flex flex-col items-center p-10 bg-slate-950/40 backdrop-blur-xl rounded-3xl border border-slate-800/80 shadow-2xl max-w-sm w-full mx-4">
        {/* Animated Outer Ring */}
        <div className="relative flex items-center justify-center w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-500 animate-spin"></div>
          
          {/* Inner pulsating icon container */}
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center animate-pulse">
            <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400 mb-2 tracking-tight">
          ZenTrack
        </h2>
        <p className="text-sm text-slate-400 font-medium animate-pulse">
          Initializing secure session...
        </p>

        {/* Mini progress indicator bar */}
        <div className="w-full h-[3px] bg-slate-800 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full w-2/3 animate-[loading-bar_1.5s_infinite_ease-in-out]"></div>
        </div>
      </div>

      {/* Global CSS for the custom progress bar animation */}
      <style jsx global>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(25%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
