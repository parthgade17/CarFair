import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Gavel, 
  Key, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Dealer, BuyingGroup } from '../types';
import { fetchDealers, fetchGroups, submitDealerBid } from '../services/api';

export const DealerPortalView: React.FC = () => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [groups, setGroups] = useState<BuyingGroup[]>([]);
  const [selectedDealerId, setSelectedDealerId] = useState('dealer-bafna-tata-pune');

  // Verify OTP State
  const [otpInput, setOtpInput] = useState('');
  const [voucherInput, setVoucherInput] = useState('');
  const [otpVerificationStatus, setOtpVerificationStatus] = useState<string | null>(null);

  // Quick Bid State
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [bidDiscount, setBidDiscount] = useState(48000);
  const [deliveryDays, setDeliveryDays] = useState(6);
  const [bidSuccessMessage, setBidSuccessMessage] = useState('');

  useEffect(() => {
    fetchDealers().then(d => {
      setDealers(d);
      if (d.length > 0) setSelectedDealerId(d[0].id);
    });
    fetchGroups().then(g => {
      setGroups(g);
      if (g.length > 0) setSelectedGroupId(g[0].id);
    });
  }, []);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.length === 6) {
      setOtpVerificationStatus('SUCCESS');
    } else {
      setOtpVerificationStatus('ERROR');
    }
  };

  const handleDealerBid = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentDealer = dealers.find(d => d.id === selectedDealerId);
    const res = await submitDealerBid(selectedGroupId, {
      dealerId: selectedDealerId,
      dealerName: currentDealer?.name || 'Authorized Dealership',
      exShowroomDiscount: bidDiscount,
      corporateExchangeBonus: 15000,
      freebies: ['5-Yr Extended Warranty', '7D Floor Mats', 'Ceramic Polish'],
      insuranceMatchPrice: 32000,
      waivedHandlingCharges: true,
      deliveryDays,
      terms: 'Ready stock allocation in plant. Price valid for CarFair group.'
    });

    if (res.success) {
      setBidSuccessMessage('Offer submitted! Your quote is now visible to the buyer group.');
      setTimeout(() => setBidSuccessMessage(''), 3000);
    }
  };

  const currentDealer = dealers.find(d => d.id === selectedDealerId) || dealers[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Showroom Partner Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dealership Portal: Win Ready Bulk Buyer Pools
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Hit your monthly volume sales targets with 15–20 pre-approved buyers, zero customer acquisition cost, and express delivery allocation.
          </p>
        </div>

        {/* Dealer Switcher */}
        {dealers.length > 0 && (
          <div className="bg-white border border-slate-300 rounded-xl p-2 flex items-center gap-2 shadow-xs">
            <span className="text-xs text-slate-500 font-medium pl-2">Logged-in Dealership:</span>
            <select
              value={selectedDealerId}
              onChange={(e) => setSelectedDealerId(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-2.5 py-1.5 focus:bg-white focus:outline-none focus:border-amber-600 font-semibold cursor-pointer"
            >
              {dealers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.city})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Target Status Bar */}
      <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Month-End Manufacturer Target Status
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-[10px] font-black">
              88% Achieved
            </span>
          </div>
          <p className="text-xs text-slate-700">
            {currentDealer?.name}: 12 more deliveries needed to unlock the ₹45 Lakh manufacturer quarterly bonus slab.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-medium">Ready Stock Available</span>
            <div className="text-lg font-bold font-mono text-emerald-800">
              {currentDealer?.inventoryReadyCount || 18} Units in Transit
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Groups to Bid On */}
        <div className="lg:col-span-7 space-y-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-700" />
            <span>Active Buyer Groups Looking for Showroom Offers ({groups.length})</span>
          </h3>

          <div className="space-y-4">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{group.carName}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{group.communityName}</span> • 
                      <strong className="text-emerald-700 font-bold">{group.verifiedBuyers} Pre-Approved Buyers</strong>
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 text-blue-800 border border-slate-200">
                    {group.city}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-xs border border-slate-100">
                  <div>
                    <span className="text-slate-500 font-medium">Group Goal:</span>
                    <div className="font-bold text-slate-800">{group.targetBuyers} Cars</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Buyers Joined:</span>
                    <div className="font-bold text-slate-900">{group.currentBuyers} Buyers</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Lowest Showroom Offer:</span>
                    <div className="font-bold font-mono text-emerald-700">₹{group.currentBestGroupPrice.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                {/* Quick Submit Bid form */}
                <form onSubmit={handleDealerBid} className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs items-end">
                  <div>
                    <label className="block text-slate-600 font-medium text-[11px] mb-1">Your Cash Discount (₹)</label>
                    <input
                      type="number"
                      value={bidDiscount}
                      onChange={(e) => setBidDiscount(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 font-mono font-medium focus:bg-white focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium text-[11px] mb-1">Delivery Time (Days)</label>
                    <input
                      type="number"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 font-mono font-medium focus:bg-white focus:border-amber-600"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={() => setSelectedGroupId(group.id)}
                    className="py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>Submit Offer</span>
                  </button>
                </form>

                {bidSuccessMessage && selectedGroupId === group.id && (
                  <p className="text-xs text-emerald-800 font-bold">{bidSuccessMessage}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: DealLock OTP Verification Portal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Key className="w-4 h-4 text-amber-700" />
              <h3 className="text-sm font-bold text-slate-900">Showroom Check-In: Verify Buyer PIN</h3>
            </div>

            <p className="text-xs text-slate-600">
              When a CarFair buyer arrives at your showroom with their Price Lock Pass, enter their 6-digit PIN below to confirm the booking price.
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Price Lock Pass Number</label>
                <input
                  type="text"
                  placeholder="e.g. CF-LOCK-MH-8421"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono text-xs focus:bg-white focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-amber-900 font-bold mb-1">Buyer's 6-Digit PIN</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full bg-amber-50 border-2 border-amber-300 rounded-lg px-3 py-2 text-amber-900 font-mono font-bold text-lg tracking-widest text-center focus:bg-white focus:border-amber-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify PIN & Confirm Booking</span>
              </button>
            </form>

            {otpVerificationStatus === 'SUCCESS' && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <Check className="w-4 h-4" />
                  <span>PIN Verified Successfully!</span>
                </div>
                <p>Booking confirmed under CarFair terms. Vehicle VIN allocated.</p>
              </div>
            )}

            {otpVerificationStatus === 'ERROR' && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Please enter a valid 6-digit PIN.</span>
              </div>
            )}
          </div>

          {/* Dealership Benefits Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Why Authorised Dealerships Partner with CarFair</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 pl-4 list-disc text-[11px]">
              <li><strong>Zero Cold Calling:</strong> Verified buyers with pre-approved finance ready to purchase.</li>
              <li><strong>Volume Target Triggers:</strong> Achieve OEM quarterly bonuses easily with group orders.</li>
              <li><strong>Fast Inventory Rotation:</strong> Clear transit stock in 5 to 8 days.</li>
              <li><strong>Secure PIN Verification:</strong> Transparent booking confirmation.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};