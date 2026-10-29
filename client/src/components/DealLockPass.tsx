import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  FileCheck, 
  Fuel, 
  Car,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { DealLockVoucher } from '../types';
import { CarFairLogo } from './Logo';

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
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="text-xs text-blue-700 hover:text-blue-800 font-bold cursor-pointer"
        >
          ← Back to Car Groups
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:text-slate-900 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Main Pass Document */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Pass Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <CarFairLogo size="md" showTagline={false} />
            <div className="border-l border-slate-200 pl-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900">Price Lock Pass</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                  PRICE LOCKED
                </span>
              </div>
              <p className="text-xs text-slate-500">Official Showroom Price Guarantee Certificate</p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Pass Number</span>
            <div className="flex items-center gap-2 mt-0.5 justify-end">
              <span className="font-mono font-bold text-sm text-blue-800">{voucher.voucherCode}</span>
              <button onClick={copyCode} className="text-slate-500 hover:text-slate-800 cursor-pointer">
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[10px] text-slate-500">Valid until {new Date(voucher.validUntil).toLocaleDateString('en-IN')}</span>
          </div>
        </div>

        {/* Vehicle & Showroom Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Your Selected Car</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5 flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-700" />
              <span>{voucher.vehicle.carName}</span>
            </div>
            <p className="text-xs text-slate-600">{voucher.vehicle.variantName}</p>
            <p className="text-xs text-slate-500 mt-1">
              Registered Buyer: <strong className="text-slate-800">{voucher.buyer.name}</strong> ({voucher.buyer.phone})
            </p>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Assigned Showroom</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">{voucher.dealer.dealerName}</div>
            <p className="text-xs text-slate-500">{voucher.dealer.city} Region • Official Authorised Dealership</p>
            <p className="text-xs text-emerald-800 mt-1 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              Guaranteed Delivery: Within {voucher.fulfillment.guaranteedDeliveryDays} Days
            </p>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="my-6 space-y-3">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Price Comparison & Total Savings
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-xs text-slate-500">Regular Showroom Price</span>
              <div className="text-lg font-bold text-slate-400 line-through font-mono mt-1">
                ₹{voucher.financialLock.baselineShowroomPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4">
              <span className="text-xs text-emerald-800 font-bold">Your Group Locked Price</span>
              <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
                ₹{voucher.financialLock.lockedOnRoadPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <span className="text-xs text-blue-800 font-bold">Your Total Money Saved</span>
              <div className="text-2xl font-black text-blue-700 font-mono mt-1">
                ₹{voucher.financialLock.guaranteedSavings.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* The 6-Digit PIN Box */}
        <div className="mt-6 p-5 rounded-2xl bg-amber-50/80 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Key className="w-4 h-4 text-amber-700" />
              <span>Show This 6-Digit PIN to the Showroom Manager</span>
            </div>
            <p className="text-[11px] text-slate-700 max-w-md">
              When you visit the showroom to pay your booking deposit or take delivery, show this 6-digit PIN. The sales manager will enter it into their system to confirm your locked group price.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-amber-300 shadow-xs">
            <span className="font-mono font-black text-2xl text-amber-800 tracking-widest">
              {voucher.verificationSecurity.dealerClaimOtp}
            </span>
            <button onClick={copyOtp} className="text-slate-500 hover:text-slate-800 ml-2 cursor-pointer">
              {copiedOtp ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Buyer Protection Terms */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Our 4-Point Price Guarantee for You:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-[11px]">
            <li><strong>Zero Handling Fees:</strong> The showroom is legally bound to charge ₹0 in logistics, depot, or handling fees.</li>
            <li><strong>Fair Insurance:</strong> The insurance price is matched with fair direct online rates—no showroom markup.</li>
            <li><strong>No Forced Accessories:</strong> You only get the agreed free accessories ({voucher.fulfillment.promisedPerks.join(', ')}). No mandatory ₹25,000 accessory pack.</li>
            <li><strong>Official Warranty:</strong> Direct manufacturer warranty valid at any authorized service center across India.</li>
          </ul>
        </div>

        {/* Claim Fuel Card Banner */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Fuel className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900">Claim Your ₹5,000 Free Petrol Card</h5>
              <p className="text-[11px] text-slate-600">
                After taking delivery of your car, upload your final showroom bill to ensure no hidden fees were added and claim your ₹5,000 HPCL/IOCL card.
              </p>
            </div>
          </div>

          <button
            onClick={() => onProceedToInvoiceAudit(voucher)}
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Check Final Bill & Claim Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};