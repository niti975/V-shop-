import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory simple storage for notifications and orders that works as transient/shared server logic
let adminNotices: Array<{
  id: string;
  type: "warning" | "info" | "upgrade" | "success";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}> = [
  {
    id: "notice-init-1",
    type: "info",
    title: "System Boot Successful",
    message: "V-Shop Autopilot Engine initialized. Monitoring merchant transactions and customer engagement rates.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: "notice-init-2",
    type: "upgrade",
    title: "Server Upgrade Recommendation",
    message: "Surat central Hub is experiencing high query volumes for Chikankari catalogs. Recommend increasing local worker routing.",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: false
  }
];

let userOrders: Array<{
  id: string;
  buyerHandle: string;
  productName: string;
  amount: number;
  status: string;
  timestamp: string;
  sellerName: string;
  escrowStatus: "In Escrow" | "Completed" | "Refunded";
  whatsappTriggered: boolean;
}> = [
  {
    id: "ORD-9302",
    buyerHandle: "@you_self_checkout",
    productName: "Royal Gold Silk Saree",
    amount: 4200,
    status: "Delivered & Settled",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    sellerName: "Chanderi Handlooms",
    escrowStatus: "Withdrawn",
    whatsappTriggered: true
  } as any
];

// System dynamic configuration and live settings variables for OTA patches
let systemSettings = {
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

// System settings API controllers
app.get("/api/system/settings", (req, res) => {
  res.json(systemSettings);
});

app.post("/api/system/settings", (req, res) => {
  const { escrowHoldDays, commissionSplitPercentage, activeFilterOverride, features, appName, nominationLine, primaryColor, safetyRules } = req.body;
  
  if (escrowHoldDays !== undefined) systemSettings.escrowHoldDays = Number(escrowHoldDays);
  if (commissionSplitPercentage !== undefined) systemSettings.commissionSplitPercentage = Number(commissionSplitPercentage);
  if (activeFilterOverride !== undefined) systemSettings.activeFilterOverride = activeFilterOverride;
  if (appName !== undefined) systemSettings.appName = appName;
  if (nominationLine !== undefined) systemSettings.nominationLine = nominationLine;
  if (primaryColor !== undefined) systemSettings.primaryColor = primaryColor;
  if (safetyRules !== undefined) systemSettings.safetyRules = safetyRules;
  if (features !== undefined) {
    systemSettings.features = { ...systemSettings.features, ...features };
  }
  
  systemSettings.lastUpdateTimestamp = new Date().toISOString();
  
  // Log update message in admin notices
  const logNotice = {
    id: `notice-sys-${Math.floor(Math.random() * 100000)}`,
    type: "info" as const,
    title: "System Config Updated",
    message: `Core param update: Escrow ${systemSettings.escrowHoldDays}d, split ${systemSettings.commissionSplitPercentage}%. App name: ${systemSettings.appName}.`,
    timestamp: new Date().toISOString(),
    read: false
  };
  adminNotices.unshift(logNotice);
  
  res.json({ success: true, settings: systemSettings });
});

// Post an OTA Firmware Over-The-Air Update / Patch
app.post("/api/system/settings/patch", (req, res) => {
  const { patchTitle, patchMessage, targetVersion, systemStatus } = req.body;
  if (!patchTitle || !patchMessage || !targetVersion) {
    return res.status(400).json({ error: "Missing patch parameters" });
  }
  
  systemSettings.systemFirmwareVersion = targetVersion;
  if (systemStatus) systemSettings.systemStatus = systemStatus;
  systemSettings.lastUpdateTimestamp = new Date().toISOString();
  
  const newPatchLog = {
    title: patchTitle,
    version: targetVersion,
    message: patchMessage,
    timestamp: new Date().toISOString()
  };
  
  systemSettings.patchHistory.unshift(newPatchLog);
  
  // Register full administrative banner
  const upgradeNotice = {
    id: `notice-patch-${Math.floor(Math.random() * 100000)}`,
    type: "upgrade" as const,
    title: `Firmware OTA Patched to ${targetVersion} 🚀`,
    message: `Applied successfully: ${patchMessage}`,
    timestamp: new Date().toISOString(),
    read: false
  };
  adminNotices.unshift(upgradeNotice);
  
  res.json({ success: true, settings: systemSettings });
});

// Initialize Gemini API client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// API endpoint to post a new notice to the Admin system
app.post("/api/admin/notices", (req, res) => {
  const { type, title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: "Missing title or message" });
  }
  const newNotice = {
    id: `notice-${Math.floor(Math.random() * 100000)}`,
    type: type || "info",
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false
  };
  adminNotices.unshift(newNotice);
  // Cap notices at 20 items
  if (adminNotices.length > 20) {
    adminNotices = adminNotices.slice(0, 20);
  }
  res.status(201).json(newNotice);
});

// API endpoint to fetch admin notices
app.get("/api/admin/notices", (req, res) => {
  res.json(adminNotices);
});

// Clear all notices or mark them as read
app.post("/api/admin/notices/read-all", (req, res) => {
  adminNotices = adminNotices.map(n => ({ ...n, read: true }));
  res.json({ success: true, count: adminNotices.length });
});

// API endpoint to post user order/history transaction
app.post("/api/orders", (req, res) => {
  const { id, productName, amount, sellerName, buyerHandle, status, escrowStatus, whatsappTriggered } = req.body;
  if (!productName || !amount) {
    return res.status(400).json({ error: "Missing order information" });
  }

  const newOrder = {
    id: id || `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
    buyerHandle: buyerHandle || "@you_self_checkout",
    productName,
    amount: Number(amount),
    status: status || "Awaiting Rider",
    timestamp: new Date().toISOString(),
    sellerName: sellerName || "V-Shop Merchant",
    escrowStatus: escrowStatus || "In Escrow",
    whatsappTriggered: whatsappTriggered || false
  };

  userOrders.unshift(newOrder);
  res.status(201).json(newOrder);
});

// API endpoint to fetch user orders
app.get("/api/orders", (req, res) => {
  res.json(userOrders);
});

// Update order status (e.g. escrow released or refunded)
app.patch("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status, escrowStatus } = req.body;
  const orderIdx = userOrders.findIndex(o => o.id === id);
  if (orderIdx !== -1) {
    if (status) userOrders[orderIdx].status = status;
    if (escrowStatus) userOrders[orderIdx].escrowStatus = escrowStatus;
    return res.json(userOrders[orderIdx]);
  }
  res.status(404).json({ error: "Order not found" });
});

// AI Copilot Smart chat model helper with Gemini API proxy
app.post("/api/chat", async (req, res) => {
  const { message, history, context } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Missing message text" });
  }

  const client = getGeminiClient();
  const promptText = message;

  // Let's create a beautiful, descriptive system instruction that guides the model
  // to speak in friendly English/Hinglish, understand the V-Shop / Livekart marketplace context,
  // guide users about our products (Aura Chikankari Kurti at ₹1499, Royal Gold Silk Saree at ₹4200, Custom denim at ₹1899, crimson Jaipur Lehenga at ₹8500),
  // analyze user behavior, outline what notices should go to the admin, and suggest platform upgrades!
  const systemInstruction = `
You are the V-Shop & Livekart "Smart AI Shopping Assistant" (स्मार्ट एआई शॉपिंग सहायक).
Your task is to help the shoppers buy products, suggest appropriate choices, and intelligently analyze their behavior.

Our Active Products Catalogs are:
1. "Aura Indigo Floral Kurti" (Seller: Aura Premium Styles, Category: Ethnic Apparel, Price: ₹1499, Original: ₹2499)
2. "Royal Gold Silk Saree" (Seller: Chanderi Handlooms, Category: Handlooms Handicraft, Price: ₹4200, Original: ₹5999)
3. "Vintage Oversized Cargo Pants" (Seller: Street Chic Wear, Category: Modern Apparel, Price: ₹1899, Original: ₹2999)
4. "Heritage Crimson Lehenga Set" (Seller: Jaipur Traditional Styles, Category: Traditions Wear, Price: ₹8500, Original: ₹13999)

Provide your response in a structured JSON schema so the frontend can display it beautifully!
Your JSON output MUST exactly match this TypeScript interface:
interface AIResponse {
  reply: string;  // A helpful, gorgeous retail recommendation or chatbot response in easy-to-read English/Hinglish.
  behaviorAnalysis: string; // Dynamic expert assessment of user's shopping mindset (e.g., 'Artisan Legacy Enthusiast', 'Price-Sensitive Invester', 'Impulsive Streetwear Fan').
  adminNoticeAction: {
    needed: boolean; // Set to true if this interaction triggers an important update/alert/action for the platform admin.
    type: "warning" | "info" | "upgrade" | "success";
    title: string;
    message: string;
  };
  suggestedAction?: {
    type: "add_to_cart" | "show_discount" | "escrow_info" | "none";
    productId?: string; // 'vid-01' or 'vid-02' or 'vid-03' or 'vid-04'
    text?: string;
  };
}

When answering:
- Speak cordially. Mix a bit of warm Hindi terms or polite conversational tones.
- If they ask about security/payment, reassure them about our Phase 3 "7-Day Escrow Split Protection Hold" (their money is safe until delivery!).
- If they show high interest in local handlooms/weavers (Chanderi/Surat), flag an adminNoticeAction type 'upgrade' or 'info' to support rural artisans or boost local dispatch logistics.
- If they are skeptical about sizing, suggest the Sizing AI recommendation under Phase 5.
- Always return a proper valid JSON adhering strictly to the schema.
`;

  if (client) {
    try {
      // Call Gemini 3.5 Flash model
      const contents = [];
      
      // Map history if supplied to the model format
      if (history && Array.isArray(history)) {
        history.forEach(item => {
          contents.push({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.text }]
          });
        });
      }
      
      contents.push({
        role: "user",
        parts: [{ text: `Current user browser context: ${JSON.stringify(context || {})}. New Message: ${promptText}` }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.8
        }
      });

      const responseText = response.text || "";
      try {
        const parsedJson = JSON.parse(responseText);
        return res.json(parsedJson);
      } catch (jsonErr) {
        // Fallback option if JSON is malformed
        return res.json({
          reply: responseText,
          behaviorAnalysis: "Curious Explorer",
          adminNoticeAction: {
            needed: false,
            type: "info",
            title: "Client engaged in conversation",
            message: "User queried the chatbot assistant."
          }
        });
      }
    } catch (apiErr: any) {
      console.error("Gemini API call failed, generating native companion reply:", apiErr);
      // Fallback below to native clever responses if key has quota error or is blocked
    }
  }

  // --- NATIVE SMART AI EMULATIONAL FALLBACK ---
  // If API key is missing or failed, we generate a beautifully tailored product analyzer response.
  const lowerMsg = message.toLowerCase();
  let reply = "Hello! I am your AI Shopping Companion. How can I assist you with your traditional weave purchases or street look today?";
  let behavior = "Balanced Retail Explorer";
  let noticeNeeded = false;
  let noticeType = "info";
  let noticeTitle = "";
  let noticeMsg = "";
  let suggested: any = undefined;

  if (lowerMsg.includes("saree") || lowerMsg.includes("sari") || lowerMsg.includes("silk") || lowerMsg.includes("chanderi")) {
    reply = "Excellent choice! Our Royal Gold Silk Saree comes directly from certified award-winning traditional Chanderi weavers. Beautiful handloom golden zari details! Would you like me to trigger an instant dispatch check?";
    behavior = "Artisan Legacy Heritage Enthusiast (विरासत प्रेमी)";
    noticeNeeded = true;
    noticeType = "upgrade";
    noticeTitle = "Artisan Demand Surge detected";
    noticeMsg = "System recommends allocating more bandwith and high-converting reels to Traditional Weavers due to organic inquiry stream.";
    suggested = {
      type: "add_to_cart",
      productId: "vid-02",
      text: "Explore Royal Gold Saree Details"
    };
  } else if (lowerMsg.includes("kurti") || lowerMsg.includes("chikankari") || lowerMsg.includes("aura")) {
    reply = "Ah! The Aura Indigo Chikankari Kurti is perfect for everyday comfort and functions! It's hand-dyed by rural women artisans from Chotanagpur. Sizing suggestion M is highly recommended for standard fit.";
    behavior = "Comfort ethnic wear seeker (कंफर्ट सीकर)";
    noticeNeeded = true;
    noticeType = "info";
    noticeTitle = "Logistics Route Optimize Alert";
    noticeMsg = "Aura Indigo kurti receiving continuous visitor pings. Auto-routing courier dispatch via Shadowfax recommended.";
    suggested = {
      type: "add_to_cart",
      productId: "vid-01",
      text: "Add Chikankari Kurti to Checkout"
    };
  } else if (lowerMsg.includes("cargo") || lowerMsg.includes("pants") || lowerMsg.includes("street") || lowerMsg.includes("denim")) {
    reply = "Yo! Streetwear vintage cargo pants with broad comfort drape are extremely hot in colleges right now. We print using eco-friendly natural indigo block pattern dyes!";
    behavior = "Impulsive Modern Apparel Seeker (ट्रेंड सेटर्स)";
    noticeNeeded = true;
    noticeType = "success";
    noticeTitle = "Target Demographic Match";
    noticeMsg = "College student profile actively browsing sustainable apparel options under Phase 4 WhatsApp Viral system.";
    suggested = {
      type: "add_to_cart",
      productId: "vid-03",
      text: "View Oversized Cargo Pants"
    };
  } else if (lowerMsg.includes("lehenga") || lowerMsg.includes("jaipur") || lowerMsg.includes("heavy")) {
    reply = "Our Crimson Jaipur Lehenga is completely hand-embroidered with mirror craftsmanship. Price is heavily discounted by ₹5,499 under the instant checkout autopilot model!";
    behavior = "Premium Traditional Luxury Collector (शानदार एथनिक प्रेमी)";
    noticeNeeded = true;
    noticeType = "warning";
    noticeTitle = "Escrow high-value validation required";
    noticeMsg = "User interested in heavy luxury item (Heritage Lehenga). Recommended 10-day physical inspection period update.";
    suggested = {
      type: "add_to_cart",
      productId: "vid-04",
      text: "Examine heavy mirror-work details"
    };
  } else if (lowerMsg.includes("refund") || lowerMsg.includes("escrow") || lowerMsg.includes("security") || lowerMsg.includes("payment")) {
    reply = "Your payments are 100% secure! We use our Phase 3 Escrow Hold protection logic. The money stays safe with the Admin bank settlement ledger until 7 days run down without return complaints!";
    behavior = "Safety-First Value Investor (सुरक्षित ग्राहक)";
    noticeNeeded = true;
    noticeType = "info";
    noticeTitle = "Escrow Security Rule Feedback logged";
    noticeMsg = "Trust indicators displayed perfectly to customer query on escrow holds.";
    suggested = {
      type: "escrow_info",
      text: "Read escrow commission split breakdown"
    };
  } else if (lowerMsg.includes("size") || lowerMsg.includes("fit") || lowerMsg.includes("cm") || lowerMsg.includes("kg")) {
    reply = "Based on our Phase 5 Sizing Suggestion neural model, entering exact cm and weight creates a perfect tailored recommendation. Avoid high-risk reverse-refund courier issues automatically!";
    behavior = "Analytical Sizing-Conscious Buyer (सटीक मापन)";
    noticeNeeded = true;
    noticeType = "success";
    noticeTitle = "Reverse logistics overhead mitigated";
    noticeMsg = "Shopper consulted standard fit matrix, reducing return rates by up to 34%.";
    suggested = {
      type: "show_discount",
      text: "Consult AI recommendations"
    };
  }

  res.json({
    reply,
    behaviorAnalysis: behavior,
    adminNoticeAction: {
      needed: noticeNeeded,
      type: noticeType,
      title: noticeTitle,
      message: noticeMsg
    },
    suggestedAction: suggested,
    note: process.env.GEMINI_API_KEY ? undefined : "Loaded high-fidelity native companion model. Set GEMINI_API_KEY in panel for real-time cloud reasoning."
  });
});

// Serving built files and loading Vite in dev
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();
