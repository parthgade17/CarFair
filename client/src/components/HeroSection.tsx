import React from 'react';
import { 
  Users, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Building,
  Clock
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
    <div className="relative bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>India's Verified Group Car-Buying Network</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Stop Negotiating ₹15 Lakh Cars Alone for Just <span className="text-blue-700 underline decoration-blue-200 decoration-wavy underline-offset-8">Free Floor Mats</span>.
          </h1>

          {/* Subtitle / Utkarsh's Cultural Irony Addressed */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Indians form WhatsApp groups to save ₹30 on groceries, but purchase expensive cars in isolation. 
            <strong className="text-slate-900"> CarFair aggregates 20+ verified buyers in {selectedCity === 'All Cities' ? 'your metro' : selectedCity}</strong>, 
            forces authorized dealerships to submit competing reverse bids, audits hidden showroom traps with AI, and locks your on-road price with a cryptographic guarantee.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreGroups}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Join a Verified Group ({selectedCity})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onAuditQuote}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>Audit Showroom Quote with AI (Free)</span>
            </button>
          </div>

          {/* Trust Checklist */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 border-t border-slate-200">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>MoRTH Anti-Handling Fee</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Unbundled Zero-Dep Insurance</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>DealLock Price Freeze OTP</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>₹5,000 Fuel Card on Invoice Proof</span>
            </div>
          </div>
        </div>

        {/* Live Metric Counters Card - Crisp White & Professional Slate */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">₹1.42 Cr+</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Verified Savings Realized</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono">₹68,400</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Avg Group Savings / Buyer</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">24 Dealerships</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">OEM Authorized Bidders</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-mono">7-10 Days</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Stock Allocated Fast Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};
