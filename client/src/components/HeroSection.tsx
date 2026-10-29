import React from 'react';
import { 
  Users, 
  FileCheck, 
  ShieldAlert, 
  TrendingDown, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  BadgePercent
} from 'lucide-react';

interface HeroSectionProps {
  onExploreGroups: () => void;
  onAuditQuote: () => void;
  selectedCity: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGroups,
  onAuditQuote,
  selectedCity
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 pt-10 pb-16">
      {/* Background ambient automotive light glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold shadow-inner">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>The Indian Car Buying Revolution Has Arrived</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Stop Negotiating ₹15 Lakh Cars Alone for Just <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">Free Floor Mats</span>.
          </h1>

          {/* Subtitle / Utkarsh's Cultural Irony Addressed */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Indians form WhatsApp groups to save ₹30 on groceries, but buy expensive cars in isolation. 
            <strong className="text-white"> CarFair aggregates 20+ verified buyers in {selectedCity === 'All Cities' ? 'your city' : selectedCity}</strong>, 
            forces authorized dealerships to submit competing reverse bids, audits hidden showroom traps with AI, and locks your price with cryptographic guarantee.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreGroups}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4" />
              <span>Join a Verified Group ({selectedCity})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onAuditQuote}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-500 flex items-center justify-center gap-2.5 transition-all"
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Audit Showroom Quote with AI (Free)</span>
            </button>
          </div>

          {/* Value Propositions / Trust Checklist */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>MoRTH Anti-Handling Fee</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unbundled Zero-Dep Insurance</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>DealLock Price Freeze OTP</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>₹5,000 Fuel Card on Invoice Proof</span>
            </div>
          </div>
        </div>

        {/* Live Metric Counters Card */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-sm shadow-lg">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">₹1.42 Cr+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Verified Savings Realized</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-sm shadow-lg">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">₹68,400</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Avg Group Savings / Buyer</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-sm shadow-lg">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">24 Dealerships</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">OEM Authorized Bidders</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 text-center backdrop-blur-sm shadow-lg">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">7-10 Days</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Stock Allocated Fast Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};
