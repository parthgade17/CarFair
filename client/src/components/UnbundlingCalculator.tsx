import React, { useState } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  AlertOctagon, 
  TrendingDown, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

export const UnbundlingCalculator: React.FC = () => {
  const [carSegment, setCarSegment] = useState<'COMPACT' | 'MID_SUV' | 'PREMIUM'>('MID_SUV');
  const [optOutInsurance, setOptOutInsurance] = useState(true);
  const [optOutAccessories, setOptOutAccessories] = useState(true);
  const [waiveHandling, setWaiveHandling] = useState(true);
  const [negotiateWarranty, setNegotiateWarranty] = useState(true);

  // Preset values based on segment
  const segmentData = {
    COMPACT: {
      name: 'Compact SUV (Nexon / Brezza / Venue)',
      exShowroom: 1150000,
      dealerInsurance: 52000,
      fairInsurance: 29000,
      dealerAccessories: 22000,
      fairAccessories: 4500,
      dealerHandling: 18000,
      fairHandling: 0,
      dealerWarranty: 16000,
      fairWarranty: 12000
    },
    MID_SUV: {
      name: 'Mid-Size SUV (Creta / Seltos / Grand Vitara)',
      exShowroom: 1650000,
      dealerInsurance: 68000,
      fairInsurance: 36000,
      dealerAccessories: 28000,
      fairAccessories: 5500,
      dealerHandling: 24000,
      fairHandling: 0,
      dealerWarranty: 22000,
      fairWarranty: 16000
    },
    PREMIUM: {
      name: 'Premium SUV (XUV700 / Scorpio-N / Harrier)',
      exShowroom: 2300000,
      dealerInsurance: 94000,
      fairInsurance: 48000,
      dealerAccessories: 38000,
      fairAccessories: 7000,
      dealerHandling: 32000,
      fairHandling: 0,
      dealerWarranty: 30000,
      fairWarranty: 21000
    }
  };

  const current = segmentData[carSegment];

  // Calculations
  const insuranceSaving = optOutInsurance ? (current.dealerInsurance - current.fairInsurance) : 0;
  const accessorySaving = optOutAccessories ? (current.dealerAccessories - current.fairAccessories) : 0;
  const handlingSaving = waiveHandling ? (current.dealerHandling - current.fairHandling) : 0;
  const warrantySaving = negotiateWarranty ? (current.dealerWarranty - current.fairWarranty) : 0;

  const totalUnbundledSavings = insuranceSaving + accessorySaving + handlingSaving + warrantySaving;

  const standardShowroomMarkupTotal = current.dealerInsurance + current.dealerAccessories + current.dealerHandling + current.dealerWarranty;
  const unbundledSmartTotal = 
    (optOutInsurance ? current.fairInsurance : current.dealerInsurance) +
    (optOutAccessories ? current.fairAccessories : current.dealerAccessories) +
    (waiveHandling ? current.fairHandling : current.dealerHandling) +
    (negotiateWarranty ? current.fairWarranty : current.dealerWarranty);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Calculator className="w-3.5 h-3.5" />
          <span>The Dealer Profit Secret</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          How Unbundling Saves You ₹45,000 - ₹85,000 Instantly
        </h2>
        <p className="text-sm text-slate-400">
          Car dealerships make almost zero margin on ex-showroom sticker prices. Their real profit comes from four padded add-ons. See how unbundling them changes everything.
        </p>
      </div>

      {/* Segment Selector */}
      <div className="flex justify-center gap-2 max-w-md mx-auto bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setCarSegment('COMPACT')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
            carSegment === 'COMPACT' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Compact SUV (₹10-14L)
        </button>
        <button
          onClick={() => setCarSegment('MID_SUV')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
            carSegment === 'MID_SUV' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Mid SUV (₹15-20L)
        </button>
        <button
          onClick={() => setCarSegment('PREMIUM')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
            carSegment === 'PREMIUM' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Premium (₹21-28L)
        </button>
      </div>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* The 4 Unbundling Levers */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Toggle Add-on Unbundling Levers
          </h3>

          {/* Lever 1: Insurance */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="insuranceToggle"
                  checked={optOutInsurance}
                  onChange={(e) => setOptOutInsurance(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 bg-slate-950 border-slate-700"
                />
                <label htmlFor="insuranceToggle" className="cursor-pointer">
                  <h4 className="text-sm font-bold text-white">1. Direct IRDAI Zero-Dep Insurance</h4>
                  <p className="text-xs text-slate-400">Dealers inflate comprehensive insurance by 50-65% via agency kickbacks.</p>
                </label>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Save ₹{(current.dealerInsurance - current.fairInsurance).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-500">Showroom Price:</span>
                <div className="font-mono text-rose-400 line-through">₹{current.dealerInsurance.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <span className="text-slate-400">Direct Online Rate (Acko/Tata AIG):</span>
                <div className="font-mono text-emerald-400 font-bold">₹{current.fairInsurance.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>

          {/* Lever 2: Handling Charges */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="handlingToggle"
                  checked={waiveHandling}
                  onChange={(e) => setWaiveHandling(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 bg-slate-950 border-slate-700"
                />
                <label htmlFor="handlingToggle" className="cursor-pointer">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>2. Waive Illegal Handling/Depot Charges</span>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded border border-rose-500/30">
                      MoRTH Circular
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400">Supreme Court & transport departments prohibit depot/handling fees.</p>
                </label>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Save ₹{current.dealerHandling.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-500">Showroom Surcharge:</span>
                <div className="font-mono text-rose-400 line-through">₹{current.dealerHandling.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <span className="text-slate-400">CarFair Protected Fee:</span>
                <div className="font-mono text-emerald-400 font-bold">₹0 (Zero)</div>
              </div>
            </div>
          </div>

          {/* Lever 3: Accessories */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="accToggle"
                  checked={optOutAccessories}
                  onChange={(e) => setOptOutAccessories(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 bg-slate-950 border-slate-700"
                />
                <label htmlFor="accToggle" className="cursor-pointer">
                  <h4 className="text-sm font-bold text-white">3. Unbundle Mandatory Accessory Kit</h4>
                  <p className="text-xs text-slate-400">Dealers force ₹25k kits with cheap mudflaps, chrome trim, and perfume.</p>
                </label>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Save ₹{(current.dealerAccessories - current.fairAccessories).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-500">Forced Dealer Kit:</span>
                <div className="font-mono text-rose-400 line-through">₹{current.dealerAccessories.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <span className="text-slate-400">Quality Essential Mats & Mudflaps:</span>
                <div className="font-mono text-emerald-400 font-bold">₹{current.fairAccessories.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>

          {/* Lever 4: Extended Warranty */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="warrToggle"
                  checked={negotiateWarranty}
                  onChange={(e) => setNegotiateWarranty(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 bg-slate-950 border-slate-700"
                />
                <label htmlFor="warrToggle" className="cursor-pointer">
                  <h4 className="text-sm font-bold text-white">4. OEM Direct Extended Warranty</h4>
                  <p className="text-xs text-slate-400">Buy official OEM package without dealership internal markup.</p>
                </label>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Save ₹{(current.dealerWarranty - current.fairWarranty).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Real Savings Summary Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl sticky top-24">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Your Unbundled Real Savings</h3>
          </div>

          <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-2xl p-5 text-center">
            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
              Immediate Extra Savings In Your Pocket
            </span>
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono mt-1">
              ₹{totalUnbundledSavings.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-1">
              Calculated without even counting the group ex-showroom discount!
            </p>
          </div>

          <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Showroom Add-on Cost:</span>
              <span className="font-mono line-through text-rose-400 font-bold">
                ₹{standardShowroomMarkupTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300 font-medium">CarFair Unbundled Equivalent:</span>
              <span className="font-mono text-emerald-400 font-bold">
                ₹{unbundledSmartTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-200">The Power of CarFair Group Buying:</p>
            <p>
              When you join a CarFair group, dealers automatically agree to these unbundled rates and compete on ex-showroom discounts too!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
