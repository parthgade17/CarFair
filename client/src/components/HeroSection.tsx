import React, { useState } from 'react';
import { 
  Users, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Tag,
  Search,
  FileText,
  Building2,
  Sparkles,
  HelpCircle,
  Car as CarIcon,
  X,
  Send,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();

  // Pilot Waitlist Modals
  const [isBuyerWaitlistOpen, setIsBuyerWaitlistOpen] = useState(false);
  const [isDealerModalOpen, setIsDealerModalOpen] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [dealerSubmitted, setDealerSubmitted] = useState(false);

  // Buyer Waitlist Form State
  const [buyerCar, setBuyerCar] = useState('Tata Nexon');
  const [buyerCity, setBuyerCity] = useState(selectedCity === 'All Cities' ? 'Pune' : selectedCity);
  const [buyerBudget, setBuyerBudget] = useState('₹10 Lakh - ₹15 Lakh');
  const [buyerTimeline, setBuyerTimeline] = useState('Next 30 Days');
  const [buyerPhone, setBuyerPhone] = useState('');

  // Dealer Sign-up State
  const [dealerName, setDealerName] = useState('');
  const [dealerBrand, setDealerBrand] = useState('Tata');
  const [dealerCity, setDealerCity] = useState(selectedCity === 'All Cities' ? 'Pune' : selectedCity);
  const [dealerContact, setDealerContact] = useState('');
  const [dealerPhone, setDealerPhone] = useState('');

  const handleBuyerWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistSubmitted(true);
    setTimeout(() => {
      setWaitlistSubmitted(false);
      setIsBuyerWaitlistOpen(false);
    }, 2500);
  };

  const handleDealerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDealerSubmitted(true);
    setTimeout(() => {
      setDealerSubmitted(false);
      setIsDealerModalOpen(false);
    }, 2500);
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/80 border-b border-slate-200 overflow-hidden pt-8 pb-16">
      {/* Subtle Background Accent Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Official Brand Identity & Logo */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative flex items-center justify-center p-2 w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-emerald-400/10 to-transparent rounded-full blur-3xl -z-10" />

              <img
                src="/carfair-logo.png"
                alt="CarFair — Smart Buyers Ki Smart Deal"
                className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
              <span>🇮🇳 Smart Buyers Ki Smart Deal</span>
            </div>
          </div>

          {/* Right Column: Priority 1 Headline, Subheading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Pilot Live</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-800 font-bold">{selectedCity === 'All Cities' ? 'Pune & Metros' : selectedCity}</span>
            </div>

            {/* Priority 1 Suggested Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Your Dream Car.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-700 to-emerald-600">
                A Smarter Deal.
              </span>
            </h1>

            {/* Priority 1 Subheading */}
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl">
              <strong>Ek car nahi, collective buying power!</strong> Join buyers in your city, compare competing dealer offers, and find the right deal for your budget.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreGroups}
                className="px-7 py-4 rounded-xl font-bold text-sm bg-blue-900 hover:bg-blue-950 text-white shadow-md shadow-blue-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Find My Car Deal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreGroups}
                className="px-7 py-4 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-blue-700" />
                <span>Explore Active Groups</span>
              </button>
            </div>

            {/* Three Clear Benefits Below Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 border-t border-slate-200/80 pt-4">
              <div className="flex items-center gap-2 font-semibold">
                <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Competing dealer offers</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Search className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Transparent price comparisons</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Documented quotations</span>
              </div>
            </div>

            {/* Quick Pilot Waitlist & Dealer Onboarding Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500">
              <span>Looking for a custom model or dealership partnership?</span>
              <button
                onClick={() => setIsBuyerWaitlistOpen(true)}
                className="text-blue-700 font-bold hover:underline cursor-pointer"
              >
                + Join Buyer Waitlist
              </button>
              <span>•</span>
              <button
                onClick={() => setIsDealerModalOpen(true)}
                className="text-amber-800 font-bold hover:underline cursor-pointer"
              >
                + Showroom Dealership Sign-up
              </button>
            </div>
          </div>
        </div>

        {/* Priority 1 & 7: 5 Simple Steps - How CarFair Works (Plain Language) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Clear & Honest Process</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">How CarFair Works in 5 Simple Steps</h3>
            <p className="text-xs text-slate-500">
              No hidden fees, no cold calling, and zero middleman markup. You buy directly from authorized brand showrooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-black flex items-center justify-center mx-auto text-xs">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Select Car & City</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Choose your exact model, variant, and expected purchase window in your city.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-black flex items-center justify-center mx-auto text-xs">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Join or Start Pool</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Pool interest with verified local buyers with 100% free registration.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-black flex items-center justify-center mx-auto text-xs">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Dealers Compete</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Local brand showrooms submit verified, itemised on-road offers to win the batch.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-black flex items-center justify-center mx-auto text-xs">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Audit with QuoteTruth</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Separate mandatory statutory taxes from illegal handling charges and inflated insurance.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-black flex items-center justify-center mx-auto text-xs">
                5
              </div>
              <h4 className="font-bold text-slate-900 text-xs">Showroom Delivery</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Show your Price Lock PIN, pay the showroom directly, inspect your VIN, and drive home.
              </p>
            </div>
          </div>
        </div>

        {/* Priority 6: Business Model Transparency - How CarFair Earns */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Total Trust & Transparency</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">How Does CarFair Earn Money?</h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full">
              100% Free for Car Buyers • Zero Hidden Markups
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
              <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Cost to Buyers</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Joining a car group, auditing quotations, and locking offers is completely free for car buyers. We never charge booking fees or advisory commissions.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
              <h4 className="font-bold text-blue-400 text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Transparent Dealer Platform Fee</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Showrooms pay CarFair a nominal fulfillment listing fee upon successful vehicle delivery because we bring ready pre-approved buyer cohorts, eliminating their marketing acquisition cost.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
              <h4 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Zero Insurance / Loan Kickbacks</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Unlike traditional agents, CarFair never earns secret commissions on overpriced dealership insurance or high-interest loans. You choose whatever insurer you want.
              </p>
            </div>
          </div>
        </div>

        {/* Priority 1: Labelled Pilot Metrics & Trust Pillars */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider text-slate-700">CarFair Buyer Protection Pillars</span>
            <span className="italic text-[11px]">*Operating in Pune & major metro pilot corridors.</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">100% Free</div>
              <div className="text-xs text-slate-700 mt-1 font-bold">Zero Cost to Buyers</div>
              <div className="text-[10px] text-slate-500">No booking or advisory fees</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-blue-900 font-mono">Direct OEM</div>
              <div className="text-xs text-slate-700 mt-1 font-bold">Authorised Showrooms</div>
              <div className="text-[10px] text-slate-500">Direct invoicing & delivery</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">QuoteTruth</div>
              <div className="text-xs text-slate-700 mt-1 font-bold">Itemised Price Audit</div>
              <div className="text-[10px] text-slate-500">Separates taxes from illegal fees</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">Price Lock</div>
              <div className="text-xs text-slate-700 mt-1 font-bold">Verified 6-Digit PIN</div>
              <div className="text-[10px] text-slate-500">Deal honour protection at delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Buyer Pilot Waitlist Modal */}
      {isBuyerWaitlistOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CarIcon className="w-5 h-5 text-blue-700" />
                <h3 className="font-extrabold text-slate-900 text-base">Join Buyer Pilot Waitlist</h3>
              </div>
              <button 
                onClick={() => setIsBuyerWaitlistOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {waitlistSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">You are on the Pilot List!</h4>
                <p className="text-xs text-slate-600">
                  We'll notify you as soon as buyers in {buyerCity} pool for {buyerCar}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBuyerWaitlistSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Car Model</label>
                  <input
                    type="text"
                    value={buyerCar}
                    onChange={(e) => setBuyerCar(e.target.value)}
                    placeholder="e.g. Maruti Brezza, Hyundai Creta"
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">City</label>
                    <select
                      value={buyerCity}
                      onChange={(e) => setBuyerCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                    >
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Purchase Timeline</label>
                    <select
                      value={buyerTimeline}
                      onChange={(e) => setBuyerTimeline(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                    >
                      <option value="Next 15 Days">Next 15 Days</option>
                      <option value="Next 30 Days">Next 30 Days</option>
                      <option value="Next 60 Days">Next 60 Days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your On-Road Budget</label>
                  <select
                    value={buyerBudget}
                    onChange={(e) => setBuyerBudget(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                  >
                    <option value="Under ₹10 Lakh">Under ₹10 Lakh</option>
                    <option value="₹10 Lakh - ₹15 Lakh">₹10 Lakh - ₹15 Lakh</option>
                    <option value="₹15 Lakh - ₹25 Lakh">₹15 Lakh - ₹25 Lakh</option>
                    <option value="Above ₹25 Lakh">Above ₹25 Lakh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+91 98901 23456"
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reserve Free Spot in Pilot</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Showroom Partner Sign-up Modal */}
      {isDealerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-700" />
                <h3 className="font-extrabold text-slate-900 text-base">Showroom Dealership Sign-up</h3>
              </div>
              <button 
                onClick={() => setIsDealerModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {dealerSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Application Received!</h4>
                <p className="text-xs text-slate-600">
                  Our Dealership Partner Team will contact your dealership within 24 hours to verify dealership credentials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDealerSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Dealership Name</label>
                  <input
                    type="text"
                    value={dealerName}
                    onChange={(e) => setDealerName(e.target.value)}
                    placeholder="e.g. Bafna Motors Flagship"
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Brand</label>
                    <select
                      value={dealerBrand}
                      onChange={(e) => setDealerBrand(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                    >
                      <option value="Tata">Tata Motors</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Mahindra">Mahindra</option>
                      <option value="Maruti Suzuki">Maruti Suzuki</option>
                      <option value="Kia">Kia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={dealerCity}
                      onChange={(e) => setDealerCity(e.target.value)}
                      placeholder="e.g. Pune"
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Authorized Person & Role</label>
                  <input
                    type="text"
                    value={dealerContact}
                    onChange={(e) => setDealerContact(e.target.value)}
                    placeholder="e.g. Rajesh Kulkarni (General Sales Manager)"
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Official Mobile / Direct Line</label>
                  <input
                    type="tel"
                    value={dealerPhone}
                    onChange={(e) => setDealerPhone(e.target.value)}
                    placeholder="+91 98220 44100"
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Submit Dealership Partner Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
