import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Gavel, 
  Key, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Truck, 
  Users, 
  Sparkles, 
  Check, 
  AlertCircle,
  FileCheck
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>OEM Authorised Dealership Arena</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dealership Portal: Compete for Verified Demand Pools
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Hit your monthly volume quotas with 20+ ready buyers, zero customer acquisition cost, and express delivery allocation.
          </p>
        </div>

        {/* Dealer Switcher */}
        {dealers.length > 0 && (
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-2 flex items-center gap-2">
            <span className="text-xs text-slate-400 pl-2">Active Dealership:</span>
            <select
              value={selectedDealerId}
              onChange={(e) => setSelectedDealerId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
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
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              October Month-End OEM Target Progress
            </span>
            <span className="px-2 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
              88% Achieved
            </span>
          </div>
          <p className="text-xs text-slate-300">
            {currentDealer?.name}: 12 more deliveries required before October 31st to unlock ₹45 Lakh manufacturer incentive slab.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400">Available Ready Stock</span>
            <div className="text-lg font-bold font-mono text-emerald-400">
              {currentDealer?.inventoryReadyCount || 18} Units In-Transit
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Demand Groups to Bid On */}
        <div className="lg:col-span-7 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>High-Intent Verified Demand Pools Ready For Bidding ({groups.length})</span>
          </h3>

          <div className="space-y-4">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-white text-base">{group.carName}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{group.communityName}</span> • 
                      <strong className="text-emerald-400">{group.verifiedBuyers} Verified Ready Buyers</strong>
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-950 text-blue-400 border border-slate-800">
                    {group.city}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 p-3 bg-slate-950 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-500">Target Volume:</span>
                    <div className="font-bold text-slate-200">{group.targetBuyers} Cars</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Current Joined:</span>
                    <div className="font-bold text-white">{group.currentBuyers} Buyers</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Best Current Bid:</span>
                    <div className="font-bold font-mono text-emerald-400">₹{group.currentBestGroupPrice.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                {/* Quick Submit Bid form */}
                <form onSubmit={handleDealerBid} className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs items-end">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Your Cash Discount (₹)</label>
                    <input
                      type="number"
                      value={bidDiscount}
                      onChange={(e) => setBidDiscount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Delivery SLA (Days)</label>
                    <input
                      type="number"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={() => setSelectedGroupId(group.id)}
                    className="py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>Submit Reverse Bid</span>
                  </button>
                </form>

                {bidSuccessMessage && selectedGroupId === group.id && (
                  <p className="text-xs text-emerald-400 font-semibold">{bidSuccessMessage}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: DealLock OTP Verification Portal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Key className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Showroom Booking Check-In (OTP Verification)</h3>
            </div>

            <p className="text-xs text-slate-300">
              When a CarFair buyer arrives at your showroom with their DealLock Voucher, enter their 6-digit OTP code below to confirm booking and claim referral commission.
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">DealLock Voucher Code</label>
                <input
                  type="text"
                  placeholder="e.g. CF-LOCK-MH-8421"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-amber-300 font-bold mb-1">Buyer's 6-Digit OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full bg-slate-950 border border-amber-500/60 rounded-lg px-3 py-2 text-amber-400 font-mono font-bold text-lg tracking-widest text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Validate OTP & Claim Booking</span>
              </button>
            </form>

            {otpVerificationStatus === 'SUCCESS' && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>OTP Verified Successfully!</span>
                </div>
                <p>Booking registered under CarFair terms. Referral fee credited upon invoice upload.</p>
              </div>
            )}

            {otpVerificationStatus === 'ERROR' && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Please enter a valid 6-digit numeric OTP.</span>
              </div>
            )}
          </div>

          {/* Dealership Benefits Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs text-slate-300">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Why Authorized Dealers Love CarFair</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400 pl-4 list-disc text-[11px]">
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
