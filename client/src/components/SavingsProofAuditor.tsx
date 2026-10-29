import React, { useState } from 'react';
import { 
  Award, 
  FileCheck, 
  Fuel, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  ShieldCheck,
  TrendingDown,
  UploadCloud
} from 'lucide-react';
import { DealLockVoucher, SavingsProofResult } from '../types';
import { auditFinalInvoice } from '../services/api';

interface SavingsProofAuditorProps {
  initialVoucher?: DealLockVoucher | null;
  onBack: () => void;
}

export const SavingsProofAuditor: React.FC<SavingsProofAuditorProps> = ({
  initialVoucher,
  onBack
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-MH12-2026-9811');
  const [actualExShowroom, setActualExShowroom] = useState(1169000);
  const [actualRto, setActualRto] = useState(128500);
  const [actualInsurance, setActualInsurance] = useState(32000);
  const [actualAccessories, setActualAccessories] = useState(4500);
  const [actualHandling, setActualHandling] = useState(0);
  const [actualTotalPaid, setActualTotalPaid] = useState(1294000);

  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<SavingsProofResult | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const mockVoucher = initialVoucher || {
      voucherCode: 'CF-LOCK-MH-9421',
      buyer: { name: 'Parth Gade', phone: '9890123456', city: 'Pune' },
      vehicle: { carName: 'Tata Nexon', variantName: 'Creative+ 1.2 AMT' },
      dealer: { dealerId: 'dealer-bafna', dealerName: 'Bafna Tata Motors (Shivajinagar)', city: 'Pune' },
      financialLock: {
        lockedOnRoadPrice: 1294000,
        baselineShowroomPrice: 1362000,
        guaranteedSavings: 68000,
        maxStatutoryRtoCap: 'Parivahan rate',
        handlingChargesWaived: true,
        priceProtectionClause: 'No additional fees'
      },
      fulfillment: { guaranteedDeliveryDays: 7, promisedPerks: ['5-Yr Warranty', '7D Mats'] },
      verificationSecurity: { dealerClaimOtp: '849201', digitalSignature: 'ab49fe81028', antiBypassReward: '₹5,000 Fuel Card' }
    };

    const payload = {
      dealLockVoucher: mockVoucher,
      invoiceNumber,
      invoiceDate: '2026-10-28',
      actualExShowroomPaid: actualExShowroom,
      actualRtoPaid: actualRto,
      actualInsurancePaid: actualInsurance,
      actualAccessoriesPaid: actualAccessories,
      actualHandlingCharged: actualHandling,
      actualTotalInvoiceAmount: actualTotalPaid
    };

    const res = await auditFinalInvoice(payload);
    setAuditResult(res);
    setLoading(false);
  };

  const copyCouponCode = () => {
    if (auditResult?.rewardUnlocked?.couponCode) {
      navigator.clipboard.writeText(auditResult.rewardUnlocked.couponCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <button
            onClick={onBack}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold mb-2 inline-block"
          >
            ← Back
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Post-Purchase Audit & Verification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            SavingsProof: Real Savings Audit + ₹5,000 Fuel Reward
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Upload your final dealership delivery invoice. We cross-verify zero hidden showroom charges and unlock your verified fuel card.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Invoice Input Form */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-emerald-400" />
              <span>Final Invoice Audit Form</span>
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
              + ₹5,000 Reward
            </span>
          </div>

          <form onSubmit={handleAuditSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Invoice Number</label>
              <input
                type="text"
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Ex-Showroom Paid (₹)</label>
                <input
                  type="number"
                  value={actualExShowroom}
                  onChange={(e) => setActualExShowroom(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">RTO Tax on Receipt (₹)</label>
                <input
                  type="number"
                  value={actualRto}
                  onChange={(e) => setActualRto(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Insurance Paid (₹)</label>
                <input
                  type="number"
                  value={actualInsurance}
                  onChange={(e) => setActualInsurance(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Handling Fee Charged (₹)</label>
                <input
                  type="number"
                  value={actualHandling}
                  onChange={(e) => setActualHandling(Number(e.target.value))}
                  placeholder="Should be 0"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-emerald-300 font-bold mb-1">Final Total Invoice Amount Paid (₹)</label>
              <input
                type="number"
                required
                value={actualTotalPaid}
                onChange={(e) => setActualTotalPaid(Number(e.target.value))}
                className="w-full bg-slate-950 border border-emerald-500 rounded-lg px-3 py-2.5 text-emerald-400 font-mono font-bold text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>{loading ? 'Auditing Line by Line...' : 'Verify Invoice & Claim ₹5,000 Fuel Card'}</span>
            </button>
          </form>
        </div>

        {/* Audit Results & Reward Showcase */}
        <div className="lg:col-span-7 space-y-6">
          {auditResult ? (
            <div className="space-y-6">
              {/* Reward Unlocked Banner */}
              <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-2 border-emerald-500 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg">
                      <Fuel className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        AUDITED & REWARD UNLOCKED
                      </span>
                      <h3 className="text-xl font-black text-white mt-1">
                        ₹5,000 HPCL / IOCL Fuel Card Dispatched!
                      </h3>
                      <p className="text-xs text-slate-300">
                        Zero hidden showroom charges detected. DealLock promise honored by dealer.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Coupon Code Box */}
                <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Your PetroCard Voucher Code</span>
                    <div className="font-mono font-black text-lg text-emerald-400 tracking-wider">
                      {auditResult.rewardUnlocked.couponCode}
                    </div>
                  </div>
                  <button
                    onClick={copyCouponCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    {copiedCoupon ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCoupon ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                {/* Plus Free Detailing Perk */}
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Bonus: {auditResult.rewardUnlocked.perk} added to your account!</span>
                </div>
              </div>

              {/* Verified Savings Certificate */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <h4 className="text-sm font-bold text-white">CarFair Savings Certificate</h4>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    {auditResult.summaryCertificate.certificateId}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Baseline Showroom Quote</span>
                    <div className="text-base font-bold text-slate-400 line-through font-mono mt-0.5">
                      ₹{auditResult.baselineShowroomPrice.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400">Actual Invoice Paid</span>
                    <div className="text-base font-bold text-white font-mono mt-0.5">
                      ₹{auditResult.actualInvoiceAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div>
                    <span className="text-emerald-400 font-semibold">Net Verified Savings</span>
                    <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                      ₹{auditResult.realizedSavingsAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  This transaction has been mathematically audited against manufacturer RTO slabs and baseline showroom pricing.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <Award className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-semibold text-white">No Final Invoice Audited Yet</h4>
              <p className="text-xs max-w-sm mx-auto">
                Fill the invoice details on the left and click "Verify Invoice" to audit line items and unlock your ₹5,000 fuel reward card.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
