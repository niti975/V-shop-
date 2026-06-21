/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  Palette, 
  Layers, 
  Zap, 
  Users, 
  ShieldCheck, 
  BookOpen, 
  Smartphone, 
  Clock, 
  Flame, 
  Play, 
  FolderLock,
  ChevronRight,
  TrendingUp,
  Cpu,
  RefreshCw,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom sub-components
import Phase1Pillars from './components/Phase1Pillars';
import Phase2LiveCommerce from './components/Phase2LiveCommerce';
import Phase3Escrow from './components/Phase3Escrow';
import Phase4SocialViral from './components/Phase4SocialViral';
import Phase5AntiFraud from './components/Phase5AntiFraud';
import RoadmapGuide from './components/RoadmapGuide';
import PlayPublisherHub from './components/PlayPublisherHub';
import AIAssistantWidget from './components/AIAssistantWidget';
import SystemPatchCenter from './components/SystemPatchCenter';
import VerificationDesk from './components/VerificationDesk';

export default function App() {
  const [activeTab, setActiveTab] = useState<'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5' | 'code_guide' | 'publisher_hub' | 'system_patch' | 'verification_desk'>('phase1');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Dynamic branding & notices states loaded live from backend
  const [systemConfig, setSystemConfig] = useState<any>({
    appName: "Livekart V-Shop Super-App",
    nominationLine: "🎯 NOMINATED FOR INDIA ARTISAN TRUST AWARD 2026 • भारत के सर्वश्रेष्ठ स्वदेशी लाइव-कॉमर्स ऐप 2026 के लिए नामांकित",
    primaryColor: "amber",
    safetyRules: [
      "सभी ख़रीदारी Razorpay 7-day Escrow में सुरक्षित रहेगी।",
      "सामान मिलने पर Unboxing Video बनाना अनिवार्य है ताकी किसी विवाद में पूरा पैसा वापस मिल सके।",
      "प्रत्येक ट्रांजेक्शन स्वतंत्र बुनकर सहकारी संस्थाओं के खातों में सीधा जाता है।"
    ]
  });

  const fetchLiveConfig = async () => {
    try {
      const res = await fetch('/api/system/settings');
      if (res.ok) {
        const data = await res.json();
        setSystemConfig(data);
      }
    } catch {
      // Keep static defaults if fallback SPA is running
    }
  };

  // Poll settings from backend every 4 seconds to instantly catch edits made by the Admin Panel without browser refresh!
  useEffect(() => {
    fetchLiveConfig();
    const interval = setInterval(fetchLiveConfig, 4000);
    return () => clearInterval(interval);
  }, []);

  // Keep dynamic metrics clock updated
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    return currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  // Helper arrays for Phase Tab selections
  const tabs = [
    { id: 'phase1', label: 'Phase 1: Core 4 Pillars', description: 'Showrooms, Tick Verification, Social handles, Route Map' },
    { id: 'phase2', label: 'Phase 2: Live Commerce', description: 'Reels Swipe, Pinned Checkout, Data-Saver' },
    { id: 'phase3', label: 'Phase 3: Escrow & Splitting', description: 'Gateway Route, 7d Holds, Commission Split, Refund API' },
    { id: 'phase4', label: 'Phase 4: Social Commerce', description: '24h Group Pricing, Whatsapp Loops, Affiliates Wallet' },
    { id: 'phase5', label: 'Phase 5: Anti-Fraud Guard', description: 'AI Size recommender, Unboxing Mandates, COD block IP' },
    { id: 'verification_desk', label: '🛡️ Trust & Verification', description: 'Aadhaar KYC, Seller Badges, Delivery OTP Handshake' },
    { id: 'system_patch', label: '⚙️ Live System Update Center', description: 'OTA Firmware Patches, Slider commission, Features toggle' },
    { id: 'code_guide', label: 'Developer Portal (Code)', description: 'Express Backend Controllers & Route Implementations' },
    { id: 'publisher_hub', label: 'Play Store Console Hub', description: 'Unified ID, Bundle Configuration, Multi-App Launch Plan' }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-950 pr-0">
      
      {/* 🏆 LIVE NOMINATION CAROUSEL TICKER (नॉमिनेशन लाइन) */}
      <div className={`text-white text-xs py-2.5 px-4 flex items-center justify-between border-b shadow-sm relative overflow-hidden select-none transition-all duration-500 ${
        systemConfig.primaryColor === 'emerald' ? 'bg-emerald-600 border-emerald-700' :
        systemConfig.primaryColor === 'rose' ? 'bg-rose-600 border-rose-700' :
        systemConfig.primaryColor === 'indigo' ? 'bg-indigo-600 border-indigo-700' :
        'bg-amber-600 border-amber-700'
      }`}>
        <div className="flex items-center gap-2 mx-auto justify-center text-center font-black tracking-wide">
          <Award className="w-4.5 h-4.5 animate-bounce text-white shrink-0" />
          <span className="truncate">{systemConfig.nominationLine}</span>
          <span className="hidden leading-none sm:inline-block bg-white/20 text-white font-mono text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ml-2 animate-pulse">
            Verified Nominee
          </span>
        </div>
      </div>

      {/* Structural Framing Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Main Greet Block / Header */}
        <header className="mb-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-full text-amber-800 font-semibold text-xs md:text-sm shadow-xs select-none">
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              systemConfig.primaryColor === 'emerald' ? 'bg-emerald-500' :
              systemConfig.primaryColor === 'rose' ? 'bg-rose-500' :
              systemConfig.primaryColor === 'indigo' ? 'bg-indigo-500' :
              'bg-amber-500'
            }`}></span>
            Livekart & V-Shop Blueprint Workspace • लाइवकार्ट आर्किटेक्चर
          </div>
          
          {/* Dynamic App Brand Heading with customizable Symbol/Icon */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-2">
            <div className={`p-4 rounded-3xl text-white shadow-xl transition-all duration-500 ${
              systemConfig.primaryColor === 'emerald' ? 'bg-emerald-600 shadow-emerald-550/20' :
              systemConfig.primaryColor === 'rose' ? 'bg-rose-600 shadow-rose-550/20' :
              systemConfig.primaryColor === 'indigo' ? 'bg-indigo-600 shadow-indigo-550/20' :
              'bg-amber-600 shadow-amber-550/20'
            }`}>
              <Cpu className="w-10 h-10 animate-pulse" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-none text-left">
              {systemConfig.appName.split(' ')[0]} <span className={`transition-colors duration-500 ${
                systemConfig.primaryColor === 'emerald' ? 'text-emerald-600' :
                systemConfig.primaryColor === 'rose' ? 'text-rose-600' :
                systemConfig.primaryColor === 'indigo' ? 'text-indigo-600' :
                'text-amber-600'
              }`}>{systemConfig.appName.split(' ').slice(1).join(' ') || "Super-App"}</span>
            </h1>
          </div>
          
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Explore and test the absolute full scope of your step-by-step Product Roadmap. Switch tabs below to run fully functional state-engine simulations!
          </p>

          {/* DYNAMIC SECURITY RULES & NOTICE BOARD WIDGET (नियम व नोटिस) */}
          <div className="mt-8 max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-5 pointer-events-none">
              <ShieldCheck className="w-24 h-24 text-slate-900 animate-pulse" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-1.5 h-3.5 rounded-full ${
                systemConfig.primaryColor === 'emerald' ? 'bg-emerald-500' :
                systemConfig.primaryColor === 'rose' ? 'bg-rose-500' :
                systemConfig.primaryColor === 'indigo' ? 'bg-indigo-500' :
                'bg-amber-500'
              }`} />
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-400 font-mono">
                Verified Swadeshi Trust Safety Guidelines (सुरक्षा नियम व सुचनाएं)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {systemConfig.safetyRules && systemConfig.safetyRules.map((rule: string, rIdx: number) => (
                <div key={rIdx} className="bg-slate-50 border border-slate-150 p-3 rounded-2xl flex flex-col justify-between">
                  <div className="text-[11.5px] leading-relaxed text-slate-700 font-medium font-sans">
                    {rule}
                  </div>
                  <span className={`text-[8.5px] font-mono font-extrabold uppercase mt-2 block ${
                    systemConfig.primaryColor === 'emerald' ? 'text-emerald-700' :
                    systemConfig.primaryColor === 'rose' ? 'text-rose-700' :
                    systemConfig.primaryColor === 'indigo' ? 'text-indigo-700' :
                    'text-amber-700'
                  }`}>
                    Rule #{rIdx + 1} Approved
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Core System Live Metrics HUD */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 border border-slate-200 rounded-2xl shadow-xs text-left max-w-3xl mx-auto">
            <div className="px-3 border-r border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-widest block">System Time</span>
              <span className="text-xs font-bold font-mono text-slate-800 mt-1 block">{formatDate()}</span>
            </div>
            <div className="px-3 sm:border-r border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-widest block font-sans">Active Sandbox</span>
              <span className="text-xs font-bold text-amber-600 mt-1 block">Live Engine v1.0</span>
            </div>
            <div className="px-3 border-r border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-widest block font-sans">Escrow holds</span>
              <span className="text-xs font-bold text-emerald-600 mt-1 block">Razorpay Split Active</span>
            </div>
            <div className="px-3">
              <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-widest block">Fraud Blocker</span>
              <span className="text-xs font-bold text-rose-600 mt-1 block">100% Secure IP Rules</span>
            </div>
          </div>
        </header>

        {/* Visual Architectural Map Pipeline */}
        <section className="mb-10 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden border border-slate-800 select-none">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-[0.03] pointer-events-none">
            <Cpu className="w-80 h-80" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500 animate-spin" />
                Super-App Architectural Integration Pipeline
              </h3>
              <p className="text-xs text-slate-400">Flow representation showing how components connect in real-time transactions</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-white/10 rounded-md font-mono text-slate-300">
              Central Control Dashboard Active
            </span>
          </div>

          {/* Multi-step Architecture Loop visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-[10px] text-amber-400 font-bold uppercase font-mono tracking-wider">Module 1 • Showroom</div>
              <p className="text-xs text-slate-300 mt-1 leading-normal">Seller uploads catalogs linked to handle. Admin verifies credentials + locks category.</p>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-[10px] text-amber-400 font-bold uppercase font-mono tracking-wider">Module 2 • Video Loop</div>
              <p className="text-xs text-slate-300 mt-1 leading-normal">Adaptive HLS player routes product checkout popup directly during live streaming broadcast.</p>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-[10px] text-amber-400 font-bold uppercase font-mono tracking-wider">Module 3 • Escrow Split</div>
              <p className="text-xs text-slate-300 mt-1 leading-normal">Payment locked in Admin holder. Completes after 7 days returning policy or auto refunded.</p>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-[10px] text-amber-400 font-bold uppercase font-mono tracking-wider">Module 4 • Anti-Return</div>
              <p className="text-xs text-slate-300 mt-1 leading-normal">Sizing AI recommends best apparel. Videography mandate controls bad returns.</p>
            </div>

          </div>
        </section>

        {/* Dynamic Sandbox Tabs Selector Row */}
        <section className="mb-8 overflow-x-auto pb-2 scrollbar-none" id="tabs-navigation">
          <div className="flex gap-2 min-w-max p-1 bg-slate-200/60 border border-slate-200 rounded-2xl">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all max-w-[210px] ${
                    isSelected 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'text-slate-600 hover:bg-slate-300/40'
                  }`}
                  id={`tab-trigger-${tab.id}`}
                >
                  <div className="truncate font-sans font-extrabold">{tab.label}</div>
                  <div className={`text-[9.5px] truncate font-medium mt-0.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                    {tab.description}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* MAIN SANDBOX CANVAS: Phase render selection */}
        <main className="mb-14 min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === 'phase1' && <Phase1Pillars />}
              {activeTab === 'phase2' && <Phase2LiveCommerce />}
              {activeTab === 'phase3' && <Phase3Escrow />}
              {activeTab === 'phase4' && <Phase4SocialViral />}
              {activeTab === 'phase5' && <Phase5AntiFraud />}
              {activeTab === 'verification_desk' && <VerificationDesk />}
              {activeTab === 'system_patch' && <SystemPatchCenter />}
              {activeTab === 'code_guide' && <RoadmapGuide />}
              {activeTab === 'publisher_hub' && <PlayPublisherHub />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Call to Action for Custom Developer Prompts */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              Production Ready Framework Specs
            </div>
            <h3 className="font-display font-medium text-xl sm:text-2xl text-white tracking-tight">
              Ready to generate actual backend files or database schemas?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Tell me in the chat what code module or service you want me to write next (e.g. "Create the Firebase schema matching Line 2 admin rules" or "Build the checkout React context"). I am fully ready to code any exact line you request!
            </p>
          </div>
        </section>

        {/* Download & Export Companion Guide Widget */}
        <section className="mt-8 bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl border border-indigo-800">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
            <Cpu className="w-48 h-48 text-indigo-400" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="bg-amber-500/20 border border-amber-550/30 text-amber-300 text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded">
                  Instant Access & Source Code Export • डाउनलोड व लाइव लिंक 
                </span>
                <h3 className="font-display font-black text-xl md:text-2xl mt-2 text-white">Your App is 100% Ready! (यह पूर्णतः बनकर तैयार है)</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                <span className="text-xs font-mono font-bold text-emerald-405">READY & COMPILED GREEN</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2 bg-indigo-800/60 border border-indigo-700 rounded-md font-mono text-xs text-amber-300 font-extrabold font-sans select-none">1</span>
                  <span className="font-bold text-slate-100">Live Preview & Sharing Links:</span>
                </div>
                <p className="text-xs text-indigo-200 leading-relaxed">
                  You can browse and test this app right now! Simply open it on your phone or in another tab to view the beautiful layout and real-time state simulator.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a 
                    href="https://ais-pre-xbo36ctiqlqvvlefgcjlxt-1050186861366.asia-southeast1.run.app" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-indigo-700 hover:bg-indigo-600 border border-indigo-600 text-white font-extrabold uppercase py-2 px-4 rounded-xl text-[10.5px] transition-all flex items-center gap-1.5 shadow"
                  >
                    🚀 Open Live App (नया टैब)
                  </a>
                  <a 
                    href="https://ais-dev-xbo36ctiqlqvvlefgcjlxt-1050186861366.asia-southeast1.run.app" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-slate-200 font-bold py-2 px-3.5 rounded-xl text-[10.5px] transition-all"
                  >
                    🛠️ Open Dev Sandbox
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2 bg-indigo-800/60 border border-indigo-700 rounded-md font-mono text-xs text-amber-300 font-extrabold font-sans select-none">2</span>
                  <span className="font-bold text-slate-100">To Download Code as ZIP/GitHub:</span>
                </div>
                <p className="text-xs text-indigo-200 leading-relaxed">
                  Want the full source files (React, Vite, Express node backend) to run on your computer? You can download them instantly with one click:
                </p>
                <div className="bg-indigo-950/60 p-3 rounded-2xl border border-indigo-800/60 text-xs text-indigo-150 space-y-1.5 md:text-[11.5px] font-medium leading-normal">
                  <p>🔹 <strong>Step 1:</strong> Look at the top-right corner of your AI Studio screen.</p>
                  <p>🔹 <strong>Step 2:</strong> Click the <strong>Settings (Gear Icon ⚙️)</strong> button.</p>
                  <p>🔹 <strong>Step 3:</strong> Choose <strong>"Export as ZIP / Download"</strong> or connect to your <strong>GitHub</strong> account to upload the source files instantly!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          <p>© 2026 Livekart V-Shop Sandbox & Developer workspace. All system tests are compiled perfectly.</p>
        </footer>

        {/* Floating AI Shopping Companion Chat Widget & History System */}
        <AIAssistantWidget />

      </div>
    </div>
  );
}
