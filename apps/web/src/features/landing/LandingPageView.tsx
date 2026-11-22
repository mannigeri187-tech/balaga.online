import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Layers,
  QrCode,
  Lock,
  Heart,
  Rocket,
  CheckCircle2,
  Users,
  Languages,
  Calendar,
  Share2,
  Check,
  MapPin,
  Plus,
  TrendingUp,
} from "lucide-react";
import { HeroCanvas } from "./components/HeroCanvas";
import { KineticMarquee } from "./components/KineticMarquee";
import { DualRealmWipeStage } from "./components/DualRealmWipeStage";
import { TiltCard } from "./components/TiltCard";
import { CustomCursor } from "./components/CustomCursor";

interface LandingPageViewProps {
  onEnterApp: (realm?: "socializing" | "founders") => void;
  onOpenLogin: (mode?: "login" | "signup") => void;
  onOpenPayment: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onEnterApp,
  onOpenLogin,
  onOpenPayment,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hero Dual Handle Claim Hook
  const [handleInput, setHandleInput] = useState<string>("");
  const cleanHandle = handleInput.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");

  // Mouse-reactive Ambient Spotlights
  const [mouseGlow, setMouseGlow] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  // Realm 01 (Socializing) Bento Card 1: IndicTrans2 Language Switcher
  const [socialLang, setSocialLang] = useState<"kannada" | "hindi" | "tamil" | "english">("kannada");
  const vernacularTranslations = {
    kannada: {
      script: "ನಮಸ್ಕಾರ ಬೆಂಗಳೂರು! ಇಂದು ಕಬ್ಬನ್ ಪಾರ್ಕ್‌ನಲ್ಲಿ ನಮ್ಮ ವೀಕೆಂಡ್ ಕಾಫಿ ಮೀಟ್‌ಅಪ್. ಎಲ್ಲರೂ ಬನ್ನಿ! ☕🌱",
      author: "ಆರವ್ ಪಟೇಲ್ · ಕಬ್ಬನ್ ಪಾರ್ಕ್",
      langTag: "ಕನ್ನಡ (IndicTrans2 Verified)",
    },
    hindi: {
      script: "नमस्ते बेंगलुरु! आज कब्बन पार्क में हमारा वीकेंड कॉफ़ी मीटअप है। सब लोग ज़रूर आएं! ☕🌱",
      author: "आरव पटेल · कब्बन पार्क",
      langTag: "हिन्दी (IndicTrans2 Verified)",
    },
    tamil: {
      script: "வணக்கம் பெங்களூரு! இன்று கப்பன் பூங்காவில் நமது வார இறுதி காபி சந்திப்பு. அனைவரும் வாருங்கள்! ☕🌱",
      author: "ஆரவ் படேல் · கப்பன் பூங்கா",
      langTag: "தமிழ் (IndicTrans2 Verified)",
    },
    english: {
      script: "Hello Bengaluru! Weekend coffee & community meetup live today at Cubbon Park. Join us! ☕🌱",
      author: "Aarav Patel · Cubbon Park",
      langTag: "English (AI Translated)",
    },
  };

  // Realm 01 (Socializing) Bento Card 3: Circle RSVP State
  const [isRsvpd, setIsRsvpd] = useState<boolean>(false);

  // Realm 01 (Socializing) Bento Card 4: UPI Split Calculator
  const [splitFriends, setSplitFriends] = useState<number>(3);
  const totalBill = 1200;
  const perPersonAmount = Math.round(totalBill / splitFriends);

  // Realm 02 (Founders) Bento Card 1: Kanban ATS Progression
  const [candidates, setCandidates] = useState<{ [key: string]: "applied" | "technical" | "offer" }>({
    "c-1": "applied",
    "c-2": "technical",
    "c-3": "offer",
  });

  const advanceCandidate = (id: string) => {
    setCandidates((prev) => {
      const current = prev[id];
      const nextStage = current === "applied" ? "technical" : current === "technical" ? "offer" : "applied";
      return { ...prev, [id]: nextStage };
    });
  };

  // Realm 02 (Founders) Bento Card 2: Cal.com Speed Mentorship Slot
  const [selectedSlot, setSelectedSlot] = useState<string>("10:30 AM IST");
  const [slotBooked, setSlotBooked] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const xPercent = Math.round((e.clientX / window.innerWidth) * 100);
      const yPercent = Math.round((e.clientY / window.innerHeight) * 100);
      setMouseGlow({ x: xPercent, y: yPercent });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const handleToPass = cleanHandle || "builder";
    try {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("handle", handleToPass);
      window.history.replaceState({}, "", currentUrl.toString());
    } catch {}
    onOpenLogin("signup");
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#fcfbf9] flex flex-col font-sans selection:bg-[#e5a855] selection:text-[#07080a] overflow-x-hidden antialiased relative">
      {/* Precision Non-Intrusive Custom Cursor */}
      <CustomCursor />

      {/* Real-time Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 z-[100] transition-all duration-75 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          1. CLEANED, SLEEK TOP NAVBAR
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-3.5 z-50 px-3 sm:px-6 w-full max-w-7xl mx-auto">
        <nav className="border border-white/10 bg-[#0c0d12]/85 backdrop-blur-2xl rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between shadow-2xl shadow-black/80 transition-all">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2.5 group text-left"
            >
              <img src="/icon.svg" alt="Chill2Build" className="w-8 h-8 rounded-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform object-cover" />
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Chill2Build
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest text-amber-400/90 border border-amber-400/30 px-2 py-0.5 rounded-full bg-amber-950/30">
                  chill2build.online
                </span>
              </div>
            </button>
          </div>

          {/* 4 Core Anchor Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-[#a39f93]">
            <button onClick={() => scrollToSection("problem")} className="hover:text-white transition">
              The Split
            </button>
            <button onClick={() => scrollToSection("transformation")} className="hover:text-white transition">
              Bifurcation
            </button>
            <button onClick={() => scrollToSection("realms")} className="hover:text-white transition">
              Realms
            </button>
            <button onClick={() => scrollToSection("zero-bleed")} className="hover:text-white transition">
              Zero-Bleed
            </button>
          </div>

          {/* Primary Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLogin("login")}
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#161822] hover:bg-[#1f2230] text-[#fcfbf9] border border-white/10 text-xs font-semibold transition"
            >
              Log In
            </button>

            <button
              onClick={() => onOpenLogin("signup")}
              className="px-3.5 sm:px-5 py-1.5 rounded-full bg-gradient-to-r from-[#e5a855] to-[#d97706] hover:from-[#f5b865] hover:to-[#e68716] text-[#07080a] text-xs font-bold transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5 group"
            >
              <span>Join Chill2Build</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </nav>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. UPGRADED HERO SECTION (TIGHTENED & ABOVE THE FOLD)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col items-center text-center overflow-hidden"
      >
        {/* Generative Canvas Background */}
        <HeroCanvas />

        {/* Dynamic Dual-Universe Ambient Spotlight (Violet left, Emerald right) */}
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Violet Spotlight (Socializing) */}
          <div
            className="absolute top-1/4 -left-20 w-[480px] h-[480px] bg-violet-600/12 rounded-full blur-[120px] transition-transform duration-700 ease-out"
            style={{
              transform: `translate(${mouseGlow.x * 0.15}px, ${mouseGlow.y * 0.15}px)`,
            }}
          />
          {/* Emerald Spotlight (Founders) */}
          <div
            className="absolute top-1/3 -right-20 w-[480px] h-[480px] bg-emerald-500/12 rounded-full blur-[120px] transition-transform duration-700 ease-out"
            style={{
              transform: `translate(-${mouseGlow.x * 0.15}px, -${mouseGlow.y * 0.15}px)`,
            }}
          />
          {/* Warm Amber Center Spotlight */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-amber-500/8 rounded-full blur-[100px]" />
        </div>

        {/* Sovereign Architecture Pill Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11131a]/90 border border-white/10 text-xs text-[#a09c91] mb-5 sm:mb-6 shadow-inner backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white">
            Sovereign Dual-Realm Architecture
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[#e5a855] font-semibold text-[10px] sm:text-[11px]">
            100% Zero Data Leakage
          </span>
        </div>

        {/* Hero Headline (Optimized sizing for 1080p fit) */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.04]">
            Two Worlds. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#e5a855] via-[#f7cb88] to-[#e5a855]">
              One Identity.
            </span>{" "}
            <br />
            <span className="text-white">Infinite Possibilities.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="relative z-10 mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-[#a8a498] max-w-2xl leading-relaxed font-light">
          India's sovereign network uniting authentic vernacular culture and neighborhood hangouts with an elite startup incubator, Twenty CRM hiring, and 0% commission UPI.
        </p>

        {/* ── INTERACTIVE "CLAIM YOUR DUAL HANDLE" HOOK ── */}
        <div className="relative z-10 mt-6 sm:mt-8 w-full max-w-xl mx-auto">
          <form
            onSubmit={handleClaimSubmit}
            className="p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#10121a]/90 border border-white/15 backdrop-blur-xl shadow-2xl shadow-black/60 flex flex-col sm:flex-row items-center gap-2 transition-all focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/20"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 w-full sm:w-auto flex-1 text-left">
              <span className="font-mono text-xs sm:text-sm text-amber-400/90 font-semibold select-none">
                chill2build.online/@
              </span>
              <input
                type="text"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value)}
                placeholder="yourname"
                maxLength={24}
                className="w-full bg-transparent border-none text-xs sm:text-sm font-mono text-white placeholder-white/25 focus:outline-none focus:ring-0"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl sm:rounded-full bg-gradient-to-r from-[#e5a855] via-[#d97706] to-[#b45309] hover:from-[#f5b865] hover:to-[#c66307] text-[#07080a] text-xs font-extrabold transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 shrink-0 group"
            >
              <span>Claim Both Realms</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Live Dual-Handle Availability Badges */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            {/* Socializing Handle Pill */}
            <div className="px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-200 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="font-bold text-white">@{cleanHandle || "yourname"}</span>
              <span className="text-[10px] text-violet-300">· Socializing Available</span>
            </div>

            {/* Founders Handle Pill */}
            <div className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">@{cleanHandle || "yourname"}.build</span>
              <span className="text-[10px] text-emerald-300">· Founders Available</span>
            </div>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="relative z-10 mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onOpenLogin("signup")}
            className="px-6 py-3 rounded-full bg-[#181a24] hover:bg-[#222534] text-white border border-white/10 text-xs sm:text-sm font-semibold transition flex items-center gap-2 shadow-sm"
          >
            <span>Create Master Account</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={() => onEnterApp()}
            className="px-6 py-3 rounded-full bg-[#141620] hover:bg-[#1d202e] text-[#fcfbf9] border border-white/10 text-xs sm:text-sm font-semibold transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Launch Live Platform</span>
          </button>

          <button
            onClick={() => scrollToSection("transformation")}
            className="px-4 py-3 rounded-full bg-transparent hover:bg-white/5 text-[#a8a498] hover:text-white text-xs sm:text-sm font-medium transition"
          >
            Explore Interactive Sandbox ↓
          </button>
        </div>

        {/* Real-Time Architectural Metrics */}
        <div className="relative z-10 mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl pt-6 border-t border-white/10">
          <div className="text-left p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-xl sm:text-2xl font-light text-white font-mono">0%</p>
            <p className="text-[10px] text-[#8c887e] uppercase tracking-wider mt-0.5">Direct UPI Commission</p>
          </div>
          <div className="text-left p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-xl sm:text-2xl font-light text-white font-mono">100%</p>
            <p className="text-[10px] text-[#8c887e] uppercase tracking-wider mt-0.5">RLS Schema Isolation</p>
          </div>
          <div className="text-left p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-xl sm:text-2xl font-light text-white font-mono">10+</p>
            <p className="text-[10px] text-[#8c887e] uppercase tracking-wider mt-0.5">IndicTrans2 Scripts</p>
          </div>
          <div className="text-left p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-xl sm:text-2xl font-light text-white font-mono">&lt;5ms</p>
            <p className="text-[10px] text-[#8c887e] uppercase tracking-wider mt-0.5">Realm Context Flip</p>
          </div>
        </div>
      </section>

      {/* Kinetic Ticker Ribbon */}
      <KineticMarquee
        items={[
          "Socializing Realm",
          "Founders Realm",
          "Zero Data Bleed",
          "IndicTrans2 Vernacular",
          "Twenty CRM Kanban",
          "Cal.com Schedulers",
          "0% MDR Direct UPI",
          "Hey.xyz Quad Media",
          "Dub.co Attribution",
        ]}
        direction="left"
        variant="amber"
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: THE PROBLEM (FRAGMENTED DIGITAL LIFE)
      ───────────────────────────────────────────────────────────── */}
      <section id="problem" className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <div className="lg:w-5/12 lg:sticky lg:top-28 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-[10px] font-mono uppercase tracking-wider text-red-300">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span>THE MODERN DILEMMA</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Your Digital Life Is Artificially Fractured.
            </h2>
            <p className="text-xs sm:text-sm text-[#a09c91] leading-relaxed">
              You are forced to maintain fragmented identities across extractive corporate platforms. Your weekend photos accidentally mix with venture conversations, or your professional network feels sterile and corporate.
            </p>
          </div>

          <div className="lg:w-7/12 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TiltCard glowColor="subtle" maxTilt={6}>
                <div className="p-6 rounded-3xl bg-[#0f1118] border border-white/5 space-y-2.5 h-full">
                  <div className="text-xs font-mono text-red-400 uppercase tracking-wider">01 · Extractive Ads</div>
                  <h3 className="text-lg font-bold text-white">Algorithmic Outrage</h3>
                  <p className="text-xs text-[#8c887e] leading-relaxed">
                    Social feeds engineered for doom-scrolling, intrusive tracking, and endless sponsored product interruptions.
                  </p>
                </div>
              </TiltCard>

              <TiltCard glowColor="subtle" maxTilt={6}>
                <div className="p-6 rounded-3xl bg-[#0f1118] border border-white/5 space-y-2.5 h-full">
                  <div className="text-xs font-mono text-red-400 uppercase tracking-wider">02 · Expensive SaaS</div>
                  <h3 className="text-lg font-bold text-white">Fragmented Tools</h3>
                  <p className="text-xs text-[#8c887e] leading-relaxed">
                    Paying monthly fees for multiple isolated platforms just to book meetings, track candidates, and shorten links.
                  </p>
                </div>
              </TiltCard>

              <TiltCard glowColor="subtle" maxTilt={6}>
                <div className="p-6 rounded-3xl bg-[#0f1118] border border-white/5 space-y-2.5 h-full">
                  <div className="text-xs font-mono text-red-400 uppercase tracking-wider">03 · Gatekept Culture</div>
                  <h3 className="text-lg font-bold text-white">Monolingual Bias</h3>
                  <p className="text-xs text-[#8c887e] leading-relaxed">
                    Lack of genuine vernacular support for India's regional scripts and local cultural nuances.
                  </p>
                </div>
              </TiltCard>

              <TiltCard glowColor="subtle" maxTilt={6}>
                <div className="p-6 rounded-3xl bg-[#0f1118] border border-white/5 space-y-2.5 h-full">
                  <div className="text-xs font-mono text-red-400 uppercase tracking-wider">04 · Privacy Leakage</div>
                  <h3 className="text-lg font-bold text-white">Phone Number DMs</h3>
                  <p className="text-xs text-[#8c887e] leading-relaxed">
                    Giving out private mobile numbers to candidates and recruiters, eliminating personal privacy.
                  </p>
                </div>
              </TiltCard>
            </div>

            <TiltCard glowColor="amber" maxTilt={5}>
              <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/30 via-[#181510] to-[#12141c] border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#e5a855] font-semibold">
                  <Sparkles className="w-4 h-4 text-[#e5a855]" />
                  <span>THE CHILL2BUILD SOVEREIGN ALTERNATIVE</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  One Master Account. Zero Data Bleed. Two Parallel Realms.
                </h3>
                <p className="text-xs sm:text-sm text-[#a8a498] leading-relaxed">
                  Log in once at <strong>chill2build.online</strong>. Enjoy authentic cultural life, vernacular reels, and friends on one side. Switch instantly to recruit talent, book mentor office hours, and launch products on the other.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: INTERACTIVE REALM CURTAIN (LIVE SANDBOX)
      ───────────────────────────────────────────────────────────── */}
      <section id="transformation" className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e5a855] font-semibold">
            [ 03 // BIFURCATION ]
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            One Sovereign Identity. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#e5a855] via-amber-200 to-amber-500">
              Mathematical Bifurcation.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#a09c91] leading-relaxed">
            Drag the golden divider below to scrub between Socializing and Founders realms in real time. Experience dual sovereign views without context corruption.
          </p>
        </div>

        {/* Live Interactive Sandbox Curtain Stage */}
        <DualRealmWipeStage onEnterApp={onEnterApp} />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: REALM 01 (SOCIALIZING) — INTERACTIVE 2x2 BENTO GRID
      ───────────────────────────────────────────────────────────── */}
      <div id="realms">
        <section id="social-realm" className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
          <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-violet-500/20 pb-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-[10px] font-mono uppercase tracking-wider text-violet-300">
                  <Heart className="w-3 h-3 text-violet-400" />
                  <span>REALM 01 · SOCIALIZING</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Culture, Hobbies & Authentic Community.
                </h2>
                <p className="text-xs sm:text-sm text-[#a09c91] leading-relaxed">
                  No corporate posturing or algorithmic outrage. A vibrant cultural network celebrating India's rich multilingual tapestry, weekend circles, and neighborhood hangouts.
                </p>
              </div>

              <button
                onClick={() => onEnterApp("socializing")}
                className="self-start md:self-auto px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition shadow-lg shadow-violet-900/40 flex items-center gap-2 group"
              >
                <span>Enter Socializing Realm</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 2x2 Interactive Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Bento Card 1: IndicTrans2 Vernacular Engine */}
              <TiltCard glowColor="violet" maxTilt={5}>
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0f1017] border border-violet-500/20 space-y-4 h-full flex flex-col justify-between hover:border-violet-500/40 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300">
                        <Languages className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-800">
                        &lt;12ms Engine
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">IndicTrans2 Vernacular Engine</h3>
                    <p className="text-xs text-[#8c887e] leading-relaxed">
                      Instant auto-detection and 1-click contextual translation across 10+ Indic scripts.
                    </p>

                    {/* Interactive Script Switcher Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(["kannada", "hindi", "tamil", "english"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setSocialLang(lang)}
                          className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition ${
                            socialLang === lang
                              ? "bg-violet-600 text-white shadow-sm shadow-violet-900/50"
                              : "bg-[#161824] text-[#a09c91] hover:text-white border border-white/5"
                          }`}
                        >
                          {lang === "kannada" ? "ಕನ್ನಡ" : lang === "hindi" ? "हिन्दी" : lang === "tamil" ? "தமிழ்" : "English"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Translated Preview Card */}
                  <div className="p-3.5 rounded-2xl bg-[#090a10] border border-violet-500/20 font-mono text-xs space-y-2 mt-2">
                    <div className="flex items-center justify-between text-[10px] text-violet-400">
                      <span>{vernacularTranslations[socialLang].author}</span>
                      <span className="text-[9px] text-[#8c887e]">{vernacularTranslations[socialLang].langTag}</span>
                    </div>
                    <p className="text-white font-medium text-xs sm:text-sm leading-relaxed min-h-[44px]">
                      {vernacularTranslations[socialLang].script}
                    </p>
                  </div>
                </div>
              </TiltCard>

              {/* Bento Card 2: Hey.xyz Multi-Media & Lightbox */}
              <TiltCard glowColor="violet" maxTilt={5}>
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0f1017] border border-violet-500/20 space-y-4 h-full flex flex-col justify-between hover:border-violet-500/40 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-800">
                        Zero Compression
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">Hey.xyz Multi-Media & Lightbox</h3>
                    <p className="text-xs text-[#8c887e] leading-relaxed">
                      Responsive 4-quad photo galleries with full-screen lightbox viewing and pristine resolution.
                    </p>
                  </div>

                  {/* Clean 4-Photo Quad Grid Preview */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="h-20 rounded-xl bg-gradient-to-tr from-violet-950/80 to-purple-900/40 border border-violet-500/20 p-2 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer">
                      <span className="text-[9px] font-mono text-violet-300">Cubbon Park</span>
                      <span className="text-xs">📸 Morning Sun</span>
                    </div>
                    <div className="h-20 rounded-xl bg-gradient-to-tr from-fuchsia-950/80 to-pink-900/40 border border-fuchsia-500/20 p-2 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer">
                      <span className="text-[9px] font-mono text-fuchsia-300">Indiranagar</span>
                      <span className="text-xs">☕ Roastery</span>
                    </div>
                    <div className="h-20 rounded-xl bg-gradient-to-tr from-indigo-950/80 to-blue-900/40 border border-indigo-500/20 p-2 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer">
                      <span className="text-[9px] font-mono text-indigo-300">Film Society</span>
                      <span className="text-xs">🎬 Indie Cinema</span>
                    </div>
                    <div className="h-20 rounded-xl bg-gradient-to-tr from-purple-950/80 to-violet-900/40 border border-purple-500/20 p-2 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer">
                      <span className="text-[9px] font-mono text-purple-300">Bandra</span>
                      <span className="text-xs">🎨 Art Street</span>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Bento Card 3: Local Circles & Flash Hangouts */}
              <TiltCard glowColor="violet" maxTilt={5}>
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0f1017] border border-violet-500/20 space-y-4 h-full flex flex-col justify-between hover:border-violet-500/40 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-800 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Radar
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">Local Circles & Flash Hangouts</h3>
                    <p className="text-xs text-[#8c887e] leading-relaxed">
                      Discover nearby weekend badminton matches, coffee meetups, and book clubs in Indiranagar, Koramangala, and Bandra.
                    </p>
                  </div>

                  {/* Mini Radar Pulse Card Preview */}
                  <div className="p-3.5 rounded-2xl bg-[#090a10] border border-violet-500/20 space-y-2.5 mt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-violet-400" />
                        <div>
                          <p className="text-white font-bold text-xs">Indiranagar Coffee & Code</p>
                          <p className="text-[10px] text-[#8c887e] font-mono">400m away · Today 4:00 PM</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800">
                        14 Going
                      </span>
                    </div>

                    <button
                      onClick={() => setIsRsvpd(!isRsvpd)}
                      className={`w-full py-2 rounded-xl text-xs font-semibold font-mono transition flex items-center justify-center gap-1.5 ${
                        isRsvpd
                          ? "bg-emerald-950 border border-emerald-500/40 text-emerald-300"
                          : "bg-violet-600 hover:bg-violet-500 text-white"
                      }`}
                    >
                      {isRsvpd ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>RSVP Confirmed (See You at 4 PM!)</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>1-Tap RSVP to Hangout</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </TiltCard>

              {/* Bento Card 4: Circle Split & Zero-Fee UPI */}
              <TiltCard glowColor="violet" maxTilt={5}>
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0f1017] border border-violet-500/20 space-y-4 h-full flex flex-col justify-between hover:border-violet-500/40 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        0% Platform Fee
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">Circle Split & Zero-Fee UPI</h3>
                    <p className="text-xs text-[#8c887e] leading-relaxed">
                      Split cafe bills and movie tickets with zero commission and instant bank-to-bank settlement.
                    </p>
                  </div>

                  {/* Interactive ₹1,200 Split Calculator */}
                  <div className="p-3.5 rounded-2xl bg-[#090a10] border border-violet-500/20 space-y-2.5 mt-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#8c887e]">Total Cafe Bill:</span>
                      <span className="text-white font-bold">₹{totalBill.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#8c887e]">Split Between:</span>
                      <div className="flex items-center gap-1.5">
                        {[2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            onClick={() => setSplitFriends(num)}
                            className={`w-6 h-6 rounded-lg text-[11px] font-bold transition ${
                              splitFriends === num
                                ? "bg-violet-600 text-white"
                                : "bg-[#161822] text-[#8c887e] hover:text-white"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-violet-950/30 border border-violet-500/30 flex items-center justify-between text-xs font-mono">
                      <span className="text-violet-200">Per Person:</span>
                      <span className="text-amber-400 font-bold text-sm">₹{perPersonAmount}</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 5: REALM 02 (FOUNDERS) — INTERACTIVE 2x2 BENTO GRID
        ───────────────────────────────────────────────────────────── */}
        <section id="founders-realm" className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
          <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-500/20 pb-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                  <Rocket className="w-3 h-3 text-emerald-400" />
                  <span>REALM 02 · FOUNDERS</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  High-Velocity Startup Incubator.
                </h2>
                <p className="text-xs sm:text-sm text-[#a09c91] leading-relaxed">
                  Consolidate hiring, speed mentorship, product launches, and investor introductions into one sovereign cockpit. Built-in zero-cost hiring pipeline and direct angel access.
                </p>
              </div>

              <button
                onClick={() => onEnterApp("founders")}
                className="self-start md:self-auto px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-900/40 flex items-center gap-2 group"
              >
                <span>Enter Founders Realm</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 2x2 Interactive Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Bento Card 1: Twenty CRM Kanban ATS */}
              <TiltCard glowColor="emerald" maxTilt={5}>
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0b1210] border border-emerald-500/20 space-y-4 h-full flex flex-col justify-between hover:border-emerald-500/40 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Native Recruiter ATS
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">Twenty CRM Kanban ATS</h3>
                    <p className="text-xs text-[#8c887e] leading-relaxed">
                      Visual candidate pipeline built directly into your dashboard. Click candidate cards to advance them across stages.
                    </p>
                  </div>

                  {/* Interactive 3-Column Mini Kanban */}
                  <div className="grid grid-cols-3 gap-2 mt-2 font-mono text-[10px]">
                    {/* Column 1: Applied */}
                    <div className="p-2 rounded-xl bg-[#060a08] border border-white/5 space-y-1.5">
                      <span className="text-[#8c887e] font-semibold text-[9px] uppercase">Applied</span>
                      {Object.entries(candidates).filter(([_, st]) => st === "applied").map(([id]) => (
                        <div
                          key={id}
                          onClick={() => advanceCandidate(id)}
                          className="p-1.5 rounded-lg bg-[#0e1713] border border-emerald-500/20 text-white cursor-pointer hover:border-emerald-400 transition"
                          title="Click to advance to Technical"
                        >
                          <p className="font-bold">Kiran R.</p>
                          <p className="text-[8px] text-emerald-400">Fullstack →</p>
                        </div>
                      ))}
                    </div>

                    {/* Column 2: Technical */}
                    <div className="p-2 rounded-xl bg-[#060a08] border border-white/5 space-y-1.5">
                      <span className="text-cyan-400 font-semibold text-[9px] uppercase">Technical</span>
                      {Object.entries(candidates).filter(([_, st]) => st === "technical").map(([id]) => (
                        <div
                          key={id}
                          onClick={() => advanceCandidate(id)}
                          className="p-1.5 rounded-lg bg-[#0a181c] border border-cyan-500/20 text-white cursor-pointer hover:border-cyan-400 transition"
                          title="Click to advance to Offer"
                        >
                          <p className="font-bold">Aditi Sen</p>
                          <p className="text-[8px] text-cyan-400">Backend →</p>
                        </div>
                      ))}
                    </div>

                    {/* Column 3: Offer */}
                    <div className="p-2 rounded-xl bg-[#060a08] border border-white/5 space-y-1.5">
                      <span className="text-emerald-400 font-semibold text-[9px] uppercase">Offer</span>
                      {Object.entries(candidates).filter(([_, st]) => st === "offer").map(([id]) => (
                        <div
                          key={id}
                          onClick={() => advanceCandidate(id)}
                          className="p-1.5 rounded-lg bg-[#0e1f14] border border-emerald-500/30 text-white cursor-pointer hover:border-emerald-400 transition"
                          title="Click to reset stage"
                        >
                          <p className="font-bold">Rohan V.</p>
                          <p className="text-[8px] text-emerald-300">Staff AI ↺</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Bento Card 2: Cal.com Speed Mentorship */}
              <TiltCard glowColor="emerald" maxTilt={5}>
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0b1210] border border-emerald-500/20 space-y-4 h-full flex flex-col justify-between hover:border-emerald-500/40 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Asia/Kolkata
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">Cal.com Speed Mentorship</h3>
                    <p className="text-xs text-[#8c887e] leading-relaxed">
                      15-minute 1-on-1 office hours with verified angel investors and tech leaders. Click a slot to test booking.
                    </p>
                  </div>

                  {/* Interactive Time Slot Pills */}
                  <div className="space-y-2.5 mt-2">
                    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                      {["10:00 AM IST", "10:30 AM IST", "11:00 AM IST", "2:30 PM IST"].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => {
                            setSelectedSlot(slot);
                            setSlotBooked(true);
                          }}
                          className={`p-2 rounded-xl text-center border font-mono transition ${
                            selectedSlot === slot
                              ? "bg-emerald-600 border-emerald-400 text-white font-bold shadow-md shadow-emerald-900/50"
                              : "bg-[#060a08] border-white/5 text-[#8c887e] hover:text-white hover:border-white/20"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    {slotBooked && (
                      <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Slot Reserved: 15-min Speed Mentorship with Sanjay S. (Angel)</span>
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>

              {/* Bento Card 3: Dub.co Launchpad & Attribution */}
              <TiltCard glowColor="emerald" maxTilt={5}>
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0b1210] border border-emerald-500/20 space-y-4 h-full flex flex-col justify-between hover:border-emerald-500/40 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        +48.2% CTR
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">Dub.co Launchpad & Attribution</h3>
                    <p className="text-xs text-[#8c887e] leading-relaxed">
                      Custom demo-day shortlinks with live conversion tracking and multi-channel traffic attribution.
                    </p>
                  </div>

                  {/* Animated Referrer Breakdown Preview */}
                  <div className="p-3.5 rounded-2xl bg-[#060a08] border border-emerald-500/20 font-mono text-xs space-y-2 mt-2">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span>chill2build.link/p/neural</span>
                      <span>1,842 Clicks</span>
                    </div>

                    <div className="space-y-1.5 pt-1 text-[10px]">
                      <div>
                        <div className="flex justify-between text-[#8c887e] mb-0.5">
                          <span>Twitter / X</span>
                          <span>44% (810)</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="w-[44%] h-full bg-emerald-500 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#8c887e] mb-0.5">
                          <span>Product Hunt</span>
                          <span>32% (589)</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="w-[32%] h-full bg-cyan-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Bento Card 4: Proof of Traction & Forkable Blueprints */}
              <TiltCard glowColor="emerald" maxTilt={5}>
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0b1210] border border-emerald-500/20 space-y-4 h-full flex flex-col justify-between hover:border-emerald-500/40 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Verified Proof
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white">Proof of Traction & Blueprints</h3>
                    <p className="text-xs text-[#8c887e] leading-relaxed">
                      Cryptographically verifiable metrics, milestone audits, and forkable architecture blueprints.
                    </p>
                  </div>

                  {/* Milestone Verification Badges */}
                  <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[10px]">
                    <div className="p-2.5 rounded-xl bg-[#060a08] border border-emerald-500/20 space-y-1">
                      <p className="text-emerald-400 font-bold text-xs">₹24.5L / mo</p>
                      <p className="text-[#8c887e]">MRR Verified</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#060a08] border border-cyan-500/20 space-y-1">
                      <p className="text-cyan-400 font-bold text-xs">84 Commits</p>
                      <p className="text-[#8c887e]">GitHub Active</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#060a08] border border-purple-500/20 space-y-1">
                      <p className="text-purple-400 font-bold text-xs">100% RLS</p>
                      <p className="text-[#8c887e]">Zero-Bleed</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#060a08] border border-amber-500/20 space-y-1">
                      <p className="text-amber-400 font-bold text-xs">0% MDR</p>
                      <p className="text-[#8c887e]">Direct NPCI</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: SEAMLESS WORLD SWITCHING DEMO
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e5a855] font-semibold">
            [ 06 // FLUIDITY ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Flip Reality in Under Five Milliseconds.
          </h2>
          <p className="text-xs sm:text-sm text-[#a09c91] leading-relaxed">
            One button in the persistent header toggles your active universe. The platform updates session context, rebinds API authentication headers, and swaps view trees instantaneously.
          </p>
        </div>

        {/* Interactive Switcher Demo Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0e1017] border border-white/10 max-w-2xl mx-auto text-center space-y-5 shadow-2xl">
          <div className="p-5 rounded-2xl bg-[#08090d] border border-white/5 font-mono text-xs text-left space-y-2">
            <div className="text-[#8c887e] flex items-center justify-between">
              <span>ACTIVE_TOKEN_SCOPE:</span>
              <span className="text-amber-400 font-bold">realm_sovereign_v2</span>
            </div>
            <div className="text-[#8c887e] flex items-center justify-between">
              <span>HTTP_HEADER:</span>
              <span className="text-emerald-400 font-semibold">x-platform-world: auto-injected</span>
            </div>
            <div className="text-[#8c887e] flex items-center justify-between">
              <span>LEAKAGE_RISK:</span>
              <span className="text-emerald-400 font-bold">0.000% (Postgres RLS Enforced)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: ZERO-BLEED PRIVACY GUARANTEE & SAFE UPI GATEWAY
      ───────────────────────────────────────────────────────────── */}
      <section id="zero-bleed" className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e5a855] font-semibold">
            [ 07 // ZERO-BLEED GUARANTEE ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Cryptographic Separation at Every Layer.
          </h2>
          <p className="text-xs sm:text-sm text-[#a09c91] leading-relaxed">
            Your personal photos never leak into investor meetings. Your startup pitch decks never clutter your social circle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Privacy Box 1 */}
          <TiltCard glowColor="amber" maxTilt={5}>
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0e1017] border border-white/10 space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Row-Level Security (RLS)</h3>
                <p className="text-xs text-[#8c887e] leading-relaxed">
                  Every query is stamped with the session's active realm. Postgres rejects any request attempting to query across world boundaries, guaranteeing zero memory or cache bleed.
                </p>
                <ul className="space-y-2 text-xs text-[#a09c91] pt-1 font-mono">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Strictly partitioned PostgreSQL tables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Dual handles: @name vs @name.build</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Zero cross-pollinated activity feeds</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[#08090d] border border-white/5 font-mono text-[10px] text-emerald-400 flex items-center gap-2 mt-3">
                <Lock className="w-3.5 h-3.5" />
                <span>AES-256 session encryption with Supabase Auth</span>
              </div>
            </div>
          </TiltCard>

          {/* Privacy Box 2: Zero-Fee UPI Payment Spotlight (With safe placeholder founder@upi) */}
          <TiltCard glowColor="emerald" maxTilt={5}>
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e1017] via-[#10171a] to-[#0c1412] border border-emerald-500/30 space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <QrCode className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Zero-Fee UPI Gateway</h3>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                    0% MDR
                  </span>
                </div>
                <p className="text-xs text-[#8c887e] leading-relaxed">
                  Direct NPCI bank-to-bank settlement (<code className="text-emerald-400 font-mono">founder@upi</code>). Instant QR code generation with 1-tap mobile deep links.
                </p>
                <ul className="space-y-2 text-xs text-[#a09c91] pt-1 font-mono">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>₹0 commission to foreign aggregators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct settlement to your bank account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Google Pay, PhonePe, and Paytm 1-tap intent</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onOpenPayment}
                className="w-full mt-3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#07080a] text-xs font-black transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Launch Zero-Fee UPI Payment Modal</span>
              </button>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: HOW CHILL2BUILD WORKS
      ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-white/10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e5a855] font-semibold">
            [ 08 // THE JOURNEY ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            How Chill2Build Works.
          </h2>
          <p className="text-xs sm:text-sm text-[#a09c91] leading-relaxed">
            Three intuitive steps to liberate your digital existence from corporate walled gardens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TiltCard glowColor="amber" maxTilt={5}>
            <div className="p-7 rounded-3xl bg-[#0e1017] border border-white/10 space-y-3 relative h-full">
              <span className="text-3xl font-mono font-light text-[#e5a855]/40">01</span>
              <h3 className="text-base font-bold text-white">Claim Your Sovereign ID</h3>
              <p className="text-xs text-[#8c887e] leading-relaxed">
                Register once with email and verify your address. One master credential unlocks both parallel universes.
              </p>
            </div>
          </TiltCard>

          <TiltCard glowColor="violet" maxTilt={5}>
            <div className="p-7 rounded-3xl bg-[#0e1017] border border-white/10 space-y-3 relative h-full">
              <span className="text-3xl font-mono font-light text-violet-400/40">02</span>
              <h3 className="text-base font-bold text-white">Initialize Twin Personas</h3>
              <p className="text-xs text-[#8c887e] leading-relaxed">
                Curate your personal handle for vernacular culture and local friends. Then build your founder portfolio for co-founders and angels.
              </p>
            </div>
          </TiltCard>

          <TiltCard glowColor="emerald" maxTilt={5}>
            <div className="p-7 rounded-3xl bg-[#0e1017] border border-white/10 space-y-3 relative h-full">
              <span className="text-3xl font-mono font-light text-emerald-400/40">03</span>
              <h3 className="text-base font-bold text-white">Traverse Realms At Will</h3>
              <p className="text-xs text-[#8c887e] leading-relaxed">
                Switch universes anytime in under 5 milliseconds with zero risk of cross-pollinated activity feeds.
              </p>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: FINAL BRAND REVEAL & CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-amber-500/15 via-violet-600/15 to-emerald-500/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 p-7 sm:p-12 rounded-3xl bg-[#0e1017]/90 border border-white/15 backdrop-blur-3xl shadow-2xl space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e5a855] font-semibold">
            [ 09 // READY TO COMMENCE ]
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Stop Splitting Your Life. <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#e5a855] via-amber-200 to-amber-500">
              Own Both Realms.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#a09c91] max-w-xl mx-auto leading-relaxed">
            Join creators, builders, and community visionaries already active on Chill2Build's sovereign dual-realm network.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenLogin("signup")}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#e5a855] via-[#d97706] to-[#b45309] hover:from-[#f5b865] hover:to-[#c66307] text-[#07080a] text-xs sm:text-sm font-black transition shadow-2xl shadow-amber-500/30 flex items-center gap-2 group"
            >
              <span>Join Chill2Build — It's Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onEnterApp()}
              className="px-7 py-3.5 rounded-full bg-[#181a24] hover:bg-[#222534] text-white border border-white/10 text-xs sm:text-sm font-bold transition flex items-center gap-2"
            >
              <span>Launch Live App</span>
            </button>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-5 text-[11px] text-[#8c887e]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>No credit card required</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Free forever tier</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>0% Commission UPI</span>
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10: PROFESSIONAL FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#060709] py-12 px-4 sm:px-8 text-xs text-[#8c887e]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-3 max-w-sm">
              <div className="flex items-center gap-2.5">
                <img src="/icon.svg" alt="Chill2Build" className="w-7 h-7 rounded-lg" />
                <span className="font-extrabold text-base tracking-tight text-white">
                  Chill2Build
                </span>
              </div>
              <p className="text-xs text-[#8c887e] leading-relaxed">
                India's sovereign dual-realm ecosystem. Two worlds. One identity. Infinite possibilities. Built on zero-cost high-performance infrastructure.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Edge Nodes Active (Cloudflare + Supabase + Vercel)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="space-y-2.5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-white font-bold">
                  Two Realms
                </p>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <button onClick={() => onEnterApp("socializing")} className="hover:text-white transition">
                      Socializing Realm
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onEnterApp("founders")} className="hover:text-white transition">
                      Founders Realm
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("transformation")} className="hover:text-white transition">
                      Live Bifurcation
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("zero-bleed")} className="hover:text-white transition">
                      Zero Data Bleed
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-white font-bold">
                  Technologies
                </p>
                <ul className="space-y-1.5 text-xs text-[#a09c91]">
                  <li>IndicTrans2 Engine</li>
                  <li>Twenty CRM ATS</li>
                  <li>Cal.com Schedulers</li>
                  <li>Hey.xyz Quad Media</li>
                  <li>Dub.co Attribution</li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-white font-bold">
                  Access & Security
                </p>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <button onClick={onOpenPayment} className="hover:text-white transition">
                      Zero-Fee UPI Gateway
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onOpenLogin("login")} className="hover:text-white transition">
                      Sign In
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onOpenLogin("signup")} className="hover:text-white transition">
                      Create Account
                    </button>
                  </li>
                  <li>
                    <span className="text-[#a09c91]">Postgres RLS Guard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#6c6960]">
            <div>
              © 2026 Chill2Build. All rights reserved. Built for Bharat & the Global Sovereign Web.
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px]">
              <span>ZERO_MDR: ENABLED</span>
              <span>RLS_ISOLATION: 100%</span>
              <span>TIMEZONE: ASIA/KOLKATA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
