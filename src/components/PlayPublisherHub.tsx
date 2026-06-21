/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  Smartphone, 
  Workflow, 
  CheckCircle, 
  Plus, 
  ChevronRight,
  ShieldCheck,
  Code,
  Sparkles,
  Info,
  Settings,
  Database,
  ShoppingBag,
  Store,
  Truck,
  Users,
  Eye,
  Heart,
  AlertTriangle,
  Play,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

interface EcosystemOrder {
  id: string;
  productName: string;
  price: number;
  buyerName: string;
  status: 'Created' | 'Accepted by Seller' | 'Out for Delivery' | 'Delivered' | 'Returned';
  otp: string;
}

export default function PlayPublisherHub() {
  const [basePackage, setBasePackage] = useState('com.kumarinitish.livekart');
  const [activeAppSim, setActiveAppSim] = useState<'buyer' | 'seller' | 'rider' | 'admin'>('buyer');

  // Shared reactive state representing the unified Firestore database state for the 4-app ecosystem!
  const [sharedOrders, setSharedOrders] = useState<EcosystemOrder[]>([
    {
      id: "ORD-9283",
      productName: "Premium Banarasi Silk Saree",
      price: 4500,
      buyerName: "Amit Kumar",
      status: "Created",
      otp: "4829"
    },
    {
      id: "ORD-1102",
      productName: "Hand-woven Cotton Kurta Suit",
      price: 1850,
      buyerName: "Deepak Sharma",
      status: "Out for Delivery",
      otp: "9012"
    }
  ]);

  // Demo state for Buyer app
  const [cartCount, setCartCount] = useState(0);
  const [reelsLikeCount, setReelsLikeCount] = useState(254);
  const [hasLiked, setHasLiked] = useState(false);

  // Demo state for Seller App
  const [newWholesaleItem, setNewWholesaleItem] = useState('');
  const [newWholesalePrice, setNewWholesalePrice] = useState('');
  const [wholesaleInventory, setWholesaleInventory] = useState([
    { id: 1, name: "Chanderi Handloom Bundles", qty: 40, price: 950 },
    { id: 2, name: "Premium Block Print fabric", qty: 120, price: 220 }
  ]);

  // Demo state for Delivery App
  const [deliveryOtpInput, setDeliveryOtpInput] = useState('');
  const [riderMapStatus, setRiderMapStatus] = useState<'idle' | 'navigating' | 'reached'>('idle');

  // Unified Developer checklist
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  const toggleStep = (stepNo: number) => {
    if (completedSteps.includes(stepNo)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNo));
    } else {
      setCompletedSteps([...completedSteps, stepNo]);
    }
  };

  // 1. BUYER APP ACTIONS
  const triggerSimulatedOrder = () => {
    const newOrder: EcosystemOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: "Zari-Border Lucknowi Lehenga",
      price: 7200,
      buyerName: "kumarinitish98569@gmail.com",
      status: "Created",
      otp: `${Math.floor(1000 + Math.random() * 9000)}`
    };
    setSharedOrders([newOrder, ...sharedOrders]);
    setCartCount(0);
    alert(`🎉 Success! Order ${newOrder.id} matches User credentials & has initialized in the Unified Firestore schema.`);
  };

  // 2. SELLER APP ACTIONS
  const handleAddWholesaleItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newWholesaleItem.trim() || !newWholesalePrice) return;
    const priceNum = parseFloat(newWholesalePrice);
    if (isNaN(priceNum)) return;

    setWholesaleInventory([...wholesaleInventory, {
      id: Date.now(),
      name: newWholesaleItem.trim(),
      qty: 50,
      price: priceNum
    }]);
    setNewWholesaleItem('');
    setNewWholesalePrice('');
  };

  const updateOrderStatus = (orderId: string, nextStatus: EcosystemOrder['status']) => {
    setSharedOrders(sharedOrders.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
  };

  // 3. RIDER APP ACTIONS
  const handleVerifyDelivery = (orderId: string, expectedOtp: string) => {
    if (deliveryOtpInput.trim() === expectedOtp) {
      setSharedOrders(sharedOrders.map(o => o.id === orderId ? { ...o, status: 'Delivered' } : o));
      setDeliveryOtpInput('');
      setRiderMapStatus('idle');
      alert("✅ OTP Signature Match! Escrow status updated to Completed across the network.");
    } else {
      alert("❌ Invalid Delivery Safety OTP! OTP must match the secure client token exactly.");
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="play-publisher-hub-root">
      
      {/* HEADER: Dynamic Hindi Intro to the 4-App Ecosystem */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
          <Workflow className="w-96 h-96" />
        </div>

        <div className="max-w-3xl">
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-400">4-App Unified Ecosystem Architecture</span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white mt-1">
            हाँ नितीश! आपके पूरे बिज़नेस को चलाने के लिए ये चारों ऐप्स एक साथ चलेंगे
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
            आपके Livekart Ecosystem को सफल बनाने के लिए **4 अलग-अलग एप्लिकेशन** एक सिंगल Firebase प्रोजेक्ट और यूनिफाइड डेटाबेस से जुड़े रहेंगे। हमने नीचे चारों ऐप्स का **लाइव वर्किंग सिम्युलेटर** तैयार किया है। आप कोई भी ऐप चुनकर देख सकते हैं कि डेटा एक ऐप से दूसरे ऐप में रीयल-टाइम में कैसे ट्रांसफर होता है!
          </p>
        </div>

        {/* 4 App Selectors */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'buyer', label: '1. User/Buyer App', icon: ShoppingBag, color: 'border-orange-500/35 text-orange-400 bg-orange-500/5' },
            { id: 'seller', label: '2. Selling / B2B App', icon: Store, color: 'border-blue-500/35 text-blue-400 bg-blue-500/5' },
            { id: 'rider', label: '3. Delivery Rider App', icon: Truck, color: 'border-emerald-500/35 text-emerald-400 bg-emerald-500/5' },
            { id: 'admin', label: '4. Admin Control Panel', icon: ShieldCheck, color: 'border-purple-500/35 text-purple-400 bg-purple-500/5' }
          ].map((app) => {
            const Icon = app.icon;
            const active = activeAppSim === app.id;
            return (
              <button
                key={app.id}
                onClick={() => setActiveAppSim(app.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  active 
                    ? 'bg-white text-slate-950 border-white shadow-lg scale-[1.02]' 
                    : `${app.color} hover:bg-slate-800/40 cursor-pointer`
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <Icon className={`w-5 h-5 ${active ? 'text-slate-900' : ''}`} />
                  {active && <span className="text-[9px] bg-slate-900 text-white font-mono px-1 rounded">ACTIVE SIM</span>}
                </div>
                <span className="text-xs font-bold mt-4 block">{app.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* INNER VIEW: The active App Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INTERACTIVE WORKSPACE SCREEN */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-150 p-6 shadow-xs min-h-[480px] flex flex-col justify-between">
          
          {/* SIMULATOR HEADER */}
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-slate-400">
                  Interactive App Interface Simulator
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold bg-slate-105 px-2 py-0.5 rounded-md text-slate-600">
                Package: {basePackage}.{activeAppSim}
              </span>
            </div>

            {/* 1. BUYER APP PREVIEW CARD */}
            {activeAppSim === 'buyer' && (
              <div className="mt-6 space-y-6 animate-fadeIn">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-slate-950">App 1: Livekart Buyer (ग्राहक ऐप)</h3>
                    <p className="text-xs text-slate-500">Live Short Reels & Instant Swipes Shopping experience.</p>
                  </div>
                  <button className="relative p-2.5 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 transition-all">
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Simulated Mobile Reel Screen */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] max-h-56 bg-gradient-to-tr from-slate-950 to-orange-950 border border-slate-800 flex items-end p-4">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  <div className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-mono text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE DEMO REEL #432
                  </div>

                  <div className="z-10 text-white space-y-1 max-w-sm">
                    <span className="text-[10px] font-semibold text-orange-400">@nitish_saree_center</span>
                    <h4 className="text-xs font-bold leading-snug">Zari-Border Lucknowi Lehenga - Handlooms Handicraft Special</h4>
                    <p className="text-[10px] text-slate-300">🎉 ₹7,200 <span className="line-through text-slate-500 ml-1">₹12,000</span> (40% OFF)</p>
                  </div>

                  {/* Actions Drawer */}
                  <div className="absolute right-4 bottom-4 flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        setReelsLikeCount(reelsLikeCount + (hasLiked ? -1 : 1));
                        setHasLiked(!hasLiked);
                      }}
                      className="p-2 bg-black/40 hover:bg-black/60 rounded-full text-white flex flex-col items-center gap-0.5"
                    >
                      <Heart className={`w-4 h-4 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-[8.5px] font-mono">{reelsLikeCount}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setCartCount(cartCount + 1);
                      }}
                      className="p-2 bg-black/40 hover:bg-black/60 rounded-full text-white flex flex-col items-center gap-0.5"
                    >
                      <Eye className="w-4 h-4 text-sky-400" />
                      <span className="text-[8.5px] font-mono">1.2k</span>
                    </button>
                  </div>
                </div>

                {/* Checkout Section triggers network order insertion */}
                <div className="p-4 bg-orange-50/40 border border-orange-200/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-orange-600 block">Ecosystem Sync Demo</span>
                    <span className="text-xs font-bold text-slate-900 block mt-0.5">Test dynamic order generation!</span>
                    <span className="text-[11px] text-slate-500 block">Clicking Buy matches data against the User UID, triggering Rider pick-up.</span>
                  </div>
                  <button 
                    onClick={triggerSimulatedOrder}
                    className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                  >
                    Instant Buy Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. SELLER / B2B APP PREVIEW */}
            {activeAppSim === 'seller' && (
              <div className="mt-6 space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-display font-semibold text-lg text-slate-950">App 2: Seller Showroom & B2B (विक्रेता ऐप)</h3>
                  <p className="text-xs text-slate-500">Merchant catalogue uploads, wholesale inventories, and direct B2B buyer request acceptance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Inventory Add Form */}
                  <form onSubmit={handleAddWholesaleItem} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Add Wholesale catalog</span>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Wholesale Quality Saree / Fabric Name</label>
                      <input 
                        type="text" 
                        value={newWholesaleItem}
                        onChange={(e) => setNewWholesaleItem(e.target.value)}
                        placeholder="e.g. Surat Georgette Rolls"
                        className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Wholesale Cost per Bundle (₹)</label>
                      <input 
                        type="number" 
                        value={newWholesalePrice}
                        onChange={(e) => setNewWholesalePrice(e.target.value)}
                        placeholder="1200"
                        className="w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs focus:outline-none"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg"
                    >
                      Publish to Wholesale Feed
                    </button>
                  </form>

                  {/* Active Inventory list */}
                  <div className="p-4 border rounded-2xl space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Live Showroom Inventory</span>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {wholesaleInventory.map(item => (
                        <div key={item.id} className="p-2 border border-slate-100 bg-slate-50/50 rounded-xl flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-slate-800 block">{item.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">Stock Avail: {item.qty} units</span>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-blue-600">₹{item.price}/ea</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Incoming Merchant Order Requests */}
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Pending Escrow Shipments</span>
                  <div className="space-y-2">
                    {sharedOrders.filter(o => o.status === 'Created').map(order => (
                      <div key={order.id} className="p-3 bg-blue-50/40 border border-blue-200/50 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-extrabold font-mono text-blue-900">{order.id}</span>
                            <span className="text-[9px] bg-blue-105 text-blue-700 px-1 rounded uppercase font-bold">New Sale</span>
                          </div>
                          <span className="text-xs font-extrabold text-slate-800 block mt-1">{order.productName}</span>
                          <span className="text-[10px] text-slate-500">Ordered by <strong className="font-mono text-slate-700">{order.buyerName}</strong></span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Accepted by Seller')}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-bold"
                          >
                            Accept Order & Call Rider
                          </button>
                        </div>
                      </div>
                    ))}
                    {sharedOrders.filter(o => o.status === 'Created').length === 0 && (
                      <p className="text-xs text-slate-400 text-center py-2">No pending pick-up request. Go to App 1 (User App) to tap "Instant Buy Now"!</p>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* 3. RUNTIME DELIVERY APPS WORKPLACE */}
            {activeAppSim === 'rider' && (
              <div className="mt-6 space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-display font-semibold text-lg text-slate-950">App 3: Livekart Delivery Fleet (डिलीवरी पार्टनर ऐप)</h3>
                  <p className="text-xs text-slate-500">Live matched rider dispatcher loops, GPS transit simulations, and secure client-side OTP proofing.</p>
                </div>

                {/* Simulated GPS Navigation screen */}
                <div className="p-4 bg-emerald-50/40 border border-emerald-250/50 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-emerald-600 block flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        Matched Deliveries Map Status
                      </span>
                      <span className="text-xs font-bold text-slate-900 block mt-0.5">
                        {riderMapStatus === 'idle' ? "Rider Standing by for Delivery match" : riderMapStatus === 'navigating' ? "Rider on the road: Navigating to client address..." : "Arrived at client destination!"}
                      </span>
                    </div>

                    {riderMapStatus === 'navigating' && (
                      <button 
                        onClick={() => setRiderMapStatus('reached')}
                        className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-mono font-bold uppercase"
                      >
                        Arrive At Hub
                      </button>
                    )}
                  </div>

                  {/* Simulated Map Visual */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/6] bg-slate-100 border flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
                    
                    {riderMapStatus === 'idle' ? (
                      <div className="text-center space-y-1">
                        <Truck className="w-8 h-8 text-slate-450 mx-auto" />
                        <p className="text-[10px] text-slate-400">Assign a shipment from vendor to initiate GPS route tracker.</p>
                      </div>
                    ) : (
                      <div className="w-full flex justify-between items-center max-w-sm relative px-6">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-200 -translate-y-1/2 pointer-events-none" />
                        
                        <div className="p-2 bg-emerald-500 text-white rounded-lg shadow z-10">
                          <Store className="w-4 h-4" />
                        </div>

                        <div className={`p-2 rounded-lg shadow z-10 transition-all ${riderMapStatus === 'reached' ? 'bg-emerald-500 text-white animate-bounce' : 'bg-white text-emerald-600'}`}>
                          <Truck className="w-4 h-4" />
                        </div>

                        <div className="p-2 bg-slate-900 text-white rounded-lg shadow z-10">
                          <Users className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Deliveries list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Rider Assigned Pickups</span>
                  {sharedOrders.filter(o => o.status === 'Accepted by Seller' || o.status === 'Out for Delivery').map(order => (
                    <div key={order.id} className="p-3 bg-white border border-slate-205 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <span className="text-xs font-mono font-extrabold text-slate-600">{order.id} • Assigned Order</span>
                        <h4 className="text-xs font-bold text-slate-800 tracking-tight mt-1">{order.productName}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">OTP Token Required at checkout: <strong className="font-mono text-emerald-700 bg-emerald-100 px-1 rounded">{order.otp}</strong></p>
                      </div>

                      {order.status === 'Accepted by Seller' ? (
                        <button 
                          onClick={() => {
                            updateOrderStatus(order.id, 'Out for Delivery');
                            setRiderMapStatus('navigating');
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold"
                        >
                          Pickup & Start Navigation
                        </button>
                      ) : (
                        <div className="flex gap-1.5 items-end">
                          <div>
                            <label className="block text-[9px] text-slate-400 uppercase font-mono tracking-wider mb-0.5">Delivery OTP Verification</label>
                            <input 
                              type="text" 
                              value={deliveryOtpInput}
                              onChange={(e) => setDeliveryOtpInput(e.target.value)}
                              placeholder="e.g. 1234"
                              className="px-2 py-1 border rounded text-xs w-20 focus:outline-none"
                            />
                          </div>
                          <button 
                            onClick={() => handleVerifyDelivery(order.id, order.otp)}
                            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded"
                          >
                            Verify Pay
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {sharedOrders.filter(o => o.status === 'Accepted by Seller' || o.status === 'Out for Delivery').length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-2">No pending rider courier routes. Accept an incoming order under Step 1/2 of Seller App!</p>
                  )}
                </div>

              </div>
            )}

            {/* 4. ADMIN CONTROL PANEL */}
            {activeAppSim === 'admin' && (
              <div className="mt-6 space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-display font-semibold text-lg text-slate-950">App 4: Ecosystem Admin Console (नियंत्रण पैनल)</h3>
                  <p className="text-xs text-slate-500">Universal ledger monitoring, manual KYC approvals, and escrow dispute resolutions.</p>
                </div>

                {/* Dashboard Metrics summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border">
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Total Global Orders</span>
                    <span className="text-lg font-mono font-extrabold text-slate-800">{sharedOrders.length}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="text-[10px] text-emerald-600 uppercase block font-mono">Completed Escrows</span>
                    <span className="text-lg font-mono font-extrabold text-emerald-800">{sharedOrders.filter(o => o.status === 'Delivered').length}</span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-blue-600 uppercase block font-mono">Active Shipments</span>
                    <span className="text-lg font-mono font-extrabold text-blue-800">{sharedOrders.filter(o => o.status === 'Created' || o.status === 'Accepted by Seller' || o.status === 'Out for Delivery').length}</span>
                  </div>
                </div>

                {/* Universal Ledger Table */}
                <div className="border rounded-2xl overflow-hidden">
                  <div className="bg-slate-50 p-2.5 border-b text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Centralized Ecosystem Transaction Log
                  </div>
                  <div className="divide-y text-xs">
                    {sharedOrders.map(order => (
                      <div key={order.id} className="p-3 flex justify-between items-center hover:bg-slate-50/50">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-extrabold text-slate-900">{order.id}</span>
                            <span className="text-[10px] text-slate-500 font-mono">({order.buyerName})</span>
                          </div>
                          <span className="text-slate-700 block mt-0.5">{order.productName}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold block text-slate-900">₹{order.price}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                            order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* SIMULATOR FOOTER */}
          <div className="mt-8 pt-4 border-t border-slate-100">
            <div className="p-3.5 bg-slate-50 rounded-2xl flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
              <Info className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>Ecosystem Synchronizer Notice:</strong> All views above modify identical parameters inside the unified Firestore collections model. Trigger actions in a step-by-step logic cycle (e.g. Buyer orders fabric → Seller accepts shipment → Rider verifies OTP code).
              </div>
            </div>
          </div>

        </div>

        {/* PACKAGE DESIGN RULES */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600 font-extrabold">Play Store Architecture</span>
              <h3 className="font-semibold text-slate-900 mt-0.5">App Namespaces</h3>
            </div>
            <Smartphone className="w-5 h-5 text-amber-500" />
          </div>

          <p className="text-xs text-slate-500 leading-normal">
            For consistent release signatures, name all subsequent applications with your domain identifier root. Google Console publishes these perfectly side-by-side using:
          </p>

          <div className="space-y-3">
            {[
              { role: "1. Buyer/User App", suffix: "buyer", purpose: "Short Reels Video Shopping, Shopping Cart, Escrow Checkout API" },
              { role: "2. Selling/B2B App", suffix: "seller", purpose: "Vendor Registrations, Category Verification Locks, Inventory Catalogue" },
              { role: "3. Delivery Rider App", suffix: "rider", purpose: "Rider Matchmaker, GPS Tracking Route Updates, OTP proof checking" },
              { role: "4. Admin Control Panel", suffix: "admin", purpose: "Verify KYC Badges, Disburse Escrow Funds, Settle Returns" }
            ].map((pkg, i) => (
              <div key={i} className="p-3.5 bg-slate-50 border border-slate-201 rounded-xl space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">{pkg.role}</span>
                <span className="text-[11px] font-mono font-extrabold text-slate-800 break-all block">
                  {basePackage}.{pkg.suffix}
                </span>
                <p className="text-[10.5px] text-slate-500 leading-normal">{pkg.purpose}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[10.5px] text-slate-500 font-bold">Base Package Namespace:</span>
            <input 
              type="text" 
              value={basePackage}
              onChange={(e) => setBasePackage(e.target.value.trim().toLowerCase().replace(/[^a-z0-9.]/g, ''))}
              placeholder="com.kumarinitish.livekart"
              className="px-2 py-1 border border-slate-200 rounded font-mono font-bold text-[10.5px] text-slate-700 w-44 text-right focus:outline-none"
            />
          </div>

        </div>

      </div>

      {/* FOOTER METRICS PREVIEW */}
      <div className="bg-slate-150 rounded-2xl p-4 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="flex items-start gap-2 text-slate-600">
          <Database className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-slate-800 block">Unified Schema Backend</strong>
            All apps read/write matching schemas to prevent orphaned rows or identity spoofing.
          </div>
        </div>
        <div className="flex items-start gap-2 text-slate-600">
          <Settings className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-slate-800 block">Single Dev Console ID</strong>
            You pay Google Play's $25 developer fee only once, managing all 4 apps inside 1 dashboard.
          </div>
        </div>
        <div className="flex items-start gap-2 text-slate-600">
          <Code className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-slate-800 block">Google play App Bundle (.aab)</strong>
            Sign all compiled app products with the same keystore for immediate mutual trust APIs.
          </div>
        </div>
      </div>

    </div>
  );
}
