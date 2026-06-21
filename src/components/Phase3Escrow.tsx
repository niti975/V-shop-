/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  Building, 
  ArrowUpRight, 
  HelpCircle, 
  DollarSign, 
  ArrowRightLeft, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle,
  TrendingDown,
  RefreshCw
} from 'lucide-react';
import { OrderItem } from '../types';

export default function Phase3Escrow() {
  // Pre-dispatch order items in Escrow
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: "TX-0891", buyerHandle: "@nitish_rawat", productName: "Premium Kurtis Block Print", amount: 1499, status: "In Escrow", createdDaysAgo: 2 },
    { id: "TX-0892", buyerHandle: "@priya_gems", productName: "Chanderi Handloom Saree", amount: 4200, status: "In Escrow", createdDaysAgo: 5 },
    { id: "TX-0893", buyerHandle: "@rahul_singh", productName: "AirPods Silicon Case", amount: 450, status: "Completed", createdDaysAgo: 9 }
  ]);

  const [inputAmount, setInputAmount] = useState('1200');
  const [inputProduct, setInputProduct] = useState('Phulkari Wool Dupatta');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  
  // Log message tracking
  const [ledgerLogs, setLedgerLogs] = useState<string[]>([
    "System initialized with 10% commission rule.",
    "Order TX-0892 placed into 7-Day Admin Escrow hold."
  ]);

  const addLog = (msg: string) => {
    setLedgerLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  // Create active payment checkout
  const handleSimulatePayment = (e: FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(inputAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const newTxId = `TX-0${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderItem = {
      id: newTxId,
      buyerHandle: "@nitish_rawat",
      productName: inputProduct,
      amount: amountNum,
      status: 'In Escrow',
      createdDaysAgo: 0
    };

    setOrders([newOrder, ...orders]);
    addLog(`Razorpay Route captured ₹${amountNum} via ${paymentMethod} for ${newTxId}. Funds locked in Admin Escrow.`);
    setInputAmount('');
    setInputProduct('');
  };

  // Perform split transfer (Line 14)
  const executeSplit = (id: string) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        const adminShare = (o.amount * 0.10).toFixed(2);
        const sellerShare = (o.amount * 0.80).toFixed(2);
        const deliveryShare = (o.amount * 0.10).toFixed(2);

        addLog(`7-Day Return Period Expired for ${o.id}. Automated Splitter run completed successfully: Admin Commission Match (10%): ₹${adminShare}, Merchant Wallet (80%): ₹${sellerShare}, Delivery Partner (10%): ₹${deliveryShare}`);
        return { ...o, status: 'Completed' };
      }
      return o;
    }));
  };

  // Trigger refund cancellation (Line 15)
  const triggerRefund = (id: string) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        addLog(`Refund request accepted for ${o.id}. Route API released ₹${o.amount} fully. Re-routed to the original funding account.`);
        return { ...o, status: 'Refunded' };
      }
      return o;
    }));
  };

  return (
    <div className="space-y-8" id="phase-3-root">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SECTION: Main Escrow ledger list */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Line 13 • Escrow Holdings</span>
              <h3 className="font-display font-semibold text-lg text-slate-900 mt-0.5">Admin Financial Escrow Safe</h3>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Buyer funds are held in trust in the Admin Escrow account until the 7-day return period completes. This blocks merchant exit fraud.
          </p>

          <div className="space-y-3" id="escrow-orders-table">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className={`p-4 rounded-2xl border transition-all ${
                  order.status === 'In Escrow' ? 'bg-amber-50/40 border-amber-200/50' : 
                  order.status === 'Refunded' ? 'bg-rose-50/20 border-rose-100' : 'bg-slate-50/50 border-slate-200/60'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 font-bold block">{order.id}</span>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-800">{order.productName}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">From: {order.buyerHandle} • {order.createdDaysAgo} days ago</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900">₹{order.amount}</div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9.5px] font-bold ${
                      order.status === 'In Escrow' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                      order.status === 'Refunded' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {order.status === 'In Escrow' && (
                  <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                      Locked: day {order.createdDaysAgo}/7
                    </span>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => triggerRefund(order.id)}
                        className="px-2.5 py-1 text-[10px] font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors"
                        id={`refund-${order.id}`}
                      >
                        Line 15: Refund
                      </button>
                      <button 
                        onClick={() => executeSplit(order.id)}
                        className="px-2.5 py-1 text-[10px] font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
                        id={`split-${order.id}`}
                      >
                        Line 14: Release Payout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT SECTION: Payment gateway simulator & Split parameters */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Mock Razorpay Route formulation Box */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Line 12 • Razorpay Route API</span>
              <h3 className="font-semibold text-slate-900 mt-0.5">Payment Gateway Mock Checkout</h3>
              <p className="text-xs text-slate-500">Inject simulated funds into the escrow workflow.</p>
            </div>

            <form onSubmit={handleSimulatePayment} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Product label</label>
                <input 
                  type="text" 
                  value={inputProduct}
                  onChange={(e) => setInputProduct(e.target.value)}
                  placeholder="E.g. Traditional Dupatta" 
                  required
                  id="checkout-product"
                  className="w-full px-3 py-2 border border-slate-250 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sim Amount (INR)</label>
                  <input 
                    type="number" 
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    placeholder="₹ ₹" 
                    required
                    id="checkout-amount"
                    className="w-full px-3 py-2 border border-slate-250 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Method Choice</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-2 py-2 border border-slate-250 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    id="checkout-method"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Card">Credit Card</option>
                    <option value="COD">OTP Checked-COD</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1 uppercase tracking-wider"
                id="execute-payment-btn"
              >
                <DollarSign className="w-3.5 h-3.5" />
                Trigger Payment Execute
              </button>
            </form>
          </div>

          {/* Real-time Ledger audit log streaming */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-3.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
              Automated Splitter Audit Logs
            </h4>

            <div className="border border-slate-150 bg-slate-50 p-3 rounded-xl h-44 overflow-y-auto space-y-2 font-mono text-[10.5px] text-slate-600">
              {ledgerLogs.map((log, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-1.5 leading-normal">
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
