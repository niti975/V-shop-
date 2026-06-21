/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { 
  HeartCrack, 
  UploadCloud, 
  CheckCircle, 
  AlertOctagon, 
  ShieldAlert, 
  Cpu, 
  HelpCircle,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function Phase5AntiFraud() {
  // Sizing Engine inputs (Line 21)
  const [heightCm, setHeightCm] = useState('172');
  const [weightKg, setWeightKg] = useState('70');
  const [fitPreference, setFitPreference] = useState<'Slim' | 'Regular' | 'Relaxed'>('Regular');
  const [computedSize, setComputedSize] = useState('');

  // Unboxing return validation states (Line 26)
  const [uploadedVideoName, setUploadedVideoName] = useState('');
  const [returnReason, setReturnReason] = useState('Size did not fit');
  const [uploadedComplete, setUploadedComplete] = useState(false);
  const [returnStatus, setReturnStatus] = useState<'idle' | 'pending_proof' | 'authorized'>('idle');

  // COD Fraud statistics (Line 27)
  const [codAttempts, setCodAttempts] = useState(3);
  const [deviceIpBlocked, setDeviceIpBlocked] = useState(false);

  // Line 21 Sizing Computation logic
  const calculateSizingSuggestion = (e: FormEvent) => {
    e.preventDefault();
    const height = parseFloat(heightCm);
    const weight = parseFloat(weightKg);

    if (isNaN(height) || isNaN(weight)) return;

    // Standard physical weight-to-height classification logic
    let size = 'M';
    if (weight < 60) {
      size = height < 165 ? 'XS' : 'S';
    } else if (weight >= 60 && weight < 75) {
      size = height < 170 ? 'S' : 'M';
    } else if (weight >= 75 && weight < 90) {
      size = height < 175 ? 'M' : 'L';
    } else {
      size = height < 180 ? 'XL' : 'XXL';
    }

    // Apply fit compensation adjustments
    if (fitPreference === 'Slim' && size !== 'XS') {
      if (size === 'S') size = 'XS';
      else if (size === 'M') size = 'S';
      else if (size === 'L') size = 'M';
      else if (size === 'XL') size = 'L';
      else if (size === 'XXL') size = 'XL';
    } else if (fitPreference === 'Relaxed') {
      if (size === 'XS') size = 'S';
      else if (size === 'S') size = 'M';
      else if (size === 'M') size = 'L';
      else if (size === 'L') size = 'XL';
      else if (size === 'XL') size = 'XXL';
    }

    setComputedSize(size);
  };

  // Line 26 Return authorization Trigger
  const handleReturnUploadSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!uploadedVideoName) {
      setReturnStatus('pending_proof');
      return;
    }
    setReturnStatus('authorized');
  };

  const handleMockVideoUpload = () => {
    setUploadedVideoName('unboxing_packet_TX891.mp4');
    setUploadedComplete(true);
  };

  // COD cancel iteration (Line 27)
  const incrementCodCancelFraudRisk = () => {
    setCodAttempts(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setDeviceIpBlocked(true);
      }
      return next;
    });
  };

  const resetCodSafety = () => {
    setCodAttempts(0);
    setDeviceIpBlocked(false);
  };

  return (
    <div className="space-y-8" id="phase-5-root">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* COL 1: Smart AI Sizing Engine */}
        <div className="md:col-span-6 bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Line 21 • Smart AI Size</span>
              <h3 className="font-display font-semibold text-lg text-slate-900 mt-0.5">Sizing AI Recommender</h3>
            </div>
            <Cpu className="w-5 h-5 text-amber-500" />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Mitigate size-related returns. Input height, weight, and fit style preference to suggest optimized sizing based on standard fabric curves.
          </p>

          <form onSubmit={calculateSizingSuggestion} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Height (cm)</label>
                <input 
                  type="number" 
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="Height in cm" 
                  required
                  id="sizing-height"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Weight (kg)</label>
                <input 
                  type="number" 
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="Weight in kg" 
                  required
                  id="sizing-weight"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Fit Preference</label>
              <div className="flex gap-2">
                {(['Slim', 'Regular', 'Relaxed'] as const).map((fit) => (
                  <button
                    key={fit}
                    type="button"
                    onClick={() => setFitPreference(fit)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                      fitPreference === fit 
                        ? 'bg-slate-950 text-white border-slate-950' 
                        : 'bg-slate-50 text-slate-650 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 uppercase tracking-wide"
              id="compute-sizing-btn"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Compute Optimal Clothes Fit
            </button>
          </form>

          {computedSize && (
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 text-center space-y-1.5" id="suggested-size-output">
              <span className="text-[10px] uppercase font-mono text-amber-400 font-bold tracking-wider">AI Sizing Recommendation</span>
              <div className="text-4xl font-display font-extrabold text-white tracking-tight">{computedSize}</div>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                Validated logic suggest size <strong className="text-white">{computedSize}</strong> fits your body dimensions correctly.
              </p>
            </div>
          )}
        </div>

        {/* COL 2: Unboxing Mandate + COD Fraud Blocker */}
        <div className="md:col-span-6 space-y-6">
          
          {/* Unboxing Video Mandate Return Portal (Line 26) */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Line 26 • Low Return Control</span>
                <h3 className="font-semibold text-slate-900 mt-0.5">Unboxing Video Mandate Gate</h3>
              </div>
              <HeartCrack className="w-4.5 h-4.5 text-rose-500" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              To suppress fraudulent complaints (where users insert empty boxes), customers must upload an unboxing video in the return flow.
            </p>

            <form onSubmit={handleReturnUploadSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Return Reason</label>
                <input 
                  type="text" 
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none"
                  id="return-reason-input"
                />
              </div>

              {/* Upload Mandate box */}
              <div className="border-2 border-dashed border-slate-200 hover:border-amber-400/65 rounded-2xl p-4 text-center transition-colors">
                {!uploadedVideoName ? (
                  <div className="space-y-2">
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                    <div className="text-xs font-semibold text-slate-700">Required: Upload Unboxing Video Proof</div>
                    <p className="text-[10px] text-slate-400 leading-normal">Drag and drop or click below to simulate unboxing MP4 video attach</p>
                    <button 
                      type="button" 
                      onClick={handleMockVideoUpload}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10.5px] font-bold rounded-lg"
                      id="mock-upload-video"
                    >
                      Attach Simulated MP4 File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto" />
                    <div className="text-xs font-bold text-slate-800">Video Proof Attached</div>
                    <code className="text-[10px] font-mono text-emerald-600">{uploadedVideoName}</code>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full py-2 bg-slate-950 hover:bg-slate-850 text-white font-bold text-xs rounded-xl uppercase tracking-wider"
                id="submit-return-request"
              >
                Submit Return Request
              </button>
            </form>

            {/* Validation returns output feedback */}
            {returnStatus === 'pending_proof' && (
              <div className="p-3 bg-red-50 rounded-xl border border-red-200/60 flex items-start gap-2 text-red-800 text-xs">
                <AlertOctagon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Error - Returns Locked:</strong> You are strictly forbidden to request returns without attaching a verified unboxing proof video.
                </div>
              </div>
            )}

            {returnStatus === 'authorized' && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 flex items-start gap-2 text-emerald-800 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Return Request Authorized:</strong> Unboxing proof attached successfully. Our reverse courier dispatcher will arrive to collect the package.
                </div>
              </div>
            )}
          </div>

          {/* COD FRAUD BLOCKER ALGORITHM: Line 27 */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600">Line 27 • COD Fraud Blocker</span>
                <h3 className="font-semibold text-slate-900 mt-0.5">Device IP COD Blocker Rules</h3>
              </div>
              <ShieldAlert className="w-4.5 h-4.5 text-amber-500" />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Limits risk of fake Cash-on-Delivery orders. New accounts are restricted to ₹2,000 max orders. Users with repeated consecutive cancellations get their COD privileges terminated automatically.
            </p>

            <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
              <div>
                <div className="text-slate-400 font-bold uppercase text-[9px] font-mono">Simulated COD cancel count</div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">{codAttempts} Cancellations</div>
              </div>

              <div>
                {deviceIpBlocked ? (
                  <span className="px-2.5 py-1 bg-red-100 text-red-800 font-bold rounded-lg text-[10.5px] uppercase tracking-wide animate-pulse">
                    🚨 COD Blocked!
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-850 font-bold rounded-lg text-[10.5px]">
                    COD Privileges Active
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={incrementCodCancelFraudRisk}
                className="flex-1 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg"
                id="sim-cod-cancel"
              >
                Log Fake COD Cancel
              </button>
              <button 
                onClick={resetCodSafety}
                className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                id="reset-cod-safety"
              >
                Reset Account Stats
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
