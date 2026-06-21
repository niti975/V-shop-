/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, FormEvent, useEffect, useRef, MouseEvent } from 'react';
import { 
  Play, 
  Pause,
  Smartphone, 
  Wifi, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ChevronUp, 
  Sparkles, 
  Video, 
  Send,
  Flame,
  Clock,
  TrendingUp,
  Award,
  Users,
  Search,
  Volume2,
  VolumeX,
  Share,
  Music,
  Tag,
  Bot,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoContent } from '../types';

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number; // horizontal offset percentage
  scale: number;
}

export default function Phase2LiveCommerce() {
  // Broadened selection of trending, high-converting video reels
  const [reels, setReels] = useState<VideoContent[]>([
    {
      id: "vid-01",
      sellerName: "Aura Premium Styles",
      sellerHandle: "@aura_designer",
      verifyStatus: "Blue",
      videoUrl: "Premium designer Chikankari Kurtis, organic cotton weave & hand-block prints. Tap buy to claim today's hand-dyed collection.",
      views: "189K",
      likes: "12.4K",
      pinnedProductName: "Aura Indigo Floral Kurti",
      pinnedProductPrice: 1499,
      pinnedProductOriginalPrice: 2499
    },
    {
      id: "vid-02",
      sellerName: "Chanderi Handlooms",
      sellerHandle: "@chanderi_saree",
      verifyStatus: "Purple",
      videoUrl: "Pure Chanderi silk sarees directly from weavers of Madhya Pradesh. Pure silk zari work and traditional floral buttis.",
      views: "94K",
      likes: "6.8K",
      pinnedProductName: "Royal Gold Silk Saree",
      pinnedProductPrice: 4200,
      pinnedProductOriginalPrice: 5999
    },
    {
      id: "vid-03",
      sellerName: "Street Chic Wear",
      sellerHandle: "@street_chic",
      verifyStatus: "None",
      videoUrl: "Loose baggy styles, distressed denims, and cargo wear. Perfect street apparel for modern college vlogs.",
      views: "245K",
      likes: "18.1K",
      pinnedProductName: "Vintage Oversized Cargo Pants",
      pinnedProductPrice: 1899,
      pinnedProductOriginalPrice: 2999
    },
    {
      id: "vid-04",
      sellerName: "Jaipur Traditional Styles",
      sellerHandle: "@jaipur_heritage",
      verifyStatus: "Green",
      videoUrl: "Traditional Lehengas with heavy mirror embroidery, directly sourced from craftsmen in Johri Bazar, Jaipur.",
      views: "312K",
      likes: "24.9K",
      pinnedProductName: "Heritage Crimson Lehenga Set",
      pinnedProductPrice: 8500,
      pinnedProductOriginalPrice: 13999
    }
  ]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [swipeUpOpen, setSwipeUpOpen] = useState(false);
  const [liveCheckoutOpen, setLiveCheckoutOpen] = useState(false);
  const [networkCondition, setNetworkCondition] = useState<'5G' | '4G' | '3G'>('5G');
  
  // Trending Custom States
  const [selectedHashtag, setSelectedHashtag] = useState<string>('All');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [coHostingMode, setCoHostingMode] = useState(false);
  const [liveWatcherCount, setLiveWatcherCount] = useState(1420);
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
  const reactionCounter = useRef(0);

  // Scarcity state: countdown of flash sale item inside stream
  const [timeLeft, setTimeLeft] = useState({ minutes: 4, seconds: 59 });
  const [itemsLeft, setItemsLeft] = useState(12);

  // Custom interactive chat responses inside Live Stream
  const [chatMessages, setChatMessages] = useState<string[]>([
    "Amit: Quality looking incredibly soft! Is delivery free to Bangalore?",
    "Sneha: Can you showcase the mirror-work closely during the live stream?",
    "Anya: Just bought the Medium size, waiting for the order confirmation!",
    "Rohit: Does this come under the escrow 7-day payment hold protection?",
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Instagram Trending Suite State variables
  const [instagramFilter, setInstagramFilter] = useState<'none' | 'bollywood_gold' | 'retro_vibhag' | 'delhi_neon' | 'aesthetic_warm' | 'festive_chariot' | 'cyber_green' | 'surat_indigo' | 'vintage_mono'>('none');
  const [useRealWebcam, setUseRealWebcam] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const webcamVideoRef = useRef<HTMLVideoElement | null>(null);

  // New High-Velocity Trending Hinglish Comment Slips
  const [trendingComments, setTrendingComments] = useState([
    { text: "Medium size block kardo please! 🛒", count: 42, active: true },
    { text: "Rajasthan Folk handloom quality sachi bohot mast hai! ❤️", count: 88, active: true },
    { text: "7-day Escrow hold hai tab toh cash safe hai! 🛡️", count: 56, active: true },
    { text: "Aura Indigo Kurti price ₹1499 is absolute steal! 🌟", count: 71, active: true },
    { text: "Weavers of Chanderi really deserve high reward! 🧶", count: 95, active: true },
    { text: "Cyber neon filter are super cool visual reflection! ✨", count: 34, active: true }
  ]);

  const [doubleTapHeartActive, setDoubleTapHeartActive] = useState(false);
  const [doubleTapHeartPos, setDoubleTapHeartPos] = useState({ x: 150, y: 250 });
  const [taggedProductsVisible, setTaggedProductsVisible] = useState(true);
  const [activeAudioTrack, setActiveAudioTrack] = useState('🔥 Original Audio • Livekart Remix Bazz');
  const [activeStories, setActiveStories] = useState([
    { id: 'st-01', handle: '@riya_style', name: 'Riya Live', imgCode: 'RA', liveStatus: true, labelColor: 'bg-rose-500' },
    { id: 'st-02', handle: '@gopal_threads', name: 'Gopal Handlooms', imgCode: 'GT', liveStatus: true, labelColor: 'bg-rose-500' },
    { id: 'st-03', handle: '@nitish_fab', name: 'Nitish Saree', imgCode: 'NK', liveStatus: false, labelColor: 'bg-slate-500' },
    { id: 'st-04', handle: '@sneha_drapes', name: 'Sneha Cotton', imgCode: 'SC', liveStatus: true, labelColor: 'bg-rose-500' },
    { id: 'st-05', handle: '@handloom_bazaar', name: 'Bazaar Vlog', imgCode: 'HB', liveStatus: false, labelColor: 'bg-slate-500' }
  ]);
  const [showDirectMessages, setShowDirectMessages] = useState(false);
  const [dmInput, setDmInput] = useState('');
  const [dmHistory, setDmHistory] = useState([
    { sender: 'seller', text: 'Hi! All orders checked out in next 10 mins receive free premium standard shipping!' },
    { sender: 'you', text: 'Thanks. Do you have the Chanderi Silk in baby pink color?' }
  ]);

  // V-Shop Smart Autopilot & Live Commerce Engagement States
  const [isAutoSwipeActive, setIsAutoSwipeActive] = useState(false);
  const [isAutoTrafficActive, setIsAutoTrafficActive] = useState(true);
  const [isDynamicPricingActive, setIsDynamicPricingActive] = useState(true);
  const [isVocalScriptVoiceActive, setIsVocalScriptVoiceActive] = useState(false);
  const [activePitchLanguage, setActivePitchLanguage] = useState<'hindi' | 'english'>('hindi');
  const [lastLiveSaleNotification, setLastLiveSaleNotification] = useState<{ buyer: string; item: string; price: number } | null>(null);
  const [simulatedOrders, setSimulatedOrders] = useState([
    { id: "ORD-719", buyer: "@nitish_delhi", item: "Aura Indigo Floral Kurti", status: "Ekart Dispatch Assigned", timestamp: "Just Now" },
    { id: "ORD-712", buyer: "@priya_style", item: "Royal Gold Silk Saree", status: "Pending Pickup at Surat Hub", timestamp: "2 mins ago" }
  ]);

  // Delivery Partner Smart Auto-Escalation Engine
  const [activeEscalation, setActiveEscalation] = useState<{
    id: string;
    buyer: string;
    product: string;
    price: number;
    status: 'pending_agent' | 'accepted_rohan' | 'declined_rohan' | 'escalating_partner' | 'accepted_partner';
    secondsRemaining: number;
    partnerName: 'BlueDart Air' | 'Shadowfax Courier' | 'Dunzo Delivery Fast' | 'None';
    logs: string[];
  } | null>(null);

  const startDeliveryEscalationFlow = (orderId: string, buyerName: string, itemName: string, priceVal: number) => {
    setActiveEscalation({
      id: orderId,
      buyer: buyerName,
      product: itemName,
      price: priceVal,
      status: 'pending_agent',
      secondsRemaining: 15, // 15 seconds simulation represents 5 real minutes countdown
      partnerName: 'None',
      logs: [
        `[${new Date().toLocaleTimeString()}] 🛍️ New order registered. Initializing Smart Delivery Routing...`,
        `[${new Date().toLocaleTimeString()}] 🔔 Mobile push ping successfully dispatched to internal rider (Rohan Kumar).`
      ]
    });
  };

  const handleRohanDecline = () => {
    setActiveEscalation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'escalating_partner',
        secondsRemaining: 0,
        logs: [
          ...prev.logs,
          `[${new Date().toLocaleTimeString()}] ❌ Rohan Kumar (Internal Boy) declined: "Insufficient fuel / off-duty".`,
          `[${new Date().toLocaleTimeString()}] ⚡ INSTANT DELEGATION ACTIVE: Bypassing internal rider. Broadcasting order to local emergency partners (Shadowfax/BlueDart)...`
        ]
      };
    });
  };

  const handleRohanAccept = () => {
    setActiveEscalation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'accepted_rohan',
        logs: [
          ...prev.logs,
          `[${new Date().toLocaleTimeString()}] ✅ Rohan Kumar accepted! Verification check loaded. Package ETA to client is 12 mins.`
        ]
      };
    });
  };

  // Handle double tap gesture for heart spawning
  const lastTapRef = useRef<number>(0);
  const handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      // Get relative coordinates on click
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      setDoubleTapHeartPos({ x: clickX, y: clickY });
      setDoubleTapHeartActive(true);
      
      // Trigger floating reaction bubbles
      triggerReactionBubble('❤️');
      triggerReactionBubble('🙌');

      setTimeout(() => {
        setDoubleTapHeartActive(false);
      }, 800);
    }
    lastTapRef.current = now;
  };

  const handleSendDm = (e: FormEvent) => {
    e.preventDefault();
    if (!dmInput.trim()) return;
    setDmHistory([...dmHistory, { sender: 'you', text: dmInput.trim() }]);
    setDmInput('');
    setTimeout(() => {
      setDmHistory(prev => [...prev, { sender: 'seller', text: 'Yes, absolutely! We just restocked that shade in Surat hub. You can tap buy!' }]);
    }, 1500);
  };

  // Auto fluctuating live viewer counts and countdown timer for urgency feeling
  useEffect(() => {
    const watcherInterval = setInterval(() => {
      setLiveWatcherCount(prev => {
        const offset = Math.floor(Math.random() * 21) - 10; // fluctuation
        return Math.max(120, prev + offset);
      });
    }, 3000);

    const countdownInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          // occasional automated item drop representing sold out
          if (Math.random() > 0.7) {
            setItemsLeft(l => Math.max(2, l - 1));
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 4, seconds: 59 }; // auto-loop countdown
        }
      });
    }, 1000);

    return () => {
      clearInterval(watcherInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  // WEBCAM CAMERA ACTIVATION AND TIMELINE TRACKING
  useEffect(() => {
    async function activateWebcam() {
      if (useRealWebcam) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
          setWebcamStream(stream);
          if (webcamVideoRef.current) {
            webcamVideoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Camera access failed or blocked: ", err);
          alert("कैमरा परमिशन एनेबल नहीं है या ब्राउज़र कैमरा सपोर्ट नहीं करता। वी-शॉप का फ़िल्टर इमुलेशन बैकग्राउंड चालू रहेगा!");
          setUseRealWebcam(false);
        }
      } else {
        if (webcamStream) {
          webcamStream.getTracks().forEach(track => track.stop());
          setWebcamStream(null);
        }
      }
    }
    activateWebcam();
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [useRealWebcam]);

  useEffect(() => {
    if (webcamStream && webcamVideoRef.current) {
      webcamVideoRef.current.srcObject = webcamStream;
    }
  }, [webcamStream]);

  // Spark AR Custom CSS Filters parser helper
  const getFilterStyle = () => {
    switch(instagramFilter) {
      case 'bollywood_gold':
        return 'sepia-[0.3] saturate-[1.8] brightness-[1.1] contrast-[1.1] hue-rotate-[10deg]';
      case 'retro_vibhag':
        return 'sepia-[0.8] contrast-[0.95] brightness-[0.95] saturate-[1.0]';
      case 'delhi_neon':
        return 'saturate-[2.2] hue-rotate-[-25deg] brightness-[1.1] contrast-[1.25]';
      case 'aesthetic_warm':
        return 'saturate-[1.5] sepia-[0.2] hue-rotate-[345deg] brightness-[1.15]';
      case 'festive_chariot':
        return 'sepia-[0.45] saturate-[1.6] contrast-[1.1] brightness-[1.25] hue-rotate-[20deg]';
      case 'cyber_green':
        return 'grayscale-[0.35] brightness-[1.1] contrast-[1.2] hue-rotate-[95deg] saturate-[2.3]';
      case 'surat_indigo':
        return 'hue-rotate-[205deg] saturate-[1.55] brightness-[1.1] contrast-[1.05]';
      case 'vintage_mono':
        return 'grayscale-[1.0] contrast-[1.3] brightness-[0.9]';
      default:
        return '';
    }
  };

  // AUTOMATED AUTOPLAY SWIPER LOOP (Brings seamless autoplay channel capability)
  useEffect(() => {
    if (!isAutoSwipeActive) return;
    const swipeTimer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % reels.length);
      // Trigger dynamic sparkles around camera filters!
      triggerReactionBubble('✨');
      triggerReactionBubble('💖');
    }, 14000); // Swipe every 14 seconds automatically
    return () => clearInterval(swipeTimer);
  }, [isAutoSwipeActive, reels.length]);

  // SMART AI SIMULATED TRAFFIC BOTS ENGAGEMENT GENERATOR
  useEffect(() => {
    if (!isAutoTrafficActive) return;

    const names = [
      'Kamal Rawat (Surat)', 'Sneha Patil (Pune)', 'Nitish Kr (Delhi)',
      'Aarav Sharma (Patna)', 'Pooja Tiwari (Lucknow)', 'Rohan Verma (Mumbai)',
      'Anita Gupta (Chandigarh)', 'Meera Bai (Varanasi)', 'Gopal Das (Jaipur)',
      'Deepak Sen (Noida)', 'Kiran Jha (Ranchi)', 'Riya Roy (Delhi)'
    ];

    const messages = [
      "Quality looking incredibly soft, direct buying from weaver shop is lovely",
      "Just ordered, custom embroidery details look neat!",
      "Does this fit standard size 38? Sizing AI validated it well",
      "Can we return this under the 7-day Escrow Payment holding?",
      "Very beautiful color, perfect design for upcoming function",
      "Blue verification badge verified, this merchant makes premium weaves",
      "Is cash on delivery available? Ordering Jaipur Heritage item now!",
      "Fastest dispatch from surat hub. Waiting for my courier parcel!"
    ];

    const iconsToBurst = ['❤️', '🔥', '🙌', '🤩', '🎯', '✨', '👏', '💖'];

    const trafficTimer = setInterval(() => {
      // 1. Dynamic Bot Commentary Entry
      const randomBuyer = names[Math.floor(Math.random() * names.length)];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setChatMessages(prev => [...prev.slice(-15), `${randomBuyer.split(' ')[0]}: ${randomMsg}`]);

      // 2. Rising Flutter Bubble Burst
      const popCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < popCount; i++) {
        setTimeout(() => {
          triggerReactionBubble(iconsToBurst[Math.floor(Math.random() * iconsToBurst.length)]);
        }, i * 300);
      }

      // 3. Automated Order Checkout Simulator
      if (Math.random() > 0.45) {
        const generatedOrderId = `ORD-${Math.floor(Math.random() * 800) + 150}`;
        const handleBot = `@${randomBuyer.split(' ')[0].toLowerCase()}_${Math.floor(Math.random() * 900 + 10)}`;
        const activeReel = reels[activeIdx];

        const newSimulatedOrder = {
          id: generatedOrderId,
          buyer: handleBot,
          item: activeReel.pinnedProductName,
          status: 'Express Dispatch Assigned' as any,
          timestamp: 'Just Now'
        };

        // Add to order dispatch timeline log
        setSimulatedOrders(prev => [newSimulatedOrder, ...prev.slice(0, 4)]);

        // Trigger autonomous delivery boy escalation workflow if none is currently active
        startDeliveryEscalationFlow(generatedOrderId, handleBot, activeReel.pinnedProductName, activeReel.pinnedProductPrice);

        // Spawn a Floating Live Event Alert inside stream player
        setLastLiveSaleNotification({
          buyer: randomBuyer,
          item: activeReel.pinnedProductName,
          price: activeReel.pinnedProductPrice
        });

        // Auto collapse notification card after a few seconds
        setTimeout(() => {
          setLastLiveSaleNotification(null);
        }, 4000);

        // Reduce temporary item count
        setItemsLeft(l => Math.max(2, l - 1));
      }

    }, 8000); // Generates lively customer activity every 8 seconds

    return () => clearInterval(trafficTimer);
  }, [isAutoTrafficActive, activeIdx, reels, activeEscalation]);

  // DELIVERY AGENT ESCALATION COUNTDOWN (5 mins simulated tracker)
  useEffect(() => {
    if (!activeEscalation) return;
    if (activeEscalation.status !== 'pending_agent') return;

    const timer = setInterval(() => {
      setActiveEscalation(prev => {
        if (!prev) return null;
        if (prev.secondsRemaining <= 1) {
          clearInterval(timer);
          return {
            ...prev,
            status: 'escalating_partner',
            secondsRemaining: 0,
            logs: [
              ...prev.logs,
              `[${new Date().toLocaleTimeString()}] ⚠️ 5-MINUTE TIMEOUT LIMIT REACHED: Internal Courier (Rohan Kumar) was inactive or unresponsive.`,
              `[${new Date().toLocaleTimeString()}] ⚡ CASCADE DISPATCH PROTOCOL: Bypassing internal rider. Request being multi-broadcasted to secondary partner fleet...`
            ]
          };
        }
        return {
          ...prev,
          secondsRemaining: prev.secondsRemaining - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeEscalation]);

  // SECONDARY PARTNER AUTO CLAIM SIMULATION
  useEffect(() => {
    if (!activeEscalation) return;
    if (activeEscalation.status !== 'escalating_partner') return;

    const claimTimer = setTimeout(() => {
      const backupPool: Array<'Shadowfax Courier' | 'BlueDart Air' | 'Dunzo Delivery Fast'> = [
        'Shadowfax Courier',
        'BlueDart Air',
        'Dunzo Delivery Fast'
      ];
      const selected = backupPool[Math.floor(Math.random() * backupPool.length)];

      setActiveEscalation(prev => {
        if (!prev) return null;

        // Also add courier dispatched status directly into simulatedOrders table!
        const updatedDispatchedTable = [
          {
            id: prev.id,
            buyer: prev.buyer,
            item: prev.product,
            status: `${selected.split(' ')[0]} Assumed` as any,
            timestamp: "Just Now"
          },
          ...simulatedOrders.filter(o => o.id !== prev.id)
        ];
        setSimulatedOrders(updatedDispatchedTable.slice(0, 5));

        return {
          ...prev,
          status: 'accepted_partner',
          partnerName: selected,
          logs: [
            ...prev.logs,
            `[${new Date().toLocaleTimeString()}] 🟢 DISPATCH CONFIRMED: ${selected} accepted the shipment broadcast.`,
            `[${new Date().toLocaleTimeString()}] 🚚 Courier agent assigned. Fast-path routing generated. Pick-up scheduled within minutes!`
          ]
        };
      });
    }, 3500); // 3.5 seconds broadcast visualization window

    return () => clearTimeout(claimTimer);
  }, [activeEscalation?.status]);

  // Handle stream chat submissions
  const submitChat = (e: FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    setChatMessages(prev => [...prev, `You: ${newChatText.trim()}`]);
    
    // Add a reaction item when user posts a message to make stream lively!
    triggerReactionBubble('💬');
    setNewChatText('');
  };

  // Helper properties representing simulated adaptive HLS quality levels
  const getQualityProperties = () => {
    switch (networkCondition) {
      case '5G':
        return { resolution: '1080p Ultra HD', bitrate: '7.2 Mbps', buffering: '0.1s Zero-Lag', class: 'bg-emerald-500 text-white' };
      case '4G':
        return { resolution: '720p HD Balanced', bitrate: '1.8 Mbps', buffering: '0.25s Stable', class: 'bg-amber-500 text-slate-950' };
      case '3G':
        return { resolution: '365p Micro-Tube Saver', bitrate: '380 Kbps', buffering: '0.6s Compressing', class: 'bg-rose-500 text-white' };
    }
  };

  const quality = getQualityProperties();
  const currentReel = reels[activeIdx];

  const getCurrentPrice = () => {
    const basePrice = currentReel.pinnedProductPrice;
    if (isDynamicPricingActive && liveWatcherCount > 1000) {
      return Math.floor(basePrice * 0.9); // 10% auto frenzy discount
    }
    return basePrice;
  };

  // Map Hashtags to corresponding vlogs / reels to filter dynamically
  const hashtagsMap: { [key: string]: number[] } = {
    'All': [0, 1, 2, 3],
    '#EthnicFashion': [0, 1, 3],
    '#PureChanderi': [1],
    '#StreetStyle': [2],
    '#WeddingTrends': [1, 3]
  };

  const availableHashtags = ['All', '#EthnicFashion', '#PureChanderi', '#StreetStyle', '#WeddingTrends'];

  // Dynamically select target filtered reels
  const filteredReelIndices = hashtagsMap[selectedHashtag] || [0];
  const activeReelIsVisible = filteredReelIndices.includes(activeIdx);

  // If the currently active reel is filtered out, reset index to first match
  useEffect(() => {
    if (!activeReelIsVisible) {
      setActiveIdx(filteredReelIndices[0]);
    }
  }, [selectedHashtag]);

  // Spawns a floating reaction bubble animating upwards in the phone iframe
  const triggerReactionBubble = (emoji: string) => {
    reactionCounter.current += 1;
    const newReaction: FloatingReaction = {
      id: reactionCounter.current,
      emoji: emoji,
      x: Math.floor(Math.random() * 60) + 10, // random offset %
      scale: 0.8 + Math.random() * 0.5
    };
    setFloatingReactions(prev => [...prev, newReaction]);

    // Cleanup after 2.5 seconds when translation animation ends
    setTimeout(() => {
      setFloatingReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 2500);

    // Increase Likes display count occasionally
    if (emoji === '❤️' || emoji === '🔥') {
      const parts = parseFloat(currentReel.likes);
      if (!isNaN(parts)) {
        const incremented = (parts + 0.1).toFixed(1);
        setReels(reels.map((r, i) => i === activeIdx ? { ...r, likes: `${incremented}K` } : r));
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="phase-2-root">
      
      {/* INTRO DUO HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-600 block">
            Phase 2 • Premium Reels & Shopping Integration
          </span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-slate-900 mt-1">
            Reels & Live Streaming Console
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Experience our trending video-commerce player. Swipe interactive products, watch hearts flutter, and buy instantly!
          </p>
        </div>
        
        {/* Dynamic badge indicating system activity status */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-3.5 py-1.5 rounded-2xl shadow-sm text-xs font-bold font-mono tracking-tight flex items-center gap-1.5 shrink-0 self-start md:self-auto">
          <Flame className="w-4 h-4 animate-bounce" />
          <span>TRENDING LIVESTREAMING LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: Interactive Mobile Phone Frame with custom animations */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          {/* Theme Indicator above mobile frame */}
          <div className="mb-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5" />
            V-Shop Reels Sandbox (Gurgaon Segment)
          </div>

          <div className="w-[325px] h-[590px] bg-slate-950 rounded-[44px] border-[10px] border-slate-900 shadow-2xl relative overflow-hidden flex flex-col ring-4 ring-slate-800/10">
            
            {/* NOCH HEADER: Cellular Status & Battery */}
            <div className="absolute top-0 inset-x-0 h-7 bg-transparent flex items-center justify-between px-6 z-50">
              <span className="text-[10px] text-white/90 font-mono font-medium">10:45</span>
              <div className="w-18 h-4 bg-slate-900 rounded-b-2xl mx-auto flex justify-center items-center">
                <span className="w-1.5 h-1.5 bg-slate-855 rounded-full"></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-white/90 font-mono font-bold uppercase">{networkCondition}</span>
                <Wifi className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

            {/* SCREEN PORT VIEW AREA with Double Click Like and Filter Support */}
            <div 
              onClick={handleViewportClick}
              className="relative flex-1 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-between p-3 pt-9 overflow-hidden cursor-pointer selection:bg-transparent"
            >
              
              {/* REAL WEBCAM CAMERA OR SIMULATED BACKGROUND GRAPHIC */}
              {useRealWebcam ? (
                <video 
                  ref={webcamVideoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ transform: 'scaleX(-1)' }} // mirror user video for comfort
                  className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-300 ${getFilterStyle()}`}
                />
              ) : (
                <>
                  <div className={`absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#d97706_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none transition-all duration-300 ${getFilterStyle()}`} />
                  {isPlaying && (
                    <div className={`absolute inset-0 z-0 bg-gradient-to-tr from-orange-500/15 via-transparent to-rose-500/15 animate-pulse pointer-events-none transition-all duration-300 ${getFilterStyle()}`} />
                  )}
                </>
              )}

              {/* INSTAGRAM LIVE STYLE DIGITAL PHOTO FILTERS */}
              {instagramFilter === 'bollywood_gold' && (
                <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay animate-pulse z-[2] pointer-events-none" />
              )}
              {instagramFilter === 'retro_vibhag' && (
                <div className="absolute inset-0 bg-yellow-900/10 sepia z-[2] pointer-events-none" />
              )}
              {instagramFilter === 'delhi_neon' && (
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-color-burn z-[2] pointer-events-none" />
              )}
              {instagramFilter === 'aesthetic_warm' && (
                <div className="absolute inset-0 bg-rose-500/10 mix-blend-hard-light z-[2] pointer-events-none" />
              )}
              {instagramFilter === 'festive_chariot' && (
                <div className="absolute inset-0 bg-orange-500/5 mix-blend-color-dodge z-[2] pointer-events-none" />
              )}
              {instagramFilter === 'cyber_green' && (
                <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay z-[2] pointer-events-none" />
              )}
              {instagramFilter === 'surat_indigo' && (
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-hard-light z-[2] pointer-events-none" />
              )}

              {/* INSTAGRAM-STYLE ROUND STORIES TRAY (Horizontal carousel inside phone view) */}
              <div className="relative z-30 flex gap-2.5 items-center overflow-x-auto py-1 scrollbar-none border-b border-white/5 bg-slate-950/40 backdrop-blur-xs -mx-3 px-3 mb-2">
                {activeStories.map((story, sIdx) => (
                  <div 
                    key={story.id} 
                    onClick={(e) => {
                      e.stopPropagation(); // don't trigger double tap heart on story tap
                      alert(`🌸 Switching to story stream by ${story.handle}! Matching catalogs loaded.`);
                      // occasionally switch reel to match
                      if (sIdx < reels.length) {
                        setActiveIdx(sIdx);
                      }
                    }} 
                    className="flex flex-col items-center shrink-0 min-w-[50px] cursor-pointer hover:scale-105 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-full p-[2px] transition-all relative ${
                      story.liveStatus 
                        ? 'bg-gradient-to-tr from-amber-500 via-rose-550 to-purple-650' 
                        : 'bg-zinc-700'
                    }`}>
                      <div className="bg-slate-950 w-full h-full rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase">
                        {story.imgCode}
                      </div>

                      {story.liveStatus && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-extrabold bg-rose-600 text-white px-1.5 rounded-full border border-slate-950 font-mono tracking-tighter scale-90">
                          LIVE
                        </span>
                      )}
                    </div>
                    <span className="text-[7.5px] text-zinc-300 mt-1 font-sans truncate max-w-[52px] text-center">
                      {story.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>

              {/* CO-HOST SPLIT SCREEN MODE (Render secondary video block if on) */}
              <AnimatePresence>
                {coHostingMode && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "110px", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute top-26 left-4 right-4 bg-gradient-to-br from-indigo-950 to-slate-950 border border-indigo-500/30 rounded-2xl z-25 overflow-hidden p-3 flex gap-2 items-center text-white"
                  >
                    <div className="w-16 h-16 rounded-xl bg-orange-600/30 border-2 border-amber-400 flex items-center justify-center shrink-0 overflow-hidden relative">
                      <Users className="w-6 h-6 text-amber-300" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-center font-mono py-0.5">CO-HOST</div>
                    </div>
                    <div className="flex-1 space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white truncate">Nitish Rawat</span>
                        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      </div>
                      <span className="text-[9.5px] text-indigo-300 block font-mono">Audience Lead Coordinator</span>
                      <p className="text-[10px] text-slate-300 leading-snug truncate animate-pulse">"Adding 10% instant checkout voucher!"</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* REAL-TIME SALES BOT ORDER ALERT TOAST (glowing notifications) */}
              <AnimatePresence>
                {lastLiveSaleNotification && (
                  <motion.div
                    initial={{ scale: 0.8, y: -20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: -20, opacity: 0 }}
                    className="absolute top-1/3 left-4 right-4 bg-gradient-to-r from-teal-500 via-emerald-600 to-emerald-700 border border-emerald-400 p-3 rounded-2xl z-30 shadow-2xl flex items-center gap-2.5 text-white"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg shrink-0 animate-bounce">
                      🛍️
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-[8px] font-mono uppercase tracking-widest text-emerald-250 font-black">Trending Sale Confirmed!</div>
                      <p className="text-[10px] font-bold text-white truncate">
                        {lastLiveSaleNotification.buyer} bought:
                      </p>
                      <p className="text-[9.5px] font-mono text-emerald-200 truncate">
                        {lastLiveSaleNotification.item} (₹{getCurrentPrice()})
                      </p>
                    </div>
                    <span className="text-[7.5px] bg-slate-950/40 text-emerald-300 px-1.5 py-0.5 rounded font-mono shrink-0">
                      Auto-Pilot
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FLOATING TOP UTILITIES (Viewer metrics and resolution levels) */}
              <div className={`flex justify-between items-start relative z-20 transition-all ${coHostingMode ? 'mt-28' : 'mt-1'}`}>
                {/* Watchers tag */}
                <div className="bg-black/45 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1.5 border border-white/5 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[9.5px] text-white font-extrabold uppercase tracking-tight flex items-center gap-1">
                    <Users className="w-3 h-3 text-red-400" />
                    {liveWatcherCount} WATCH
                  </span>
                </div>

                {/* HLS Resolution Status indicator */}
                <div className="flex flex-col items-end gap-1 font-mono">
                  <span className={`px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider ${quality.class}`}>
                    {quality.resolution}
                  </span>
                  <div className="text-[8px] text-white/80 bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded border border-white/5">
                    Est. Delay: {quality.buffering}
                  </div>
                </div>
              </div>

              {/* DOUBLE TAP HEART POPPING ANIMATION OVERLAY */}
              <AnimatePresence>
                {doubleTapHeartActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0.5, 1.3, 1.1, 1], 
                      opacity: [0, 1, 1, 0] 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ 
                      position: 'absolute', 
                      left: doubleTapHeartPos.x - 40, 
                      top: doubleTapHeartPos.y - 40,
                      zIndex: 35 
                    }}
                    className="pointer-events-none text-rose-550 filter drop-shadow-[0_2px_10px_rgba(244,63,94,0.5)]"
                  >
                    <Heart className="w-20 h-20 fill-current text-rose-500" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* INSTAGRAM PRODUCT TAGGING COORINDATES (Interactive shopping point tags) */}
              {taggedProductsVisible && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* tag coordinates pinpoint 1 (Outfit anchor center-left) */}
                  <div 
                    style={{ left: '35%', top: '56%' }} 
                    className="absolute pointer-events-auto"
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setLiveCheckoutOpen(true);
                      }}
                      className="relative flex items-center group cursor-pointer"
                    >
                      <span className="absolute inline-flex h-6 w-6 rounded-full bg-amber-400/60 animate-ping" />
                      <span className="relative flex items-center justify-center rounded-full h-4 w-4 bg-amber-400 border border-white text-slate-950 shadow-sm">
                        <Tag className="w-2.5 h-2.5 font-bold" />
                      </span>
                      
                      {/* Interactive sliding text bubble */}
                      <span className="ml-2 bg-slate-950/85 backdrop-blur-md text-white text-[9.5px] font-extrabold whitespace-nowrap px-2 py-0.5 rounded-lg border border-white/20 shadow-md">
                        {currentReel.pinnedProductName} • ₹{currentReel.pinnedProductPrice}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* FLOATING SPARK REACTION BUBBLES PORT (Rising emojis) */}
              <div className="absolute bottom-40 right-4 w-12 h-64 pointer-events-none z-30 overflow-hidden">
                <AnimatePresence>
                  {floatingReactions.map((reaction) => (
                    <motion.div
                      key={reaction.id}
                      initial={{ y: 220, opacity: 0, x: reaction.x, scale: 0.5 }}
                      animate={{ 
                        y: -40, 
                        opacity: [0, 1, 1, 0], 
                        x: [reaction.x, reaction.x - 20, reaction.x + 20, reaction.x - 10],
                        scale: [0.5, reaction.scale, reaction.scale, 0.4]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2.2, ease: "easeOut" }}
                      className="absolute text-xl origin-bottom"
                    >
                      {reaction.emoji}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* FLOATING INTERACTIVE CONTROLS (Hearts, comments, volume) */}
              <div className="absolute right-3.5 top-1/4 flex flex-col items-center gap-2.5 z-25">
                
                {/* Heart Burst Trigger */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerReactionBubble('❤️');
                    triggerReactionBubble('🔥');
                  }}
                  className="w-9 h-9 bg-black/40 hover:bg-black/60 border border-white/10 text-white rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-md group transform hover:scale-110 active:scale-95"
                >
                  <Heart className="w-4.5 h-4.5 text-rose-500 fill-rose-500 group-hover:animate-pulse" />
                  <span className="text-[8px] font-mono leading-none mt-0.5 font-bold">{currentReel.likes}</span>
                </button>

                {/* Direct Message (DM with shop host) */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDirectMessages(!showDirectMessages);
                  }}
                  className={`w-9 h-9 border rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-md transform hover:scale-110 active:scale-95 ${
                    showDirectMessages 
                      ? 'bg-rose-500 border-rose-500 text-white' 
                      : 'bg-black/40 hover:bg-black/60 border-white/10 text-white'
                  }`}
                  title="Direct Message Seller"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span className="text-[7.5px] font-mono leading-none mt-0.5 font-bold">DM</span>
                </button>

                {/* Toggle Tagged Products */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setTaggedProductsVisible(!taggedProductsVisible);
                  }}
                  className={`w-9 h-9 border rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-md transform hover:scale-110 active:scale-95 ${
                    taggedProductsVisible 
                      ? 'bg-amber-500 border-amber-550 text-slate-950' 
                      : 'bg-black/40 hover:bg-black/60 border-white/10 text-white'
                  }`}
                  title="Toggle Pinned Tag Overlay"
                >
                  <Tag className="w-4.5 h-4.5" />
                  <span className="text-[7.5px] font-mono leading-none mt-0.5 font-bold">Tags</span>
                </button>

                {/* Fire reaction Burst */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerReactionBubble('🔥');
                    triggerReactionBubble('🤩');
                  }}
                  className="w-9 h-9 bg-black/40 hover:bg-black/60 border border-white/10 text-white rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-md transform hover:scale-110 active:scale-95"
                >
                  <Flame className="w-4.5 h-4.5 text-amber-500" />
                  <span className="text-[8px] font-mono leading-none mt-0.5 font-bold">Fire!</span>
                </button>

                {/* Play/Pause simulate toggle */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="w-8 h-8 bg-black/40 hover:bg-black/65 border border-white/5 text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
                  title={isPlaying ? "Pause Stream" : "Play Stream"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
                </button>

                {/* Mute toggle button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="w-8 h-8 bg-black/40 hover:bg-black/65 border border-white/5 text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                </button>

                {/* ROTATING MUSIC GOLD VINYL DISC */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`🎶 Sound Track in use: "${activeAudioTrack}" by Livekart! Tap switch soundtrack in right Instagram settings panel.`);
                  }}
                  className={`w-8 h-8 rounded-full border-2 border-amber-400 bg-slate-900 flex items-center justify-center cursor-pointer relative shadow-lg ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '3.5s' }}
                >
                  <Music className="w-3.5 h-3.5 text-amber-400" />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                </div>

              </div>

              {/* INSTAGRAM LIVE STYLE FLOATING COMMENTS OVERLAY (Trending Live Cascading comments) */}
              <div className="absolute bottom-[165px] left-3 right-12 max-h-[140px] overflow-hidden pointer-events-none flex flex-col justify-end gap-1.5 z-25">
                <div className="text-[7.5px] font-mono uppercase bg-rose-500/20 text-rose-350 tracking-wider font-extrabold w-fit px-1.5 py-0.5 rounded border border-rose-500/30 animate-pulse">
                  ⚡ 7-Day Escrow Churn Public Flow
                </div>
                {chatMessages.slice(-3).map((msg, mIdx) => {
                  const parts = msg.split(': ');
                  const sender = parts[0] || 'Guest';
                  const textContent = parts.slice(1).join(': ') || '';
                  
                  // Allocating beautiful theme sentiment tags dynamically
                  let commentIcon = "💬";
                  let tagBg = "bg-slate-950/75";
                  let borderCol = "border-white/5";
                  if (textContent.includes("buy") || textContent.includes("bought") || textContent.includes("order") || textContent.includes("Medium") || textContent.includes("block")) {
                    commentIcon = "🛒 Order Slip";
                    tagBg = "bg-gradient-to-r from-emerald-950/85 to-indigo-950/85";
                    borderCol = "border-emerald-500/30 animate-pulse";
                  } else if (textContent.includes("Quality") || textContent.includes("sundar") || textContent.includes("mast") || textContent.includes("fabric") || textContent.includes("saree") || textContent.includes("Karigari")) {
                    commentIcon = "❤️ Handloom Appraised";
                    tagBg = "bg-gradient-to-r from-amber-950/85 to-rose-950/85";
                    borderCol = "border-amber-500/30";
                  } else if (textContent.includes("Escrow") || textContent.includes("safe") || textContent.includes("hold") || textContent.includes("cash")) {
                    commentIcon = "🛡️ Escrow Trust";
                    tagBg = "bg-gradient-to-r from-teal-950/85 to-indigo-950/85";
                    borderCol = "border-teal-500/30";
                  } else if (textContent.includes("filter") || textContent.includes("Gold") || textContent.includes("reflection") || textContent.includes("neon")) {
                    commentIcon = "✨ Spark Filter";
                    tagBg = "bg-gradient-to-r from-purple-950/85 to-slate-950/85";
                    borderCol = "border-purple-550/30";
                  }

                  return (
                    <motion.div 
                      key={mIdx}
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`text-[9.5px] leading-snug px-2 py-1 rounded-xl border max-w-full ${tagBg} ${borderCol} text-white flex flex-col gap-0.5 shadow-sm`}
                    >
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="font-extrabold text-amber-300 font-mono truncate max-w-[70px]">{sender}</span>
                        <span className="text-[7.5px] uppercase font-bold text-white/70 bg-white/10 px-1 py-0.2 rounded shrink-0 scale-90">
                          {commentIcon}
                        </span>
                      </div>
                      <p className="text-zinc-200 line-clamp-2">{textContent}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* REELS DETAILS & PINNED PRODUCT WIDGET overlay */}
              <div className="mt-auto space-y-2.5 relative z-20">
                
                {/* Creator Header and video description */}
                <div className="space-y-1 text-left bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 rounded-xl">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white truncate max-w-[170px]">
                      {currentReel.sellerName}
                    </h4>
                    {currentReel.verifyStatus !== 'None' && (
                      <span className="text-[8px] bg-sky-500/15 border border-sky-500/30 text-sky-400 px-1 rounded font-mono font-bold uppercase">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[10.5px] text-slate-200 leading-normal line-clamp-2">
                    {currentReel.videoUrl}
                  </p>
                </div>

                {/* LIVE SCARCITY / FLASH SALE COMPONENT widget */}
                <div className="bg-slate-900 border border-amber-500/50 rounded-2xl p-2.5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1 bg-amber-500 flex items-center gap-1 rounded-bl-xl text-slate-950 text-[8.5px] font-mono font-bold uppercase tracking-wider">
                    <Clock className="w-2.5 h-2.5 animate-spin" />
                    SALE ENDS IN {timeLeft.minutes}:{(timeLeft.seconds < 10 ? '0' : '') + timeLeft.seconds}
                  </div>

                  <div className="flex justify-between items-center pr-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-semibold text-amber-400 uppercase tracking-widest font-mono">Special Pinned Sale:</span>
                        <span className="text-[8.5px] bg-amber-400/10 text-amber-400 px-1 rounded animate-pulse">{itemsLeft} Left!</span>
                      </div>
                      <h5 className="text-[11px] font-bold text-white truncate max-w-[150px]">{currentReel.pinnedProductName}</h5>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-extrabold text-amber-400">₹{getCurrentPrice()}</span>
                        {getCurrentPrice() < currentReel.pinnedProductPrice ? (
                          <span className="text-[10px] text-emerald-400 font-extrabold animate-pulse">₹{currentReel.pinnedProductPrice} (Frenzy active!)</span>
                        ) : (
                          <span className="text-[10px] text-zinc-400 line-through">₹{currentReel.pinnedProductOriginalPrice}</span>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => setLiveCheckoutOpen(true)}
                      className="px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 rounded-xl text-[10px] font-extrabold shadow hover:from-amber-400 hover:to-orange-400 transition-all cursor-pointer flex items-center gap-1 uppercase"
                    >
                      Buy
                    </button>
                  </div>

                  {/* Progress bar representing decreasing flash inventory */}
                  <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-550 to-orange-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${(itemsLeft / 12) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Showroom browser trigger button */}
                <button 
                  onClick={() => setSwipeUpOpen(true)}
                  className="w-full py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-center text-[10.5px] font-bold text-white transition-all flex items-center justify-center gap-1 border border-white/10 cursor-pointer"
                  id="showroom-swipe-trigger"
                >
                  <ChevronUp className="w-3.5 h-3.5 animate-bounce text-amber-400" />
                  Swipe Up to View Boutique Catalogue
                </button>

              </div>

              {/* OVERLAY PANEL 1: SWIPE UP BOUTIQUE CATALOGUE */}
              {swipeUpOpen && (
                <div className="absolute inset-x-0 bottom-0 top-1/3 bg-white rounded-t-3xl z-40 transition-all shadow-2xl flex flex-col justify-between p-4 border-t border-amber-500/20">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2.5 border-b border-rose-100">
                      <div>
                        <h4 className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">Live Showroom Catalog</h4>
                        <h3 className="text-xs font-bold text-slate-800">Explore Seller’s Showcase</h3>
                      </div>
                      <button 
                        onClick={() => setSwipeUpOpen(false)}
                        className="text-[10px] font-extrabold text-slate-600 hover:text-slate-900 bg-slate-105 p-1 px-2.5 rounded-lg border cursor-pointer"
                      >
                        Minimize
                      </button>
                    </div>

                    {/* Showroom items list */}
                    <div className="space-y-2 overflow-y-auto max-h-56">
                      <div className="flex gap-2 p-2 border border-slate-150 rounded-xl hover:bg-slate-50 relative overflow-hidden">
                        <div className="absolute right-0 top-0 bg-orange-100 text-orange-850 font-mono text-[8.5px] font-extrabold px-1 rounded-bl">HOT</div>
                        <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 border border-amber-200">
                          ID
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-[11px] font-bold text-slate-800 truncate">Aura Handloom Cotton Kurta</h5>
                          <p className="text-[10px] text-amber-600 font-extrabold">₹1,499</p>
                        </div>
                        <button 
                          onClick={() => {
                            setLiveCheckoutOpen(true);
                            setSwipeUpOpen(false);
                          }}
                          className="self-center px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[9.5px] font-extrabold cursor-pointer"
                        >
                          Buy
                        </button>
                      </div>

                      <div className="flex gap-2 p-2 border border-slate-150 rounded-xl hover:bg-slate-50">
                        <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 border border-purple-200">
                          CH
                        </div>
                        <div className="flex-1 min-w-0 font-medium">
                          <h5 className="text-[11px] font-bold text-slate-800 truncate">Royal Gold Chanderi Silk Saree</h5>
                          <p className="text-[10px] text-amber-600 font-extrabold">₹4,200</p>
                        </div>
                        <button 
                          onClick={() => {
                            setLiveCheckoutOpen(true);
                            setSwipeUpOpen(false);
                          }}
                          className="self-center px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[9.5px] font-extrabold cursor-pointer"
                        >
                          Buy
                        </button>
                      </div>

                      <div className="flex gap-2 p-2 border border-slate-150 rounded-xl hover:bg-slate-50">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 border border-indigo-200">
                          JP
                        </div>
                        <div className="flex-grow min-w-0">
                          <h5 className="text-[11px] font-bold text-slate-800 truncate">Jaipur Red Crimson Lehenga</h5>
                          <p className="text-[10px] text-amber-600 font-extrabold">₹8,500</p>
                        </div>
                        <button 
                          onClick={() => {
                            setLiveCheckoutOpen(true);
                            setSwipeUpOpen(false);
                          }}
                          className="self-center px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[9.5px] font-extrabold cursor-pointer"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-[9.5px] text-slate-400 text-center uppercase tracking-wider py-1 font-mono">Swipe down to resume video playback</p>
                </div>
              )}

              {/* OVERLAY PANEL 2: RECENT PURCHASE CHECKOUT DIALOGUE */}
              {liveCheckoutOpen && (
                <div className="absolute inset-x-4 bottom-14 bg-slate-900/95 backdrop-blur-md border border-amber-500/40 p-4 rounded-2xl z-50 shadow-2xl space-y-3 text-white">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[9.5px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 animate-pulse" />
                      Checkout Instant Secure Pay
                    </h4>
                    <button 
                      onClick={() => setLiveCheckoutOpen(false)}
                      className="text-white hover:text-amber-500 text-xs font-bold opacity-80 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-bold text-white">{currentReel.pinnedProductName}</h5>
                    <div className="text-[10px] text-slate-400 mt-0.5">Direct merchant-to-buyer escrow setup</div>
                    <div className="text-sm font-bold text-amber-400 mt-1">
                      ₹{getCurrentPrice()}
                      {getCurrentPrice() < currentReel.pinnedProductPrice && (
                        <span className="ml-2 px-1.5 py-0.5 bg-rose-500 text-white text-[8.5px] rounded uppercase font-black tracking-widest animate-pulse">
                          Autopilot Discount Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Size chosen with visual click check */}
                  <div className="flex gap-1.5">
                    {['S', 'M', 'L', 'XL'].map((sz) => (
                      <button 
                        key={sz}
                        className={`flex-1 py-1 rounded-lg font-mono text-[10px] border cursor-pointer ${
                          sz === 'M' ? 'border-amber-400 bg-amber-400/20 text-amber-300' : 'border-slate-800 bg-slate-800 text-slate-350 hover:border-amber-500'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                   <button 
                    onClick={async () => {
                      const yourOrderId = `ORD-YOU-${Math.floor(Math.random() * 800) + 200}`;
                      const productPrice = getCurrentPrice();
                      
                      // 1. Add order to internal list
                      const newOrder = {
                        id: yourOrderId,
                        buyer: "@you_self_checkout",
                        item: currentReel.pinnedProductName,
                        status: "Awaiting Dispatcher" as any,
                        timestamp: "Just Now"
                      };
                      setSimulatedOrders(prev => [newOrder, ...prev.slice(0, 4)]);

                      // Post to backend database history
                      try {
                        await fetch("/api/orders", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            id: yourOrderId,
                            productName: currentReel.pinnedProductName,
                            amount: productPrice,
                            sellerName: currentReel.sellerName,
                            status: "Awaiting Rider (Rohan Kumar)",
                            escrowStatus: "In Escrow",
                            whatsappTriggered: true
                          })
                        });

                        // Create administrative behavior insight alert
                        await fetch("/api/admin/notices", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            type: "success",
                            title: `Secure Escrow Checkout: ₹${productPrice}`,
                            message: `User completed purchase of ${currentReel.pinnedProductName} from ${currentReel.sellerName}. Delivery boy Rohan notified.`
                          })
                        });
                      } catch (err) {
                        console.warn("Express backend sync offline. Normalizing offline simulation mode.");
                      }

                      // 2. Trigger the escalation system simulator!
                      startDeliveryEscalationFlow(yourOrderId, "@you_self_checkout", currentReel.pinnedProductName, productPrice);

                      // 3. UI feedback
                      triggerReactionBubble('🎉');
                      triggerReactionBubble('🚚');
                      setLiveCheckoutOpen(false);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black rounded-xl text-xs hover:from-amber-400 hover:to-orange-400 transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    Confirm Order Payment
                  </button>
                </div>
              )}

              {/* OVERLAY PANEL 3: REAL-TIME CUSTOMER DIRECT CHATBOX ON SCREEN */}
              {showDirectMessages && (
                <div className="absolute inset-x-4 bottom-14 bg-slate-950/95 backdrop-blur-md border border-rose-500/40 p-3.5 rounded-2xl z-50 shadow-2xl space-y-3.5 text-white flex flex-col h-72">
                  <div className="flex justify-between items-center shrink-0 border-b border-white/15 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <h4 className="text-[10px] font-bold text-rose-450 uppercase tracking-widest">
                        DM with {currentReel.sellerName}
                      </h4>
                    </div>
                    <button 
                      onClick={() => setShowDirectMessages(false)}
                      className="text-white hover:text-rose-500 text-xs font-bold opacity-80 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Messages Bubble wrapper */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 p-1 font-sans text-[10.5px]">
                    {dmHistory.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col max-w-[85%] ${
                          item.sender === 'you' ? 'ml-auto items-end' : 'mr-auto items-start'
                        }`}
                      >
                        <span className="text-[7.5px] text-zinc-400 mb-0.5">
                          {item.sender === 'you' ? 'You' : currentReel.sellerHandle}
                        </span>
                        <div className={`p-2 rounded-xl text-xs font-medium leading-relaxed ${
                          item.sender === 'you' 
                            ? 'bg-rose-600 text-white rounded-tr-none' 
                            : 'bg-zinc-800 text-zinc-100 rounded-tl-none'
                        }`}>
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input form */}
                  <form onSubmit={handleSendDm} className="flex gap-2 shrink-0 pt-2 border-t border-white/15">
                    <input 
                      type="text"
                      value={dmInput}
                      onChange={(e) => setDmInput(e.target.value)}
                      placeholder="Ask sizes, cash on delivery, custom prints..."
                      className="flex-1 bg-zinc-90 w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-[10.5px] text-white focus:outline-none focus:border-rose-500"
                    />
                    <button 
                      type="submit"
                      className="px-3 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded-xl cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Simulation interactive controls & explanation */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* V-SHOP SMART AUTOPILOT & ENGAGEMENT COMMAND DECK (स्वयं-चालित ऑटोपायलट) */}
          <div className="bg-slate-900 text-white rounded-3xl border border-amber-500/40 p-6 shadow-xl space-y-5 relative overflow-hidden" id="vshop-autopilot-deck">
            <div className="absolute top-0 right-0 p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-bl-2xl text-slate-950 text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-1 select-none">
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              INTELLIGENT SELF-DRIVING
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/35 text-amber-400 rounded-2xl flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-400 block font-sans">Self-Running Shopping Engine</span>
                <h3 className="font-semibold text-slate-100 text-base">V-Shop Autonomous Auto-Pilot</h3>
              </div>
            </div>

            <p className="text-xs text-slate-350 leading-relaxed font-sans">
              यह सिस्टम लाइव-शॉपिंग और वीडियो को स्वयं संचालित (fully automated) कर देता है। Toggle these autopilot agents to let your live shopping channel generate sales and reactions automatically without manual intervention!
            </p>

            {/* TOGGLE GRIDS */}
            <div className="space-y-3.5 bg-slate-950/60 p-4 rounded-xl border border-white/5">
              
              {/* Toggle 1: Auto-Swipe videos */}
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-100 block">Auto-Swipe Channel Loops (स्वचालित स्वाइप)</span>
                  <span className="text-[9.5px] text-slate-400 block leading-tight">Swipes to the next video feed automatically every 14 seconds to showcase dynamic product catalogs.</span>
                </div>
                <button
                  onClick={() => {
                    setIsAutoSwipeActive(!isAutoSwipeActive);
                    triggerReactionBubble('🔄');
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isAutoSwipeActive ? 'bg-amber-500' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isAutoSwipeActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Progress visual countdown for auto-swipe */}
              {isAutoSwipeActive && (
                <div className="space-y-1 pt-1.5 border-t border-white/10">
                  <span className="text-[8.5px] text-amber-400 font-mono flex justify-between uppercase">
                    <span>Active Channel loop rolling</span>
                    <span>14s transition</span>
                  </span>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <motion.div
                      key={activeIdx}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 14, ease: "linear" }}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-full"
                    />
                  </div>
                </div>
              )}

              {/* Toggle 2: AI Customer Bots */}
              <div className="flex items-center justify-between gap-4 pt-3.5 border-t border-white/15">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-100 block">Simulate Customer Traffic Bots (कृत्रिम प्रतिक्रिया)</span>
                  <span className="text-[9.5px] text-slate-400 block leading-tight">Spawns simulated buyers who post live feedback, write comments, fly reactions, and checkout orders automatically.</span>
                </div>
                <button
                  onClick={() => setIsAutoTrafficActive(!isAutoTrafficActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isAutoTrafficActive ? 'bg-amber-500' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isAutoTrafficActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3: Intel Dynamic Pricing discount block */}
              <div className="flex items-center justify-between gap-4 pt-3.5 border-t border-white/15">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-100 block">Smart Price AI Control (डायनेमिक प्राइसिंग)</span>
                  <span className="text-[9.5px] text-slate-400 block leading-tight">Applies a 10% instant checkout Frenzy Discount automatically when audience metrics exceed 1000 viewers.</span>
                </div>
                <button
                  onClick={() => setIsDynamicPricingActive(!isDynamicPricingActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isDynamicPricingActive ? 'bg-amber-500' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isDynamicPricingActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>

            {/* INTERACTIVE MERCHANT NARRATOR SCRIPT SCREENPLAY */}
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/15 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-wider block">🗣️ Merchant Script Teleprompter Voice Assist</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setActivePitchLanguage('hindi')}
                    className={`px-2 py-0.5 text-[8.5px] font-bold rounded cursor-pointer ${activePitchLanguage === 'hindi' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-zinc-800 text-slate-400 hover:text-white'}`}
                  >
                    Hindi
                  </button>
                  <button 
                    onClick={() => setActivePitchLanguage('english')}
                    className={`px-2 py-0.5 text-[8.5px] font-bold rounded cursor-pointer ${activePitchLanguage === 'english' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-zinc-800 text-slate-400 hover:text-white'}`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Dynamic script content depending on active channel and language chosen */}
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                <p className="text-[11px] text-zinc-300 leading-relaxed font-sans font-medium">
                  {activePitchLanguage === 'hindi' ? (
                    activeIdx === 0 ? (
                      `"नमस्ते दोस्तों! Aura Designer बुटीक में आपका स्वागत है। इस उत्तम ऑर्गेनिक कॉटन चिकनकारी कुर्ती को आज सीधे बुनकर से खरीदें। लाइवकार्ट ग्रुप प्राइजिंग के साथ इसपे ₹${getCurrentPrice()} का विशेष डिस्काउंट और सुरक्षित एस्क्रो ट्रस्ट सुरक्षा लागू है!"`
                    ) : activeIdx === 1 ? (
                      `"राम-राम जी! चंदेरी बुनकरों की शुद्ध सिल्क साड़ियों की लाइव डेमोंस्ट्रेशन यहाँ देखें। रीयल ज़री वर्क की शुद्ध चमक आपके सामने है। एस्क्रो प्रोटेक्शन के अंदर, आपका भुगतान ७ दिनों तक एडमिन तिजोरी में सेफ रहेगा। अभी आर्डर कीजिये ₹${getCurrentPrice()} में!"`
                    ) : activeIdx === 2 ? (
                      `"हेलो एवरीवन! कॉलेज और कैजुअल व्लॉग्स के लिए उपयुक्त ये ढीले और ट्रेंडी कार्गो ड्रेप्स देख रहे हैं आप। 5G बफरिंग सेविंग तकनीक के कारण पैची सिग्नल में भी लाइव स्ट्रीम जारी रहेगा। टैप 'Buy' नाउ!"`
                    ) : (
                      `"नमस्कार! जयपुर के जोहरी बाज़ार से ये विशुद्ध लखनवी और कांच-कशीदाकारी से सज्जित खूबसूरत ब्राइडल लहंगे केवल आज स्पेशल फ़्लैश सेल में हैं। stock समाप्ति से पहले UPI द्वारा पेमेंट करें!"`
                    )
                  ) : (
                    activeIdx === 0 ? (
                      `"Hello lovely shoppers! Welcome to Aura Premium Styles. Today's feature highlight is our handmade floral block print Indigo Chikankari Kurti. We are locking this masterpiece under live safe escrow for only ₹${getCurrentPrice()}!"`
                    ) : activeIdx === 1 ? (
                      `"Namaskaram! Have an eye on authentic silk? This pure Chanderi saree comes with intricate zari thread buttis. Purchase live to receive absolute priority dispatcher tracking via local courier services!"`
                    ) : activeIdx === 2 ? (
                      `"Hey street lovers! Slide into premium comfort vintage denim collection. Tested across patchy network bands with low bitrate optimization, so your viewers never lag behind the auction. Claim at ₹${getCurrentPrice()} now!"`
                    ) : (
                      `"Welcome families! This Heritage Jaipur crimson piece features real glass and thread ornamentations. Tap tags to see AI custom sizes recommendations and check out securely!"`
                    )
                  )}
                </p>
              </div>

              {/* Synthesis Voice Test Soundwave Simulator Button */}
              <div className="flex justify-between items-center pt-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsVocalScriptVoiceActive(!isVocalScriptVoiceActive);
                    triggerReactionBubble('🎙️');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[9.5px] font-extrabold flex items-center gap-1 cursor-pointer transition-all ${
                    isVocalScriptVoiceActive 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white animate-pulse' 
                      : 'bg-zinc-800 hover:bg-zinc-700 text-slate-300'
                  }`}
                >
                  {isVocalScriptVoiceActive ? "⏹️ Stop Speech Simulation" : "🎙️ Play Voice Pitch Assist"}
                </button>

                {isVocalScriptVoiceActive && (
                  <div className="flex gap-1 items-center shrink-0 select-none">
                    <span className="text-[8px] font-mono text-pink-400 font-bold uppercase animate-pulse">Voice Synthesizer:</span>
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-2.5 bg-rose-500 animate-[bounce_0.6s_infinite_100ms]" />
                      <span className="w-0.5 h-3.5 bg-rose-400 animate-[bounce_0.6s_infinite_300ms]" />
                      <span className="w-0.5 h-1.5 bg-rose-500 animate-[bounce_0.6s_infinite_500ms]" />
                      <span className="w-0.5 h-3 bg-pink-500 animate-[bounce_0.6s_infinite_200ms]" />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* AUTONOMOUS 5-MIN COURIER ESCALATION TERMINAL (५ मिनट डेलिवरी एस्केलेशन) */}
            <div className="bg-slate-950/85 p-4 rounded-xl border border-amber-500/20 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-rose-400 block">
                    ⚡ 5-Min Partner Auto-Escalation Sim (ऑटोपायलट डेलिवरी एस्केलेशन)
                  </span>
                </div>
                <span className="text-[8.5px] bg-amber-500/10 text-amber-300 border border-amber-550/30 px-1.5 py-0.5 rounded font-mono uppercase">
                  V-Shop AI Routing Active
                </span>
              </div>

              {!activeEscalation ? (
                <div className="text-center py-4 bg-slate-900/40 rounded-xl border border-white/5 space-y-2">
                  <span className="text-2xl block animate-bounce">📦</span>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed px-4">
                    <strong>कोई सक्रिय आर्डर या एस्केलेशन पेंडिंग नहीं है।</strong> <br />
                    Wait for dynamic traffic to place orders, or tap index preview products to watch the simulated 5-minute autonomous courier reassignment!
                  </p>
                  <button
                    onClick={async () => {
                      const generatedOrderId = `ORD-TEST-${Math.floor(Math.random() * 800) + 100}`;
                      const selectedBuyer = "@quick_test_buyer";
                      const activeReel = reels[activeIdx];
                      const newTestOrder = {
                        id: generatedOrderId,
                        buyer: selectedBuyer,
                        item: activeReel.pinnedProductName,
                        status: "Awaiting Rider" as any,
                        timestamp: "Just Now"
                      };
                      setSimulatedOrders(prev => [newTestOrder, ...prev.slice(0, 4)]);

                      // Post to backend database history
                      try {
                        await fetch("/api/orders", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            id: generatedOrderId,
                            productName: activeReel.pinnedProductName,
                            amount: getCurrentPrice(),
                            sellerName: activeReel.sellerName,
                            status: "Awaiting Rider (Rohan Kumar)",
                            escrowStatus: "In Escrow",
                            whatsappTriggered: true
                          })
                        });

                        // Create administrative behavior insight alert
                        await fetch("/api/admin/notices", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            type: "info",
                            title: `Courier escalation triggered: ${generatedOrderId}`,
                            message: `Rohan Kumar assigned for delivery of ${activeReel.pinnedProductName} for partner ${activeReel.sellerName}. Timer running down.`
                          })
                        });
                      } catch (err) {
                        console.warn("Express backend sync offline. Normalizing offline simulation mode.");
                      }

                      startDeliveryEscalationFlow(generatedOrderId, selectedBuyer, activeReel.pinnedProductName, getCurrentPrice());
                      triggerReactionBubble('🚀');
                    }}
                    className="mt-2 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans text-[10px] font-black rounded-lg cursor-pointer transition-all uppercase tracking-wider"
                  >
                    ⚡ Test Auto-Escalation Sim (अभी टेस्ट करें)
                  </button>
                </div>
              ) : (
                <div className="space-y-3 font-sans">
                  {/* Active Escalation Header details */}
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-300 font-mono">
                        Active Order ID: <strong className="text-amber-400">{activeEscalation.id}</strong>
                      </span>
                      <span className="text-slate-400 font-mono">{activeEscalation.buyer}</span>
                    </div>
                    <div className="text-[9.5px] text-zinc-400 leading-tight">
                      Product: <strong className="text-white">{activeEscalation.product}</strong> (₹{activeEscalation.price})
                    </div>
                  </div>

                  {/* Rider Assignment Alert Stage */}
                  <div className="bg-slate-900 p-3 rounded-xl border border-rose-500/20 space-y-2.5">
                    
                    {/* State 1: Awaiting internal boy and counts down */}
                    {activeEscalation.status === 'pending_agent' && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-100 block">
                            👦 Rider Assigned: <strong className="text-amber-400 font-black">Rohan Kumar (Internal)</strong>
                          </span>
                          <span className="text-[10px] text-rose-450 font-black font-mono flex items-center gap-1">
                            ⏰ Auto-Reassigned in: {activeEscalation.secondsRemaining}s (simulating 5m)
                          </span>
                        </div>

                        {/* Progress meter */}
                        <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${(activeEscalation.secondsRemaining / 15) * 100}%` }}
                            className="bg-rose-500 h-full transition-all duration-1000"
                          />
                        </div>

                        {/* Indian vernacular helper advice */}
                        <p className="text-[9.5px] text-slate-400 leading-relaxed font-sans italic pt-0.5">
                          "अगर रोहन 5 मिनट (सिम्युलेटेड १५ सेकंड) में पिकअप एग्री नहीं करेगा या मना (Decline) करेगा, तो यह आर्डर आटोमेटिक Shadowfax/Dunzo को चला जायेगा।"
                        </p>

                        {/* Control buttons play roles */}
                        <div className="flex gap-2 pt-1 border-t border-white/5">
                          <button
                            onClick={handleRohanAccept}
                            className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[9.5px] rounded-lg transition-all cursor-pointer"
                          >
                            Accept Pickup (स्वीकार करें)
                          </button>
                          <button
                            onClick={handleRohanDecline}
                            className="flex-1 py-1 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-[9.5px] rounded-lg transition-all cursor-pointer"
                          >
                            Decline Pickup (मना करें)
                          </button>
                        </div>
                      </div>
                    )}

                    {/* State 2: Rohan Kumar accepted */}
                    {activeEscalation.status === 'accepted_rohan' && (
                      <div className="space-y-1 text-center py-2">
                        <span className="text-2xl">🟢</span>
                        <h4 className="text-[10.5px] font-bold text-emerald-400">Rohan Kumar Accepted!</h4>
                        <p className="text-[9.5px] text-slate-400">Rohan is navigating to regional weavers store point for packaging & handover.</p>
                        <button
                          onClick={() => setActiveEscalation(null)}
                          className="mt-2 px-2.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[8.5px] rounded text-slate-300 font-bold cursor-pointer"
                        >
                          Clear Screen
                        </button>
                      </div>
                    )}

                    {/* State 3: Broadcasting to secondary fleet */}
                    {activeEscalation.status === 'escalating_partner' && (
                      <div className="space-y-2 text-center py-2">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500 text-rose-500 animate-spin">
                          📡
                        </div>
                        <h4 className="text-[10.5px] font-black text-rose-450 uppercase tracking-widest animate-pulse">
                          Cascading Broadcasters Active!
                        </h4>
                        <p className="text-[9.5px] text-slate-300 px-3">
                          Rohan was inactive or declined. Pinging backup courier partners automatically... (5 minute threshold bypassed)
                        </p>
                        <div className="flex justify-center gap-2 items-center text-[8.5px] font-mono text-amber-400 pt-1">
                          <span className="px-1 py-0.5 bg-slate-900 border border-white/5 rounded">Dunzo</span>
                          <span>•</span>
                          <span className="px-1 py-0.5 bg-slate-900 border border-white/5 rounded">Shadowfax</span>
                          <span>•</span>
                          <span className="px-1 py-0.5 bg-slate-900 border border-white/5 rounded">BlueDart</span>
                        </div>
                      </div>
                    )}

                    {/* State 4: Backup partner accepted */}
                    {activeEscalation.status === 'accepted_partner' && (
                      <div className="space-y-1.5 text-center py-2">
                        <span className="text-xl">🚀</span>
                        <h4 className="text-[10.5px] font-extrabold text-emerald-400 leading-tight">
                          Reassigned to Backup Partner: <br/>
                          <span className="text-amber-400 font-mono font-black text-xs">{activeEscalation.partnerName}</span>
                        </h4>
                        <p className="text-[9.5px] text-slate-400 px-1 leading-snug">
                          <strong>सफलतापूर्वक हस्तांतरित!</strong> Rohan left/declined, so dispatch automatically rerouted to {activeEscalation.partnerName} within 5 minutes constraint.
                        </p>
                        <button
                          onClick={() => setActiveEscalation(null)}
                          className="mt-2 px-2.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[8.5px] rounded text-slate-300 font-bold cursor-pointer"
                        >
                          Close Simulator Terminal
                        </button>
                      </div>
                    )}

                  </div>

                  {/* Real-time routing logger list */}
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase block">Log Events Timeline</span>
                    <div className="p-2.5 bg-black/50 border border-white/5 rounded-lg max-h-24 overflow-y-auto space-y-1 font-mono text-[8.5px]">
                      {activeEscalation.logs.map((logStr, lIdx) => (
                        <div key={lIdx} className="text-zinc-300 leading-tight">
                          {logStr}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* REAL-TIME COURIER DISPATCH MONITOR (ऑर्डर डिस्पैच लॉग) */}
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block">🚚 Smart Delivery Dispatch Hub (स्वचालित संवितरण प्रणाली)</span>
              
              <div className="border border-white/10 bg-slate-950 p-3 rounded-xl space-y-2 max-h-36 overflow-y-auto font-mono text-[9.5px]">
                {simulatedOrders.map((ord, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 font-bold">{ord.id}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-slate-305 truncate">{ord.buyer}</span>
                      </div>
                      <div className="text-[9px] text-zinc-400 truncate mt-0.5">{ord.item}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-405 border border-emerald-500/20 font-bold inline-block text-[8.5px]">
                        {ord.status}
                      </span>
                      <div className="text-[8px] text-zinc-500 mt-0.5">{ord.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* INSTAGRAM CREATOR & SPARK AR CAMERA FILTERS PANEL */}
          <div className="bg-white rounded-3xl border border-rose-150 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-rose-600 block">✨ Trending Instagram Integration</span>
                <h3 className="font-semibold text-slate-900 mt-0.5">Spark AR Glow & Video Filters</h3>
              </div>
              <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Instagram-style live overlays directly adjust colors to enhance product catalogs. Tap any filter to instantly apply it to the emulator viewport:
            </p>

            {/* REAL-TIME CAMERA TOGGLE BUTTON */}
            <div className="bg-rose-50/50 p-3 rounded-2xl border border-rose-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-rose-500/10 rounded-xl">
                  <Video className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <span className="text-[11.5px] font-bold text-slate-900 block">Use Real Camera / Webcam</span>
                  <span className="text-[9px] text-slate-500 block">Applies Spark AR filters directly to your live camera feed</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUseRealWebcam(!useRealWebcam)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase transition-all tracking-wider cursor-pointer ${
                  useRealWebcam 
                    ? 'bg-rose-600 text-white shadow-md scale-95' 
                    : 'bg-rose-100/70 text-rose-800 hover:bg-rose-105'
                }`}
              >
                {useRealWebcam ? "Active 🟢" : "Activate 📷"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'none', label: 'None/Raw 📷', style: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800' },
                { id: 'bollywood_gold', label: 'Bollywood Gold 🌟', style: 'bg-amber-100/60 hover:bg-amber-100 border-amber-300 text-amber-900' },
                { id: 'retro_vibhag', label: 'Chic Vintage 🎞️', style: 'bg-amber-50 hover:bg-amber-100/80 border-amber-250 text-amber-900' },
                { id: 'delhi_neon', label: 'Delhi Cyber 💙', style: 'bg-cyan-50/60 hover:bg-cyan-100 border-cyan-350 text-cyan-900' },
                { id: 'aesthetic_warm', label: 'Sunset Warm 🌅', style: 'bg-rose-100/60 hover:bg-rose-100 border-rose-350 text-rose-900' },
                { id: 'festive_chariot', label: 'Festive Gold 🪔', style: 'bg-orange-100/60 hover:bg-orange-105 border-orange-350 text-orange-900' },
                { id: 'cyber_green', label: 'Matrix Terminal 📟', style: 'bg-emerald-100/60 hover:bg-emerald-105 border-emerald-350 text-emerald-900' },
                { id: 'surat_indigo', label: 'Indigo Dye 🌾', style: 'bg-blue-100/60 hover:bg-blue-105 border-blue-350 text-blue-900' },
                { id: 'vintage_mono', label: 'Classic B&W 🎬', style: 'bg-slate-105 hover:bg-slate-110 border-slate-350 text-slate-800' }
              ].map((filt) => (
                <button
                  key={filt.id}
                  onClick={() => {
                    setInstagramFilter(filt.id as any);
                    triggerReactionBubble('✨');
                  }}
                  className={`py-2 px-1 text-[10px] font-bold border rounded-xl text-center cursor-pointer transition-all ${filt.style} ${
                    instagramFilter === filt.id ? 'ring-2 ring-rose-500 border-rose-550 scale-95 font-extrabold shadow' : ''
                  }`}
                >
                  {filt.label}
                </button>
              ))}
            </div>

            {/* SOUNDTRACK SELECTOR */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-2">Reels Audio Track Selector & Disc</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  '🔥 Original Audio • Livekart Remix Bazz',
                  '🪕 Rajasthan Folk Sitar & Beat Instrumental',
                  '🎧 Lofi Handloom Comfort Beats',
                  '🥁 Gurgaon Electro Punjabi Mix'
                ].map((track) => (
                  <button
                    key={track}
                    onClick={() => {
                      setActiveAudioTrack(track);
                      triggerReactionBubble('🎵');
                    }}
                    className={`py-2 px-3 text-left border rounded-xl cursor-pointer transition-all text-xs font-mono truncate ${
                      activeAudioTrack === track 
                        ? 'bg-gradient-to-r from-rose-550 to-pink-500 text-white border-transparent shadow' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            {/* VIRAL TIP ACTION */}
            <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-2xl flex items-start gap-2.5">
              <span className="text-lg">🔥</span>
              <p className="text-[11px] text-rose-900 leading-snug">
                <strong>Trending Hack:</strong> Double-tap directly on the live phone preview video to let hearts flutter and show engagement! Tap the <strong>"Tags"</strong> bubble to purchase pinned items.
              </p>
            </div>
          </div>

          {/* CURATED HASHTAG SELECTOR - TRENDING FILTER */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600 block">Viral Discovery Tags</span>
                <h3 className="font-semibold text-slate-900 mt-0.5">Explore Trending Hashtags</h3>
              </div>
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Users filter live videos by tapping popular hashtags. Each hashtag displays specific curated merchant streams.
            </p>

            <div className="flex flex-wrap gap-1.5">
              {availableHashtags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedHashtag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    selectedHashtag === tag 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-205'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* DUAL CO-HOST INFLUENCER EMPOWER MODULE */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600 block">Viral Engagement Booster</span>
                <h3 className="font-semibold text-slate-900 mt-0.5">Duel Co-Hosting Mode</h3>
              </div>
              <Users className="w-5 h-5 text-indigo-500" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Invite top-tier Indian handloom influencers or Nitish himself to co-host the live product stream. This boosts viewers by 2.5x and generates real-time split commission sharing.
            </p>

            <div className="flex items-center justify-between p-3.5 bg-indigo-50/40 border border-indigo-150 rounded-2xl">
              <div>
                <span className="text-xs font-extrabold text-indigo-950 block">Co-Host Influencer Mode</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Enables split-screen and live commentary.</span>
              </div>
              
              <button
                onClick={() => {
                  setCoHostingMode(!coHostingMode);
                  if(!coHostingMode) {
                    setLiveWatcherCount(prev => prev + 1500); // instant viewer boost!
                    alert("📢 Co-Host Mode enabled! Live viewer count instantly surged as Nitish Rawat joined the stream.");
                  } else {
                    setLiveWatcherCount(prev => Math.max(120, prev - 1500));
                  }
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all border ${
                  coHostingMode 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-white text-indigo-750 hover:bg-indigo-50 border-indigo-250'
                }`}
              >
                {coHostingMode ? "Disable Co-Host" : "Enable Co-Host"}
              </button>
            </div>
          </div>

          {/* STREAM QUALITY CONTROLLER */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600 block">Adaptive Bitrate Stream Engine</span>
              <h3 className="font-semibold text-slate-900 mt-0.5 font-sans">Adaptive Quality Controls (HLS)</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Automatically switches the stream's resolution depending on cellular capabilities. Helps user streams run smoothly even on patchy 3G networks in rural areas.
              </p>
            </div>

            <div className="flex gap-2">
              {(['5G', '4G', '3G'] as const).map((net) => (
                <button
                  key={net}
                  onClick={() => setNetworkCondition(net)}
                  className={`flex-1 py-1.5 border rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                    networkCondition === net 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-slate-50 text-slate-650 hover:bg-slate-100 border-slate-205'
                  }`}
                >
                  {net} Bandwidth
                </button>
              ))}
            </div>

            {/* Simulated Live Analytics Metrics */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600 font-mono">
              <div>
                <span className="text-[9.5px] uppercase text-slate-400 block font-bold">Bitrate Target</span>
                <span className="font-bold text-slate-800">{quality.bitrate}</span>
              </div>
              <div>
                <span className="text-[9.5px] uppercase text-slate-400 block font-bold">Estimated Buffering Delay</span>
                <span className="font-bold text-slate-800">{quality.buffering}</span>
              </div>
            </div>
          </div>

          {/* ACTIVE STREAM SWITCHER */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600 block font-extrabold">Active Broadcasters feed</span>
              <h3 className="font-semibold text-slate-900 mt-0.5">Switch Live Channels</h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {reels.map((reel, idx) => (
                <button 
                  key={reel.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    setSwipeUpOpen(false);
                    setLiveCheckoutOpen(false);
                    triggerReactionBubble('✨');
                  }}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    activeIdx === idx 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]' 
                      : 'bg-white hover:border-slate-350 text-slate-700 border-slate-205'
                  }`}
                >
                  <div className="text-[9.5px] font-mono opacity-80">{reel.sellerHandle}</div>
                  <h4 className="text-xs font-bold mt-1 truncate">{reel.pinnedProductName}</h4>
                  <p className="text-[10px] text-amber-500 font-bold mt-0.5">₹{reel.pinnedProductPrice}</p>
                </button>
              ))}
            </div>
          </div>

          {/* LIVE PUBLIC COMMENT FEED CHAT SOCKET */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600 block">Real-Time Interaction Socket</span>
              <h3 className="font-semibold text-slate-900 mt-0.5">Live Stream Public Comments</h3>
            </div>

            {/* NEW TRENDING COMMENT TRIGGERS (नए तरीके का कमेंट सिस्टम) */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono font-extrabold text-rose-550 block flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-rose-500" />
                ⚡ Trending Hinglish Quick Slips
              </span>
              <p className="text-[11px] text-slate-500 leading-normal">
                ये सबसे ज़्यादा पूछे जाने वाले ट्रेंडिंग प्रश्न हैं। टैप करते ही सीधा लाइव चैट वीडिओ में जुड़ जाएगा:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {trendingComments.map((slip, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => {
                      // 1. Instantly post to chat messages history
                      setChatMessages(prev => [...prev.slice(-15), `You: ${slip.text}`]);
                      
                      // 2. Increment trending counter simulation
                      setTrendingComments(prev => prev.map((item, idx) => 
                        idx === sIdx ? { ...item, count: item.count + 1 } : item
                      ));

                      // 3. Trigger dynamic reaction bursts
                      if (slip.text.includes("🛒")) {
                        triggerReactionBubble('🛒');
                        triggerReactionBubble('⭐');
                      } else if (slip.text.includes("❤️")) {
                        triggerReactionBubble('❤️');
                        triggerReactionBubble('🔥');
                      } else {
                        triggerReactionBubble('✨');
                      }
                    }}
                    className="text-[10px] bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-955 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-sans font-medium"
                  >
                    <span>{slip.text}</span>
                    <span className="text-[8.5px] font-mono bg-slate-200 px-1 py-0.2 rounded font-bold text-slate-500">
                      📶 {slip.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-3.5 space-y-2 h-44 overflow-y-auto font-mono text-xs text-slate-600">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="border-b border-slate-150 pb-1.5 flex items-start gap-1 justify-between">
                  <span className="text-slate-800">{msg}</span>
                  <span className="text-[8.5px] text-slate-400 font-bold shrink-0">just now</span>
                </div>
              ))}
            </div>

            <form onSubmit={submitChat} className="flex gap-2">
              <input 
                type="text" 
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                placeholder="Ask sizes, colors or request customization..." 
                id="live-chat-input"
                className="flex-1 px-3.5 py-1.5 border border-slate-200 bg-white rounded-xl text-xs focus:outline-none"
              />
              <button 
                type="submit" 
                className="px-4 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold flex items-center justify-center cursor-pointer"
                id="send-chat-btn"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
