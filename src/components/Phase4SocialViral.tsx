/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Share2, 
  Gift, 
  ExternalLink, 
  CheckCircle, 
  Copy, 
  Wallet, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  Tag,
  Languages,
  BadgeCheck,
  Play,
  Sparkles,
  Percent,
  Coins,
  Tv,
  PlusCircle,
  Eye,
  DollarSign
} from 'lucide-react';

interface ActiveGroup {
  id: string;
  creatorHandle: string;
  productName: string;
  singlePrice: number;
  teamPrice: number;
  membersJoined: number;
  membersRequired: number;
  hoursRemaining: number;
  refunded: boolean;
}

interface AdCampaign {
  id: string;
  brandName: string;
  cpmRate: number; // Cost per 1000 views
  bannerText: string;
  ctrEstimate: number; // Click-through rate %
}

export default function Phase4SocialViral() {
  // ----------------------------------------
  // LINGUAL SUPPORT & TRANSLATION DICTIONARY
  // ----------------------------------------
  const [lang, setLang] = useState<'hi' | 'en'>('hi');

  const t = {
    en: {
      title: "Phase 4: Social Commerce, Genuine Monetization & Ad Injection",
      langSelect: "Select Application Language / भाषा चुनें:",
      desc: "Explore genuine, real-world social commerce revenue engines. Toggle English/Hindi formats to simulate transaction splits, viewer micro-tips, ad CPM revenues, and video ad injection into active streams.",
      
      // Team Buying
      teamTitle: "Active Member Team Buying Loops",
      teamDesc: "Invite friends to buy to unlock heavy discounts. If not filled in 24 hrs, the escrow system auto-refunds.",
      startTeam: "Start Team Group Loop",
      simTime: "Simulate Time Lapse (-2h)",
      teammates: "Teammates joined",
      remaining: "remaining",
      expired: "Expired",
      dealCleared: "Deal Cleared!",
      joinActive: "Join Active Loop",
      refundIssued: "Full Refund Issued",

      // Reseller
      resellerTitle: "Reseller Share & Earn",
      resellerDesc: "Resellers choose catalog products, generate WhatsApp links, and earn clean referral cuts securely.",
      identity: "Your Reseller Handle",
      productSelect: "Pick Product Catalog",
      genLink: "Generate Referral Link",
      simClick: "Simulate WhatsApp Link Click",
      refClicks: "Reference Clicks",

      // Wallet
      walletTitle: "Earnings Wallet",
      pending: "Pending",
      pendingDesc: "Locked for 7-day return policy safety",
      withdrawable: "Withdrawable",
      withdrawableDesc: "Ready for direct UPI payout transfer",
      withdrawBtn: "Withdraw Commission via UPI",

      // Platform Take Rate
      platformTitle: "App/Platform Monetization Hub",
      platformDesc: "How the App makes money (Genuine Take-Rate Split-ups):",
      simTransBtn: "Run Real-Time Escrow Sale Simulation",
      unlockedTip: "Click below to dispatch an escrow sale and watch division logs:",
      grossAmt: "Gross Transaction Value",
      escrowAmt: "Escrow Platform Cut (2% Standard)",
      resellerCut: "Reseller Commission Cut (10%)",
      weaverShare: "Weaver / Supplier Net Share (88%)",
      saasSellersTitle: "Premium Merchant Verification SaaS",
      saasSellersDesc: "Earn ₹499/mo per weaver for live certification tags and priority dispatch.",
      sassActiveWeavers: "Active Verified Weavers",
      blueTickRevRate: "Monthly SaaS Verified Income",

      // Creator Earnings
      creatorTitle: "Video Creator's Earning Desk",
      creatorDesc: "How the video creators make money: Direct fan tips, Video Adsense revenues, and affiliate cuts.",
      tipsTitle: "Simulate Fan Tip Gifting",
      tipsDesc: "Audiences buy coins to purchase quick virtual gifts. Click to send directly to creator:",
      giftRose: "Send Rose",
      giftSweets: "Send Sweets",
      giftTrophy: "Send Trophy",
      liveCoins: "Creator Coins Balance",
      estCash: "Est. Creator Live Cash Payout",
      adsReward: "Cumulative Video AdSense Share (55% Cut)",
      tipsDisclaimer: "We charge a 20% system facilitation fee on fan gifts. 80% goes directly to creator wallet.",

      // Video Ads Playback Injection
      adsTitle: "Inside-Feed Video Ad Injection Console",
      adsDesc: "Configure and test high-paying promotional ad injections in live-commerce feeds. Computes CPM (Cost-per-Mille) payouts dynamically.",
      activeCamp: "Select Brand Ad Campaign",
      statusText: "Ad System Status",
      idle: "Ready to Inject Brand Ad",
      playing: "Brand Video Ad Playing Active...",
      viewsTracker: "Ad View Impressions",
      adsRevenueTracker: "Gross Ad Revenue",
      creatorAdCutTracker: "Creator Ad Revenue Share (55% Cut)",
      platformAdTracker: "Platform Net Ad Profit (45% Cut)",
      runPlaybackBtn: "Inject Brand Ad Into Stream Reel",
      skipBtn: "Skip Active Ad",
      addCustomCampTitle: "Create Custom Ad Campaign",
      brandNameText: "Brand / Sponsor Name",
      cpmRateText: "Proposed CPM Bid Rate (₹ per 1k Views)",
      campBannerText: "Short Ad Promo Banner Caption",
      addCampBtn: "Save Ad Campaign"
    },
    hi: {
      title: "चरण 4: सोशल कॉमर्स, ऐप एवं क्रिएटर मुद्रीकरण (Monetization)",
      langSelect: "एप्लीकेशन भाषा बदलें / Choose Language:",
      desc: "सोशल कॉमर्स और लाइव वीडियो से पैसे कमाने के असली तरीकों का लाइव टेस्ट करें। विज्ञापनों, क्रिएटर दान/गिफ्ट्स और एस्क्रो फ़ीस के गणितीय विभाजन को हिंदी या इंग्लिश में समझें।",
      
      // Team Buying
      teamTitle: "सक्रिय टीम ग्रुप शॉपिंग लूप (Team Loops)",
      teamDesc: "भारी छूट पाने के लिए दोस्तों को व्हाट्सएप पर आमंत्रित करें। यदि २४ घंटे में लक्षित ग्रुप नहीं भरता, तो एस्क्रो सिस्टम सुरक्षित वापस रिफंड कर देता है।",
      startTeam: "नया टीम शॉपिंग लूप शुरू करें",
      simTime: "समय को २ घंटे आगे बढ़ाएं",
      teammates: "शामिल हुए सदस्य",
      remaining: "शेष",
      expired: "समय समाप्त",
      dealCleared: "ग्रुप आर्डर सफल!",
      joinActive: "टीम ग्रुप में शामिल हों",
      refundIssued: "पूरा पैसा रिफंड किया गया",

      // Reseller
      resellerTitle: "रीसेलर शेयर और कमाई (Share & Earn)",
      resellerDesc: "रीसेलर बिना किसी शुरुआती निवेश के प्रोडक्ट चुनकर व्हाट्सएप लिंक बना सकते हैं और सीधे कमीशन कमा सकते हैं।",
      identity: "आपकी रीसेलर आईडी",
      productSelect: "उत्पाद श्रेणी चुनें",
      genLink: "व्हाट्सएप रेफरल लिंक बनाएं",
      simClick: "व्हाट्सएप क्लिक सिमुलेट करें",
      refClicks: "लिंक पर क्लिक",

      // Wallet
      walletTitle: "सुरक्षित अर्निंग्स वॉलेट",
      pending: "पेंडिंग राशि",
      pendingDesc: "७ दिनों की एस्क्रो वापसी नीति के तहत सुरक्षित",
      withdrawable: "निकासी योग्य राशि",
      withdrawableDesc: "आपके UPI बैंक खाते में तुरंत ट्रांसफर के लिए तैयार",
      withdrawBtn: "कमाई को UPI द्वारा बैंक में भेजें",

      // Platform Take Rate
      platformTitle: "ऐप/प्लेटफॉर्म की कमाई (App Revenue)",
      platformDesc: "ऐप कैसे पैसा कमाएगा (सटीक 2% एस्क्रो टेक-रेट विभाजन मॉडल):",
      simTransBtn: "एस्क्रो सेल ट्रांजैक्शन का डेमो चलाएं",
      unlockedTip: "आर्डर से होने वाले राजस्व का सटीक गणितीय विभाजन नीचे देखें:",
      grossAmt: "कुल आर्डर मूल्य (Gross Amount)",
      escrowAmt: "ऐप एस्क्रो सुविधा शुल्क (2% हिस्सा)",
      resellerCut: "रीसेलर एफिलिएट कमीशन (10% हिस्सा)",
      weaverShare: "बुनकर / निर्माता का सीधा भुगतान (88% हिस्सा)",
      saasSellersTitle: "प्रीमियम सेलर वेरिफिकेशन SaaS मासिक शुल्क",
      saasSellersDesc: "ब्लू वेरिफिकेशन सुरक्षा बैज और लाइव शोकेस के लिए बुनकरों से प्रति माह ₹499 का शुल्क लिया जाता है।",
      sassActiveWeavers: "सक्रिय प्रमाणित बुनकर",
      blueTickRevRate: "ब्लू टिक SaaS से मासिक शुद्ध कमाई",

      // Creator Earnings
      creatorTitle: "वीडियो क्रिएटर की कमाई (Creator Revenue)",
      creatorDesc: "क्रिएटर्स पैसे कैसे कमाएंगे (दर्शक टिपिंग, वीडियो विज्ञापन हिस्सा और सीधे एफिलिएट कमीशन):",
      tipsTitle: "लाइव टिप/उपहार भेजना सिमुलेट करें",
      tipsDesc: "लाइव दर्शक क्रिएटर को बढ़ावा देने के लिए उपहार भेजते हैं। भेजने के लिए नीचे क्लिक करें:",
      giftRose: "गुलाब भेजें",
      giftSweets: "मिठाई भेजें",
      giftTrophy: "ट्रॉफी भेजें",
      liveCoins: "क्रिएटर का लाइव कॉइन बैलेंस",
      estCash: "क्रिएटर की नकद टिप कमाई (80% हिस्सा)",
      adsReward: "वीडियो विज्ञापनों से क्रिएटर की अर्निंग्स (55% हिस्सा)",
      tipsDisclaimer: "उपहारों पर 20% ऐप संचालन शुल्क लागू होता है। शेष 80% क्रिएटर के वॉलेट में तत्काल ट्रांसफर होता है।",

      // Video Ads Playback Injection
      adsTitle: "स्वाइपेबल वीडियो विज्ञापन डलीव्री प्रणाली (Ad Injections)",
      adsDesc: "वीडियो रील्स फ़ीड के बीच ब्रांड विज्ञापन वीडियो सिमुलेट करें जिससे ऐप का CPM विज्ञापन राजस्व और क्रिएटर की AdSense इनकम बढ़ती है।",
      activeCamp: "सक्रिय ब्रांड विज्ञापन अभियान चुनें",
      statusText: "विज्ञापन प्रणाली की स्थिति",
      idle: "विज्ञापन इंजेक्ट करने के लिए तैयार",
      playing: "रील्स फ़ीड में वीडियो विज्ञापन लाइव है...",
      viewsTracker: "विज्ञापन देखने वाले दर्शक (Impressions)",
      adsRevenueTracker: "कुल एकत्र विज्ञापन राजस्व (Gross Ads Revenue)",
      creatorAdCutTracker: "क्रिएटर का वीडियो विज्ञापन हिस्सा (55% AdSense)",
      platformAdTracker: "ऐप का शुद्ध एडसेंस मुनाफ़ा (45% हिस्सा)",
      runPlaybackBtn: "रील्स में अभी ब्रांड विज्ञापन इंजेक्ट करें",
      skipBtn: "विज्ञापन बंद करें / Skip Ad",
      addCustomCampTitle: "नया ब्रांड विज्ञापन अभियान जोड़ें",
      brandNameText: "ब्रांड / प्रायोजक का नाम",
      cpmRateText: "प्रस्तावित CPM दर (₹ प्रति १००० व्यूज)",
      campBannerText: "संक्षिप्त विज्ञापन बैनर टेक्स्ट",
      addCampBtn: "विज्ञापन अभियान सहेजें"
    }
  };

  const currText = t[lang];

  // ----------------------------------------
  // 1. TEAM BUYING SIMULATOR STATES
  // ----------------------------------------
  const [groups, setGroups] = useState<ActiveGroup[]>([
    {
      id: "GRP-401",
      creatorHandle: "@rahul_singh",
      productName: "Aura Indigo Floral Kurti",
      singlePrice: 1499,
      teamPrice: 999,
      membersJoined: 2,
      membersRequired: 3,
      hoursRemaining: 18,
      refunded: false
    },
    {
      id: "GRP-402",
      creatorHandle: "@priya_gems",
      productName: "Premium Silk Handloom Saree",
      singlePrice: 4200,
      teamPrice: 3100,
      membersJoined: 1,
      membersRequired: 3,
      hoursRemaining: 23,
      refunded: false
    }
  ]);

  // Affiliate Reseller State Tracker
  const [affHandle, setAffHandle] = useState('nitish_rawat');
  const [selectedProduct, setSelectedProduct] = useState('Premium Kurtis');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [linkClicks, setLinkClicks] = useState(0);
  const [pendingWalletBalance, setPendingWalletBalance] = useState(250);
  const [withdrawableWalletBalance, setWithdrawableWalletBalance] = useState(740);

  // Time lapse simulation
  const decreaseHours = () => {
    setGroups(groups.map(g => {
      const nextHrs = Math.max(0, g.hoursRemaining - 2);
      let isRefunded = g.refunded;
      if (nextHrs === 0 && g.membersJoined < g.membersRequired) {
        isRefunded = true;
      }
      return { 
        ...g, 
        hoursRemaining: nextHrs,
        refunded: isRefunded 
      };
    }));
  };

  // Join Active Loop
  const joinGroup = (id: string) => {
    setGroups(groups.map(g => {
      if (g.id === id && g.membersJoined < g.membersRequired && !g.refunded) {
        const nextMembers = g.membersJoined + 1;
        return { ...g, membersJoined: nextMembers };
      }
      return g;
    }));
  };

  // Create new Loop
  const createNewGroup = () => {
    const newGrpId = `GRP-${Math.floor(Math.random() * 900 + 400)}`;
    const newGroup: ActiveGroup = {
      id: newGrpId,
      creatorHandle: `@${affHandle || 'anonymous'}`,
      productName: "Traditional Banarasi Zari Silk",
      singlePrice: 3999,
      teamPrice: 2899,
      membersJoined: 1,
      membersRequired: 3,
      hoursRemaining: 24,
      refunded: false
    };
    setGroups([newGroup, ...groups]);
  };

  // Reseller referral code gen
  const generateAffiliateToken = (e: FormEvent) => {
    e.preventDefault();
    const handleClean = affHandle.startsWith('@') ? affHandle : `@${affHandle}`;
    const cleanUrlName = selectedProduct.toLowerCase().replace(/ /g, '-');
    const linkStr = `https://livekart.shop/catalog/${cleanUrlName}?ref=${handleClean.substring(1)}`;
    setGeneratedLink(linkStr);
    setCopiedLink(false);
  };

  const simulateLinkClickWithPurchase = () => {
    setLinkClicks(prev => prev + 1);
    const mockCommission = Math.floor(120 + Math.random() * 150);
    setPendingWalletBalance(prev => prev + mockCommission);
  };

  const withdrawToUpi = () => {
    if (withdrawableWalletBalance <= 0) return;
    alert(`Withdrawn ₹${withdrawableWalletBalance} directly to UPI ID linked to your bank account successfully!`);
    setWithdrawableWalletBalance(0);
  };

  // ----------------------------------------
  // 2. DYNAMIC APP MONETIZATION CONTROLLER (2% ESCROW TAKE RATE)
  // ----------------------------------------
  const [simulatedGross, setSimulatedGross] = useState<number>(2500);
  const [splitWeaver, setSplitWeaver] = useState<number>(2200);
  const [splitReseller, setSplitReseller] = useState<number>(250);
  const [splitPlatform, setSplitPlatform] = useState<number>(50);
  const [saasSellersCount, setSaasSellersCount] = useState<number>(36); // Verified premium handloom units paying 499/mo

  const runEscrowSimulation = () => {
    const demoArray = [1200, 1800, 2500, 3200, 4800];
    const gross = demoArray[Math.floor(Math.random() * demoArray.length)];

    const platCut = Math.round(gross * 0.02); // 2%
    const resellCut = Math.round(gross * 0.10); // 10%
    const weaverShare = gross - platCut - resellCut; // 88%

    setSimulatedGross(gross);
    setSplitPlatform(platCut);
    setSplitReseller(resellCut);
    setSplitWeaver(weaverShare);
  };

  // ----------------------------------------
  // 3. CREATOR EARNINGS ENGINE (GIFTS & COINS DATA)
  // ----------------------------------------
  const [coinsBalance, setCoinsBalance] = useState<number>(380);
  const [adRevenueCumulative, setAdRevenueCumulative] = useState<number>(145.50);
  const [lastGiftName, setLastGiftName] = useState<string>('');

  const sendLiveGift = (coinValue: number, name: string) => {
    setCoinsBalance(prev => prev + coinValue);
    setLastGiftName(name);
    setTimeout(() => setLastGiftName(''), 3000);
  };

  // ----------------------------------------
  // 4. VIDEO AD INJECTION PLAYBACK STATE & LIST
  // ----------------------------------------
  const [adPlaylists, setAdPlaylists] = useState<AdCampaign[]>([
    { id: "CAD-91", brandName: "Meesho Fashion Fest", cpmRate: 450, bannerText: "⚡ Dynamic Discount: 30% Off on Kurtis using coupon MEESHO30!", ctrEstimate: 4.8 },
    { id: "CAD-92", brandName: "Myntra Handloom Pride", cpmRate: 580, bannerText: "🛍️ Royal Saree Handcraft Collection - Shop Live directly from artisans!", ctrEstimate: 6.2 },
    { id: "CAD-93", brandName: "Nykaa Beauty Flash Deal", cpmRate: 380, bannerText: "💄 Natural organic makeup lipsticks starting at just ₹199 today!", ctrEstimate: 3.5 },
  ]);

  const [selectedAdId, setSelectedAdId] = useState<string>("CAD-92");
  const [isAdPlaying, setIsAdPlaying] = useState<boolean>(false);
  const [adDurationRemaining, setAdDurationRemaining] = useState<number>(0);
  
  // Real statistical accumulator
  const [adViewsAccumulated, setAdViewsAccumulated] = useState<number>(2450);
  const [totalAdSenseGross, setTotalAdSenseGross] = useState<number>(1152.00);

  // Form custom campaign fields
  const [newBrandName, setNewBrandName] = useState('');
  const [newCPM, setNewCPM] = useState(400);
  const [newBannerText, setNewBannerText] = useState('');

  const createCustomAdCampaign = (e: FormEvent) => {
    e.preventDefault();
    if (!newBrandName) return;
    const newCamp: AdCampaign = {
      id: `CAD-${Math.floor(Math.random() * 800) + 100}`,
      brandName: newBrandName,
      cpmRate: Number(newCPM),
      bannerText: newBannerText || "Exclusive brand offer checkout inside live reels stream!",
      ctrEstimate: parseFloat((3 + Math.random() * 4).toFixed(1))
    };
    setAdPlaylists([newCamp, ...adPlaylists]);
    setSelectedAdId(newCamp.id);
    setNewBrandName('');
    setNewBannerText('');
    alert(`Created Campaign: "${newCamp.brandName}" with CPM rate of ₹${newCamp.cpmRate}! Ready to inject.`);
  };

  // Playback timer interval
  useEffect(() => {
    if (!isAdPlaying) return;
    if (adDurationRemaining <= 0) {
      setIsAdPlaying(false);
      return;
    }

    const timer = setInterval(() => {
      setAdDurationRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsAdPlaying(false);
          calculateAdRevenuePillars();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAdPlaying, adDurationRemaining]);

  const triggerAdVideoPlay = () => {
    setIsAdPlaying(true);
    setAdDurationRemaining(10); // Simulated 10-second high impact ad playback window
  };

  const calculateAdRevenuePillars = () => {
    const currentAdObj = adPlaylists.find(x => x.id === selectedAdId) || adPlaylists[0];
    
    // Simulate finding 1000 new viewer impressions during the ad segment
    const addedViews = 1000;
    
    // CPM is earnings per 1000 impressions
    const earnedGross = currentAdObj.cpmRate; 
    
    // Split formula (Creator AdSense gets 55% cut, platform keeps 45%)
    const creatorShare = earnedGross * 0.55;

    setAdViewsAccumulated(prev => prev + addedViews);
    setTotalAdSenseGross(prev => prev + earnedGross);
    setAdRevenueCumulative(prev => prev + creatorShare);
  };

  return (
    <div className="space-y-8" id="phase-4-monetization-deck">

      {/* LANGUAGE SELECTOR AND CORE DESCRIPTION BANNER */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/30 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1 max-w-3xl">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-amber-500 animate-pulse" />
            <span className="text-[10px] uppercase font-mono font-black tracking-widest text-amber-400">
              {currText.langSelect}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setLang('hi')} 
                className={`px-3 py-0.5 rounded text-[10.5px] font-black cursor-pointer transition-all ${lang === 'hi' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-850 text-slate-400 hover:text-white'}`}
              >
                हिन्दी (Hindi)
              </button>
              <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-0.5 rounded text-[10.5px] font-black cursor-pointer transition-all ${lang === 'en' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-850 text-slate-400 hover:text-white'}`}
              >
                English
              </button>
            </div>
          </div>
          <h2 className="font-display font-light text-xl text-slate-900 font-extrabold mt-1 sm:text-2xl leading-none flex items-center gap-1.5">
            {currText.title}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-4xl pt-1">
            {currText.desc}
          </p>
        </div>
        <div className="flex gap-1.5 shrink-0 self-start md:self-center font-mono text-[10.5px] bg-slate-900 text-amber-400 px-3 py-2 rounded-xl border border-white/5 shadow-inner">
          <BadgeCheck className="w-4 h-4 text-emerald-500 animate-[bounce_1s_infinite]" />
          <span>V-SHOP MONETIZATION ACTURING: 2026 LIVE</span>
        </div>
      </div>

      {/* 2-ROW GRID: DYNAMIC AD INJECTION MEDIA & CAMPAIGN CREATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN (LG:col-span-6): INTERACTIVE REELS SCREEN & AD PLAYER SIMULATOR */}
        <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl border border-amber-500/25 p-6 flex flex-col justify-between relative overflow-hidden" id="interactive-reels-ad-player">
          <div className="absolute top-0 right-0 p-2 text-[9px] uppercase tracking-wider font-mono font-bold bg-amber-500 text-slate-950 rounded-bl-xl z-20 flex items-center gap-1">
            <Tv className="w-3 h-3 text-slate-950 animate-pulse" />
            Live Commerce Player
          </div>

          <div className="space-y-2 relative z-10">
            <h3 className="font-display font-semibold text-base text-slate-100 flex items-center gap-1.5">
              <Play className="w-4 h-4 text-amber-500 animate-spin" />
              {currText.adsTitle}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {currText.adsDesc}
            </p>
          </div>

          {/* SIMULATED PHONE DEVICE STAGE INTERFACING REEL FEED OR AD OVERLAY */}
          <div className="my-6 relative bg-slate-950 border border-slate-700/60 rounded-2xl h-64 overflow-hidden flex flex-col justify-between p-4 shadow-2xl">
            {isAdPlaying ? (
              // ADVERTISING INTRUSION ACTIVE VIEW
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-slate-900 to-rose-950/90 z-20 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                    <span className="text-[10px] font-mono text-rose-400 font-extrabold uppercase tracking-widest">
                      {currText.playing}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-black text-amber-400">
                    ₹{adPlaylists.find(x => x.id === selectedAdId)?.cpmRate} CPM BID
                  </span>
                </div>

                <div className="text-center space-y-2 my-auto">
                  <h4 className="text-base font-black text-white italic tracking-wide animate-pulse">
                    🎥 SPONSOR PILL: {adPlaylists.find(x => x.id === selectedAdId)?.brandName}
                  </h4>
                  <div className="p-3 bg-white/10 rounded-xl border border-white/15 backdrop-blur-md">
                    <p className="text-xs text-slate-200 leading-normal font-sans font-medium px-2">
                      "{adPlaylists.find(x => x.id === selectedAdId)?.bannerText}"
                    </p>
                  </div>
                </div>

                {/* Progress Bar timer & skip controls */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                    <span>Targeting CTR: {adPlaylists.find(x => x.id === selectedAdId)?.ctrEstimate}%</span>
                    <span>Remaining: {adDurationRemaining}s / 10s</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${(adDurationRemaining / 10) * 100}%` }}
                      className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-400 h-full transition-all duration-1000"
                    />
                  </div>
                  <div className="flex justify-end pt-1">
                    <button 
                      onClick={() => setIsAdPlaying(false)}
                      className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-slate-300 font-mono rounded text-[8.5px] cursor-pointer"
                    >
                      {currText.skipBtn}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // NORMAL USER STREAM VIEW
              <div className="absolute inset-0 bg-gradient-to-b from-teal-900/40 via-slate-900 to-slate-950 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-slate-950/60 px-2 py-0.5 rounded text-[9.5px] text-emerald-400 font-mono border border-emerald-500/10 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE MODEL FEED (Active Reels)
                  </span>
                  <span className="bg-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-slate-350">
                    Resolution: Adaptive HLS Low Lag
                  </span>
                </div>

                {/* Video play icon overlay */}
                <div className="text-center space-y-1 my-auto">
                  <span className="text-2xl mt-2 block animate-bounce">👘</span>
                  <h4 className="text-sm font-semibold text-slate-200">Indigo Floral Cotton Chikankari Kurti</h4>
                  <p className="text-[10px] text-slate-400 font-sans italic">Simulated product loop continues playing dynamically...</p>
                </div>

                {/* Bottom interactive pinned overlay */}
                <div className="flex justify-between items-center bg-slate-950/80 p-2.5 rounded-xl border border-white/5 mt-auto">
                  <div className="min-w-0">
                    <div className="text-[9px] text-slate-400 font-mono uppercase">Featured artisan catalog</div>
                    <div className="text-xs font-bold text-white truncate">Premium Indigo Chikankari</div>
                  </div>
                  <button className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] rounded hover:bg-amber-400">
                    Buy ₹999
                  </button>
                </div>
              </div>
            )}
            <img src="" referrerPolicy="no-referrer" className="hidden" alt="" />
          </div>

          <div className="space-y-4">
            {/* Control triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  {currText.activeCamp}
                </label>
                <select
                  value={selectedAdId}
                  onChange={(e) => setSelectedAdId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700/60 rounded-xl text-xs text-white focus:outline-none font-sans cursor-pointer"
                  id="ad-playlist-dropdown"
                >
                  {adPlaylists.map(ad => (
                    <option key={ad.id} value={ad.id}>
                      {ad.brandName} (₹{ad.cpmRate} CPM)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={triggerAdVideoPlay}
                  disabled={isAdPlaying}
                  className="w-full py-1.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black text-xs rounded-xl hover:from-rose-400 hover:to-orange-400 transition-all uppercase tracking-widest cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md"
                  id="inject-reels-ad-btn"
                >
                  <PlusCircle className="w-4 h-4" />
                  {currText.runPlaybackBtn}
                </button>
              </div>
            </div>

            {/* ADVERTISING REVENUE SPREADSHEETS AND LIVE COUNTERS */}
            <div className="bg-slate-950 p-4.5 rounded-2xl border border-white/5 space-y-3 font-mono text-[10.5px]">
              <span className="text-[9px] uppercase tracking-wider text-amber-500 block">
                ⭐ {currText.adStatsTitle}
              </span>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 bg-slate-900 rounded-xl border border-white/5 space-y-0.5">
                  <span className="text-zinc-500 uppercase text-[8.5px] block">{currText.viewsTracker}:</span>
                  <span className="text-white text-base font-bold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {adViewsAccumulated.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded-xl border border-white/5 space-y-0.5">
                  <span className="text-zinc-500 uppercase text-[8.5px] block">{currText.adsRevenueTracker}:</span>
                  <span className="text-emerald-450 text-base font-bold text-amber-400">
                    ₹{totalAdSenseGross.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Verified Payout Breakdowns */}
              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[9px] text-zinc-400 leading-normal">
                <div className="flex justify-between">
                  <span>↳ {currText.creatorAdCutTracker}:</span>
                  <strong className="text-emerald-400">+₹{(totalAdSenseGross * 0.55).toFixed(2)} (55%)</strong>
                </div>
                <div className="flex justify-between">
                  <span>↳ {currText.platformAdTracker}:</span>
                  <strong className="text-white">+₹{(totalAdSenseGross * 0.45).toFixed(2)} (45%)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (LG:col-span-6): AD CAMPAIGN BUILDER & METADATA SPONSORS */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-150 p-6 flex flex-col justify-between" id="ad-campaign-creator-card">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9.5px] font-mono font-bold text-amber-600 block">
                  ⚙️ PARTNER AD CAMPAIGNS HUB
                </span>
                <h3 className="font-display font-semibold text-slate-900 text-base mt-0.5">
                  {currText.addCustomCampTitle}
                </h3>
              </div>
              <Percent className="w-5 h-5 text-amber-500 animate-pulse" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Enter customized details to dynamically configure brand sponsor slots. Higher bids prioritize advertisement distributions inside user reels automatically.
            </p>

            <form onSubmit={createCustomAdCampaign} className="space-y-3 pt-1">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {currText.brandNameText}
                  </label>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder={currText.campNamePlaceholder}
                    required
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-sans focus:outline-none focus:ring-2 focus:ring-amber-500/35"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {currText.cpmRateText}
                  </label>
                  <input
                    type="number"
                    value={newCPM}
                    min="100"
                    max="1000"
                    onChange={(e) => setNewCPM(Number(e.target.value))}
                    required
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/35"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {currText.campBannerText}
                </label>
                <textarea
                  value={newBannerText}
                  onChange={(e) => setNewBannerText(e.target.value)}
                  placeholder="Click here to claim exclusive handcrafted Banarasi sarees with instant delivery checkouts!"
                  rows={2}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-sans focus:outline-none focus:ring-2 focus:ring-amber-500/35 leading-normal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl tracking-wider uppercase transition-all"
                id="add-ad-camp-btn"
              >
                {currText.addCampBtn}
              </button>
            </form>
          </div>

          {/* ACTIVE SPONSORS DIRECTORY SCROLLER */}
          <div className="mt-5 pt-4.5 border-t border-slate-100">
            <span className="text-[9px] font-mono text-slate-400 uppercase block mb-2">
              📂 Active Campaigns Registered inside system
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {adPlaylists.map(ad => (
                <div 
                  key={ad.id} 
                  onClick={() => setSelectedAdId(ad.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                    selectedAdId === ad.id 
                      ? 'bg-amber-50/70 border-amber-300 shadow-xs' 
                      : 'bg-slate-50/50 border-slate-150 hover:bg-slate-50'
                  }`}
                  id={`camp-pill-${ad.id}`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase block">{ad.id}</span>
                    <h5 className="text-[11.5px] font-bold text-slate-800 leading-tight truncate">{ad.brandName}</h5>
                    <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">{ad.bannerText}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-mono font-black text-[9px] inline-block">
                      ₹{ad.cpmRate} CPM
                    </span>
                    <span className="text-[8px] text-amber-700 block mt-0.5">EST CTR: {ad.ctrEstimate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* CORE REVENUES: DUAL DIVISORS DISPLAY MODULES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* PLATFORM APP REVENUE MONETIZATION (APP KI KAMAI) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-150 p-6 flex flex-col justify-between space-y-6" id="platform-revenue-hub">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9.5px] uppercase font-mono font-bold tracking-wider text-amber-600">
                  💳 App Take-Rate split
                </span>
                <h3 className="font-display font-semibold text-slate-900 text-base mt-0.5">
                  {currText.platformTitle}
                </h3>
              </div>
              <Percent className="w-5 h-5 text-amber-500" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              {currText.platformDesc}
            </p>

            {/* TRANSACTION SIM CARD */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden space-y-3.5">
              <span className="text-[10px] font-mono text-slate-400 font-bold block">
                ⚙️ {currText.unlockedTip}
              </span>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">{currText.grossAmt}:</span>
                  <strong className="text-slate-800 text-base font-mono">₹{simulatedGross}</strong>
                </div>

                <button
                  onClick={runEscrowSimulation}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-sans text-[10.5px] font-black rounded-xl cursor-pointer select-none transition-all"
                  id="simulate-escrow-payout-split-btn"
                >
                  {currText.simTransBtn}
                </button>
              </div>

              {/* Exact split mathematics */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 font-mono text-[10px]">
                <div className="flex justify-between items-center text-amber-700 font-bold bg-amber-50/50 p-1 rounded px-1.5">
                  <span>💸 {currText.escrowAmt}:</span>
                  <span>+₹{splitPlatform}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 px-1.5">
                  <span>👤 {currText.resellerCut}:</span>
                  <span>+₹{splitReseller}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-700 font-semibold px-1.5">
                  <span>🧶 {currText.weaverShare}:</span>
                  <span>+₹{splitWeaver}</span>
                </div>
              </div>
            </div>

          </div>

          {/* PREMIUM MERCHANT SaaS SUBSCRIPTION MODEL MODULE */}
          <div className="pt-4 border-t border-slate-100 bg-amber-500/5 p-4 rounded-2xl border border-amber-100">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1">
              <BadgeCheck className="w-4 h-4 text-amber-500" />
              {currText.saasSellersTitle}
            </h4>
            <p className="text-[10px] text-slate-650 leading-relaxed mt-1">
              {currText.saasSellersDesc}
            </p>
            
            <div className="mt-3 grid grid-cols-2 gap-3 font-mono">
              <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                <span className="text-[8.5px] text-slate-400 uppercase block">{currText.sassActiveWeavers}</span>
                <span className="text-xs font-black text-slate-700">{saasSellersCount} units</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                <span className="text-[8.5px] text-slate-400 uppercase block">{currText.blueTickRevRate}</span>
                <span className="text-xs font-black text-amber-700">₹{(saasSellersCount * 499).toLocaleString()} /mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* CREATORS EARNING SYSTEM (CREATOR KI KAMAI) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-150 p-6 flex flex-col justify-between space-y-6" id="creator-earnings-hub">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9.5px] uppercase font-mono font-bold tracking-wider text-amber-600">
                  🎙️ Broadcaster Monetization desk
                </span>
                <h3 className="font-display font-semibold text-slate-900 text-base mt-0.5">
                  {currText.creatorTitle}
                </h3>
              </div>
              <Coins className="w-5 h-5 text-amber-500" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              {currText.creatorDesc}
            </p>

            {/* FAN TIP TIPPING CONSOLE */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
              <span className="text-[9.5px] font-mono text-slate-500 block">
                🎁 {currText.tipsTitle}
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => sendLiveGift(10, 'Rose 🌹')}
                  className="px-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-bold text-center flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                  id="send-rose-tip-btn"
                >
                  <span className="text-lg">🌹</span>
                  <span className="font-mono text-zinc-500 mt-0.5">10 Coins</span>
                </button>
                <button
                  type="button"
                  onClick={() => sendLiveGift(50, 'Mithai 🍬')}
                  className="px-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-bold text-center flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                  id="send-mithai-tip-btn"
                >
                  <span className="text-lg">🍬</span>
                  <span className="font-mono text-zinc-500 mt-0.5">50 Coins</span>
                </button>
                <button
                  type="button"
                  onClick={() => sendLiveGift(200, 'Trophy 🏆')}
                  className="px-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-bold text-center flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                  id="send-trophy-tip-btn"
                >
                  <span className="text-lg">🏆</span>
                  <span className="font-mono text-zinc-500 mt-0.5">200 Coins</span>
                </button>
              </div>

              {/* Tipping banner popup trigger notification inside cards */}
              <AnimatePresence>
                {lastGiftName && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute bottom-2 left-4 right-4 bg-slate-900 border border-amber-400 p-2 text-center rounded-lg text-white font-mono text-[9px]"
                  >
                    💖 Live Audience Gifting: <strong className="text-amber-400">{lastGiftName}</strong> dispatched inside streamer's live-feed!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* LIVE WALLETS HUD */}
            <div className="grid grid-cols-2 gap-3.5 pt-1.5 font-mono">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[8px] text-slate-400 uppercase block">{currText.liveCoins}:</span>
                <strong className="text-slate-800 text-sm mt-0.5 block font-bold">{coinsBalance} Gold Coins</strong>
                <span className="text-[8.5px] text-emerald-600 block mt-1">
                  Est: ₹{(coinsBalance * 0.8).toFixed(1)} Payout
                </span>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-[8px] text-amber-700 uppercase block">AdSense share (55%):</span>
                <strong className="text-amber-900 text-sm mt-0.5 block font-bold">₹{adRevenueCumulative.toFixed(2)}</strong>
                <span className="text-[8.5px] text-slate-400 block mt-1">CPM split auto-settled</span>
              </div>
            </div>

          </div>

          <p className="text-[9.5px] text-slate-405 leading-relaxed font-sans italic border-t border-slate-100 pt-3">
            ℹ️ {currText.tipsDisclaimer}
          </p>
        </div>

      </div>

      {/* ORIGINAL VIRAL GROUP BUYING & SHARING MODULES - PRESERVED PERFECTLY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Open Group Boards & Countdowns */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Line 17 • 24-Hr Viral Group Buying Loops</span>
              <h3 className="font-display font-semibold text-lg text-slate-900 mt-0.5">{currText.teamTitle}</h3>
            </div>
            <Users className="w-5 h-5 text-amber-500" />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            {currText.teamDesc}
          </p>

          <div className="flex gap-2.5">
            <button 
              onClick={createNewGroup}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
              id="new-group-loop-btn"
            >
              {currText.startTeam}
            </button>
            <button 
              onClick={decreaseHours}
              className="px-3 py-1.5 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
              id="sim-lapse-btn"
            >
              <Clock className="w-3.5 h-3.5 text-amber-500 font-bold" />
              {currText.simTime}
            </button>
          </div>

          <div className="space-y-3" id="active-group-cards">
            {groups.map((g) => (
              <div 
                key={g.id} 
                className={`p-4 rounded-2xl border transition-all ${
                  g.refunded ? 'bg-rose-50/20 border-rose-100' : 
                  g.membersJoined >= g.membersRequired ? 'bg-emerald-50/20 border-emerald-100' : 'bg-slate-50/50 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">{g.id}</span>
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-800 mt-1 font-sans">{g.productName}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Started by: {g.creatorHandle}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-amber-600 font-bold flex items-center justify-end gap-1">
                      <Tag className="w-3 h-3 text-amber-500" />
                      Team: ₹{g.teamPrice}
                    </div>
                    <span className="text-[10px] text-slate-400 line-through font-mono">Retail: ₹{g.singlePrice}</span>
                  </div>
                </div>

                {/* Progress metrics */}
                <div className="mt-4 pt-3.5 border-t border-slate-150 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-parent">
                  <div className="flex-1 w-full space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500 font-mono">
                      <span>{currText.teammates}: {g.membersJoined}/{g.membersRequired}</span>
                      <span>{g.refunded ? currText.expired : `${g.hoursRemaining}h ${currText.remaining}`}</span>
                    </div>

                    {/* Progress slider bar */}
                    <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-350 ${g.refunded ? 'bg-slate-400' : 'bg-amber-500'}`}
                        style={{ width: `${(g.membersJoined / g.membersRequired) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 self-end">
                    {g.refunded ? (
                      <span className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 uppercase tracking-wide">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                        {currText.refundIssued}
                      </span>
                    ) : g.membersJoined >= g.membersRequired ? (
                      <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 font-sans">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        {currText.dealCleared}
                      </span>
                    ) : (
                      <button 
                        onClick={() => joinGroup(g.id)}
                        className="px-3.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
                        id={`join-group-${g.id}`}
                      >
                        {currText.joinActive}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Reseller Share & Earn Affiliate Hub */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Line 19 • Reseller Affiliate Tool</span>
                <h3 className="font-display font-semibold text-base text-slate-900 mt-0.5">{currText.resellerTitle}</h3>
              </div>
              <Share2 className="w-4.5 h-4.5 text-amber-500" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              {currText.resellerDesc}
            </p>

            <form onSubmit={generateAffiliateToken} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-sans">{currText.identity}</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">@</span>
                  <input 
                    type="text" 
                    value={affHandle}
                    onChange={(e) => setAffHandle(e.target.value)}
                    placeholder="reseller_username" 
                    required
                    id="affiliate-handle"
                    className="w-full pl-6 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-sans">{currText.productSelect}</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-sans cursor-pointer"
                  id="affiliate-product"
                >
                  <option value="Aura Indigo Kurti">Aura Indigo Floral Kurti</option>
                  <option value="Royal Silk Saree">Royal Gold Silk Saree</option>
                  <option value="Traditional Phulkari Dupatta">Phulkari Wool Dupatta</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                id="generate-url-btn"
              >
                {currText.genLink}
              </button>
            </form>

            {/* Generated Link Display */}
            {generatedLink && (
              <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-xl space-y-2.5" id="affiliate-token-box">
                <div className="text-[9px] uppercase font-mono text-slate-400 font-bold block">Reseller Token Link</div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={generatedLink}
                    className="flex-1 px-2 py-1 bg-white border border-slate-200 rounded text-[11px] font-mono select-all text-slate-600 focus:outline-none"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="p-1 px-2 bg-slate-200 hover:bg-slate-300 rounded text-slate-700 text-xs flex items-center justify-center cursor-pointer font-bold"
                    id="copy-token-link"
                  >
                    {copiedLink ? 'Copied' : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-mono">{currText.refClicks}: {linkClicks}</span>
                  <button 
                    onClick={simulateLinkClickWithPurchase}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[10.5px] rounded-lg tracking-wide flex items-center gap-0.5 cursor-pointer font-sans"
                    id="sim-action-click"
                  >
                    {currText.simClick}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Secure Reseller Wallet */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Line 20 • Commission Ledger</span>
                <h3 className="font-semibold text-slate-900 mt-0.5">{currText.walletTitle}</h3>
              </div>
              <Wallet className="w-4.5 h-4.5 text-slate-400" />
            </div>

            <div className="grid grid-cols-2 gap-3.5 font-mono">
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                <span className="text-[9px] uppercase font-mono text-amber-700 font-bold block">{currText.pending}</span>
                <span className="text-sm font-bold text-amber-900">₹{pendingWalletBalance}</span>
                <p className="text-[8.5px] text-slate-400 font-sans leading-tight mt-1">{currText.pendingDesc}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[9px] uppercase font-mono text-slate-400 font-bold block">{currText.withdrawable}</span>
                <span className="text-sm font-bold text-slate-800">₹{withdrawableWalletBalance}</span>
                <p className="text-[8.5px] text-slate-405 font-sans leading-tight mt-1">{currText.withdrawableDesc}</p>
              </div>
            </div>

            <button 
              onClick={withdrawToUpi}
              disabled={withdrawableWalletBalance === 0}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
              id="wallet-withdraw-btn"
            >
              {currText.withdrawBtn}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
