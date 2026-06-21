import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Award, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Lock, 
  Unlock, 
  Smartphone, 
  QrCode, 
  RefreshCw, 
  Check, 
  MapPin, 
  FileCheck, 
  Video, 
  Send,
  User,
  ShoppingBag,
  HelpCircle,
  Hash,
  XCircle,
  Database,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

// Structuring verification entities
interface VerifiedUser {
  id: string;
  name: string;
  phone: string;
  aadhaarMasked: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  completedAt: string;
  trustScore: number; // out of 100
}

interface VerifiedSeller {
  id: string;
  shopName: string;
  ownerName: string;
  category: string;
  certType: string; // e.g. "Govt Handloom Certificate", "Artisan ID Card"
  certId: string;
  isInspected: boolean;
  verifyBadge: 'None' | 'Blue' | 'Purple' | 'Green';
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
}

interface DeliveryDispatch {
  orderId: string;
  buyerName: string;
  address: string;
  productName: string;
  escrowAmount: number;
  riderName: string;
  deliveryStatus: 'IN_TRANSIT' | 'DELIVERED_PENDING_OTP' | 'RELEASED_ESCROW';
  secureOtp: string; // the OTP matching what buyer has
  inputOtp: string;
  unboxingVideoAttached: boolean;
  unboxingFileName: string;
}

export default function VerificationDesk() {
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'sellers' | 'deliveries'>('sellers');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Users checklist
  const [users, setUsers] = useState<VerifiedUser[]>([
    { id: "usr-881", name: "Amish Patel", phone: "9812322301", aadhaarMasked: "XXXX-XXXX-9821", kycStatus: "VERIFIED", completedAt: "2026-06-20 T04:12", trustScore: 98 },
    { id: "usr-290", name: "Priyanka Mishra", phone: "7009822340", aadhaarMasked: "XXXX-XXXX-3042", kycStatus: "VERIFIED", completedAt: "2026-06-18 T12:30", trustScore: 92 },
    { id: "usr-441", name: "Rajat Deshmukh", phone: "8827391122", aadhaarMasked: "XXXX-XXXX-4530", kycStatus: "PENDING", completedAt: "Pending live approval", trustScore: 50 },
    { id: "usr-109", name: "Vikram Sen", phone: "9102837465", aadhaarMasked: "XXXX-XXXX-1102", kycStatus: "REJECTED", completedAt: "Failed biometric cheek check", trustScore: 25 },
  ]);

  // Sellers database
  const [sellers, setSellers] = useState<VerifiedSeller[]>([
    { id: "store-01", shopName: "Aura Premium Styles", ownerName: "Nancy Sharma", category: "Ethnic Apparel", certType: "Govt Handloom Certificate", certId: "HL-99210-ND", isInspected: true, verifyBadge: "Blue", kycStatus: "VERIFIED" },
    { id: "store-02", shopName: "Chanderi Handlooms", ownerName: "Gopal Prasad", category: "Traditions Wear", certType: "National Artisan Loom Registry", certId: "ART-882-MP", isInspected: true, verifyBadge: "Purple", kycStatus: "VERIFIED" },
    { id: "store-03", shopName: "Street Chic Wear", ownerName: "Rohan Khanna", category: "Modern Apparel", certType: "GST Business Proof", certId: "GST-29AAACA", isInspected: false, verifyBadge: "None", kycStatus: "PENDING" },
    { id: "store-04", shopName: "Kanchipuram Silk Trust", ownerName: "Meenakshi Iyer", category: "Royal Silk Saree", certType: "Silk Mark Handloom Emblem", certId: "SM-77401-TN", isInspected: true, verifyBadge: "Green", kycStatus: "VERIFIED" },
  ]);

  // Deliveries list with Escrow secure OTP checks
  const [deliveries, setDeliveries] = useState<DeliveryDispatch[]>([
    {
      orderId: "ORD-99381-A",
      buyerName: "Amish Patel",
      address: "GF-12, Handloom Market, Janpath, New Delhi",
      productName: "Chanderi Silk Saree (Certified Traditional)",
      escrowAmount: 4999,
      riderName: "Deepak Yadav (Super Rider)",
      deliveryStatus: "DELIVERED_PENDING_OTP",
      secureOtp: "4029",
      inputOtp: "",
      unboxingVideoAttached: false,
      unboxingFileName: ""
    },
    {
      orderId: "ORD-11102-K",
      buyerName: "Priyanka Mishra",
      address: "B-42, Sector-5, Noida, Uttar Pradesh",
      productName: "Indigo Dye Handcrafted Kurti",
      escrowAmount: 2450,
      riderName: "Sandeep Gupta (Express Courier)",
      deliveryStatus: "IN_TRANSIT",
      secureOtp: "8871",
      inputOtp: "",
      unboxingVideoAttached: false,
      unboxingFileName: ""
    }
  ]);

  // Handle KYC User Action
  const handleUserKycApprove = (id: string, approve: boolean) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return {
          ...u,
          kycStatus: approve ? 'VERIFIED' : 'REJECTED',
          trustScore: approve ? 95 : 15,
          completedAt: approve ? new Date().toISOString().replace('T', ' ').substring(0, 16) : 'Rejected by manual audit'
        };
      }
      return u;
    }));
    triggerToast(`User ID ${id} database KYC status updated!`);
  };

  // Live Seller Verification badge & inspection override system
  const handleSellerBadgeChange = (id: string, badge: 'None' | 'Blue' | 'Purple' | 'Green') => {
    setSellers(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          verifyBadge: badge,
          kycStatus: badge !== 'None' ? 'VERIFIED' : 'PENDING'
        };
      }
      return s;
    }));

    // Trigger local fetch update simulation to synchronize other tabs via internal callbacks
    triggerToast(`Seller store ${id} upgraded to ${badge} Badge! (लाइव अपडेट जारी)`);
    
    // Also dispatch dynamic fetch request to server backend if running on live port 3000
    fetch('/api/system/settings', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        features: {
          codIpBlocker: badge === 'None'
        }
      })
    }).catch(() => {});
  };

  // Delivery OTP secure verification handshake
  const verifyDeliveryCode = (orderId: string) => {
    const target = deliveries.find(d => d.orderId === orderId);
    if (!target) return;

    if (!target.unboxingVideoAttached) {
      triggerToast("⚠️ Delivery cannot complete! Unboxing security video must be attached first.");
      return;
    }

    if (target.inputOtp === target.secureOtp) {
      setDeliveries(prev => prev.map(d => {
        if (d.orderId === orderId) {
          return { ...d, deliveryStatus: 'RELEASED_ESCROW' };
        }
        return d;
      }));
      triggerToast(`✅ Verification successful! OTP matched. Escrow holding released to Weaver account.`);
    } else {
      triggerToast("❌ Incorrect OTP hand-shake code! Payout on safety block.");
    }
  };

  const attachUnboxingMockVideo = (orderId: string) => {
    setDeliveries(prev => prev.map(d => {
      if (d.orderId === orderId) {
        return { 
          ...d, 
          unboxingVideoAttached: true,
          unboxingFileName: `seal_verification_unboxing_${orderId.toLowerCase()}.mp4`
        };
      }
      return d;
    }));
    triggerToast("📹 Unboxing validation video attached to delivery manifest successfully!");
  };

  const triggerToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const subTabClass = (active: boolean) => `px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
    active ? 'bg-slate-900 text-white shadow-md' : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
  }`;

  return (
    <div className="space-y-8" id="verification-desk-root">
      
      {/* Toast notifier */}
      {successMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-8 right-8 z-55 bg-slate-950 text-white border border-rose-500/35 p-4 rounded-2xl shadow-2xl flex items-start gap-2.5 max-w-sm"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-mono font-black text-rose-450 tracking-wider">SWADESHI VERIFIER SECURE</span>
            <p className="text-xs text-zinc-300 font-medium mt-0.5">{successMsg}</p>
          </div>
        </motion.div>
      )}

      {/* Main Header Descriptor Block */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 text-white border border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-5 pointer-events-none">
          <ShieldCheck className="w-48 h-48 text-white animate-pulse" />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded">
              Verified Trust Engine • सत्यापन व सुरक्षा केंद्र
            </span>
            <h2 className="font-display font-black text-2xl tracking-tight mt-2 text-white">
              Trust & Verification Control Desk (सत्यापन मंच)
            </h2>
            <p className="text-xs text-zinc-400 leading-normal max-w-xl">
              Authenticity is key to native weaver commerce. Below, run biometric/KYC overrides, update seller verified symbols, configure delivery rider OTP handshake validations, and release escrow live.
            </p>
          </div>

          <div className="flex gap-1.5 shrink-0 bg-white/5 p-1 rounded-2xl border border-white/10">
            <button 
              type="button"
              onClick={() => setActiveSubTab('sellers')}
              className={subTabClass(activeSubTab === 'sellers')}
            >
              🏢 Sellers Validation (सत्यापन)
            </button>
            <button 
              type="button"
              onClick={() => setActiveSubTab('users')}
              className={subTabClass(activeSubTab === 'users')}
            >
              👥 Buyer KYC Aadhaar
            </button>
            <button 
              type="button"
              onClick={() => setActiveSubTab('deliveries')}
              className={subTabClass(activeSubTab === 'deliveries')}
            >
              🛵 Delivery OTP Secure
            </button>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE TAB WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Panel - Main Database Table Control Desk (8-cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sellers Validation Panel */}
          {activeSubTab === 'sellers' && (
            <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-150">
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">Weavers and Artisans Verification Panel</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Toggle live trust certificates and award tags below to override showroom aesthetics:</p>
                </div>
                <Award className="w-5 h-5 text-amber-500" />
              </div>

              <div className="divide-y divide-slate-100">
                {sellers.map((sel) => (
                  <div key={sel.id} className="py-4 first:pt-1 last:pb-1 space-y-3.5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="p-2 bg-slate-50 border border-slate-150 rounded-2xl text-slate-800">
                          <ShoppingBag className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-extrabold text-sm text-slate-850 leading-none">{sel.shopName}</span>
                            {sel.verifyBadge === 'Blue' && <span className="bg-blue-100 text-blue-800 text-[8.5px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">Blue Badge</span>}
                            {sel.verifyBadge === 'Purple' && <span className="bg-purple-100 text-purple-800 text-[8.5px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">Artisan Master</span>}
                            {sel.verifyBadge === 'Green' && <span className="bg-emerald-100 text-emerald-800 text-[8.5px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">Sovereign State</span>}
                            {sel.verifyBadge === 'None' && <span className="bg-zinc-100 text-zinc-500 text-[8.5px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">No Badge</span>}
                          </div>
                          <span className="text-xs text-slate-500 block">Owner: {sel.ownerName} • {sel.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[9.5px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded border ${
                          sel.kycStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse'
                        }`}>
                          {sel.kycStatus}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">ID: {sel.id}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 text-xs">
                      <div className="flex items-start gap-1 justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">Authenticity Proof Submitted</span>
                          <span className="font-mono text-[11px] text-slate-800 font-bold block mt-0.5">{sel.certType}</span>
                          <span className="text-[10px] text-zinc-500 block font-bold mt-0.5">Cert ID: {sel.certId}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">Live Badge Override:</span>
                        <div className="flex items-center gap-1 flex-wrap">
                          {[
                            { id: 'None', label: 'Revoke' },
                            { id: 'Blue', label: 'Verified 📘' },
                            { id: 'Purple', label: 'Artisan 💜' },
                            { id: 'Green', label: 'State Green 🟢' }
                          ].map((bdg) => (
                            <button
                              key={bdg.id}
                              type="button"
                              onClick={() => handleSellerBadgeChange(sel.id, bdg.id as any)}
                              className={`text-[9.5px] font-bold px-2 py-1 rounded-lg border cursor-pointer transition ${
                                sel.verifyBadge === bdg.id 
                                  ? 'bg-slate-900 border-slate-900 text-white font-extrabold shadow-xs' 
                                  : 'bg-white hover:bg-slate-100 text-slate-650'
                              }`}
                            >
                              {bdg.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Aadhaar KYC Panel */}
          {activeSubTab === 'users' && (
            <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-150">
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">Democratic Customer KYC Control Board</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Approve digital identity verification requests to secure high ticket live purchases:</p>
                </div>
                <UserCheck className="w-5 h-5 text-indigo-500" />
              </div>

              <div className="space-y-3 pt-1">
                {users.map((usr) => (
                  <div 
                    key={usr.id}
                    className="border border-slate-150 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                          {usr.name[0]}
                        </div>
                        <span className="font-bold text-sm text-slate-850">{usr.name}</span>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded-md">ID: {usr.id}</span>
                      </div>

                      <div className="flex gap-4 text-xs text-slate-500">
                        <span>📱 Phone: {usr.phone}</span>
                        <span>🪪 Aadhaar: <code className="font-bold text-slate-700">{usr.aadhaarMasked}</code></span>
                      </div>

                      <div className="text-[10.5px] text-slate-400">
                        Submitted checkout logs: <span className="font-mono text-slate-700">{usr.completedAt}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2.5 shrink-0 self-stretch justify-between md:justify-start">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-bold">Trust Score:</span>
                        <span className={`text-xs font-mono font-extrabold ${usr.trustScore > 80 ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {usr.trustScore}%
                        </span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${usr.trustScore > 80 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${usr.trustScore}%` }} />
                        </div>
                      </div>

                      {usr.kycStatus === 'PENDING' ? (
                        <div className="flex gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleUserKycApprove(usr.id, false)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                          >
                            Block user ❌
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUserKycApprove(usr.id, true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
                          >
                            Approve Aadhaar ✅
                          </button>
                        </div>
                      ) : (
                        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-xl border ${
                          usr.kycStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 'bg-rose-50 text-rose-700 border-rose-250'
                        }`}>
                          {usr.kycStatus === 'VERIFIED' ? "Verification Active 🟢" : "Aadhaar Blacklisted ⚠️"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secure Payout QR and Delivery OTP Handshake */}
          {activeSubTab === 'deliveries' && (
            <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-150">
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">Secure Rider Delivery-OTP Handshake</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Execute secure verification codes to authorize the 7-day Escrow disbursement:</p>
                </div>
                <Truck className="w-5 h-5 text-indigo-505" />
              </div>

              <div className="space-y-4 pt-1">
                {deliveries.map((deliv) => (
                  <div 
                    key={deliv.orderId}
                    className="border border-slate-200 rounded-2xl p-4 space-y-4 bg-slate-50/50"
                  >
                    {/* Header line */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-slate-800 font-mono">{deliv.orderId}</span>
                        <span className="text-xs text-slate-500">Destination: {deliv.buyerName} ({deliv.address})</span>
                      </div>

                      <div>
                        {deliv.deliveryStatus === 'RELEASED_ESCROW' ? (
                          <span className="text-[10px] bg-emerald-500/25 border border-emerald-400 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                            Escrow Released 🔓
                          </span>
                        ) : deliv.deliveryStatus === 'DELIVERED_PENDING_OTP' ? (
                          <span className="text-[10px] bg-amber-500/25 border border-amber-400 text-amber-800 font-bold px-2 py-0.5 rounded-md animate-pulse">
                            Buyer Input OTP Pending
                          </span>
                        ) : (
                          <span className="text-[10px] bg-indigo-500/25 border border-indigo-400 text-indigo-800 font-bold px-2 py-0.5 rounded-md">
                            Rider Cargo In Transit
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                      {/* Product Payout Details */}
                      <div className="space-y-1">
                        <span className="text-[10.5px] font-mono text-slate-400 uppercase tracking-wider block">Product & Payout Price</span>
                        <span className="font-black text-slate-850 block">{deliv.productName}</span>
                        <span className="text-[11.5px] font-extrabold font-mono text-amber-600 block">
                          ₹{deliv.escrowAmount.toLocaleString()} in Escrow Vault
                        </span>
                      </div>

                      {/* Step 1: Video unboxing mandatory */}
                      <div className="space-y-2">
                        <span className="text-[10.5px] font-mono text-slate-400 uppercase tracking-wider block">1. Security Proof Video</span>
                        {deliv.unboxingVideoAttached ? (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[11px] font-medium text-emerald-800 flex items-center gap-2">
                            <Video className="w-4 h-4 text-emerald-600" />
                            <span className="truncate">{deliv.unboxingFileName}</span>
                          </div>
                        ) : (
                          <div className="border border-dashed border-slate-300 rounded-xl p-2 flex flex-col items-center justify-center bg-white space-y-1">
                            <Video className="w-4 h-4 text-slate-400 animate-pulse" />
                            <span className="text-[10.5px] text-slate-500 font-medium">No video audit yet</span>
                            <button
                              type="button"
                              onClick={() => attachUnboxingMockVideo(deliv.orderId)}
                              className="text-[9.5px] bg-slate-900 text-white font-bold py-1 px-2.5 rounded-lg hover:bg-slate-800 cursor-pointer transition-all"
                            >
                              Mock Record Seal 📷
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Step 2: Input secure delivery code OTP */}
                      <div className="space-y-2">
                        <span className="text-[10.5px] font-mono text-slate-400 uppercase tracking-wider block">2. Delivery Handshake OTP</span>
                        {deliv.deliveryStatus === 'RELEASED_ESCROW' ? (
                          <div className="bg-emerald-50 border border-emerald-150 p-2.5 rounded-xl text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            Payout releases live!
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <div className="text-[9.5px] text-slate-500 font-bold">
                              Buyer Secure Handshake Code: <code className="bg-amber-100 text-amber-900 px-1 py-0.2 rounded font-mono text-[10.5px]">{deliv.secureOtp}</code>
                            </div>

                            <div className="flex gap-1.5">
                              <input 
                                type="text"
                                maxLength={4}
                                value={deliv.inputOtp}
                                onChange={(e) => setDeliveries(prev => prev.map(d => 
                                  d.orderId === deliv.orderId ? { ...d, inputOtp: e.target.value } : d
                                ))}
                                placeholder="Enter 4-digits"
                                className="w-24 bg-white border border-slate-205 rounded-xl px-2 py-1 text-xs text-center font-mono font-bold"
                              />
                              <button
                                type="button"
                                onClick={() => verifyDeliveryCode(deliv.orderId)}
                                className="bg-slate-900 text-white text-[10px] font-extrabold uppercase px-2 py-1 rounded-xl cursor-pointer"
                              >
                                Match 🔑
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right HUD: Summary checklist status of Trust components (4-cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Main Visual Certificate Board */}
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
            <h3 className="text-xs uppercase font-mono font-black text-amber-400 tracking-wider mb-2">Live Verification Blueprint</h3>
            <p className="text-[11px] text-zinc-300 leading-normal mb-4">
              Weaver Super-App verification maintains strict compliance with security mandates to bypass fake reviews. Here is the active security state:
            </p>

            <div className="space-y-3 font-mono text-[10px]">
              <div className="p-2.5 bg-slate-950/70 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-zinc-400">Total Registered Weavers</span>
                <span className="font-extrabold text-white">128 Artisans</span>
              </div>

              <div className="p-2.5 bg-slate-950/70 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-zinc-400">GST verified stores</span>
                <span className="font-extrabold text-emerald-400">98% Verified</span>
              </div>

              <div className="p-2.5 bg-slate-950/70 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-zinc-400">Biometric Aadhaar checks</span>
                <span className="font-extrabold text-indigo-400">ENABLED</span>
              </div>

              <div className="p-2.5 bg-slate-950/70 border border-white/5 rounded-xl flex items-center justify-between">
                <span className="text-zinc-400">Dual-Pass OTP handshakes</span>
                <span className="font-extrabold text-amber-400">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ info Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 text-xs text-slate-600 leading-relaxed">
            <h4 className="font-display font-semibold text-slate-850 text-sm">प्रशासक सत्यापन निर्देश (Inspection Guidelines)</h4>
            <p>
              १. <strong>बैज / Badge:</strong> जब कोई बुनकर ऑथेंटिसिटी प्रूफ (जैसे Silk Mark) दिखाता है, एडमिन पैनल से ग्रीन या पर्पल मास्टर बैच देने पर कस्टमर ट्रस्ट ६०% बढ़ जाता है।
            </p>
            <p>
              २. <strong>डिलिवरी कोड / Delivery OTP:</strong> जब राइडर सामान लेकर पहुंचेगा, कस्टमर के फोन पर आया ४ अंकों का ओटीपी मैच करके तथा अनबॉक्सिंग वीडियो सत्यापित करने पर ही एस्क्रो से पेमेंट रिलीज़ होगा।
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
