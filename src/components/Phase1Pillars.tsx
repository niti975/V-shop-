/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Store, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle, 
  UserCheck, 
  MapPin, 
  ChevronRight, 
  TrendingUp, 
  AlertCircle, 
  FileText, 
  Building2, 
  Languages,
  Phone,
  CreditCard,
  Landmark,
  Check
} from 'lucide-react';
import { SellerStore } from '../types';

export default function Phase1Pillars() {
  // Pre-configured mock sellers/stores representing core registry values
  const [stores, setStores] = useState<SellerStore[]>([
    {
      id: "store-01",
      shopName: "Aura Premium Styles",
      ownerName: "Nancy Sharma",
      handle: "@aura_designer",
      verifyStatus: "Blue",
      isLocked: true,
      category: "Ethnic Apparel",
      catalogCount: 24,
      gstType: "custom",
      gstNumber: "09AAACA1021F1Z2",
      gstUpdated: true,
      contactPhone: "9812345678",
      address: "GF-12, Handloom Market, Janpath, New Delhi - 110001",
      bio: "Crafting beautiful hand-embroidered ethnic kurtas and fusion wear for modern times. Handcrafted by 3rd-generation rural artisans from Chotanagpur.",
      upiId: "aura.designer@okhdfcbank",
      bankDetails: "HDFC Bank, A/C: 501002938475, IFSC: HDFC0000122",
      whatsappEnabled: true,
      customAttributes: [
        { key: "Experience Years (अनुभव)", value: "12 Years" },
        { key: "Registered Weavers (बुनकर)", value: "35 Rural Artisans" },
        { key: "Instagram Showcase", value: "instagram.com/aura_designer_craft" }
      ]
    },
    {
      id: "store-02",
      shopName: "Chanderi Handlooms",
      ownerName: "Gopal Prasad",
      handle: "@chanderi_saree",
      verifyStatus: "Purple",
      isLocked: true,
      category: "Traditions Wear",
      catalogCount: 82,
      gstType: "company",
      gstNumber: "09LIVEKART9911Z0",
      gstUpdated: false,
      contactPhone: "7009876543",
      address: "Saree Bazaar Lane, Chanderi, Madhya Pradesh - 473446",
      bio: "Authentic, raw silk Chanderi handloom sarees directly from the weavers of Ashoknagar. Certified traditional craftsmanship with golden zari buttis.",
      upiId: "gopal.chanderi@okaxis",
      bankDetails: "State Bank of India, A/C: 30293847101, IFSC: SBIN0003055",
      whatsappEnabled: true,
      customAttributes: [
        { key: "Loom Count (हैंडलूम संख्या)", value: "8 Active Wooden Looms" },
        { key: "State Award (राज्य पुरस्कार)", value: "MP Weaver Pride Award 2024" },
        { key: "Material Certification", value: "Silk Mark Handloom Tag Certified" }
      ]
    },
    {
      id: "store-03",
      shopName: "Street Chic Wear",
      ownerName: "Rohan Khanna",
      handle: "@street_chic",
      verifyStatus: "None",
      isLocked: false,
      category: "Modern Apparel",
      catalogCount: 5,
      gstType: "company",
      gstNumber: "09LIVEKART9911Z0",
      gstUpdated: false,
      contactPhone: "9988776655",
      address: "B-42, Sector-5, Noida, Uttar Pradesh - 201301",
      bio: "Trendy summer streetwear made with natural cotton materials and environment-friendly safe dyes. Handcrafted blocks pattern designs.",
      upiId: "streetchic@paytm",
      bankDetails: "ICICI Bank, A/C: 104509183710, IFSC: ICIC0000412",
      whatsappEnabled: false,
      customAttributes: [
        { key: "Eco friendly Dyeing", value: "100% Organic Indigo & Madder root" },
        { key: "Lead Time (डिस्पैच समय)", value: "24-48 Business Hours" }
      ]
    }
  ]);

  const [activeStoreIdx, setActiveStoreIdx] = useState(0);
  
  // Local edit state fields
  const [editShopName, setEditShopName] = useState(stores[0].shopName);
  const [editCategory, setEditCategory] = useState(stores[0].category);
  const [editOwnerName, setEditOwnerName] = useState(stores[0].ownerName || '');
  const [editContactPhone, setEditContactPhone] = useState(stores[0].contactPhone || '');
  const [editAddress, setEditAddress] = useState(stores[0].address || '');
  const [editBio, setEditBio] = useState(stores[0].bio || '');
  const [editUpiId, setEditUpiId] = useState(stores[0].upiId || '');
  const [editBankDetails, setEditBankDetails] = useState(stores[0].bankDetails || '');
  const [editWhatsappEnabled, setEditWhatsappEnabled] = useState(stores[0].whatsappEnabled || false);
  const [editCustomAttributes, setEditCustomAttributes] = useState<Array<{key: string, value: string}>>(stores[0].customAttributes || []);

  const [newAttrKey, setNewAttrKey] = useState('');
  const [newAttrValue, setNewAttrValue] = useState('');

  const [newCatalogName, setNewCatalogName] = useState('');
  const [newCatalogPrice, setNewCatalogPrice] = useState('');

  // Sizing catalogs count
  const [catalogList, setCatalogList] = useState<Array<{name: string, price: number}>>([
    { name: "Cotton Block Print Kurta", price: 1499 },
    { name: "Premium Blue Floral Saree", price: 3200 },
    { name: "Casual Summer Wear Dupatta", price: 599 }
  ]);

  // Social Custom Handle input
  const [customHandleInput, setCustomHandleInput] = useState('@nitish_rawat');
  const [matchedStatus, setMatchedStatus] = useState<'idle' | 'matched'>('idle');

  // Interactive Milestones Route Onboarding Map state
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  // GST shared pooling states
  const [gstType, setGstType] = useState<'company' | 'custom'>('custom');
  const [gstNumber, setGstNumber] = useState('09AAACA1021F1Z2');
  const [gstLang, setGstLang] = useState<'hi' | 'en'>('hi');
  const [gstError, setGstError] = useState('');
  const [gstSaveSuccess, setGstSaveSuccess] = useState(false);

  const activeStore = stores[activeStoreIdx];

  // Align form controls when active store index changes
  const selectStore = (idx: number) => {
    setActiveStoreIdx(idx);
    setEditShopName(stores[idx].shopName);
    setEditCategory(stores[idx].category);
    setEditOwnerName(stores[idx].ownerName || '');
    setEditContactPhone(stores[idx].contactPhone || '');
    setEditAddress(stores[idx].address || '');
    setEditBio(stores[idx].bio || '');
    setEditUpiId(stores[idx].upiId || '');
    setEditBankDetails(stores[idx].bankDetails || '');
    setEditWhatsappEnabled(stores[idx].whatsappEnabled || false);
    setEditCustomAttributes(stores[idx].customAttributes || []);
    setGstType(stores[idx].gstType || 'company');
    setGstNumber(stores[idx].gstNumber || '');
    setGstError('');
    setGstSaveSuccess(false);
  };

  // Update seller credentials (Name/Category) with Line 2 rules enforcement
  const handleUpdateStoreDetails = (e: FormEvent) => {
    e.preventDefault();
    if (activeStore.verifyStatus !== 'None' && activeStore.isLocked) {
      alert("Line 2 Policy Rule Enforced: Certified verified seller cannot update shop name or category without Admin unlock override!");
      return;
    }

    setStores(stores.map((s, idx) => {
      if (idx === activeStoreIdx) {
        return {
          ...s,
          shopName: editShopName,
          category: editCategory,
          ownerName: editOwnerName,
          contactPhone: editContactPhone,
          address: editAddress,
          bio: editBio,
          upiId: editUpiId,
          bankDetails: editBankDetails,
          whatsappEnabled: editWhatsappEnabled,
          customAttributes: editCustomAttributes
        };
      }
      return s;
    }));
    alert("Seller ID and profile details updated successfully!");
  };

  // Admin Override Verification Status Trigger (Line 2)
  const setVerificationType = (status: 'None' | 'Blue' | 'Purple' | 'Green') => {
    setStores(stores.map((s, idx) => {
      if (idx === activeStoreIdx) {
        return {
          ...s,
          verifyStatus: status,
          isLocked: status !== 'None' // Automatically locks if verified
        };
      }
      return s;
    }));
  };

  // Toggle Override Lock manually
  const toggleOverrideLock = () => {
    setStores(stores.map((s, idx) => {
      if (idx === activeStoreIdx) {
        return { ...s, isLocked: !s.isLocked };
      }
      return s;
    }));
  };

  // Catalog item creation inside showroom
  const addCatalogItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newCatalogName.trim() || !newCatalogPrice) return;
    const priceNum = parseFloat(newCatalogPrice);
    if (isNaN(priceNum) || priceNum <= 0) return;

    setCatalogList([...catalogList, { name: newCatalogName.trim(), price: priceNum }]);
    
    // Increment store catalogCount
    setStores(stores.map((s, idx) => {
      if (idx === activeStoreIdx) {
        return { ...s, catalogCount: s.catalogCount + 1 };
      }
      return s;
    }));

    setNewCatalogName('');
    setNewCatalogPrice('');
  };

  // Remove catalog
  const deleteCatalogItem = (index: number) => {
    setCatalogList(catalogList.filter((_, i) => i !== index));
    setStores(stores.map((s, idx) => {
      if (idx === activeStoreIdx) {
        return { ...s, catalogCount: Math.max(0, s.catalogCount - 1) };
      }
      return s;
    }));
  };

  // Custom Social Match Form
  const triggerSocialMatching = (e: FormEvent) => {
    e.preventDefault();
    if (!customHandleInput.trim()) return;
    setMatchedStatus('matched');
  };

  // GST shared pooling submit tax record handler
  const handleUpdateGstDetails = (e: FormEvent) => {
    e.preventDefault();
    setGstError('');
    setGstSaveSuccess(false);

    if (gstType === 'custom') {
      const cleanedGst = gstNumber.trim().toUpperCase();
      // Valid Indian GSTIN: 2 numbers, 5 letters, 4 numbers, 1 letter, 1 alphanumeric/number, 'Z', 1 alphanumeric/number
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      
      if (!cleanedGst) {
        setGstError(gstLang === 'hi' ? "कृपया अपना १५-अंकीय जीएसटी नंबर दर्ज करें।" : "Please enter your 15-character GSTIN.");
        return;
      }
      if (!gstRegex.test(cleanedGst)) {
        setGstError(gstLang === 'hi' 
          ? "अमान्य जीएसटी प्रारूप! (उदा: 09AAACA1021F1Z2 - प्रथम २ अंक राज्य कोड, १० अंक पैन कोड, अंतिम ३ सिस्टम कोड)"
          : "Invalid GST format! Must be 15-character alphanumeric (e.g., 09AAACA1021F1Z2)."
        );
        return;
      }
      
      setStores(stores.map((s, idx) => {
        if (idx === activeStoreIdx) {
          return {
            ...s,
            gstType: 'custom',
            gstNumber: cleanedGst,
            gstUpdated: true
          };
        }
        return s;
      }));
    } else {
      // Company shared GST Umbrella
      setStores(stores.map((s, idx) => {
        if (idx === activeStoreIdx) {
          return {
            ...s,
            gstType: 'company',
            gstNumber: '09LIVEKART9911Z0',
            gstUpdated: false
          };
        }
        return s;
      }));
    }

    setGstSaveSuccess(true);
    setTimeout(() => setGstSaveSuccess(false), 4000);
  };

  const getVerifyStatusBadge = (status: 'None' | 'Blue' | 'Purple' | 'Green') => {
    switch (status) {
      case 'Blue':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-md font-bold flex items-center gap-1">🔵 Blue Verified</span>;
      case 'Green':
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-md font-bold flex items-center gap-1">🟢 Elite Brand Verified</span>;
      case 'Purple':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-md font-bold flex items-center gap-1">🟣 Startup Verified</span>;
      default:
        return <span className="bg-slate-100 text-slate-650 text-xs px-2 py-0.5 rounded-md font-bold">Unverified</span>;
    }
  };

  const toggleOnboardingStep = (step: number) => {
    if (completedSteps.includes(step)) {
      setCompletedSteps(completedSteps.filter(s => s !== step));
    } else {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  return (
    <div className="space-y-8" id="phase-1-root">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* PANEL 1: Admin Tick Controller (Pillar 2 verification specs) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Line 2 • Admin Gate</span>
              <h3 className="font-display font-semibold text-lg text-slate-900 mt-0.5">Verification Controller</h3>
            </div>
            <ShieldCheck className="w-5 h-5 text-amber-500 animate-pulse" />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Configure system verification layers (Blue, Startup Purple, Elite Green). Verified stores cannot perform unapproved catalog alterations or name updates without admin credentials.
          </p>

          {/* Selector of active simulated store registry */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Store Registry</label>
            <div className="grid grid-cols-1 gap-2">
              {stores.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => selectStore(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeStoreIdx === idx 
                      ? 'bg-slate-900 text-white border-slate-900 shadow' 
                      : 'bg-slate-50 hover:bg-slate-100/50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono opacity-80">{s.handle}</span>
                    <span className="text-[10px]">{s.catalogCount} items</span>
                  </div>
                  <h4 className="font-bold text-xs mt-1 truncate">{s.shopName}</h4>
                  <div className="mt-1.5 flex gap-1.5">{getVerifyStatusBadge(s.verifyStatus)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Status Adjuster */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Modify Verification State</span>
            <div className="flex flex-wrap gap-1.5">
              <button 
                onClick={() => setVerificationType('None')}
                className={`px-2.5 py-1 text-[10px] rounded-lg font-bold transition-all border ${
                  activeStore.verifyStatus === 'None' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                None
              </button>
              <button 
                onClick={() => setVerificationType('Blue')}
                className={`px-2.5 py-1 text-[10px] rounded-lg font-bold transition-all border ${
                  activeStore.verifyStatus === 'Blue' ? 'bg-blue-50 text-blue-800 border-blue-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Blue
              </button>
              <button 
                onClick={() => setVerificationType('Purple')}
                className={`px-2.5 py-1 text-[10px] rounded-lg font-bold transition-all border ${
                  activeStore.verifyStatus === 'Purple' ? 'bg-purple-50 text-purple-800 border-purple-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Purple
              </button>
              <button 
                onClick={() => setVerificationType('Green')}
                className={`px-2.5 py-1 text-[10px] rounded-lg font-bold transition-all border ${
                  activeStore.verifyStatus === 'Green' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                Green
              </button>
            </div>
          </div>

        </div>

        {/* PANEL 2: Interactive Storefront + Verification Override Enforce */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-600 block">
                  Pillar 1/2 • Merchant Registry Workspace • सेलर पहचान पत्र एवं प्रोफाइल
                </span>
                <h3 className="font-display font-semibold text-lg text-slate-900 mt-0.5">
                  Update Seller ID & Profile Details
                </h3>
                <p className="text-xs text-slate-550">
                  Update your active merchant credentials, contact info, and add custom attributes dynamically.
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] text-slate-400 font-medium font-mono">Status Lock:</span>
                <button
                  type="button"
                  onClick={toggleOverrideLock}
                  className={`p-1.5 rounded-lg border transition-all ${
                    activeStore.isLocked ? 'bg-rose-50 text-rose-700 border-rose-250/50' : 'bg-slate-100 text-slate-600'
                  }`}
                  title={activeStore.isLocked ? "System change lock is ON" : "System Change Lock is OFF"}
                >
                  {activeStore.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateStoreDetails} className="space-y-6">
              
              {/* SECTION A: Core Brand Credentials */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-dashed border-slate-100 pb-1.5">
                  <Store className="w-4 h-4 text-slate-600" />
                  १. व्यावसायिक विवरण (Core Brand Credentials)
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company Shop Title</label>
                    <input 
                      type="text" 
                      value={editShopName}
                      onChange={(e) => setEditShopName(e.target.value)}
                      disabled={activeStore.verifyStatus !== 'None' && activeStore.isLocked}
                      className={`w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none ${
                        activeStore.verifyStatus !== 'None' && activeStore.isLocked ? 'bg-slate-100 text-slate-450 cursor-not-allowed' : 'bg-white text-slate-800 focus:border-indigo-500'
                      }`}
                      id="edit-shop-name-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Owner / Artisan Name</label>
                    <input 
                      type="text" 
                      value={editOwnerName}
                      onChange={(e) => setEditOwnerName(e.target.value)}
                      disabled={activeStore.verifyStatus !== 'None' && activeStore.isLocked}
                      className={`w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none ${
                        activeStore.verifyStatus !== 'None' && activeStore.isLocked ? 'bg-slate-100 text-slate-450 cursor-not-allowed' : 'bg-white text-slate-800 focus:border-indigo-500'
                      }`}
                      id="edit-owner-name-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Store Category Choice</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      disabled={activeStore.verifyStatus !== 'None' && activeStore.isLocked}
                      className={`w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none ${
                        activeStore.verifyStatus !== 'None' && activeStore.isLocked ? 'bg-slate-100 text-slate-450 cursor-not-allowed text-slate-400' : 'bg-white text-slate-800 focus:border-indigo-500'
                      }`}
                      id="edit-category-select"
                    >
                      <option value="Ethnic Apparel">Ethnic Apparel</option>
                      <option value="Traditions Wear">Traditions Wear</option>
                      <option value="Modern Apparel">Modern Apparel</option>
                      <option value="Handlooms Handicraft">Handlooms Handicraft</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION B: Contact & Instant Dispatch */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-dashed border-slate-100 pb-1.5">
                  <Phone className="w-4 h-4 text-slate-650" />
                  २. संपर्क जानकारी (Contact & Customer Instant Dispatch)
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile / Whatsapp Phone</label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        value={editContactPhone}
                        onChange={(e) => setEditContactPhone(e.target.value)}
                        placeholder="E.g. 9876543210"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono font-bold focus:outline-none focus:border-indigo-500"
                        id="edit-contact-phone-input"
                      />
                    </div>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                      <input 
                        type="checkbox"
                        checked={editWhatsappEnabled}
                        onChange={(e) => setEditWhatsappEnabled(e.target.checked)}
                        className="w-4.5 h-4.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 accent-indigo-600 cursor-pointer"
                        id="edit-whatsapp-toggle"
                      />
                      <span>Enable customers to directly request catalog via WhatsApp (व्हाट्सएप ग्राहक संपर्क ऑन करें)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* SECTION C: Traditional Story & Location */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-dashed border-slate-100 pb-1.5">
                  <MapPin className="w-4 h-4 text-slate-650" />
                  ३. कला विरासत और पता (Artisan Legacy History & Center Location)
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Weaver Story / Shubh Bio (बायो या इतिहास)</label>
                    <textarea 
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Share your weaver generation story or catalog specialty details..."
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-indigo-500"
                      id="edit-bio-textarea"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Physical Center/Workshop Address (हैंडलूम या दुकान का पता)</label>
                    <input 
                      type="text" 
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      placeholder="E.g. Sector-3, Chanderi Weaver Colony, Ashoknagar, MP"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-indigo-500"
                      id="edit-address-input"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION D: Secure Payout Handles */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-dashed border-slate-100 pb-1.5">
                  <CreditCard className="w-4 h-4 text-slate-650" />
                  ४. भुगतान सम्बन्धी जानकारी (Direct settled payout IDs)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Direct UPI Payout Address</label>
                    <input 
                      type="text" 
                      value={editUpiId}
                      onChange={(e) => setEditUpiId(e.target.value)}
                      placeholder="E.g. weaver@upi"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono font-bold text-indigo-700 focus:outline-none focus:border-indigo-500 bg-indigo-50/20"
                      id="edit-upi-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bank Settlement Details (Account No, IFSC, Name)</label>
                    <input 
                      type="text" 
                      value={editBankDetails}
                      onChange={(e) => setEditBankDetails(e.target.value)}
                      placeholder="E.g. SBI, A/C: 104523, IFSC: SBIN002"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500 bg-slate-50/60"
                      id="edit-bank-input"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION E: Dynamic Client Profile Creator (nye details jodne ke liye block) */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      ५. अन्य नए विवरण जोड़ें (Add Infinite Custom Details)
                    </h5>
                    <p className="text-[10px] text-slate-400">Add any additional custom attributes like loom sizes, awards, years of experience, etc.</p>
                  </div>
                  <span className="text-[9.5px] font-bold font-mono px-2 py-0.5 bg-indigo-150 text-indigo-800 rounded">
                    {editCustomAttributes.length} Custom Fields
                  </span>
                </div>

                {/* Input Fields to add new detail key/value on the fly */}
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={newAttrKey}
                    onChange={(e) => setNewAttrKey(e.target.value)}
                    placeholder="E.g. Looms Count (हैंडलूम संख्या)"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-250 rounded-lg text-xs"
                    id="new-attr-key-input"
                  />
                  <input 
                    type="text"
                    value={newAttrValue}
                    onChange={(e) => setNewAttrValue(e.target.value)}
                    placeholder="E.g. 5 Wooden Looms, Award 2024"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-250 rounded-lg text-xs"
                    id="new-attr-value-input"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newAttrKey.trim() || !newAttrValue.trim()) {
                        alert("Please fill both detail type and details description!");
                        return;
                      }
                      setEditCustomAttributes([...editCustomAttributes, { key: newAttrKey.trim(), value: newAttrValue.trim() }]);
                      setNewAttrKey('');
                      setNewAttrValue('');
                    }}
                    className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-all shrink-0"
                    id="add-custom-attr-btn"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>जोड़ें (Add)</span>
                  </button>
                </div>

                {/* Listing of currently added custom attributes with delete capability */}
                {editCustomAttributes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {editCustomAttributes.map((attr, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white border border-slate-150 rounded-lg text-xs">
                        <div className="truncate pr-2">
                          <span className="font-bold text-slate-500 uppercase text-[9px] block tracking-wide">{attr.key}:</span>
                          <span className="text-slate-800 font-semibold">{attr.value}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEditCustomAttributes(editCustomAttributes.filter((_, i) => i !== index));
                          }}
                          className="p-1 hover:bg-rose-50 text-slate-450 hover:text-rose-650 rounded transition-colors"
                          title="Remove Detail"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-dashed text-slate-400 italic py-1 text-center">No custom fields added yet. Try adding Loom Count or State Award above.</p>
                )}
              </div>

              {activeStore.verifyStatus !== 'None' && activeStore.isLocked && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/50 text-amber-800 text-[11px] leading-normal flex items-start gap-1.5">
                  <Lock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Registry lock configuration on:</strong> Shop properties and category selections are secure. Toggle the lock above using admin override credentials to customize title or category.
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                <div className="text-[10.5px] text-slate-400">
                  Store identity ID: <code className="bg-slate-100 p-1 rounded font-mono font-bold text-slate-600">{activeStore.id}</code>
                </div>
                <button
                  type="submit"
                  disabled={activeStore.verifyStatus !== 'None' && activeStore.isLocked}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-[0.35] shadow-xs hover:shadow transition-all flex items-center gap-1.5"
                  id="save-store-profile"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>सेलर प्रोफाइल सुरक्षित करें (Save Profile Update)</span>
                </button>
              </div>
            </form>
          </div>

          {/* Live ID / Registration Mockup Display Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 relative overflow-hidden font-mono shadow-md border border-slate-800 space-y-4">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[8.5px] text-indigo-400 font-bold tracking-widest block">AUTHENTIC MERCHANT REGISTRY CARD</span>
                <h4 className="text-sm font-black text-white mt-1 uppercase tracking-tight flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-amber-500" />
                  {activeStore.shopName}
                </h4>
              </div>
              <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase ${
                activeStore.verifyStatus === 'Blue' ? 'bg-blue-600' :
                activeStore.verifyStatus === 'Purple' ? 'bg-purple-600' :
                activeStore.verifyStatus === 'Green' ? 'bg-emerald-600' : 'bg-slate-700'
              }`}>
                {activeStore.verifyStatus !== 'None' ? `${activeStore.verifyStatus} Verified` : 'Unverified'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[7.5px] text-slate-400 block uppercase">Owner / कारीगर</span>
                <span className="font-bold text-white tracking-wide">{activeStore.ownerName}</span>
              </div>
              <div>
                <span className="text-[7.5px] text-slate-400 block uppercase">Mobile / फोन</span>
                <span className="font-bold text-slate-200 tracking-wide">{activeStore.contactPhone || 'Not Connected'}</span>
              </div>
              <div>
                <span className="text-[7.5px] text-slate-400 block uppercase">Category / श्रेणी</span>
                <span className="font-bold text-amber-300 tracking-wide">{activeStore.category}</span>
              </div>
            </div>

            {activeStore.bio && (
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/40 text-[10.5px] text-slate-350 leading-relaxed">
                <span className="text-[7.50px] text-indigo-300 block uppercase font-bold tracking-wider mb-1">Story & Heritage</span>
                <span>{activeStore.bio}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-[7.5px] text-slate-400 block uppercase">Center Address / ढांचा</span>
                <span className="text-[10px] text-slate-200 leading-tight block">{activeStore.address || 'Address unlinked'}</span>
              </div>
              <div>
                <span className="text-[7.5px] text-slate-400 block uppercase">Payout Details / बैंक व UPI</span>
                <span className="text-[10px] text-slate-200 block truncate font-mono">UPI: {activeStore.upiId || 'Not Configured'}</span>
                <span className="text-[9px] text-slate-400 block truncate font-mono">{activeStore.bankDetails || 'Bank Details Not Linked'}</span>
              </div>
            </div>

            {activeStore.customAttributes && activeStore.customAttributes.length > 0 && (
              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-[7.5px] text-indigo-400 block uppercase font-bold tracking-wider mb-1.5">Additional Dynamic Details / अन्य विवरण:</span>
                <div className="grid grid-cols-2 gap-2">
                  {activeStore.customAttributes.map((attr, idx) => (
                    <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 flex justify-between items-center text-[10px]">
                      <span className="text-slate-400 truncate max-w-[120px]">{attr.key}:</span>
                      <span className="text-white font-bold ml-1 truncate max-w-[150px]">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[8.5px] text-indigo-300 font-mono">
              <span className="flex items-center gap-1 text-[9px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Marketplace Storefront Status: compliant</span>
              </span>
              <span>{activeStore.whatsappEnabled ? "WhatsApp Query Connected ✅" : "WhatsApp Chat Idle"}</span>
            </div>
          </div>

          {/* Social matching (Pillar 3) */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Pillar 3 • Handle Matching</span>
              <h3 className="font-semibold text-slate-900 mt-0.5">Match Custom Handles to Store Profiles</h3>
              <p className="text-xs text-slate-500">Maps custom identifiers to catalogs automatically to distribute custom showrooms.</p>
            </div>

            <form onSubmit={triggerSocialMatching} className="flex gap-2">
              <input 
                type="text" 
                value={customHandleInput}
                onChange={(e) => setCustomHandleInput(e.target.value)}
                placeholder="E.g. @nitish_rawat" 
                id="social-handle-attach"
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-amber-500 text-slate-950 hover:bg-amber-400 rounded-lg text-xs font-bold"
                id="match-handle-btn"
              >
                Match Handle
              </button>
            </form>

            {matchedStatus === 'matched' && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 flex items-center gap-1.5 text-emerald-800 text-xs text-left">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  Successfully mapped handle <strong className="font-mono text-emerald-950 font-extrabold">{customHandleInput}</strong> to {activeStore.shopName}! Mapped storefront live at: <code className="bg-emerald-100 font-mono text-[10.5px] px-1 rounded-md">livekart.co/{customHandleInput.substring(1)}</code>
                </span>
              </div>
            )}
          </div>

          {/* GST TAX POOLING CARD (जीएसटी पूलिंग और आसान टैक्स प्रोफाइल) */}
          <div className="bg-white rounded-3xl border border-indigo-100 p-6 shadow-sm space-y-5 relative overflow-hidden" id="gst-pool-card">
            {/* Ambient background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/40 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-600 block">
                  Artisan Tax Support • बुनकर टैक्स समाधान
                </span>
                <h3 className="font-display font-semibold text-slate-900 mt-0.5 text-lg flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-500" />
                  GST Pooling & Flexible Onboarding
                </h3>
              </div>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={() => setGstLang(gstLang === 'hi' ? 'en' : 'hi')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 text-xs font-bold rounded-lg transition-all"
                id="toggle-gst-lang"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{gstLang === 'hi' ? "English View" : "हिंदी विवरण"}</span>
              </button>
            </div>

            {/* Explanatory description based on active language */}
            {gstLang === 'hi' ? (
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                🚀 <strong className="font-bold text-slate-800">बिना जीएसटी रजिस्ट्रेशन के तुरंत बेचें:</strong> नए और छोटे बुनकरों के लिए जीएसटी कानून अत्यंत अनुकूल है। यदि आपके पास स्वयं का जीएसटी नंबर नहीं है, तो आप हमारी <strong>कंपनी के जीएसटी पंजीकरण संख्या (Umbrella MoR)</strong> के तहत कानूनी रूप से बेच सकते हैं। जब भविष्य में आप अपना स्वयं का जीएसटी नंबर बनवा लें, तो यहां सीधे अपडेट कर अपना सेलर खाता स्वतंत्र कर सकते हैं!
              </p>
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                🚀 <strong className="font-bold text-slate-800">Zero-Friction Seller Launch:</strong> Indian e-commerce laws mandate GST for inter-state trading, which holds back local weavers. Our **Umbrella Merchant of Record (MoR) system** lets you list products under the platform's GST pool instantly. Once your business expands and you register your own GSTIN, update it below to migrate without downtime!
              </p>
            )}

            {/* Selected Seller Alert Badge */}
            <div className="p-3.5 bg-indigo-50/40 rounded-2xl border border-indigo-100/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] text-indigo-500 font-mono block">CONFIGURING TAX FOR:</span>
                <span className="text-xs font-bold text-slate-800">{activeStore.shopName} ({activeStore.handle})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10.5px] font-mono text-slate-550">
                  {gstLang === 'hi' ? "इनवॉइसिंग पूल: सक्रिय" : "Invoicing Pool: ACTIVE"}
                </span>
              </div>
            </div>

            <form onSubmit={handleUpdateGstDetails} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {gstLang === 'hi' ? "जीएसटी विकल्प चुनें (SELECT TAX PATTERN)" : "SELECT TAX PATTERN"}
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Option A: Company Shared GST */}
                  <label 
                    className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                      gstType === 'company' 
                        ? 'bg-indigo-50/50 border-indigo-500 shadow-xs' 
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="gstTypeInput"
                      checked={gstType === 'company'}
                      onChange={() => {
                        setGstType('company');
                        setGstNumber('09LIVEKART9911Z0');
                        setGstError('');
                      }}
                      className="mt-1 accent-indigo-600 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {gstLang === 'hi' ? "कंपनी साझा जीएसटी पूल" : "Use Shared Company GST"}
                      </span>
                      <span className="text-[10.5px] text-slate-500 block mt-0.5 leading-normal">
                        {gstLang === 'hi' 
                          ? "सेलर आईडी कंपनी जीएसटी से जुड़ जाएगी। कोई अतिरिक्त कर लाइसेंस अभी आवश्यक नहीं है।" 
                          : "Lists you under platform corporate license. Ideal for micro-artisans & traditional weaves."}
                      </span>
                      <span className="inline-block mt-2 font-mono text-[9px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md font-bold">
                        Umbrella GST: 09LIVEKART9911Z0
                      </span>
                    </div>
                  </label>

                  {/* Option B: Custom / Own GST */}
                  <label 
                    className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                      gstType === 'custom' 
                        ? 'bg-amber-50/50 border-amber-500 shadow-xs' 
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="gstTypeInput"
                      checked={gstType === 'custom'}
                      onChange={() => {
                        setGstType('custom');
                        setGstNumber(activeStore.gstType === 'custom' ? (activeStore.gstNumber || '') : '');
                        setGstError('');
                      }}
                      className="mt-1 accent-amber-600 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-855 block">
                        {gstLang === 'hi' ? "मेरा अपना व्यवसायिक जीएसटी" : "My Custom business GST"}
                      </span>
                      <span className="text-[10.5px] text-slate-500 block mt-0.5 leading-normal">
                        {gstLang === 'hi' 
                          ? "अपना १५-अंकीय जीएसटी नंबर दर्ज करें और अपनी सेलर आईडी सीधे स्वतंत्र टैक्स फ़ाइलर पर अपग्रेड करें।" 
                          : "Input your 15-character GSTIN code. Dispatches and billing will immediately switch to direct format."}
                      </span>
                      {activeStore.gstUpdated && (
                        <span className="inline-block mt-2 font-mono text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                          Upgraded & Active
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional Inputs */}
              {gstType === 'custom' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {gstLang === 'hi' ? "अपना व्यवसायिक जीएसटी (GSTIN)" : "YOUR BUSINESS GSTIN (15 CHARACTERS)"}
                    </label>
                    <input 
                      type="text"
                      maxLength={15}
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                      placeholder="E.g. 09AAACA1021F1Z2"
                      className="w-full px-3 py-2 bg-white text-slate-800 border border-slate-200 rounded-xl text-xs font-mono font-bold tracking-widest focus:outline-none focus:border-amber-500"
                      id="custom-gstin-input"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-normal">
                    {gstLang === 'hi' 
                      ? "जीएसटीआर-१ और ३बी में सही रिटर्न सुनिश्चित करने के लिए कृपया अपने १५ अंकों के जीएसटी पंजीकरण प्रमाण पत्र से कोड का मिलान ढंग से करें।"
                      : "Please ensure this matches your actual business registration certificates to guarantee smooth GSTR-1 and GSTR-3B filings."}
                  </p>
                </div>
              )}

              {/* Verified Status live mockup card */}
              <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 text-white rounded-2xl p-4 relative overflow-hidden font-mono shadow mt-4">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <FileText className="w-16 h-16" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] tracking-widest text-indigo-300 block uppercase font-bold">TAX COMPLIANCE ID CARD</span>
                    <h4 className="text-xs font-bold text-indigo-100 mt-1 uppercase tracking-tight">
                      {activeStore.shopName}
                    </h4>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                    gstType === 'company' ? 'bg-indigo-500 text-white' : 'bg-amber-500 text-indigo-950'
                  }`}>
                    {gstType === 'company' ? "Shared umbrella pool" : "independent filer"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <div>
                    <span className="text-[7.5px] text-indigo-300 block uppercase">SELLER IDENTITY POOL</span>
                    <span className="text-xs font-bold text-white tracking-widest">
                      {activeStore.id.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[7.5px] text-indigo-300 block uppercase">ASSIGNED GST NUMBER</span>
                    <span className="text-xs font-bold text-white tracking-widest">
                      {gstNumber || '09LIVEKART9911Z0'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-800 flex justify-between items-center text-[8.5px] text-indigo-200">
                  <span>MODERATION STATE: COMPLIANT ✅</span>
                  <span>TDS RATE withheld: {gstType === 'company' ? "2% Escrow Take" : "1% TCS Statutory"}</span>
                </div>
              </div>

              {gstError && (
                <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-xl border border-rose-100 flex items-start gap-2 whitespace-normal leading-normal">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{gstError}</span>
                </div>
              )}

              {gstSaveSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-100 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    {gstLang === 'hi' 
                      ? "बधाई हो! आपकी सेलर टैक्स प्रोफाइल को सुरक्षित रूप से अपडेट कर दिया गया है।" 
                      : "Awesome! Your seller tax profile has been safely locked and updated."}
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5"
                id="update-gst-tax-record"
              >
                <ShieldCheck className="w-4 h-4 font-bold" />
                <span>
                  {gstLang === 'hi' ? "टैक्स प्रोफाइल सहेजें (Lock Tax Status)" : "Lock & Update Tax Profile"}
                </span>
              </button>
            </form>
          </div>

          {/* Onboarding Interactive map (Pillar 4) */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xs space-y-4 border border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-400">Pillar 4 • Road Map Integration</span>
              <h3 className="font-semibold text-white mt-0.5">Custom Merchant Onboarding Milestones</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { step: 1, label: "Register Handler", info: "@username configured" },
                { step: 2, label: "Tick Approval", info: "Verification lock applied" },
                { step: 3, label: "Interactive Catalogs", info: "Add custom products" }
              ].map((item) => {
                const checked = completedSteps.includes(item.step);
                return (
                  <button
                    key={item.step}
                    onClick={() => toggleOnboardingStep(item.step)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                      checked ? 'bg-emerald-500/10 border-emerald-500' : 'bg-slate-800/40 border-slate-800 hover:border-slate-750'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest">Step {item.step}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500'
                      }`}>
                        {checked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>
                    <h4 className="font-bold text-xs mt-2 text-white">{item.label}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">{item.info}</p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
