import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2,
  ShieldAlert,
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const UnbundlingCalculator: React.FC = () => {
  const { t } = useLanguage();
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <Calculator className="w-3.5 h-3.5" />
          <span>{t.secretsBadge}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.secretsTitle}
        </h2>
        <p className="text-sm text-slate-600">
          {t.secretsSubtitle}
        </p>
      </div>

      {/* Segment Selector */}
      <div className="flex justify-center gap-2 max-w-md mx-auto bg-white p-1.5 rounded-2xl border border-slate-300 shadow-xs">
        <button
          onClick={() => setCarSegment('COMPACT')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            carSegment === 'COMPACT' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Compact (₹10–14L)
        </button>
        <button
          onClick={() => setCarSegment('MID_SUV')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            carSegment === 'MID_SUV' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Mid SUV (₹15–20L)
        </button>
        <button
          onClick={() => setCarSegment('PREMIUM')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            carSegment === 'PREMIUM' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Premium (₹21–28L)
        </button>
      </div>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* The 4 Unbundling Levers */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Tick or untick to see your savings:
          </h3>

          {/* Lever 1: Insurance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="insuranceToggle"
                  checked={optOutInsurance}
                  onChange={(e) => setOptOutInsurance(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-700 border-slate-300 cursor-pointer"
                />
                <label htmlFor="insuranceToggle" className="cursor-pointer">
                  <h4 className="text-sm font-bold text-slate-900">1. Showroom Insurance vs Direct Online</h4>
                  <p className="text-xs text-slate-500">Showrooms charge high insurance rates due to commissions. Online rates for zero-dep are much lower.</p>
                </label>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                Save ₹{(current.dealerInsurance - current.fairInsurance).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400">Showroom Price:</span>
                <div className="font-mono text-red-700 line-through font-semibold">₹{current.dealerInsurance.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <span className="text-slate-600 font-medium">Direct Online Fair Price:</span>
                <div className="font-mono text-emerald-700 font-bold">₹{current.fairInsurance.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>

          {/* Lever 2: Handling Charges */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="handlingToggle"
                  checked={waiveHandling}
                  onChange={(e) => setWaiveHandling(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-700 border-slate-300 cursor-pointer"
                />
                <label htmlFor="handlingToggle" className="cursor-pointer">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>2. Illegal 'Handling & Depot' Charges</span>
                    <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded">
                      Illegal
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500">Supreme Court and Ministry of Road Transport (MoRTH) have banned depot/handling fees.</p>
                </label>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                Save ₹{current.dealerHandling.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400">Showroom Charges:</span>
                <div className="font-mono text-red-700 line-through font-semibold">₹{current.dealerHandling.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <span className="text-slate-600 font-medium">Legal Govt Approved Fee:</span>
                <div className="font-mono text-emerald-700 font-bold">₹0 (Zero)</div>
              </div>
            </div>
          </div>

          {/* Lever 3: Accessories */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="accToggle"
                  checked={optOutAccessories}
                  onChange={(e) => setOptOutAccessories(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-700 border-slate-300 cursor-pointer"
                />
                <label htmlFor="accToggle" className="cursor-pointer">
                  <h4 className="text-sm font-bold text-slate-900">3. Forced Mandatory Accessory Kits</h4>
                  <p className="text-xs text-slate-500">Showrooms pack cheap perfume and chrome strips for ₹25k. Buy only essential mats for ₹4,500.</p>
                </label>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                Save ₹{(current.dealerAccessories - current.fairAccessories).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400">Showroom Forced Pack:</span>
                <div className="font-mono text-red-700 line-through font-semibold">₹{current.dealerAccessories.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <span className="text-slate-600 font-medium">Actual Essential Accessories:</span>
                <div className="font-mono text-emerald-700 font-bold">₹{current.fairAccessories.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>

          {/* Lever 4: Extended Warranty */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="warrToggle"
                  checked={negotiateWarranty}
                  onChange={(e) => setNegotiateWarranty(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-700 border-slate-300 cursor-pointer"
                />
                <label htmlFor="warrToggle" className="cursor-pointer">
                  <h4 className="text-sm font-bold text-slate-900">4. Overpriced Extended Warranty</h4>
                  <p className="text-xs text-slate-500">Pay official car manufacturer rates instead of dealership internal markups.</p>
                </label>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                Save ₹{(current.dealerWarranty - current.fairWarranty).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Real Savings Summary Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm sticky top-24">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">Your Extra Savings</h3>
          </div>

          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-center">
            <span className="text-xs text-emerald-900 font-bold uppercase tracking-wider">
              Cash Saved Right in Your Pocket
            </span>
            <div className="text-4xl sm:text-5xl font-black text-emerald-700 font-mono mt-1">
              ₹{totalUnbundledSavings.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-emerald-800 mt-1 font-medium">
              And this is BEFORE counting your group discount!
            </p>
          </div>

          <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Total Showroom Add-on Charges:</span>
              <span className="font-mono line-through text-red-700 font-bold">
                ₹{standardShowroomMarkupTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-800 font-semibold">What You Fairly Pay:</span>
              <span className="font-mono text-emerald-700 font-bold">
                ₹{unbundledSmartTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">Why CarFair Groups Win:</p>
            <p>
              When you join a CarFair group, dealers agree upfront to remove all 4 of these markups AND give you a bulk group discount on the car price too!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};