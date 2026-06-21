import { useState, useEffect } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Wifi, 
  Terminal, 
  RefreshCw, 
  Sliders, 
  Database, 
  AlertCircle, 
  Wrench, 
  Flame, 
  Zap, 
  Check, 
  CheckCircle2,
  ListRestart,
  Save,
  RotateCcw,
  Bug
} from 'lucide-react';
import { motion } from 'motion/react';

// Structuring beautiful types
interface SystemSettings {
  appName: string;
  nominationLine: string;
  primaryColor: string;
  safetyRules: string[];
  escrowHoldDays: number;
  commissionSplitPercentage: number;
  activeFilterOverride: string;
  systemFirmwareVersion: string;
  systemStatus: string;
  features: {
    dataSaverMode: boolean;
    aiSizeRecommender: boolean;
    unboxingVideoMandate: boolean;
    codIpBlocker: boolean;
    automaticDeliveryBoys: boolean;
  };
  lastUpdateTimestamp: string;
  patchHistory: Array<{
    title: string;
    version: string;
    message: string;
    timestamp: string;
  }>;
}

export default function SystemPatchCenter() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [customPatchTitle, setCustomPatchTitle] = useState('Monsoon Cargo Express');
  const [customPatchMsg, setCustomPatchMsg] = useState('Optimizes local logistics routing for heavy rain zones with double-proof waterproof tags.');
  const [customVersion, setCustomVersion] = useState('v1.5.0-beta');
  const [customStatus, setCustomStatus] = useState('FESTIVE_RUSH');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // States for branding block editor
  const [editBrandName, setEditBrandName] = useState('');
  const [editNominationLine, setEditNominationLine] = useState('');
  const [editPrimaryColor, setEditPrimaryColor] = useState('amber');
  const [newRuleInput, setNewRuleInput] = useState('');

  // Fetch current system configuration on load
  const loadSystemConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/system/settings');
      const data = await response.json();
      setSettings(data);
      if (data) {
        setEditBrandName(data.appName || 'Livekart V-Shop Super-App');
        setEditNominationLine(data.nominationLine || '🎯 NOMINATED FOR INDIA ARTISAN TRUST AWARD 2026 • भारत के सर्वश्रेष्ठ स्वदेशी लाइव-कॉमर्स ऐप 2026 के लिए नामांकित');
        setEditPrimaryColor(data.primaryColor || 'amber');
      }
    } catch (err) {
      console.warn("Express backend offline. Emulating local configuration engine.", err);
      // Perfect high-fidelity fallback state
      const fallback = {
        appName: "Livekart V-Shop Super-App",
        nominationLine: "🎯 NOMINATED FOR INDIA ARTISAN TRUST AWARD 2026 • भारत के सर्वश्रेष्ठ स्वदेशी लाइव-कॉमर्स ऐप 2026 के लिए नामांकित",
        primaryColor: "amber",
        safetyRules: [
          "सभी ख़रीदारी Razorpay 7-day Escrow में सुरक्षित रहेगी।",
          "सामान मिलने पर Unboxing Video बनाना अनिवार्य है ताकी किसी विवाद में पूरा पैसा वापस मिल सके।",
          "प्रत्येक ट्रांजेक्शन स्वतंत्र बुनकर सहकारी संस्थाओं के खातों में सीधा जाता है।"
        ],
        escrowHoldDays: 7,
        commissionSplitPercentage: 5,
        activeFilterOverride: "none",
        systemFirmwareVersion: "v1.4.1-stable",
        systemStatus: "OPTIMAL",
        features: {
          dataSaverMode: true,
          aiSizeRecommender: true,
          unboxingVideoMandate: true,
          codIpBlocker: false,
          automaticDeliveryBoys: true
        },
        lastUpdateTimestamp: new Date().toISOString(),
        patchHistory: [
          { title: "System Initial Setup", version: "v1.0.0", message: "Core showroom blueprints initialized successfully with live-stream integration.", timestamp: new Date(Date.now() - 86400000).toISOString() },
          { title: "Security Protocols Active", version: "v1.4.1-stable", message: "Escrow safety rules and 7d holding mechanisms enabled.", timestamp: new Date(Date.now() - 3600000).toISOString() }
        ]
      };
      setSettings(fallback);
      setEditBrandName(fallback.appName);
      setEditNominationLine(fallback.nominationLine);
      setEditPrimaryColor(fallback.primaryColor);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSystemConfig();
  }, []);

  // Update specific feature toggle
  const handleToggleFeature = async (key: keyof SystemSettings['features']) => {
    if (!settings) return;
    const updatedFeatures = {
      ...settings.features,
      [key]: !settings.features[key]
    };

    setSettings(prev => prev ? {
      ...prev,
      features: updatedFeatures
    } : null);

    try {
      const res = await fetch('/api/system/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: updatedFeatures })
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        triggerSuccessToast("Feature toggle updated on live server!");
      }
    } catch {
      triggerSuccessToast("Updated feature state locally!");
    }
  };

  // Submit standard value edits (sliders, inputs)
  const handleSaveSubscribedValues = async (escrowDays: number, commission: number) => {
    if (!settings) return;
    setLoading(true);
    try {
      const res = await fetch('/api/system/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          escrowHoldDays: escrowDays,
          commissionSplitPercentage: commission
        })
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        triggerSuccessToast("Core split & escrow timers synchronized successfully!");
      }
    } catch {
      setSettings(prev => prev ? {
        ...prev,
        escrowHoldDays: escrowDays,
        commissionSplitPercentage: commission
      } : null);
      triggerSuccessToast("Applied core changes to client state!");
    } finally {
      setLoading(false);
    }
  };

  // Submit Brand edit & general nomination info
  const handleSaveBrandingValues = async (name: string, nom: string, color: string, rulesList: string[]) => {
    if (!settings) return;
    setLoading(true);
    try {
      const res = await fetch('/api/system/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appName: name,
          nominationLine: nom,
          primaryColor: color,
          safetyRules: rulesList
        })
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        triggerSuccessToast("Application custom logo, nomination line, and policies updated!");
      }
    } catch {
      setSettings(prev => prev ? {
        ...prev,
        appName: name,
        nominationLine: nom,
        primaryColor: color,
        safetyRules: rulesList
      } : null);
      triggerSuccessToast("Successfully customized brand settings locally!");
    } finally {
      setLoading(false);
    }
  };

  // Trigger Over-the-air firmware update patch
  const triggerOtaPatch = async (title: string, msg: string, version: string, status: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/system/settings/patch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patchTitle: title,
          patchMessage: msg,
          targetVersion: version,
          systemStatus: status
        })
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        triggerSuccessToast(`Firmware updated to ${version}! OTA Patch fully applied.`);
      }
    } catch {
      // Offline fallback state update simulation
      setSettings(prev => {
        if (!prev) return null;
        const newPatch = {
          title,
          version,
          message: msg,
          timestamp: new Date().toISOString()
        };
        return {
          ...prev,
          systemFirmwareVersion: version,
          systemStatus: status,
          patchHistory: [newPatch, ...prev.patchHistory]
        };
      });
      triggerSuccessToast(`Updated to ${version} (Offline emulation mode verified!)`);
    } finally {
      setLoading(false);
    }
  };

  const triggerSuccessToast = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // Preset ready-to-run OTA upgrade configurations
  const prepackagedPatches = [
    {
      title: "Festive Season Surge Protocol 🪔",
      msg: "Cuts platform commission fee split to 2.5% to reward weaver associations, speeds up active courier assignment under 120s, and enables wide-band high data capacity video loops.",
      version: "v1.6.0-festive",
      status: "FESTIVE_RUSH",
      badgeColor: "bg-amber-500/20 text-amber-700 border-amber-300"
    },
    {
      title: "Artisan Trust Shield Patch 🛡️",
      msg: "Automatically shifts default Escrow duration lock to 10 days, enforces secure unboxing video upload checkpoints, and tags authorized craft houses with premium gold ticks.",
      version: "v2.0.1-trustee",
      status: "SECURITY_HARDENED",
      badgeColor: "bg-emerald-500/20 text-emerald-700 border-emerald-300"
    },
    {
      title: "Rural High-Ingress Data Optimization 📡",
      msg: "Adjusts streaming buffers for low-bandwidth 3G cell networks, limits heavy telemetry logs, and triggers auto audio summaries for simplified purchase actions.",
      version: "v1.4.5-saver",
      status: "OPTIMAL",
      badgeColor: "bg-blue-500/20 text-blue-700 border-blue-300"
    }
  ];

  if (!settings) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col items-center justify-center min-h-[300px]">
        <RefreshCw className="w-10 h-10 text-amber-500 animate-spin mb-4" />
        <h4 className="font-semibold text-slate-800">Synchronizing Live System Settings Core...</h4>
        <p className="text-xs text-slate-500 mt-1">Contacting express control server on port 3000</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast Confirmation Panel */}
      {actionSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-6 right-6 z-55 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-amber-500/35 max-w-sm flex items-start gap-3"
        >
          <div className="p-1 bg-amber-500/10 rounded-lg">
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase text-amber-400 block tracking-wider">OTA SYSTEM PUSH CODE</span>
            <p className="text-xs text-slate-200 font-medium mt-0.5">{actionSuccess}</p>
          </div>
        </motion.div>
      )}

      {/* Main Grid: Control inputs on left, Core Telemetry HUD on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Core Controls Section (Left 7-columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Interactive System Variable Toggles */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-600 animate-pulse" />
                <div>
                  <h3 className="font-display font-semibold text-base text-slate-900">Adaptive System Features Configuration</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Toggle live features on/off instantly without redeployment</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={loadSystemConfig}
                className="p-1.5 hover:bg-slate-100 rounded-xl transition text-slate-500 hover:text-slate-800"
                title="Refresh hardware status"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 pt-2">
              {[
                {
                  key: 'dataSaverMode',
                  label: "High-Compression Data Saver Mode 📉",
                  desc: "Automatically compresses live streaming video feeds and reduces client-side image loads in rural zones."
                },
                {
                  key: 'aiSizeRecommender',
                  label: "AI Size Recommendation Engine 🧠",
                  desc: "Enables interactive buyer height & weight checks before checkout to lower returns."
                },
                {
                  key: 'unboxingVideoMandate',
                  label: "Mandatory Unboxing Video Submissions 📹",
                  desc: "Blocks high-risk refund claims without unboxing proof, reducing local carrier disputes."
                },
                {
                  key: 'codIpBlocker',
                  label: "IP-Geo Spam & COD Blocker Checks 🛡️",
                  desc: "Blocks user cash checkouts if previous delivery failure rates exceed 20% in specific zip codes."
                },
                {
                  key: 'automaticDeliveryBoys',
                  label: "Autonomous Courier Reassignment Loop 🛵",
                  desc: "Simulates logistics rider backups automatically inside the Live Reel emulator if primary rider stays inactive."
                }
              ].map((feat) => (
                <div 
                  key={feat.key} 
                  className="flex items-start justify-between gap-4 p-3 hover:bg-slate-50 rounded-2xl transition border border-transparent hover:border-slate-100"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800 block">{feat.label}</span>
                    <span className="text-[10.5px] text-slate-500 block leading-relaxed">{feat.desc}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleFeature(feat.key as any)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      settings.features[feat.key as keyof typeof settings.features] ? 'bg-amber-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        settings.features[feat.key as keyof typeof settings.features] ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Core Adjustable Sliders (Numeric system updates) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-base text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-500" />
              Dynamic Checkout Commission & Holding Parameters
            </h3>
            <p className="text-xs text-slate-500">
              Adjust how payouts hold in the Razorpay system and what administrative commission percentage gets redirected.
            </p>

            <div className="space-y-5 pt-3">
              {/* Slider 1: Escrow Holding duration */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Escrow Hold Timers (Days)</span>
                  <span className="text-xs font-mono font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {settings.escrowHoldDays} Days lock
                  </span>
                </div>
                <input 
                  type="range"
                  min="3"
                  max="21"
                  step="1"
                  value={settings.escrowHoldDays}
                  onChange={(e) => setSettings({ ...settings, escrowHoldDays: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase font-mono">
                  <span>3 Days (Fast)</span>
                  <span>7 Days (Indian Return Policy Std)</span>
                  <span>21 Days (Max security)</span>
                </div>
              </div>

              {/* Slider 2: Commission Split */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Platform Commisson Split Fee (%)</span>
                  <span className="text-xs font-mono font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    {settings.commissionSplitPercentage}% cut
                  </span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={settings.commissionSplitPercentage}
                  onChange={(e) => setSettings({ ...settings, commissionSplitPercentage: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase font-mono">
                  <span>1.0% (Weavers priority)</span>
                  <span>5.0% (Standard)</span>
                  <span>15.0% (Aggressive scaling)</span>
                </div>
              </div>

              {/* Synchronize Master Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveSubscribedValues(settings.escrowHoldDays, settings.commissionSplitPercentage)}
                  className="bg-slate-900 hover:bg-slate-850 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-amber-400" />
                  Save and Sync Parameters (सिस्टम अपडेट करें)
                </button>
              </div>
            </div>
          </div>

          {/* NEW SECTION: Brand, Logo, Nomination, & Rules Control Board */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-500/10 rounded-xl">
                  <Settings className="w-5 h-5 text-amber-600 animate-spin" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-slate-900">App Brand, Logo, Nomination & Rules Editor</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Edit logos, nomination texts, policies and notices instantly</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* BRAND LOGO DESIGN & APP NAME */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-800 block">App Brand Name (एप का नाम)</label>
                  <input 
                    type="text"
                    value={editBrandName}
                    onChange={(e) => setEditBrandName(e.target.value)}
                    placeholder="Livekart V-Shop"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-hidden font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-800 block">Logo Hue & Theme Accent</label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[
                      { id: 'amber', name: 'Amber ✴️', cls: 'bg-amber-500 ring-amber-300' },
                      { id: 'emerald', name: 'Emerald 🟢', cls: 'bg-emerald-500 ring-emerald-300' },
                      { id: 'indigo', name: 'Indigo 💙', cls: 'bg-indigo-500 ring-indigo-300' },
                      { id: 'rose', name: 'Rose ❤️', cls: 'bg-rose-500 ring-rose-300' },
                    ].map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setEditPrimaryColor(col.id)}
                        className={`text-[10px] font-bold px-2 py-1.5 rounded-lg border cursor-pointer transition-all ${
                          editPrimaryColor === col.id 
                            ? 'bg-slate-900 text-white ring-2 ring-offset-1 ring-slate-800 shadow' 
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* LIVE BRAND LOGO PREVIEW GRAPHIC */}
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-3.5 space-y-2">
                <span className="text-[9.5px] uppercase font-mono font-black text-slate-400 block tracking-widest">
                  Live Logo & Branding Mockup preview:
                </span>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                  <div className={`p-2.5 rounded-xl text-white ${
                    editPrimaryColor === 'amber' ? 'bg-amber-500 shadow-amber-300/30' :
                    editPrimaryColor === 'emerald' ? 'bg-emerald-500 shadow-emerald-300/30' :
                    editPrimaryColor === 'rose' ? 'bg-rose-500 shadow-rose-300/30' :
                    'bg-indigo-500 shadow-indigo-300/30'
                  } shadow-md`}>
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-900">{editBrandName || "Unnamed Brand"}</span>
                    <span className="text-[10px] text-slate-400 block">Verified Swadeshi Weaver Trust App • Version 1.4.1</span>
                  </div>
                </div>
              </div>

              {/* NOMINATION LINE OF THE APPLICATION */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-800 block">Application Nomination Line (नॉमिनेशन लाइन)</label>
                  <span className="text-[9.5px] text-rose-600 font-extrabold uppercase font-mono">🏆 Best App Award 2026 Nominee</span>
                </div>
                <input 
                  type="text"
                  value={editNominationLine}
                  onChange={(e) => setEditNominationLine(e.target.value)}
                  placeholder="e.g. Nominated for Web3 Retail Award 2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-hidden font-medium"
                />
              </div>

              {/* NOTICES AND RULES MANAGER (पैसा होल्ड और सुरक्षा नीतियां) */}
              <div className="space-y-2.5">
                <label className="text-xs font-black text-slate-800 block">System Rules & Notices Manager (नियम व नोटिस बोर्ड)</label>
                <div className="space-y-2 max-h-[140px] overflow-y-auto border border-slate-150 bg-slate-50 rounded-2xl p-2.5">
                  {settings.safetyRules && settings.safetyRules.length > 0 ? (
                    settings.safetyRules.map((rule, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white border border-slate-150 px-2.5 py-2 rounded-xl flex items-start justify-between gap-3 text-xs text-slate-700 font-medium hover:border-rose-200"
                      >
                        <div className="flex items-start gap-1.5 select-none text-[11px] leading-relaxed">
                          <span className="text-amber-500 font-bold">📜 {idx + 1}.</span>
                          <span>{rule}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedRules = settings.safetyRules.filter((_, rIdx) => rIdx !== idx);
                            setSettings({ ...settings, safetyRules: updatedRules });
                          }}
                          className="text-[9.5px] uppercase font-bold text-rose-500 hover:text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded cursor-pointer"
                        >
                          Delete ❌
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 block p-2 text-center">No safety rules created yet. Put one below.</span>
                  )}
                </div>

                {/* Add new rule form */}
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={newRuleInput}
                    onChange={(e) => setNewRuleInput(e.target.value)}
                    placeholder="नया नियम या नोटिस लिखें..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newRuleInput.trim()) return;
                      const updatedRules = [...(settings.safetyRules || []), newRuleInput.trim()];
                      setSettings({ ...settings, safetyRules: updatedRules });
                      setNewRuleInput('');
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    Add Notice ＋
                  </button>
                </div>
              </div>

              {/* SAVE BRAND MANAGER VALUES */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveBrandingValues(editBrandName, editNominationLine, editPrimaryColor, settings.safetyRules || [])}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase py-2 px-5 rounded-xl text-[10px] tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white animate-pulse" />
                  Save and Publish Branding App Config ✅
                </button>
              </div>

            </div>
          </div>

          {/* Section 3: Trending OTA Updates Factory (नया शानदार फ़ेयरवेल पैच रिलीज सिस्टम) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-base text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500 animate-pulse" />
              Over-the-Air (OTA) Firmware Update Center
            </h3>
            <p className="text-xs text-slate-500 leading-normal">
              इन रेडीमेड लाइव सिस्टम अपडेट्स को चुनें। टैप करते ही यह तुरंत पूरे सर्वर पर लागू हो जाएंगे और एमुलेटर व्यवहार बदल जाएगा:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
              {prepackagedPatches.map((ptch, pIdx) => (
                <div 
                  key={pIdx}
                  className="border border-slate-200 rounded-2xl p-3.5 hover:bg-slate-50 transition flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-amber-300"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-extrabold uppercase bg-neutral-100 pb-0.5 px-1.5 rounded">{ptch.version}</span>
                      <span className="text-[9.5px] font-bold text-amber-600 uppercase tracking-wider">{ptch.status}</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-850 block group-hover:text-amber-800 transition-colors">{ptch.title}</span>
                    <p className="text-[10px] text-slate-500 leading-relaxed max-h-[85px] overflow-hidden text-ellipsis line-clamp-4">{ptch.msg}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerOtaPatch(ptch.title, ptch.msg, ptch.version, ptch.status)}
                    className="w-full bg-slate-100 hover:bg-amber-600 group-hover:bg-slate-200 text-slate-800 hover:text-white font-extrabold py-1.5 rounded-xl text-[9.5px] uppercase transition-all tracking-wider cursor-pointer text-center"
                  >
                    Deploy OTA 🚀
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Trigger Custom Custom System Variable JSON Patch (वैकल्पिक अपडेट) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-base text-slate-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-500" />
              Interactive custom JSON patch parameters
            </h3>
            <p className="text-xs text-slate-500 leading-normal">
              अपना स्वयं का कस्टम सिस्टम अपग्रेड बनाएं। वर्शन नंबर डालें, विवरण लिखें और अपने मनचाहे पैरामीटर लाइव जोड़ें:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-700 block">Patch Name (पैच नाम)</label>
                <input 
                  type="text" 
                  value={customPatchTitle} 
                  onChange={(e) => setCustomPatchTitle(e.target.value)}
                  placeholder="e.g. Surat Highway Quick Delivery"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 outline-hidden font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-slate-700 block">Version Code</label>
                  <input 
                    type="text" 
                    value={customVersion} 
                    onChange={(e) => setCustomVersion(e.target.value)}
                    placeholder="e.g. v2.1.0-alpha"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-center focus:ring-1 focus:ring-amber-500 outline-hidden font-mono font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-slate-700 block">Target Status</label>
                  <select 
                    value={customStatus} 
                    onChange={(e) => setCustomStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 outline-hidden font-bold"
                  >
                    <option value="OPTIMAL">OPTIMAL</option>
                    <option value="FESTIVE_RUSH">FESTIVE RUSH</option>
                    <option value="SECURITY_HARDENED">SECURITY BLOCKED</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10.5px] font-bold text-slate-700 block">Update Log Details</label>
                <textarea 
                  value={customPatchMsg} 
                  onChange={(e) => setCustomPatchMsg(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 outline-hidden leading-relaxed font-sans"
                  placeholder="Describe your custom algorithm update..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => triggerOtaPatch(customPatchTitle, customPatchMsg, customVersion, customStatus)}
                className="bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold uppercase py-2 px-5 rounded-xl text-[10px] tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5" />
                Instantly Run Custom Patch ⚡
              </button>
            </div>
          </div>

        </div>

        {/* Telemetry Control Panel / Dynamic HUD (Right 5-Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Visual Firmware HUD */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
              <Cpu className="w-60 h-60 text-white animate-spin" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10.5px] font-mono font-extrabold text-emerald-400 tracking-wider">LIVE TELEMETRY HUD</span>
                </div>
                <span className="text-[10px] uppercase font-mono bg-white/10 px-2 py-0.5 rounded font-extrabold text-zinc-300">
                  SECURE OTP SSL
                </span>
              </div>

              {/* Status Board */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">System Firmware Status</span>
                  <span className="text-xs font-mono font-extrabold text-amber-400">
                    {settings.systemFirmwareVersion}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">Autopilot Mode</span>
                  <span className="text-xs font-extrabold text-white bg-slate-800 px-2.5 py-0.5 rounded border border-white/10">
                    {settings.systemStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1.5 border-t border-white/10">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[9.5px] text-slate-400 block uppercase font-mono font-bold">Escrow Rules</span>
                    <span className="text-base font-black text-white block mt-0.5">
                      {settings.escrowHoldDays}d <span className="text-[10px] text-indigo-400">Lock</span>
                    </span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[9.5px] text-slate-400 block uppercase font-mono font-bold">Comm. Cut</span>
                    <span className="text-base font-black text-white block mt-0.5">
                      {settings.commissionSplitPercentage}% <span className="text-[10px] text-amber-400">Fee</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[9.5px] text-slate-400 block uppercase font-mono font-bold">Active Engine Controllers</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Object.entries(settings.features).map(([key, val]) => (
                      <span 
                        key={key}
                        className={`text-[8.5px] px-1.5 py-0.5 rounded border font-semibold ${
                          val 
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' 
                            : 'bg-zinc-950/40 text-zinc-500 border-white/5'
                        }`}
                      >
                        {key.replace(/([A-Z])/g, ' $1')}: {val ? 'ON' : 'OFF'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Server Logs Simulator */}
              <div className="space-y-2 pt-1">
                <span className="text-[10.5px] text-slate-300 block font-bold font-mono">⚡ Applied Firmware Patches History (पैच अपग्रेड इतिहास)</span>
                <div className="max-h-[220px] overflow-y-auto space-y-2.5 pr-1 font-mono text-[10px]">
                  {settings.patchHistory.map((ptch, idx) => (
                    <div 
                      key={idx} 
                      className="p-2.5 bg-slate-950 border border-white/5 rounded-xl space-y-1"
                    >
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="text-amber-400 font-extrabold truncate max-w-[130px]">{ptch.title}</span>
                        <span className="text-[8.5px] font-bold px-1 py-0.2 bg-white/10 rounded text-slate-300">{ptch.version}</span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed font-sans">{ptch.message}</p>
                      <span className="text-[8px] text-zinc-500 block text-right">
                        {new Date(ptch.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Quick FAQ Guidance card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-display font-semibold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              लाइव अपडेट कैसे काम करता है?
            </h4>
            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                <strong>१. एक्सप्रेस बैकएंड सिंक:</strong> हर पैच सीधा हमारे बैकएंड <code>server.ts</code> इन-मेमोरी डेटा स्टोर पर जाता है, जिससे ऐप रिलायबिलिटी १००% बढ़ जाती है।
              </p>
              <p>
                <strong>२. एमुलेटर पर प्रभाव:</strong> एस्क्रो होल्ड दिनों को बदलने पर लाइव-रील्स कॉर्ड में चेकाउट टाइमर ऑटो-एडजस्ट हो जाता है, जिससे कस्टमर इंसेंटिव को लाइव टेस्ट किया जा सके।
              </p>
              <p>
                <strong>३. ओटीए रोलबैक:</strong> किसी भी वक्त पुराने पैच को री-डिप्लॉय या फ्रेश रिस्टार्ट करके ऑरिजिनल स्टेबल पैरामीटर्स पर वापस जाया जा सकता है।
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
