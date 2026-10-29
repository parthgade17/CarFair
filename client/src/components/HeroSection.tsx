import React from 'react';
import { 
  Users, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onExploreGroups: () => void;
  onAuditQuote: () => void;
  selectedCity: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGroups,
  onAuditQuote,
  selectedCity
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/80 border-b border-slate-200 overflow-hidden pt-8 pb-16">
      {/* Subtle Background Accent Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main Hero Grid: Left Logo (Merged with page) + Right Tagline & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Official Brand Logo - Merged directly into the page (NO BOX) */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-center">
            <div className="relative flex items-center justify-center p-2 w-full">
              {/* Soft ambient light merged into page background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-emerald-400/10 to-transparent rounded-full blur-3xl -z-10" />

              <img
                src="/carfair-logo.png"
                alt="CarFair — Smart Buyers Ki Smart Deal"
                className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Headlines, Tagline & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge with City */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>{t.heroBadge}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700 font-bold">{selectedCity === 'All Cities' ? 'Pan-India' : selectedCity}</span>
            </div>

            {/* Main Design Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.15]">
              {t.heroHeadlineMain}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600">
                {t.heroHeadlineHighlight}
              </span>
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreGroups}
                className="px-7 py-4 rounded-xl font-bold text-sm bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>{t.btnJoinGroupFree}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onAuditQuote}
                className="px-7 py-4 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <span>{t.btnCheckQuote}</span>
              </button>
            </div>

            {/* Reassurance Trust Pills */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{t.trustFree}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{t.trustDelivery}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{t.trustWarranty}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{t.trustFuelCard}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Simple Steps: How CarFair Works */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">How It Works</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{t.howItWorksTitle}</h3>
            <p className="text-xs text-slate-500 mt-1">{t.howItWorksSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white font-black flex items-center justify-center mx-auto text-sm shadow-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.step1Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white font-black flex items-center justify-center mx-auto text-sm shadow-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.step2Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center mx-auto text-sm shadow-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.step3Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Real Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">{t.statSaved}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">{t.statSavedDesc}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-blue-700 font-mono">{t.statAvgSaving}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">{t.statAvgSavingDesc}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{t.statShowrooms}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">{t.statShowroomsDesc}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-indigo-700 font-mono">{t.statDeliveryTime}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">{t.statDeliveryTimeDesc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};