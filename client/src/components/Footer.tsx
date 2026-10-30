import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { CarFairLogo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <CarFairLogo size="sm" variant="dark" showTagline={true} />
            <p className="text-slate-400 leading-relaxed text-[11px] pt-1">
              {t.footerDesc}
            </p>
            <p className="text-[10px] text-slate-500">
              {t.footerMadeFor}
            </p>
          </div>

          {/* Core Modules */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.footerTools}</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => onNavigate('quotetruth')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  {t.navQuote}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('groups')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  {t.navGroups}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bidding')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  {t.navBidding}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('unbundling')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  {t.navTricks}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('savingsproof')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  {t.navFuelCard}
                </button>
              </li>
            </ul>
          </div>

          {/* Indian Cities Covered */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.footerActiveCities}</h4>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>Pune (MH-12 / MH-14) — Flagship Hub</li>
              <li>Mumbai (MH-01 / MH-02 / MH-03)</li>
              <li>Bengaluru (KA-01 / KA-03 / KA-05)</li>
              <li>Delhi NCR (DL / HR-26 / UP-16)</li>
              <li>Hyderabad, Chennai, Kolkata, Ahmedabad</li>
              <li className="text-blue-400 font-semibold pt-1">✨ 100+ Cities & Showrooms Pan-India</li>
            </ul>
          </div>

          {/* Legal and Compliance */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.footerTrustTitle}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.footerTrustDesc}
            </p>
            <div className="pt-2 text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.trustFree}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {t.footerRights}
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