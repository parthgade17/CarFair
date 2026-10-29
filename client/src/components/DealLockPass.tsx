import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  AlertCircle, 
  FileCheck,
  Fuel,
  Sparkles,
  Car
} from 'lucide-react';
import { DealLockVoucher } from '../types';

interface DealLockPassProps {
  voucher: DealLockVoucher;
  onProceedToInvoiceAudit: (voucher: DealLockVoucher) => void;
  onBack: () => void;
}

export const DealLockPass: React.FC<DealLockPassProps> = ({
  voucher,
  onProceedToInvoiceAudit,
  onBack
}) => {
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copyOtp = () => {
    navigator.clipboard.writeText(voucher.verificationSecurity.dealerClaimOtp);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(voucher.voucherCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
        >
          ← Back to Arena
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>

      {/* Main Voucher Card */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-blue-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Hologram / Security Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">CarFair DealLock™</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  PRICE FROZEN
                </span>
              </div>
              <p className="text-xs text-slate-400">Official Non-Alterable Price & Allocation Certificate</p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Voucher Reference</span>
            <div className="flex items-center gap-2 mt-0.5 justify-end">
              <span className="font-mono font-bold text-sm text-blue-400">{voucher.voucherCode}</span>
              <button onClick={copyCode} className="text-slate-400 hover:text-white">
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[10px] text-slate-500">Valid until {new Date(voucher.validUntil).toLocaleDateString('en-IN')}</span>
          </div>
        </div>

        {/* Vehicle & Dealer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Allocated Vehicle</span>
            <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-400" />
              <span>{voucher.vehicle.carName}</span>
            </div>
            <p className="text-xs text-slate-300">{voucher.vehicle.variantName}</p>
            <p className="text-xs text-slate-500 mt-1">Buyer: <strong className="text-slate-300">{voucher.buyer.name}</strong> ({voucher.buyer.phone})</p>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Fulfilling Dealership</span>
            <div className="text-base font-bold text-white mt-0.5">{voucher.dealer.dealerName}</div>
            <p className="text-xs text-slate-400">{voucher.dealer.city} Region • Authorized OEM Partner</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Guaranteed Delivery SLA: {voucher.fulfillment.guaranteedDeliveryDays} Days
            </p>
          </div>
        </div>

        {/* Financial Price Freeze Breakdown */}
        <div className="my-6 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Protected Price Architecture
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400">Solo Showroom Baseline</span>
              <div className="text-lg font-bold text-slate-400 line-through font-mono mt-1">
                ₹{voucher.financialLock.baselineShowroomPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-4">
              <span className="text-xs text-emerald-300 font-semibold">DealLocked On-Road Total</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                ₹{voucher.financialLock.lockedOnRoadPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-blue-950/50 border border-blue-500/40 rounded-xl p-4">
              <span className="text-xs text-blue-300 font-semibold">Verified Guaranteed Savings</span>
              <div className="text-2xl font-black text-blue-400 font-mono mt-1">
                ₹{voucher.financialLock.guaranteedSavings.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Price Protection Legal Clauses */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <Lock className="w-4 h-4" />
            <span>Anti-Tamper & Showroom Price Freeze Conditions</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 text-[11px]">
            <li><strong>Handling Charges:</strong> Dealership has agreed in writing to waive ₹18,000+ logistics and depot fees.</li>
            <li><strong>Zero-Dep Insurance:</strong> Price matched with IRDAI direct benchmark; showroom cannot mandate internal policy.</li>
            <li><strong>Accessories:</strong> Only agreed OEM accessories included ({voucher.fulfillment.promisedPerks.join(', ')}). No forced chrome pack.</li>
            <li><strong>Digital Audit Hash:</strong> <span className="font-mono text-[10px] text-blue-400">{voucher.verificationSecurity.digitalSignature}</span></li>
          </ul>
        </div>

        {/* Anti-Disintermediation Dealer OTP */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/50 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <Key className="w-4 h-4 text-amber-400" />
              <span>Showroom Delivery Check-in OTP</span>
            </div>
            <p className="text-[11px] text-slate-300 max-w-md">
              Hand this 6-digit OTP to the Sales Head when paying booking amount. They must enter this in their dealer portal to honor the group price.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-xl border border-amber-500/60">
            <span className="font-mono font-black text-2xl text-amber-400 tracking-widest">
              {voucher.verificationSecurity.dealerClaimOtp}
            </span>
            <button onClick={copyOtp} className="text-slate-400 hover:text-white ml-2">
              {copiedOtp ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Anti-Bypass Buyer Reward Banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Fuel className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Unlock ₹5,000 Fuel Card on Delivery</h5>
              <p className="text-[11px] text-slate-300">
                Upload your final invoice to verify zero extra showroom charges and immediately claim your HPCL/IOCL card.
              </p>
            </div>
          </div>

          <button
            onClick={() => onProceedToInvoiceAudit(voucher)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Upload Invoice & Audit Savings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
