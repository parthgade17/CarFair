import React from 'react';
import { 
  Users, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Check
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
    <div className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/80 border-b border-slate-200 overflow-hidden pt-8 pb-16">
      {/* Subtle Background Accent Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main Hero Grid: Left Content + Right Brand Logo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge with City */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>India's Verified Group Car-Buying Platform</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700 font-bold">{selectedCity === 'All Cities' ? 'Pan-India' : selectedCity}</span>
            </div>

            {/* Main Design Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Smart Buyers Ki{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
                Smart Deal!
              </span>
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreGroups}
                className="px-7 py-4 rounded-xl font-bold text-sm bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Join a Car Group for Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onAuditQuote}
                className="px-7 py-4 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <span>Check My Showroom Quote</span>
              </button>
            </div>

            {/* Reassurance Trust Pills */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">100% Free for Buyers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Official Showroom Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Full Factory Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">₹5,000 Free Petrol Card</span>
              </div>
            </div>
          </div>

          {/* Right Column: Official Brand Logo Display (Replacing active pools box) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md bg-white/80 backdrop-blur-sm border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center group">
              {/* Soft ambient brand color glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-emerald-500/15 to-blue-600/10 rounded-3xl blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Official CarFair Logo Image with Transparent Background */}
              <img
                src="/carfair-logo.png"
                alt="CarFair — Smart Buyers Ki Smart Deal"
                className="w-full max-w-[300px] sm:max-w-[340px] h-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />

              {/* Verified Trust Badges Footer inside card */}
              <div className="mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Dealership Network
                </span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Zero Brokerage
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Simple Steps: How CarFair Works */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">How It Works</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">3 Simple Steps to Group Savings</h3>
            <p className="text-xs text-slate-500 mt-1">Direct from official showrooms with zero middleman hassle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white font-black flex items-center justify-center mx-auto text-sm shadow-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Join a Car Group (Free)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your desired car model and reserve your spot in a group of 15–20 buyers in your city. No advance fees required.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white font-black flex items-center justify-center mx-auto text-sm shadow-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Showrooms Compete</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official dealerships in your region submit bulk offers to win the group. You unlock maximum cash discounts and free official perks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center mx-auto text-sm shadow-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Pick Up at Showroom & Save</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Show your 6-digit Price Lock PIN at the dealership. Pay directly, take delivery with full factory warranty, and save ₹50k–₹1L!
              </p>
            </div>
          </div>
        </div>

        {/* Real Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">₹1.42 Cr+</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Saved by Indian Car Buyers</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-blue-700 font-mono">₹68,400</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Average Savings Per Car</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">24 Showrooms</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Authorised Partner Dealerships</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-indigo-700 font-mono">7 Days</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Average Stock Delivery Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};