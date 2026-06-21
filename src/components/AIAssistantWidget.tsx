import React, { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  Send, 
  X, 
  ShoppingBag, 
  Sparkles, 
  AlertCircle, 
  Terminal, 
  Clock, 
  CheckCircle,
  HelpCircle,
  User,
  ExternalLink,
  ChevronUp,
  Cpu,
  RefreshCw,
  Bell,
  Sliders,
  TrendingUp,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
  behaviorAnalysis?: string;
  actionDetails?: any;
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "history" | "admin_notices">("chat");
  
  // Chat States
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-welcome",
      role: "model",
      text: "नमस्ते! I am your V-Shop smart AI Co-pilot shopping helper. I can find designer sarees, handloom kurtis, sizing recommendations, or explain how our 7-Day Escrow Split security keeps your cash safe! Ask me anything.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserBehavior, setCurrentUserBehavior] = useState("Passive Explorer");
  
  // Orders & Notifications states loaded from server
  const [orders, setOrders] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync data with server
  const syncData = async () => {
    setIsRefreshing(true);
    try {
      const ordersRes = await fetch("/api/orders");
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }

      const noticesRes = await fetch("/api/admin/notices");
      if (noticesRes.ok) {
        const noticesData = await noticesRes.json();
        setNotices(noticesData);
      }
    } catch (err) {
      console.warn("Could not load full-stack fallback data from Express. Standardizing simulated state:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    syncData();
    // Refresh periodically
    const interval = setInterval(syncData, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle message send
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgText = inputText.trim();
    const newMsg: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Direct call to Express backend proxy (/api/chat)
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsgText,
          history: messages.map(m => ({ role: m.role, text: m.text })),
          context: {
            currentTab: "AI Helper",
            behavior: currentUserBehavior,
            localOrdersCount: orders.length
          }
        })
      });

      if (chatResponse.ok) {
        const data = await chatResponse.json();
        
        // Update user behavior state from model assessment
        if (data.behaviorAnalysis) {
          setCurrentUserBehavior(data.behaviorAnalysis);
        }

        // Output model answer
        const modelMsg: Message = {
          id: `ai-${Date.now()}`,
          role: "model",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          behaviorAnalysis: data.behaviorAnalysis,
          actionDetails: data.suggestedAction
        };

        setMessages(prev => [...prev, modelMsg]);

        // If admin notice action is needed, trigger POST immediately so it shows up in admin board
        if (data.adminNoticeAction && data.adminNoticeAction.needed) {
          await fetch("/api/admin/notices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: data.adminNoticeAction.type,
              title: data.adminNoticeAction.title,
              message: data.adminNoticeAction.message
            })
          });
          syncData(); // refresh notices list
        }
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      console.error(err);
      // Fallback answers locally
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `ai-err-${Date.now()}`,
          role: "model",
          text: "I am having technical connection issues returning data. Keep setting up or click below to buy your saree!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper inside chatbot to easily buy an item and add it to global/sync history
  const triggerBuyProduct = async (productDetails: any) => {
    let title = "Aura Indigo Floral Kurti";
    let price = 1499;
    let seller = "Aura Premium Styles";
    
    if (productDetails.productId === "vid-02") {
      title = "Royal Gold Silk Saree";
      price = 4200;
      seller = "Chanderi Handlooms";
    } else if (productDetails.productId === "vid-03") {
      title = "Vintage Oversized Cargo Pants";
      price = 1899;
      seller = "Street Chic Wear";
    } else if (productDetails.productId === "vid-04") {
      title = "Heritage Crimson Lehenga Set";
      price = 8500;
      seller = "Jaipur Traditional Styles";
    }

    const orderPayload = {
      id: `ORD-AI-${Math.floor(Math.random() * 8000) + 1000}`,
      productName: title,
      amount: price,
      sellerName: seller,
      buyerHandle: "@ai_recommended_shopper",
      status: "Verified in Escrow",
      escrowStatus: "In Escrow",
      whatsappTriggered: true
    };

    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });

      if (orderRes.ok) {
        // Trigger simulation notice for admin
        await fetch("/api/admin/notices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "success",
            title: `AI Assisted Conversion: ₹${price}`,
            message: `AI recommendation successfully assisted conversion of ${title} for seller ${seller}. Money safely gated in Escrow.`
          })
        });

        // Add model notification message
        setMessages(prev => [...prev, {
          id: `ai-systok-${Date.now()}`,
          role: "model",
          text: `🎉 Dynamic Conversion Complete! I have successfully generated order ID #${orderPayload.id} for the "${title}" (₹${price}). Your transaction is locked securely under V-Shop Escrow Vault. Settle details and dispatch have been notified to ${seller} via automated WhatsApp!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

        syncData();
      }
    } catch (err) {
      alert("Error adding order to server history.");
    }
  };

  const clearAlNotices = async () => {
    try {
      const res = await fetch("/api/admin/notices/read-all", { method: "POST" });
      if (res.ok) {
        syncData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Trigger button */}
      {!isOpen && (
        <motion.button
          onClick={() => {
            setIsOpen(true);
            syncData();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-4 py-3 bg-gradient-to-r from-indigo-650 via-indigo-700 to-indigo-900 border border-indigo-500/30 text-white rounded-full shadow-2xl flex items-center gap-2 cursor-pointer z-50 group hover:shadow-indigo-500/20"
          id="ai-widget-trigger-btn"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <Bot className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono">
            V-Shop AI Assist • शॉपिंग साथी
          </span>
        </motion.button>
      )}

      {/* Main Expanded Smart Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-93 sm:w-110 bg-white border border-slate-200 rounded-3xl shadow-3xl flex flex-col overflow-hidden max-h-[80vh] md:max-h-[640px] z-50"
            id="ai-widget-dialogue"
          >
            {/* Widget Top Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 p-4 border-b border-indigo-950/20 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-indigo-550/20 rounded-xl border border-indigo-500/30">
                  <Bot className="w-5 h-5 text-amber-400 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-widest font-mono text-white">V-Shop AI Co-Pilot</h4>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-400 font-mono px-1 rounded border border-emerald-500/25">Online</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Automated Buyer Behavior & Admin Notice Center</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Smart behavioral feedback bar */}
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center shrink-0 text-[10px] font-mono text-slate-550">
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-400">YOUR CUSTOMER MINDSET:</span>
                <span className="font-extrabold text-indigo-700 uppercase bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-150 animate-pulse">
                  {currentUserBehavior}
                </span>
              </div>
              <button
                onClick={syncData}
                disabled={isRefreshing}
                className="hover:text-indigo-600 transition-all flex items-center gap-1 disabled:opacity-50"
                title="Refresh logs & orders"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            </div>

            {/* Navigational Tabs row */}
            <div className="bg-white flex border-b border-slate-100 font-mono select-none">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 text-center py-2 text-[10.5px] font-extrabold border-b-2 uppercase tracking-wider transition-all ${
                  activeTab === "chat" 
                    ? "border-indigo-600 text-indigo-700 bg-indigo-50/10" 
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                💬 Companion Chat
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 text-center py-2 text-[10.5px] font-extrabold border-b-2 uppercase tracking-wider transition-all relative ${
                  activeTab === "history" 
                    ? "border-indigo-600 text-indigo-700 bg-indigo-50/10" 
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                🛍️ buying history ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab("admin_notices")}
                className={`flex-1 text-center py-2 text-[10.5px] font-extrabold border-b-2 uppercase tracking-wider transition-all relative ${
                  activeTab === "admin_notices" 
                    ? "border-indigo-600 text-indigo-700 bg-indigo-50/10" 
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                📢 admin notices {notices.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-2 inline-block w-2-h-2 bg-rose-500 rounded-full animate-ping text-[8px] leading-none px-1 text-white scale-75 font-sans font-bold">
                    {notices.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            </div>

            {/* TAB CONTAINER 1: Conversations */}
            {activeTab === "chat" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 flex flex-col h-full min-h-0">
                
                {/* Chat items list loop */}
                <div className="space-y-4 flex-1 min-h-0">
                  {messages.map((m) => {
                    const isAi = m.role === "model";
                    return (
                      <div 
                        key={m.id} 
                        className={`flex gap-2.5 max-w-[88%] ${isAi ? "self-start" : "self-end flex-row-reverse ml-auto"}`}
                      >
                        {isAi && (
                          <div className="w-7 h-7 bg-indigo-100 border border-indigo-250 text-indigo-700 rounded-full flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}
                        <div className="space-y-1">
                          <div className={`p-3 rounded-2xl text-[11.5px] leading-relaxed shadow-xs ${
                            isAi 
                              ? "bg-white text-slate-800 border border-slate-150" 
                              : "bg-indigo-600 text-white font-medium"
                          }`}>
                            <span>{m.text}</span>

                            {/* Suggested Quick checkout integration triggers! */}
                            {isAi && m.actionDetails && m.actionDetails.type === "add_to_cart" && (
                              <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                                <span className="text-[9.5px] text-amber-600 font-extrabold uppercase block font-mono">⚡ Shopping Helper Quick Action:</span>
                                <button
                                  type="button"
                                  onClick={() => triggerBuyProduct(m.actionDetails)}
                                  className="w-full py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-sans text-[10.5px] font-black rounded-xl uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                  <span>{m.actionDetails.text || "Instant Safe Checkout"}</span>
                                </button>
                              </div>
                            )}

                            {isAi && m.actionDetails && m.actionDetails.type === "escrow_info" && (
                              <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1">
                                <span className="text-[10px] text-slate-400 block font-mono">Escrow Vault Policy:</span>
                                <p className="text-[9.5px] leading-normal text-slate-500 italic">
                                  All funds locked on server ledger. Verified merchants receive automated payout clearances strictly after the customer's 7-day safety period completes.
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <div className={`text-[8.5px] text-slate-400 font-mono tracking-tight ${isAi ? "pl-1" : "text-right pr-1"}`}>
                            {m.timestamp} {m.behaviorAnalysis && `• Dynamic state: ${m.behaviorAnalysis}`}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {isLoading && (
                    <div className="flex gap-2.5 max-w-[80%] self-start animate-pulse">
                      <div className="w-7 h-7 bg-indigo-50 border border-indigo-150 text-indigo-405 rounded-full flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div className="bg-white border border-slate-150 p-3 rounded-2xl text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100" />
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200" />
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-300" />
                        <span className="font-mono text-[9px]">Analyzing shopping intents...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* TAB CONTAINER 2: Buying & Escrow History */}
            {activeTab === "history" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 h-full min-h-0">
                <div className="flex justify-between items-center pb-2 border-b border-slate-250">
                  <div>
                    <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-widest font-mono">खरीदारी और लेनदेन इतिहास</h5>
                    <p className="text-[9.5px] text-slate-400 leading-tight">Secure escrow orders logged, synced, and verified by platform admin in real-time.</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 px-20 py-0.5 rounded-full text-center shrink-0">
                    {orders.length} orders
                  </span>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-3 pt-1">
                    {orders.map((ord: any) => (
                      <div key={ord.id} className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs space-y-2.5 font-sans relative overflow-hidden">
                        
                        {/* Order Header / Id */}
                        <div className="flex justify-between items-start text-xs border-b border-slate-100 pb-2">
                          <div>
                            <span className="text-[8px] bg-slate-100 text-slate-550 border border-slate-200 p-1 rounded font-mono font-bold block mb-1 uppercase tracking-wider">
                              Order: {ord.id}
                            </span>
                            <h6 className="font-black text-slate-900 leading-tight pr-1">{ord.productName}</h6>
                            <span className="text-[9px] text-slate-450 block truncate mt-0.5">Seller: {ord.sellerName}</span>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <span className="text-xs font-black text-indigo-700 font-mono block">₹{ord.amount}</span>
                            <span className="text-[8.5px] text-slate-400 font-mono block mt-1">{new Date(ord.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Order Metadata and Escrow Progress statuses */}
                        <div className="grid grid-cols-2 gap-2 text-[10.2px]">
                          <div className="p-1 px-1.5 bg-slate-100/60 rounded-lg">
                            <span className="text-[7.5px] text-slate-400 block uppercase font-bold">Delivery Status</span>
                            <span className="text-slate-800 font-bold flex items-center gap-1 mt-0.5 font-mono truncate">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {ord.status}
                            </span>
                          </div>

                          <div className="p-1 px-1.5 bg-slate-100/60 rounded-lg">
                            <span className="text-[7.5px] text-slate-400 block uppercase font-bold">Escrow Ledger Vault</span>
                            <span className={`font-mono font-extrabold block mt-0.5 truncate text-[10px] ${
                              ord.escrowStatus === "In Escrow" || ord.escrowStatus === "Verified in Escrow"
                                ? "text-amber-600" 
                                : ord.escrowStatus === "Completed" || ord.escrowStatus === "Withdrawn"
                                ? "text-emerald-600" 
                                : "text-rose-600"
                            }`}>
                              🛡️ {ord.escrowStatus}
                            </span>
                          </div>
                        </div>

                        {/* Customer direct interactions action helper */}
                        <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono border-t border-slate-100/80 pt-2 shrink-0">
                          <span className="flex items-center gap-1 text-[8px] truncate">
                            {ord.whatsappTriggered ? "WhatsApp invoice sent ✅" : "WhatsApp notifications idle"}
                          </span>

                          {(ord.escrowStatus === "In Escrow" || ord.escrowStatus === "Verified in Escrow") && (
                            <div className="flex gap-1 shrink-0">
                              <button
                                onClick={async () => {
                                  // Call PATCH API route to resolve escrow
                                  await fetch(`/api/orders/${ord.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ status: "Delivered & Settled", escrowStatus: "Completed" })
                                  });
                                  
                                  // Log successful payout to admin board
                                  await fetch("/api/admin/notices", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      type: "success",
                                      title: `Escrow Released: ${ord.id}`,
                                      message: `Payout successfully cleared to ${ord.sellerName} for ₹${ord.amount}. User happy with sizing sugestions.`
                                    })
                                  });

                                  alert("Escrow funds cleared to the artisan seller successfully!");
                                  syncData();
                                }}
                                className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-250 rounded font-bold cursor-pointer text-[8.5px]"
                              >
                                Release (रिलीज़)
                              </button>
                              <button
                                onClick={async () => {
                                  await fetch(`/api/orders/${ord.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ status: "Carrier Return Triggered", escrowStatus: "Refunded" })
                                  });

                                  await fetch("/api/admin/notices", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      type: "warning",
                                      title: `User Return Requested: ${ord.id}`,
                                      message: `Buyer initated returning of ${ord.productName}. Checking unboxing videography mandates.`
                                    })
                                  });

                                  alert("Order refund initiated under standard 7-Day protection hold! Return courier assigned.");
                                  syncData();
                                }}
                                className="px-1.5 py-0.5 bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-250 rounded font-bold cursor-pointer text-[8.5px]"
                              >
                                Refund (रिफंड)
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-white border border-dashed border-slate-200 rounded-3xl p-6 space-y-2 mt-5">
                    <span className="text-3xl animate-bounce block">📦</span>
                    <p className="text-xs text-slate-400 font-sans">
                      <strong>कोई आर्डर इतिहास अभी नहीं है।</strong><br />
                      AI Companion chat asks, or purchase items inside "Phase 2 Live Commerce Reels" to watch direct secure escrow logs dynamically populated right here!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTAINER 3: Admin Notice & Platform Updates */}
            {activeTab === "admin_notices" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 h-full min-h-0">
                <div className="flex justify-between items-center pb-2 border-b border-slate-250 select-none">
                  <div>
                    <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-widest font-mono">अधिसूचना व एडमिन नोटिस बोर्ड</h5>
                    <p className="text-[9.5px] text-slate-400 leading-tight">Live system suggestions and notices reported by V-Shop Smart AI based on user behaviour.</p>
                  </div>
                  <button
                    onClick={clearAlNotices}
                    className="text-[9.5px] font-sans font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {notices.length > 0 ? (
                  <div className="space-y-2.5 pt-1">
                    {notices.map((n: any) => (
                      <div 
                        key={n.id} 
                        className={`p-3 rounded-2xl border flex items-start gap-2.5 transition-all ${
                          n.read ? "bg-white border-slate-150" : "bg-indigo-50/40 border-indigo-200"
                        }`}
                      >
                        <span className="text-base mt-0.5">
                          {n.type === "warning" ? "⚠️" : n.type === "upgrade" ? "⚡" : n.type === "success" ? "✅" : "💡"}
                        </span>
                        
                        <div className="space-y-1 font-sans text-xs flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h6 className="font-bold text-slate-805 truncate text-[11.5px]">{n.title}</h6>
                            <span className="text-[8.5px] text-slate-400 font-mono shrink-0">{new Date(n.timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
                          </div>
                          
                          <p className="text-[10.5px] text-slate-650 leading-relaxed font-normal">{n.message}</p>
                          
                          {/* Emulated "Bypassing/System auto-patched" triggers for platform upgrades */}
                          {n.type === "upgrade" && (
                            <div className="mt-1.5 p-1.5 bg-slate-900 text-amber-400 font-mono text-[9px] rounded-lg flex items-center justify-between border border-slate-800 shadow-inner">
                              <span className="flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping inline-block" />
                                <span>Automation Patch Applied: Auto-rerouted</span>
                              </span>
                              <span className="text-[8px] bg-amber-400/20 text-amber-300 px-1 rounded">V-Shop Active Patch</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-405 italic text-center py-10">Notice board empty. Try chatting with AI about sarees or buying traditional goods to trigger triggers!</p>
                )}
              </div>
            )}

            {/* Chat message form footer */}
            {activeTab === "chat" && (
              <form 
                onSubmit={handleSendMessage} 
                className="p-3 bg-white border-t border-slate-150 flex gap-2 shrink-0 items-center"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="E.g. Saree details share, Escrow rules, or suggest size fit..."
                  className="flex-1 px-3.5 py-2 border border-slate-250 rounded-xl text-xs bg-slate-50 focus:outline-none focus:border-indigo-650 focus:bg-white text-slate-800 font-sans"
                  disabled={isLoading}
                  id="ai-assistant-input-box"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-[0.35] transition-all shrink-0 cursor-pointer"
                  id="ai-assistant-submit-btn"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Global micro footer */}
            <div className="bg-slate-900 px-4 py-1.5 text-center text-[8.5px] text-slate-400 font-mono tracking-wide shrink-0">
              V-Shop Super-App Ecosystem Simulation Ledger • compliant-certified
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
