import React from 'react';
import { 
  Users, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  Car,
  Tag,
  ShieldCheck,
  Fuel
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
    <div className="bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-b border-slate-200 pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Friendly pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Bulk Buying For New Cars in India</span>
          </div>

          {/* Main Title - Simple, direct, relatable */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Why Negotiate A ₹15 Lakh Car Alone For Just <span className="text-blue-700 underline decoration-blue-200 underline-offset-8">Free Floor Mats</span>?
          </h1>

          {/* Subtitle - Simple everyday language */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            When you buy alone, showrooms give you tiny discounts. 
            <strong> CarFair brings together 20 buyers in {selectedCity === 'All Cities' ? 'your city' : selectedCity}</strong> who want the same car. 
            Dealerships compete with bulk prices, and you pick up your car from the official showroom with guaranteed savings of <strong>₹50,000 to ₹85,000</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onExploreGroups}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>See Active Groups in {selectedCity}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onAuditQuote}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>Check Showroom Quote (Free AI Tool)</span>
            </button>
          </div>

          {/* Simple 4-point reassurance */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 border-t border-slate-200">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Free For Buyers</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Delivery At Official Showroom</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Factory Warranty</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>₹5,000 Free Fuel Card</span>
            </div>
          </div>
        </div>

        {/* 3 Simple Steps: How CarFair Works (Visual Guide) */}
        <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-lg font-bold text-slate-900">How CarFair Works in 3 Simple Steps</h3>
            <p className="text-xs text-slate-500 mt-1">No complicated rules. You get bulk discounts with zero hassle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center mx-auto text-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Join a Car Group</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose the car you want (e.g. Nexon or Creta) and join 15-20 ready buyers in your city. Joining is completely free.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center mx-auto text-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Dealers Compete For You</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authorized dealerships compete to give the lowest on-road price. More buyers in your group = higher discount unlocked.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center mx-auto text-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Pick Up Your Car & Save</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Walk into the official showroom with your <strong>Price Lock Pass</strong>. The dealer cannot increase the price. You drive away happy!
              </p>
            </div>
          </div>
        </div>

        {/* Real Metrics - Simple Language */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">₹1.42 Cr+</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Saved by Indian Buyers</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono">₹68,400</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Average Savings Per Car</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">24 Showrooms</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Official Partner Dealerships</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-mono">7 Days</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Average Delivery Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};
