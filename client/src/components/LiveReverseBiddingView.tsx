import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  ShieldCheck, 
  Building2, 
  Truck, 
  Sparkles, 
  Send,
  FileText,
  Calendar,
  CheckCircle2,
  Bookmark,
  X,
  Check,
  Award
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
  const [selectedInspectBid, setSelectedInspectBid] = useState<ReverseBid | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

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
      terms: 'Confirmed vehicle allocation in stock. Zero handling fee.'
    };

    const res = await submitDealerBid(group.id, payload);
    if (res.success) {
      setBids(res.group.bids);
      setIsDealerBiddingOpen(false);
    }
    setIsSubmitting(false);
  };

  const handleSaveQuotation = (bid: ReverseBid) => {
    const quote = {
      id: `bid-quote-${Date.now()}`,
      dealerName: bid.dealerName,
      carName: group.carName,
      finalOnRoad: bid.finalOnRoadPerUnit,
      discount: bid.exShowroomDiscount,
      deliveryDays: bid.deliveryDays,
      savedAt: new Date().toLocaleDateString('en-IN')
    };
    try {
      const existing = JSON.parse(localStorage.getItem('carfair_saved_quotes') || '[]');
      localStorage.setItem('carfair_saved_quotes', JSON.stringify([quote, ...existing]));
    } catch (err) {}
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const winningBid = bids.find(b => b.isWinning) || bids[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <button
            onClick={onBackToGroups}
            className="text-xs text-blue-900 hover:underline font-bold mb-2 inline-flex items-center gap-1 cursor-pointer"
          >
            ← Back to Car Groups
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Competing Dealership Offers: {group.carName}
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              DOCUMENTED QUOTATIONS
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            {group.currentBuyers} Buyers in {group.city} • Authorized showrooms competing with itemized, binding terms.
          </p>
        </div>

        {/* Action: Dealer Counter Bid */}
        <button
          onClick={() => setIsDealerBiddingOpen(!isDealerBiddingOpen)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-700 hover:bg-amber-800 text-white shadow-xs flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Gavel className="w-4 h-4" />
          <span>{isDealerBiddingOpen ? 'Close Form' : 'Showroom: Submit Better Offer'}</span>
        </button>
      </div>

      {/* Dealer Bidding Form Drawer */}
      {isDealerBiddingOpen && (
        <div className="bg-white border border-amber-300 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-700" />
              <span>Showroom Offer Submission</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">For: {group.carName}</span>
          </div>

          <form onSubmit={handleBidSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Dealership Name</label>
              <input
                type="text"
                required
                value={dealerName}
                onChange={(e) => setDealerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Group Cash Discount (₹)</label>
              <input
                type="number"
                required
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Exchange / Bonus (₹)</label>
              <input
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Delivery Time (Days)</label>
              <input
                type="number"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-amber-600"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-slate-700 font-semibold mb-1">Free Accessories or Included Perks</label>
              <input
                type="text"
                value={perksInput}
                onChange={(e) => setPerksInput(e.target.value)}
                placeholder="Comma separated: Free 5-Yr Extended Warranty, 7D Mats"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-medium"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending...' : 'Publish Offer to Buyers'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leading Offer Card */}
      {winningBid && (
        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-800 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-xs">
            Leading Documented Offer
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="text-xl font-bold text-slate-900">{winningBid.dealerName}</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300">
                  OEM Verified Showroom
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Deal terms: {winningBid.terms}
              </p>

              {/* Free perks list */}
              <div className="flex flex-wrap gap-2 pt-1">
                {winningBid.freebies.map((perk, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-white text-emerald-800 border border-emerald-200 flex items-center gap-1 font-semibold shadow-xs">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    {perk}
                  </span>
                ))}
                {winningBid.waivedHandlingCharges && (
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-white text-blue-900 border border-blue-200 font-semibold shadow-xs">
                    ✓ Handling Charge ₹18,000 Waived
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-right flex flex-col justify-center min-w-[240px] shadow-xs">
              <span className="text-xs text-slate-400 line-through font-mono">
                Solo Showroom Baseline: ₹{group.baselineShowroomPrice.toLocaleString('en-IN')}
              </span>
              <div className="text-2xl font-black text-emerald-700 font-mono mt-0.5">
                ₹{winningBid.finalOnRoadPerUnit.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] font-bold text-emerald-800">
                Guaranteed Group Saving: ₹{(group.baselineShowroomPrice - winningBid.finalOnRoadPerUnit).toLocaleString('en-IN')}
              </span>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  onClick={() => setSelectedInspectBid(winningBid)}
                  className="py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-700" />
                  <span>Inspect Quote</span>
                </button>
                <button
                  onClick={() => onLockDeal(winningBid)}
                  className="py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lock Deal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Competing Bids Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Gavel className="w-4 h-4 text-blue-700" />
            <span>Documented Showroom Offers Received ({bids.length})</span>
          </h3>
          {savedNotice && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <Check className="w-4 h-4" /> Quotation saved to your account!
            </span>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Dealership</th>
                  <th className="py-3 px-4 font-bold">Total Discount</th>
                  <th className="py-3 px-4 font-bold">Delivery Timeline</th>
                  <th className="py-3 px-4 font-bold">Included Perks</th>
                  <th className="py-3 px-4 font-bold">Final On-Road Price</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-sans">
                {bids.map((bid) => (
                  <tr key={bid.id} className={`hover:bg-slate-50 transition-colors ${bid.isWinning ? 'bg-emerald-50/40' : ''}`}>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{bid.dealerName}</span>
                        {bid.isWinning && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                            Lowest
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">{bid.terms}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                      ₹{(bid.exShowroomDiscount + bid.corporateExchangeBonus).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        <Truck className="w-3 h-3 text-blue-700" />
                        {bid.deliveryDays} Days
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {bid.freebies.join(', ')}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-slate-900 text-sm">
                      ₹{bid.finalOnRoadPerUnit.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedInspectBid(bid)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleSaveQuotation(bid)}
                        title="Save to Account"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer inline-flex items-center"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-blue-700" />
                      </button>
                      <button
                        onClick={() => onLockDeal(bid)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-900 hover:bg-blue-950 text-white transition-colors cursor-pointer shadow-xs"
                      >
                        Lock Deal
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Priority 4 Dedicated Quotation Details Modal */}
      {selectedInspectBid && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Verified Quotation Record</span>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-700" />
                  <span>{selectedInspectBid.dealerName}</span>
                </h3>
              </div>
              <button 
                onClick={() => setSelectedInspectBid(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-200 font-sans">
                <div className="flex justify-between text-slate-600">
                  <span>Vehicle Model:</span>
                  <span className="font-bold text-slate-900">{group.carName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Location / City:</span>
                  <span className="font-bold text-slate-900">{group.city} (Authorised Outlet)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Stock Availability:</span>
                  <span className="font-bold text-emerald-700">Confirmed VIN Ready ({selectedInspectBid.deliveryDays} Days)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Offer Validity:</span>
                  <span className="font-bold text-amber-800">Active for this Buyer Pool (Next 14 Days)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Quotation Status:</span>
                  <span className="font-bold text-blue-800">Dealer Confirmed & Locked</span>
                </div>
              </div>

              {/* Itemized Price Breakdown */}
              <div className="space-y-1.5 pt-1">
                <h4 className="font-bold text-slate-900 text-xs">Itemized Price Breakdown:</h4>
                <div className="divide-y divide-slate-100 bg-white border border-slate-200 rounded-xl p-3 font-mono">
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="font-sans">Ex-Showroom Baseline:</span>
                    <span>₹{group.baselineShowroomPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-700 font-bold">
                    <span className="font-sans">Group Cash Discount:</span>
                    <span>-₹{selectedInspectBid.exShowroomDiscount.toLocaleString('en-IN')}</span>
                  </div>
                  {selectedInspectBid.corporateExchangeBonus > 0 && (
                    <div className="flex justify-between py-1 text-emerald-700 font-bold">
                      <span className="font-sans">Exchange / Bonus:</span>
                      <span>-₹{selectedInspectBid.corporateExchangeBonus.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 text-blue-800">
                    <span className="font-sans">Logistics & Handling Fee:</span>
                    <span className="font-bold">₹0 (Waived)</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-slate-300 font-black text-slate-900 text-sm">
                    <span className="font-sans">Final Locked On-Road:</span>
                    <span className="text-emerald-700">₹{selectedInspectBid.finalOnRoadPerUnit.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Free Accessories & Perks */}
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-xs block">Included Showroom Perks:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedInspectBid.freebies.map((f, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
              <button
                onClick={() => {
                  handleSaveQuotation(selectedInspectBid);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-blue-700" />
                <span>Save Offer</span>
              </button>

              <button
                onClick={() => {
                  setSelectedInspectBid(null);
                  onLockDeal(selectedInspectBid);
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Lock This Price & Get Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
