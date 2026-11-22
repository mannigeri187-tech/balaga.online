import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useWorld } from "../../contexts/WorldContext";
import { WORLDS } from "@platform/config";

// Lazy-loaded Socializing views for bundle code-splitting
const SocialFeed = React.lazy(() => import("../../features/socializing/SocialFeed").then((m) => ({ default: m.SocialFeed })));
const PeopleDiscovery = React.lazy(() => import("../../features/socializing/PeopleDiscovery").then((m) => ({ default: m.PeopleDiscovery })));
const SocialStories = React.lazy(() => import("../../features/socializing/SocialStories").then((m) => ({ default: m.SocialStories })));
const SocialReels = React.lazy(() => import("../../features/socializing/SocialReels").then((m) => ({ default: m.SocialReels })));
const SocialCommunities = React.lazy(() => import("../../features/socializing/SocialCommunities").then((m) => ({ default: m.SocialCommunities })));
const SocialEvents = React.lazy(() => import("../../features/socializing/SocialEvents").then((m) => ({ default: m.SocialEvents })));
const SocialInbox = React.lazy(() => import("../../features/socializing/SocialInbox").then((m) => ({ default: m.SocialInbox })));
const SocialNotifications = React.lazy(() => import("../../features/socializing/SocialNotifications").then((m) => ({ default: m.SocialNotifications })));
const SocialProfileView = React.lazy(() => import("../../features/socializing/SocialProfileView").then((m) => ({ default: m.SocialProfileView })));
const SocialExplore = React.lazy(() => import("../../features/socializing/SocialExplore").then((m) => ({ default: m.SocialExplore })));

// Lazy-loaded Founders views for bundle code-splitting
const FoundersDashboard = React.lazy(() => import("../../features/founders/FoundersDashboard").then((m) => ({ default: m.FoundersDashboard })));
const FoundersInbox = React.lazy(() => import("../../features/founders/FoundersInbox").then((m) => ({ default: m.FoundersInbox })));
const FoundersNotifications = React.lazy(() => import("../../features/founders/FoundersNotifications").then((m) => ({ default: m.FoundersNotifications })));
const FoundersProfileView = React.lazy(() => import("../../features/founders/FoundersProfileView").then((m) => ({ default: m.FoundersProfileView })));
const LinkedInFeedView = React.lazy(() => import("../../features/founders/LinkedInFeedView").then((m) => ({ default: m.LinkedInFeedView })));
const FounderNetworkView = React.lazy(() => import("../../features/founders/FounderNetworkView").then((m) => ({ default: m.FounderNetworkView })));
const OpportunitiesMarketplaceView = React.lazy(() => import("../../features/founders/OpportunitiesMarketplaceView").then((m) => ({ default: m.OpportunitiesMarketplaceView })));
const HiringCentreView = React.lazy(() => import("../../features/founders/HiringCentreView").then((m) => ({ default: m.HiringCentreView })));
const StartupHubView = React.lazy(() => import("../../features/founders/StartupHubView").then((m) => ({ default: m.StartupHubView })));
const ProductLaunchpadView = React.lazy(() => import("../../features/founders/ProductLaunchpadView").then((m) => ({ default: m.ProductLaunchpadView })));
const StartupCollaborationView = React.lazy(() => import("../../features/founders/StartupCollaborationView").then((m) => ({ default: m.StartupCollaborationView })));
const ReferralExchangeView = React.lazy(() => import("../../features/founders/ReferralExchangeView").then((m) => ({ default: m.ReferralExchangeView })));
const MentorNetworkView = React.lazy(() => import("../../features/founders/MentorNetworkView").then((m) => ({ default: m.MentorNetworkView })));
const InvestorNetworkView = React.lazy(() => import("../../features/founders/InvestorNetworkView").then((m) => ({ default: m.InvestorNetworkView })));
const BuildSpacesView = React.lazy(() => import("../../features/founders/BuildSpacesView").then((m) => ({ default: m.BuildSpacesView })));
const VerificationCentreView = React.lazy(() => import("../../features/founders/VerificationCentreView").then((m) => ({ default: m.VerificationCentreView })));
const PremiumCentreView = React.lazy(() => import("../../features/founders/PremiumCentreView").then((m) => ({ default: m.PremiumCentreView })));

const ViewLoadingFallback: React.FC<{ isSocial: boolean }> = ({ isSocial }) => (
  <div className="flex items-center justify-center h-64 animate-in fade-in duration-150">
    <div className="flex flex-col items-center gap-3">
      <div
        className={`w-7 h-7 border-2 border-t-transparent rounded-full animate-spin ${
          isSocial ? "border-violet-500" : "border-emerald-500"
        }`}
      />
      <span className="text-xs text-slate-400 font-medium">Loading view...</span>
    </div>
  </div>
);
import { CreateMediaModal } from "../../features/socializing/CreateMediaModal";
import { CommandPaletteModal } from "../CommandPaletteModal";
import { IntelligenceControlModal } from "../IntelligenceControlModal";
import { LandingPageView } from "../../features/landing/LandingPageView";
import { LoginModal } from "../../features/landing/LoginModal";
import { UpiPaymentModal } from "../../features/landing/UpiPaymentModal";

interface WorldLayoutProps {
  onNavigateToLanding?: () => void;
}

export const WorldLayout: React.FC<WorldLayoutProps> = ({ onNavigateToLanding }) => {
  const { activeWorld, switchWorld, isLoading } = useWorld();
  const isSocial = activeWorld === WORLDS.SOCIALIZING;
  const [currentTab, setCurrentTab] = useState<string>("feed");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isIntelligenceModalOpen, setIsIntelligenceModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keep tab aligned when user switches worlds (ONLY on activeWorld transition)
  const prevWorldRef = React.useRef(activeWorld);
  React.useEffect(() => {
    if (prevWorldRef.current !== activeWorld) {
      prevWorldRef.current = activeWorld;
      setCurrentTab(isSocial ? "feed" : "dashboard");
    }
  }, [activeWorld, isSocial]);

  const handleTabChange = (tab: string) => {
    if (tab === "landing") {
      if (onNavigateToLanding) {
        onNavigateToLanding();
        return;
      }
      setCurrentTab("landing");
      return;
    }
    if (tab === "ai") {
      setIsIntelligenceModalOpen(true);
      return;
    }
    if (tab === "payment") {
      setIsPaymentModalOpen(true);
      return;
    }
    if (tab === "login") {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentTab(tab);
  };

  const renderSocialContent = () => {
    switch (currentTab) {
      case "explore":
        return <SocialExplore />;
      case "stories":
        return <SocialStories />;
      case "reels":
        return <SocialReels />;
      case "discover":
        return <PeopleDiscovery />;
      case "communities":
        return <SocialCommunities />;
      case "events":
        return <SocialEvents />;
      case "inbox":
        return <SocialInbox />;
      case "notifications":
        return <SocialNotifications onNavigateTab={setCurrentTab} />;
      case "profile":
        return <SocialProfileView onNavigateTab={setCurrentTab} />;
      case "saved":
      case "saved_posts":
        return <SocialFeed initialTab="saved" />;
      case "feed":
      default:
        return <SocialFeed />;
    }
  };

  const renderFoundersContent = () => {
    switch (currentTab) {
      case "feed":
        return <LinkedInFeedView onNavigateTab={setCurrentTab} />;
      case "profile":
        return <FoundersProfileView onNavigateTab={setCurrentTab} />;
      case "inbox":
        return <FoundersInbox />;
      case "notifications":
        return <FoundersNotifications />;
      case "network":
        return <FounderNetworkView onNavigateTab={setCurrentTab} />;
      case "opportunities":
        return <OpportunitiesMarketplaceView onNavigateTab={setCurrentTab} />;
      case "hiring":
        return <HiringCentreView onNavigateTab={setCurrentTab} />;
      case "startups":
        return <StartupHubView onNavigateTab={setCurrentTab} />;
      case "launchpad":
        return <ProductLaunchpadView onNavigateTab={setCurrentTab} />;
      case "collaborations":
        return <StartupCollaborationView onNavigateTab={setCurrentTab} />;
      case "spaces":
        return <BuildSpacesView onNavigateTab={setCurrentTab} />;
      case "referrals":
        return <ReferralExchangeView onNavigateTab={setCurrentTab} />;
      case "mentors":
        return <MentorNetworkView onNavigateTab={setCurrentTab} />;
      case "investors":
        return <InvestorNetworkView onNavigateTab={setCurrentTab} />;
      case "verification":
        return <VerificationCentreView />;
      case "premium":
        return <PremiumCentreView />;
      case "dashboard":
      default:
        return <FoundersDashboard onNavigateTab={setCurrentTab} />;
    }
  };

  if (currentTab === "landing") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <LandingPageView
          onEnterApp={(realm) => {
            if (realm && realm !== activeWorld) {
              switchWorld(realm);
            }
            setCurrentTab(realm === "founders" ? "dashboard" : "feed");
          }}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenPayment={() => setIsPaymentModalOpen(true)}
        />

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={(realm) => {
            if (realm && realm !== activeWorld) {
              switchWorld(realm);
            }
            setCurrentTab(realm === "founders" ? "dashboard" : "feed");
          }}
        />

        <UpiPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top persistent header housing Top-Left Switcher & Top-Right Profile Dropdown */}
      <Header onNavigateTab={handleTabChange} />

      <div className="flex-1 flex pb-14 sm:pb-0">
        {/* World-specific left navigation (hidden on small mobile screens) */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={handleTabChange}
          onCreateClick={() => setIsCreateModalOpen(true)}
        />

        {/* Dynamic World Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${
                    isSocial ? "border-violet-500" : "border-emerald-500"
                  }`}
                />
                <span className="text-xs text-slate-400">
                  Switching to {isSocial ? "Socializing" : "Founders"} Identity...
                </span>
              </div>
            </div>
          ) : (
            <React.Suspense fallback={<ViewLoadingFallback isSocial={isSocial} />}>
              {isSocial ? renderSocialContent() : renderFoundersContent()}
            </React.Suspense>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar for Socializing Realm */}
      {isSocial && (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-14 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-lg flex items-center justify-around z-40 px-2">
          <button
            onClick={() => handleTabChange("feed")}
            className={`p-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
              currentTab === "feed" ? "text-violet-400 font-bold" : "text-slate-400"
            }`}
          >
            <span className="text-xs">🏠</span>
            <span className="text-[10px]">Home</span>
          </button>
          <button
            onClick={() => handleTabChange("explore")}
            className={`p-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
              currentTab === "explore" ? "text-violet-400 font-bold" : "text-slate-400"
            }`}
          >
            <span className="text-xs">🔍</span>
            <span className="text-[10px]">Explore</span>
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-1.5 rounded-xl flex flex-col items-center gap-0.5 text-violet-400 font-bold"
          >
            <span className="text-base">➕</span>
            <span className="text-[10px]">Create</span>
          </button>
          <button
            onClick={() => handleTabChange("reels")}
            className={`p-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
              currentTab === "reels" ? "text-violet-400 font-bold" : "text-slate-400"
            }`}
          >
            <span className="text-xs">🎬</span>
            <span className="text-[10px]">Reels</span>
          </button>
          <button
            onClick={() => handleTabChange("profile")}
            className={`p-1.5 rounded-xl flex flex-col items-center gap-0.5 ${
              currentTab === "profile" ? "text-violet-400 font-bold" : "text-slate-400"
            }`}
          >
            <span className="text-xs">👤</span>
            <span className="text-[10px]">Profile</span>
          </button>
        </nav>
      )}

      {/* Floating Triggers: Intelligence & Command Menu */}
      <div className="fixed bottom-20 sm:bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsIntelligenceModalOpen(true)}
          className={`px-3 py-1.5 rounded-full border shadow-xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 group transition ${
            isSocial
              ? "bg-violet-950/90 border-violet-500/40 text-violet-200 hover:bg-violet-900"
              : "bg-emerald-950/90 border-emerald-500/40 text-emerald-200 hover:bg-emerald-900"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:animate-ping" />
          <span>✨ Chill2Build AI</span>
        </button>

        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 hover:border-slate-500 shadow-xl backdrop-blur-md text-xs font-mono text-slate-300 flex items-center gap-2 group transition"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
          <span>⌘K Command Menu</span>
        </button>
      </div>

      {/* Create Post / Reel Modal */}
      {isSocial && (
        <CreateMediaModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {/* Global Command Palette */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={handleTabChange}
      />

      {/* Balaga Intelligence Control Centre (Milestone 1) */}
      <IntelligenceControlModal
        isOpen={isIntelligenceModalOpen}
        onClose={() => setIsIntelligenceModalOpen(false)}
      />

      {/* Login / Fast Profile Switcher Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(realm) => {
          if (realm && realm !== activeWorld) {
            switchWorld(realm);
          }
          setCurrentTab(realm === "founders" ? "dashboard" : "feed");
        }}
      />

      {/* Zero-Fee UPI Payment Gateway Modal */}
      <UpiPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  );
};

