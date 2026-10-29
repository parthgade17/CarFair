import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white">CarFair</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              India's first group car-buying network and quotation checker. We help car buyers come together so authorized showrooms offer bulk fleet discounts.
            </p>
            <p className="text-[10px] text-slate-500">
              Built for Indian car buyers and families.
            </p>
          </div>

          {/* Core Modules */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Helpful Tools</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => onNavigate('quotetruth')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Showroom Bill Checker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('groups')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Car Buying Groups
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bidding')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Showrooms Competing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('unbundling')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  4 Showroom Secrets Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('savingsproof')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Claim ₹5,000 Free Petrol Card
                </button>
              </li>
            </ul>
          </div>

          {/* Indian Cities Covered */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Active Cities</h4>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>Pune (MH-12 / MH-14) — Flagship Hub</li>
              <li>Mumbai (MH-01 / MH-02 / MH-03)</li>
              <li>Bengaluru (KA-01 / KA-03 / KA-05)</li>
              <li>Delhi NCR (DL / HR-26 / UP-16)</li>
              <li>Hyderabad (TS-07 / TS-08 / TS-09)</li>
              <li>Ahmedabad (GJ-01 / GJ-27)</li>
            </ul>
          </div>

          {/* Legal and Compliance */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Trust Promise</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              CarFair follows the guidelines of the Ministry of Road Transport and Highways (MoRTH) and IRDAI insurance rules. We ensure you never pay illegal handling charges.
            </p>
            <div className="pt-2 text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Free for buyers • No hidden fees</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 CarFair India. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Fair Pricing Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};