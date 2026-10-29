import React, { useState } from 'react';
import { 
  Users, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  Building,
  Check,
  Fuel,
  ChevronRight
} from 'lucide-react';
import { CarFairLogo } from './Logo';

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
  // Active preview car for interactive hero showcase card
  const [activeCarTab, setActiveCarTab] = useState<'nexon' | 'creta' | 'xuv700'>('nexon');

  const previewCars = {
    nexon: {
      name: 'Tata Nexon Creative+ AMT',
      segment: 'Compact SUV',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      showroomPrice: 1362000,
      groupPrice: 1294000,
      savings: 68000,
      joined: 18,
      target: 20,
      bids: 3,
      perk: 'Free 5-Yr Warranty + Mats'
    },
    creta: {
      name: 'Hyundai Creta SX (O) 1.5 Petrol',
      segment: 'Mid-Size SUV',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      showroomPrice: 1985000,
      groupPrice: 1904000,
      savings: 81000,
      joined: 16,
      target: 20,
      bids: 4,
      perk: 'Zero Handling Fee + Fast Delivery'
    },
    xuv700: {
      name: 'Mahindra XUV700 AX7 Diesel AT',
      segment: 'Premium 7-Seater',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      showroomPrice: 2540000,
      groupPrice: 2445000,
      savings: 95000,
      joined: 19,
      target: 25,
      bids: 4,
      perk: 'Priority VIN Allocation'
    }
  };

  const currentCar = previewCars[activeCarTab];

  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/80 border-b border-slate-200 overflow-hidden pt-8 pb-16">
      {/* Subtle Background Accent Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main Hero Grid: Left Content + Right Interactive Showcase */}
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Buy Your Next Car Together.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
                Save ₹50,000 to ₹1,00,000.
              </span>
            </h1>

            {/* Clean Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              We bring together ready car buyers in {selectedCity === 'All Cities' ? 'your city' : selectedCity}. 
              Authorised brand dealerships compete with their best bulk discounts—so you get fleet-level pricing without individual showroom haggling.
            </p>

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

          {/* Right Column: Interactive Live Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
              {/* Top Selector Tabs */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Live Active Pools ({selectedCity})
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Verified Savings
                </span>
              </div>

              {/* Car Selection Pills */}
              <div className="flex gap-2 my-3">
                <button
                  onClick={() => setActiveCarTab('nexon')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCarTab === 'nexon' ? 'bg-blue-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Nexon
                </button>
                <button
                  onClick={() => setActiveCarTab('creta')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCarTab === 'creta' ? 'bg-blue-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Creta
                </button>
                <button
                  onClick={() => setActiveCarTab('xuv700')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCarTab === 'xuv700' ? 'bg-blue-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  XUV700
                </button>
              </div>

              {/* Showcase Card Image & Details */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-200">
                <img
                  src={currentCar.image}
                  alt={currentCar.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                    {currentCar.segment}
                  </span>
                  <h3 className="text-base font-bold drop-shadow">{currentCar.name}</h3>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through font-mono">
                      Showroom Price: ₹{currentCar.showroomPrice.toLocaleString('en-IN')}
                    </span>
                    <div className="text-2xl font-black text-emerald-700 font-mono">
                      ₹{currentCar.groupPrice.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-medium">Group Discount</span>
                    <div className="text-xs font-black font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
                      Save ₹{currentCar.savings.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">
                      {currentCar.joined} of {currentCar.target} buyers joined
                    </span>
                    <span className="text-amber-700 font-bold text-[11px]">
                      {currentCar.target - currentCar.joined} spots left
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(currentCar.joined / currentCar.target) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    {currentCar.perk}
                  </span>
                  <span className="font-semibold text-blue-700">
                    {currentCar.bids} Showrooms Bidding
                  </span>
                </div>
              </div>

              {/* Quick Action Button */}
              <button
                onClick={onExploreGroups}
                className="mt-4 w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>View {currentCar.name} Group</span>
                <ChevronRight className="w-4 h-4" />
              </button>
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