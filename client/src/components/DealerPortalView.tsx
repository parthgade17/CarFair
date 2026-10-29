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
      freebies: ['5-Yr Extended Warranty', '7D Floor Mats', 'Ceramic Shield'],
      insuranceMatchPrice: 32000,
      waivedHandlingCharges: true,
      deliveryDays,
      terms: 'Confirmed Ready Stock in Plant. Price valid for CarFair pool.'
    });

    if (res.success) {
      setBidSuccessMessage('Bid submitted! Your offer is now displayed in the Live Reverse Bidding Arena.');
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
            <span>OEM Authorised Dealership Arena</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dealership Portal: Compete for Verified Demand Pools
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Hit your monthly volume quotas with 20+ ready buyers, zero customer acquisition cost, and express delivery allocation.
          </p>
        </div>

        {/* Dealer Switcher */}
        {dealers.length > 0 && (
          <div className="bg-white border border-slate-300 rounded-xl p-2 flex items-center gap-2 shadow-xs">
            <span className="text-xs text-slate-500 font-medium pl-2">Active Dealership:</span>
            <select
              value={selectedDealerId}
              onChange={(e) => setSelectedDealerId(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-2.5 py-1.5 focus:bg-white focus:outline-none focus:border-amber-600 font-semibold"
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

      {/* Target Rush Status Bar */}
      <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              October Month-End OEM Target Progress
            </span>
            <span className="px-2 py-0.2 rounded bg-amber-200 text-amber-950 text-[10px] font-black">
              88% Achieved
            </span>
          </div>
          <p className="text-xs text-slate-700">
            {currentDealer?.name}: 12 more deliveries required before October 31st to unlock ₹45 Lakh manufacturer incentive slab.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-medium">Available Ready Stock</span>
            <div className="text-lg font-bold font-mono text-emerald-800">
              {currentDealer?.inventoryReadyCount || 18} Units In-Transit
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Demand Groups to Bid On */}
        <div className="lg:col-span-7 space-y-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-700" />
            <span>High-Intent Verified Demand Pools Ready For Bidding ({groups.length})</span>
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
                      <strong className="text-emerald-700 font-bold">{group.verifiedBuyers} Verified Ready Buyers</strong>
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 text-blue-800 border border-slate-200">
                    {group.city}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-xs border border-slate-100">
                  <div>
                    <span className="text-slate-500 font-medium">Target Volume:</span>
                    <div className="font-bold text-slate-800">{group.targetBuyers} Cars</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Current Joined:</span>
                    <div className="font-bold text-slate-900">{group.currentBuyers} Buyers</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Best Current Bid:</span>
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
                    <label className="block text-slate-600 font-medium text-[11px] mb-1">Delivery SLA (Days)</label>
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
                    <span>Submit Reverse Bid</span>
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
              <h3 className="text-sm font-bold text-slate-900">Showroom Booking Check-In (OTP Verification)</h3>
            </div>

            <p className="text-xs text-slate-600">
              When a CarFair buyer arrives at your showroom with their DealLock Voucher, enter their 6-digit OTP code below to confirm booking and claim referral commission.
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">DealLock Voucher Code</label>
                <input
                  type="text"
                  placeholder="e.g. CF-LOCK-MH-8421"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono text-xs focus:bg-white focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-amber-900 font-bold mb-1">Buyer's 6-Digit OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
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
                <span>Validate OTP & Claim Booking</span>
              </button>
            </form>

            {otpVerificationStatus === 'SUCCESS' && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <Check className="w-4 h-4" />
                  <span>OTP Verified Successfully!</span>
                </div>
                <p>Booking registered under CarFair terms. Referral fee credited upon invoice upload.</p>
              </div>
            )}

            {otpVerificationStatus === 'ERROR' && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Please enter a valid 6-digit numeric OTP.</span>
              </div>
            )}
          </div>

          {/* Dealership Benefits Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Why Authorized Dealers Love CarFair</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 pl-4 list-disc text-[11px]">
              <li><strong>Zero Cold Calling:</strong> Verified buyers with pre-approved financing.</li>
              <li><strong>Volume Target Triggers:</strong> Achieve OEM quarterly bonuses easily.</li>
              <li><strong>Fast Inventory Rotation:</strong> Clear transit stock in 5-8 days.</li>
              <li><strong>Disintermediation Protection:</strong> Transparent OTP check-in.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
