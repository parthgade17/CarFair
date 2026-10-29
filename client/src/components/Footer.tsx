import React from 'react';
import { ShieldCheck, Heart, ExternalLink, FileText } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
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
              India's first verified group car-buying network and AI quotation auditor. Turning fragmented buyers into a formidable collective bargaining force.
            </p>
            <p className="text-[10px] text-slate-500">
              Developed by Parth Gade for modern Indian car buyers.
            </p>
          </div>

          {/* Core Modules */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => onNavigate('quotetruth')} className="hover:text-blue-400 transition-colors">
                  QuoteTruth AI Auditor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('groups')} className="hover:text-blue-400 transition-colors">
                  Verified Buying Groups
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bidding')} className="hover:text-blue-400 transition-colors">
                  Live Reverse Bidding Arena
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('unbundling')} className="hover:text-blue-400 transition-colors">
                  Unbundling Savings Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('savingsproof')} className="hover:text-blue-400 transition-colors">
                  SavingsProof Invoice Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Indian Cities Covered */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Active Metros</h4>
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
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Compliance & Ethics</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              CarFair operates strictly within the framework of the Ministry of Road Transport and Highways (MoRTH), IRDAI guidelines for insurance unbundling, and CCPA transparent pricing standards.
            </p>
            <div className="pt-2 text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero consumer fees • Transparent dealer referral fees</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 CarFair India Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">MoRTH Anti-Handling Advisory</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
