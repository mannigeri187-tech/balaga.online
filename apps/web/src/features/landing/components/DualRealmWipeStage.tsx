import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ShieldCheck,
  Languages,
  Layers,
  MessageSquare,
  Calendar,
  Share2,
  ArrowRight,
  Sparkles,
  Clock,
  Sliders,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";

interface DualRealmWipeStageProps {
  onEnterApp: (realm: "socializing" | "founders") => void;
}

export const DualRealmWipeStage: React.FC<DualRealmWipeStageProps> = ({
  onEnterApp,
}) => {
  // Slider position from 0 (all founders) to 100 (all social). Default 50 (half-and-half)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Interactive Card Actions State
  const [isTranslated, setIsTranslated] = useState<boolean>(false);
  const [candidateStageIndex, setCandidateStageIndex] = useState<number>(0);
  const candidateStages = [
    { label: "Screening", color: "text-amber-400 bg-amber-950/50 border-amber-500/30", next: "Advance to Tech →" },
    { label: "Technical Interview", color: "text-cyan-400 bg-cyan-950/50 border-cyan-500/30", next: "Advance to Offer →" },
    { label: "Offer Extended", color: "text-emerald-400 bg-emerald-950/50 border-emerald-500/30", next: "Reset to Screening ↺" },
  ];

  // Firewall Test State
  const [isTestingFirewall, setIsTestingFirewall] = useState<boolean>(false);
  const [firewallBlocked, setFirewallBlocked] = useState<boolean>(false);

  const runFirewallTest = () => {
    setIsTestingFirewall(true);
    setFirewallBlocked(false);
    setTimeout(() => {
      setIsTestingFirewall(false);
      setFirewallBlocked(true);
    }, 450);
  };

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPos(percentage);
    setHasInteracted(true);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasInteracted(true);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
    setHasInteracted(true);
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Top Controller Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-2">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs text-[#a09c91]">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold uppercase tracking-wider">Live Sandbox Curtain</span>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-amber-300 shadow-sm">
            Social {Math.round(sliderPos)}% · {Math.round(100 - sliderPos)}% Founders
          </span>

          {/* Quick Jump Buttons */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => { setSliderPos(80); setHasInteracted(true); }}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-violet-950/40 border border-violet-500/30 text-violet-300 hover:bg-violet-900/50 transition"
            >
              Social 80%
            </button>
            <button
              onClick={() => { setSliderPos(50); setHasInteracted(true); }}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#161822] border border-white/10 text-[#d8d3c7] hover:bg-[#202330] transition"
            >
              Split 50/50
            </button>
            <button
              onClick={() => { setSliderPos(20); setHasInteracted(true); }}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 transition"
            >
              Founders 80%
            </button>
          </div>
        </div>

        {/* Security Firewall Leak Simulation Trigger */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={runFirewallTest}
            disabled={isTestingFirewall}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold border transition-all flex items-center gap-2 shadow-sm ${
              isTestingFirewall
                ? "bg-red-950/80 border-red-500 text-red-300 animate-pulse"
                : firewallBlocked
                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40"
                : "bg-[#141620] border-amber-500/30 text-amber-300 hover:bg-[#1d202e] hover:border-amber-400"
            }`}
            title="Simulate cross-realm memory leakage check"
          >
            {isTestingFirewall ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-spin" />
                <span>Injecting Cross-Realm Packet...</span>
              </>
            ) : firewallBlocked ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold">BLOCKED BY POSTGRES RLS — 0 bytes leaked</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Test Firewall Isolation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Split Curtain Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        className={`relative w-full h-[560px] sm:h-[490px] rounded-3xl border border-white/10 overflow-hidden select-none shadow-2xl bg-[#090b10] transition-shadow duration-300 ${
          isTestingFirewall ? "ring-2 ring-red-500/50 shadow-red-950/50" : ""
        }`}
      >
        {/* ── LAYER 1 (BASE): FOUNDERS REALM (Right Side) ── */}
        <div className="absolute inset-0 bg-[#090e0c] p-5 sm:p-9 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-lg shadow-inner">
                🚀
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white text-base">Priya Sharma</span>
                  <span className="text-xs font-mono text-emerald-400">@priya.build</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 text-[10px] font-mono text-emerald-200 border border-emerald-700/50">
                    Seed AI Founder
                  </span>
                </div>
                <p className="text-xs text-[#8c887e]">
                  Venture ecosystem · Twenty CRM ATS · Cal.com Asia/Kolkata
                </p>
              </div>
            </div>

            <button
              onClick={() => onEnterApp("founders")}
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-900/40 flex items-center gap-1.5"
            >
              <span>Enter Founders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Cards Body */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
            {/* Interactive Candidate Stage Progression Card */}
            <div className="p-4 rounded-2xl bg-[#0d1412] border border-emerald-500/20 space-y-2 hover:border-emerald-500/40 transition">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Twenty CRM ATS
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Interactive
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#060a08] border border-white/5 space-y-2 font-mono text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">Aditi Sen · Staff Backend</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] border ${candidateStages[candidateStageIndex].color}`}>
                    {candidateStages[candidateStageIndex].label}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCandidateStageIndex((prev) => (prev + 1) % candidateStages.length);
                  }}
                  className="w-full py-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold transition flex items-center justify-center gap-1"
                >
                  <span>{candidateStages[candidateStageIndex].next}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#8c887e]">
                Click above to test zero-cost recruiter ATS candidate staging.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d1412] border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Cal.com Scheduler
                </span>
                <span className="font-mono text-[10px] text-emerald-400">Asia/Kolkata</span>
              </div>
              <div className="p-2 rounded-xl bg-[#060a08] border border-white/5 space-y-1 font-mono text-[10px]">
                <div className="text-white font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" /> 15-Min Speed Mentorship
                </div>
                <div className="text-emerald-300">Slot: 10:30 AM Today (Available)</div>
              </div>
              <p className="text-[11px] text-[#8c887e]">
                Automatic calendar sync for mentor & investor sessions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d1412] border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  Dub.co Attribution
                </span>
                <span className="font-mono text-[10px] text-cyan-400">+48.2% CTR</span>
              </div>
              <div className="p-2 rounded-xl bg-[#060a08] border border-white/5 space-y-1 font-mono text-[10px]">
                <div className="text-emerald-300 font-bold">balaga.link/p/neural</div>
                <div className="text-white">1,842 Demo Visitors Verified</div>
              </div>
              <p className="text-[11px] text-[#8c887e]">
                Zero UTM clutter: real-time conversion & attribution tracking.
              </p>
            </div>
          </div>

          {/* Security stamp */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8c887e] border-t border-emerald-500/10 pt-3">
            <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Founders Data Isolated · Row-Level Security
            </span>
            <span className="font-mono">x-platform-world: founders</span>
          </div>
        </div>

        {/* ── LAYER 2 (CLIPPED OVERLAY): SOCIALIZING REALM (Left Side) ── */}
        <div
          className="absolute inset-0 bg-[#0d0914] p-5 sm:p-9 flex flex-col justify-between overflow-hidden"
          style={{
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-violet-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-lg shadow-inner">
                🎨
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white text-base">Aarav Patel</span>
                  <span className="text-xs font-mono text-violet-400">@aarav</span>
                  <span className="px-2 py-0.5 rounded-full bg-violet-900/60 text-[10px] font-mono text-violet-200 border border-violet-700/50">
                    Bengaluru Explorer
                  </span>
                </div>
                <p className="text-xs text-[#8c887e]">
                  Vernacular reels · IndicTrans2 AI · Hey.xyz Quad Media
                </p>
              </div>
            </div>

            <button
              onClick={() => onEnterApp("socializing")}
              className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition shadow-lg shadow-violet-900/40 flex items-center gap-1.5"
            >
              <span>Enter Socializing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Cards Body */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto">
            {/* Interactive Kannada to English Translation Card */}
            <div className="p-4 rounded-2xl bg-[#140e1f] border border-violet-500/20 space-y-2 hover:border-violet-500/40 transition">
              <div className="flex items-center justify-between text-xs font-bold text-violet-300">
                <span className="flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-violet-400" />
                  IndicTrans2 AI
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-violet-950 text-amber-300 border border-violet-800">
                  {isTranslated ? "English" : "ಕನ್ನಡ"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#09060f] border border-white/5 space-y-2 font-mono text-[10px]">
                <div className="text-white font-medium min-h-[32px] transition-all">
                  {isTranslated ? (
                    <span className="text-violet-200 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      "Hello Bengaluru! Coffee time ☕ • Let's meet at Indiranagar today."
                    </span>
                  ) : (
                    <span>ನಮಸ್ಕಾರ ಬೆಂಗಳೂರು! ಕಾಫಿ ಟೈಮ್ ☕ • ಇಂದು ಇಂದಿರಾನಗರದಲ್ಲಿ ಭೇಟಿಯಾಗೋಣ.</span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTranslated((prev) => !prev);
                  }}
                  className="w-full py-1.5 px-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px] font-semibold transition flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3 text-violet-400" />
                  <span>{isTranslated ? "Show Kannada Original ↺" : "Translate Kannada → English"}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#8c887e]">
                1-click auto-detection across 10+ Indic scripts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#140e1f] border border-violet-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-violet-300">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-violet-400" />
                  Hey.xyz Quad Media
                </span>
                <span className="font-mono text-[10px] text-violet-400">4-Quad Grid</span>
              </div>
              <div className="p-2 rounded-xl bg-[#09060f] border border-white/5 grid grid-cols-2 gap-1 text-[9px] font-mono text-center">
                <div className="p-1 rounded bg-violet-950/60 text-violet-200">Cubbon Park</div>
                <div className="p-1 rounded bg-fuchsia-950/60 text-fuchsia-200">Indiranagar</div>
              </div>
              <p className="text-[11px] text-[#8c887e]">
                Zero-compression 4K lightbox galleries and reels.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#140e1f] border border-violet-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-violet-300">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                  Chatwoot DMs
                </span>
                <span className="font-mono text-[10px] text-cyan-400">✓✓ Read</span>
              </div>
              <div className="p-2 rounded-xl bg-[#09060f] border border-white/5 space-y-1 font-mono text-[10px]">
                <div className="text-[#8c887e]">"Badminton tonight at 7 PM? 🏸"</div>
                <div className="text-violet-300">"I'm in! Bringing racquets."</div>
              </div>
              <p className="text-[11px] text-[#8c887e]">
                Encrypted chat without leaking private phone numbers.
              </p>
            </div>
          </div>

          {/* Security stamp */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8c887e] border-t border-violet-500/10 pt-3">
            <span className="text-violet-400 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Social Data Isolated · Row-Level Security
            </span>
            <span className="font-mono">x-platform-world: socializing</span>
          </div>
        </div>

        {/* ── INTERACTIVE DRAGGABLE DIVIDER HANDLE WITH PULSE & ARROWS ── */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 via-amber-200 to-amber-500 cursor-ew-resize z-30 shadow-2xl shadow-amber-500/80"
          style={{
            left: `${sliderPos}%`,
            transform: "translateX(-50%)",
          }}
        >
          {/* Tactile Grab Knob with ◄ | ► Arrows and Initial Discovery Pulse */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#07080a] border-2 border-amber-400 shadow-2xl shadow-amber-400/80 flex items-center justify-center text-amber-300 font-mono text-xs font-bold transition-all hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing ${
              !hasInteracted ? "ring-4 ring-amber-400/40 animate-pulse" : ""
            }`}
            title="Drag horizontally to scrub between Socializing and Founders"
          >
            <span className="tracking-tighter select-none font-bold">◄ | ►</span>
          </div>
        </div>
      </div>
    </div>
  );
};
