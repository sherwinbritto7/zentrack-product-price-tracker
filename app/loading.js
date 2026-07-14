"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-linear-to-br from-slate-50 via-white to-emerald-50/30 z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Minimal emerald spinner */}
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        
        {/* Minimal typography */}
        <span className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Loading ZenTrack...
        </span>
      </div>
    </div>
  );
}
