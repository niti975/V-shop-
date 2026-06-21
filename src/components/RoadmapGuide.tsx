/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Code2, 
  Cpu, 
  HelpCircle, 
  Laptop, 
  MessageSquare, 
  Server, 
  Sparkles, 
  Terminal,
  CheckCircle
} from 'lucide-react';

interface TechLine {
  lineNum: string;
  phase: string;
  title: string;
  description: string;
  techStack: string;
  serverSnippet: string;
  clientInstruction: string;
}

export default function RoadmapGuide() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [chatSearch, setChatSearch] = useState('');
  
  // Fully defined roadmap technical specs
  const lines: TechLine[] = [
    {
      lineNum: "Line 2",
      phase: "Phase 1: Core",
      title: "Admin Verification Tick Manager System",
      description: "Controls user Blue ticks, Local Startup Purple ticks, and Elite Brand Green ticks. Blocks changes of shop names or business categories without manual Admin override.",
      techStack: "Express.js API + Firestore Auth Roles",
      serverSnippet: `// Express Route in server.ts
app.patch("/api/admin/sellers/:id/verify", async (req, res) => {
  const { id } = req.params;
  const { ticketStatus } = req.body; // 'Blue' | 'Purple' | 'Green'
  
  await db.collection("sellers").doc(id).update({
    verifyStatus: ticketStatus,
    nameLocked: true, // Line 2 System constraint
    updatedAt: new Date()
  });
  res.json({ success: true, message: "Seller verified. Category locked." });
});`,
      clientInstruction: "Ensure UI inputs for Shop Name are disabled if `seller.verifyStatus !== 'None'`. Show locked padlock icon with tooltips pointing to admin overrides."
    },
    {
      lineNum: "Line 8",
      phase: "Phase 2: Live",
      title: "Swipe-Up to Showroom Overlay Feed",
      description: "Embeds inline web storefront overlay at the lower third of mobile screen scroll view so reels and streams can be completed without pausing playback feed.",
      techStack: "React + Frame gestures (motion/react)",
      serverSnippet: `// API returning stream specific catalog items
app.get("/api/reels/:id/catalog", async (req, res) => {
  const { id } = req.params;
  const reel = await db.collection("reels").doc(id).get();
  const catalog = await db.collection("products")
    .where("sellerId", "==", reel.data().sellerId).limit(8).get();
  res.json(catalog.docs.map(d => ({ id: d.id, ...d.data() })));
});`,
      clientInstruction: "Implement Swipe gesture using `framer-motion` or `motion/react` on touch coordinates. Slide-up modal component using state absolute overlays inside device grid view."
    },
    {
      lineNum: "Line 14",
      phase: "Phase 3: Escrow",
      title: "Automated Commission Split Hold Protocol",
      description: "Places incoming buyer funds into trust for 7 days. At expiry, code fires to partition the aggregate hold to Platform (10%), Merchant base (80%), and Logistics rider (10%).",
      techStack: "Node.js Cron tasks / Cloud Tasks Scheduled triggers",
      serverSnippet: `// Escrow Automated Split logic run at return period expiry
async function processEscrowRelease(orderId) {
  const orderRef = db.collection("orders").doc(orderId);
  const order = await orderRef.get();
  
  if (order.data().status === "In Escrow") {
    const total = order.data().amount;
    const adminCommission = total * 0.10;
    const sellerPayout = total * 0.80;
    const riderCut = total * 0.10;

    await db.runTransaction(async (transaction) => {
      transaction.update(orderRef, { status: "Completed" });
      transaction.update(db.collection("wallets").doc("admin"), { balance: admin.balance + adminCommission });
      transaction.update(db.collection("wallets").doc(order.data().sellerId), { balance: seller.balance + sellerPayout });
      transaction.update(db.collection("wallets").doc(order.data().riderId), { balance: rider.balance + riderCut });
    });
  }
}`,
      clientInstruction: "Design ledger page with clear indicators separating 'Funds in Escrow Hold (7d)' versus 'Withdrawable UPI Cash'. Use visual progress bars of return limits."
    },
    {
      lineNum: "Line 17",
      phase: "Phase 4: Viral",
      title: "24-Hour Viral Team Price Validation loop",
      description: "Lowers product price for groups. Creates an active group with 24 hours expiry. If friends don't click the referral link to join, a refund is issued automatically.",
      techStack: "Firebase Firestore Transactions + Razorpay Split API",
      serverSnippet: `// Chron Task triggered to find expired incomplete teams
app.post("/api/jobs/check-expired-groups", async (req, res) => {
  const now = new Date();
  const expiredGroups = await db.collection("groups")
    .where("status", "==", "active")
    .where("expiresAt", "<", now).get();

  for (const grp of expiredGroups.docs) {
    if (grp.data().membersJoined < grp.data().membersRequired) {
      await payoutGateway.triggerBulkRefunds(grp.data().transactionIds);
      await grp.ref.update({ status: "ExpiredAndRefunded" });
    }
  }
  res.json({ processed: expiredGroups.size });
});`,
      clientInstruction: "Build a real-time countdown timer in client UI. Prompt buyers to 'Invite dosto via WhatsApp' with web-intent Share URL triggers."
    },
    {
      lineNum: "Line 21",
      phase: "Phase 5: Anti-Fraud",
      title: "Lightweight AI Clothing Sizing Curve",
      description: "Combines client body shapes calculations with fabric elasticity metrics to compute optimized size configurations, curbing expensive reverse garment returns.",
      techStack: "Modular Core Sizing Algorithmic Engine",
      serverSnippet: `// Server validation for accurate sizing profiles
export function evaluateBodySize(height, weight, preferFit) {
  // mathematical fabric ratios calculations
  let baseSize = "M";
  if (weight < 65) baseSize = "S";
  else if (weight > 80) baseSize = "L";

  if (preferFit === "Slim") return decrementSize(baseSize);
  if (preferFit === "Relaxed") return incrementSize(baseSize);
  return baseSize;
}`,
      clientInstruction: "Build fluid slider widgets for height and weight in React. When changed, immediately run evaluation to advise best size alongside Add To Cart triggers."
    }
  ];

  // Filters lines based on search keyword
  const filteredLines = lines.filter(item => 
    item.title.toLowerCase().includes(chatSearch.toLowerCase()) || 
    item.description.toLowerCase().includes(chatSearch.toLowerCase()) ||
    item.lineNum.toLowerCase().includes(chatSearch.toLowerCase())
  );

  const activeLine = lines[selectedIdx] || lines[0];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-xl" id="roadmap-guide-root">
      
      {/* Panel header */}
      <div className="p-6 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-white">V-Shop Master Developer Portal</h3>
            <p className="text-xs text-slate-400">Read step-by-step production backend code implementations for every roadmap line</p>
          </div>
        </div>

        {/* Search Input bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search lines (e.g. Line 14, Escrow)..."
            value={chatSearch}
            onChange={(e) => setChatSearch(e.target.value)}
            id="roadmap-search-bar"
            className="w-full sm:w-60 px-3.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        
        {/* LEFT COLUMN: Selector of lines */}
        <div className="lg:col-span-4 border-r border-slate-800 max-h-[480px] overflow-y-auto divide-y divide-slate-800/60">
          {filteredLines.map((item) => {
            const indexInMaster = lines.findIndex(l => l.lineNum === item.lineNum);
            const isSelected = activeLine.lineNum === item.lineNum;
            return (
              <button
                key={item.lineNum}
                onClick={() => setSelectedIdx(indexInMaster)}
                className={`w-full p-4 text-left transition-all flex justify-between items-center ${
                  isSelected ? 'bg-slate-800/60' : 'hover:bg-slate-800/20'
                }`}
                id={`select-line-${item.lineNum}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      {item.lineNum}
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-400">
                      {item.phase}
                    </span>
                  </div>
                  <h4 className={`text-xs font-semibold mt-1.5 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {item.title}
                  </h4>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-amber-500 translate-x-0.5' : 'text-slate-600'}`} />
              </button>
            );
          })}
          
          {filteredLines.length === 0 && (
            <div className="p-6 text-center text-slate-500 text-xs font-mono">
              No matching roadmap lines found. Try 'Escrow' or 'Line 21'.
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Full Code snippets & client advice specs */}
        <div className="lg:col-span-8 p-6 space-y-6 max-h-[480px] overflow-y-auto">
          
          {/* Header of selected line specs */}
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
              Technical Documentation • {activeLine.lineNum}
            </span>
            <h3 className="font-display font-bold text-xl text-white mt-1">
              {activeLine.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-2">
              {activeLine.description}
            </p>
          </div>

          {/* Integrated parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-2xl">
              <span className="text-[9px] uppercase font-mono text-slate-500 font-bold block">Production Stack</span>
              <span className="text-xs font-bold text-white mt-0.5 flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-blue-500" />
                {activeLine.techStack}
              </span>
            </div>

            <div className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-2xl">
              <span className="text-[9px] uppercase font-mono text-slate-500 font-bold block font-sans">Verification logic</span>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Tested & Sealed
              </span>
            </div>
          </div>

          {/* Code Spec Editor container */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Server-Side Controller Logic (server.ts)
            </label>
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-2xl overflow-x-auto">
              <pre className="text-xs font-mono text-emerald-400 leading-relaxed whitespace-pre font-sans">
                {activeLine.serverSnippet}
              </pre>
            </div>
          </div>

          {/* Client Implementation guides */}
          <div className="p-4 bg-slate-800/45 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-[10.5px] font-bold text-slate-350 uppercase tracking-wide flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-amber-500" />
              Client Side Framework instructions
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activeLine.clientInstruction}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
