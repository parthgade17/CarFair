import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  Clock, 
  ShieldCheck, 
  ArrowDownRight, 
  CheckCircle2, 
  Building2, 
  Truck, 
  Sparkles, 
  Plus, 
  Send,
  AlertCircle
} from 'lucide-react';
import { BuyingGroup, ReverseBid } from '../types';
import { submitDealerBid } from '../services/api';

interface LiveReverseBiddingViewProps {
  group: BuyingGroup;
  onLockDeal: (bid: ReverseBid) => void;
  onBackToGroups: () => void;
}

export const LiveReverseBiddingView: React.FC<LiveReverseBiddingViewProps> = ({
  group,
  onLockDeal,
  onBackToGroups
}) => {
  const [bids, setBids] = useState<ReverseBid[]>(group.bids || []);
  const [isDealerBiddingOpen, setIsDealerBiddingOpen] = useState(false);

  // New Bid Form state
  const [dealerName, setDealerName] = useState('Bafna Tata Motors (Shivajinagar)');
  const [discountAmount, setDiscountAmount] = useState(48000);
  const [bonusAmount, setBonusAmount] = useState(15000);
  const [deliveryDays, setDeliveryDays] = useState(5);
  const [perksInput, setPerksInput] = useState('Free 5-Yr Extended Warranty, 7D Mats');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setBids(group.bids || []);
  }, [group]);

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      dealerId: `dealer-${Date.now()}`,
      dealerName,
      exShowroomDiscount: discountAmount,
      corporateExchangeBonus: bonusAmount,
      freebies: perksInput.split(',').map(s => s.trim()),
      insuranceMatchPrice: 32000,
      waivedHandlingCharges: true,
      deliveryDays,
      terms: 'Guaranteed VIN allocation in Maharashtra plant. Zero handling fee.'
    };

    const res = await submitDealerBid(group.id, payload);
    if (res.success) {
      setBids(res.group.bids);
      setIsDealerBiddingOpen(false);
    }
    setIsSubmitting(false);
  };

  const winningBid = bids.find(b => b.isWinning) || bids[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <button
            onClick={onBackToGroups}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold mb-2 inline-flex items-center gap-1"
          >
            ← Back to Active Groups
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reverse Bidding Arena: {group.carName}
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {group.currentBuyers} Buyers in {group.city} ({group.verifiedBuyers} Verified Ready) • Dealerships bidding against each other
          </p>
        </div>

        {/* Action: Dealer Counter Bid */}
        <button
          onClick={() => setIsDealerBiddingOpen(!isDealerBiddingOpen)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Gavel className="w-4 h-4" />
          <span>{isDealerBiddingOpen ? 'Close Bidding Form' : 'Submit Dealer Counter-Bid'}</span>
        </button>
      </div>

      {/* Dealer Bidding Form Drawer */}
      {isDealerBiddingOpen && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Authorised Dealership Bid Submission</span>
            </h3>
            <span className="text-[11px] text-slate-400">Target Group: {group.carName}</span>
          </div>

          <form onSubmit={handleBidSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Dealership Name</label>
              <input
                type="text"
                required
                value={dealerName}
                onChange={(e) => setDealerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Group Cash Discount (₹)</label>
              <input
                type="number"
                required
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Corporate / Exchange Bonus (₹)</label>
              <input
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Stock Delivery SLA (Days)</label>
              <input
                type="number"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-slate-300 font-medium mb-1">Free Perks & Accessories Included</label>
              <input
                type="text"
                value={perksInput}
                onChange={(e) => setPerksInput(e.target.value)}
                placeholder="Comma separated: Free 5-Yr Extended Warranty, 7D Mats"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Transmit Bid to Group'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leading Offer Card */}
      {winningBid && (
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-md">
            Current Winning Deal
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">{winningBid.dealerName}</h3>
              </div>
              <p className="text-xs text-slate-300">
                Terms: {winningBid.terms}
              </p>

              {/* Free perks list */}
              <div className="flex flex-wrap gap-2 pt-1">
                {winningBid.freebies.map((perk, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3" />
                    {perk}
                  </span>
                ))}
                {winningBid.waivedHandlingCharges && (
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                    ✓ Handling Charge ₹18k Waived
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-right flex flex-col justify-center min-w-[240px]">
              <span className="text-xs text-slate-400 line-through font-mono">
                Showroom Solo Price: ₹{group.baselineShowroomPrice.toLocaleString('en-IN')}
              </span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                ₹{winningBid.finalOnRoadPerUnit.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] font-bold text-emerald-300">
                Net Group Saving: ₹{(group.baselineShowroomPrice - winningBid.finalOnRoadPerUnit).toLocaleString('en-IN')}
              </span>

              <button
                onClick={() => onLockDeal(winningBid)}
                className="mt-3 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Lock This Deal with DealLock</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Competing Bids Table */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Gavel className="w-4 h-4 text-blue-400" />
          <span>All Competing Dealership Bids ({bids.length})</span>
        </h3>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Dealership</th>
                  <th className="py-3 px-4 font-semibold">Discount Unlocked</th>
                  <th className="py-3 px-4 font-semibold">Delivery SLA</th>
                  <th className="py-3 px-4 font-semibold">Free Perks</th>
                  <th className="py-3 px-4 font-semibold">Final On-Road</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {bids.map((bid) => (
                  <tr key={bid.id} className={`hover:bg-slate-800/40 transition-colors ${bid.isWinning ? 'bg-emerald-950/10' : ''}`}>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{bid.dealerName}</div>
                      <div className="text-[10px] text-slate-400">{bid.terms}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                      ₹{(bid.exShowroomDiscount + bid.corporateExchangeBonus).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                        <Truck className="w-3 h-3 text-blue-400" />
                        {bid.deliveryDays} Days
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {bid.freebies.join(', ')}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-white text-sm">
                      ₹{bid.finalOnRoadPerUnit.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onLockDeal(bid)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                      >
                        Accept & Lock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
