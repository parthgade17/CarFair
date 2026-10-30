import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, Building2, Sparkles } from 'lucide-react';
import { CarFairLogo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { Dealer } from '../types';
import { subscribeToDealers } from '../services/api';
import { getCityRtoCode } from '../constants/cities';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onSelectCity?: (city: string) => void;
  selectedCity?: string;
}

interface CityDisplayItem {
  name: string;
  rtoCode: string;
  showroomCount: number;
  dealers: Dealer[];
  brands: string[];
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCity, selectedCity }) => {
  const { t } = useLanguage();
  const [dealers, setDealers] = useState<Dealer[]>([]);

  useEffect(() => {
    // Subscribe to real-time showroom registrations
    const unsubscribe = subscribeToDealers((updatedDealers) => {
      setDealers(updatedDealers);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Compute purely dynamic active cities based strictly on registered showrooms
  const { activeCityItems, totalShowrooms, uniqueCitiesCount } = useMemo(() => {
    const cityMap = new Map<string, Dealer[]>();

    for (const dealer of dealers) {
      const c = dealer.city?.trim();
      if (!c) continue;
      if (!cityMap.has(c)) {
        cityMap.set(c, []);
      }
      cityMap.get(c)!.push(dealer);
    }

    // Sort active cities by showroom count descending, then alphabetically
    const sortedCityNames = Array.from(cityMap.keys()).sort((a, b) => {
      const countA = cityMap.get(a)?.length || 0;
      const countB = cityMap.get(b)?.length || 0;
      if (countB !== countA) return countB - countA;
      return a.localeCompare(b);
    });

    const items: CityDisplayItem[] = sortedCityNames.map((cityName) => {
      const cityDealers = cityMap.get(cityName) || [];
      const uniqueBrands = Array.from(new Set(cityDealers.map(d => d.brand).filter(Boolean)));
      return {
        name: cityName,
        rtoCode: getCityRtoCode(cityName),
        showroomCount: cityDealers.length,
        dealers: cityDealers,
        brands: uniqueBrands
      };
    });

    return {
      activeCityItems: items,
      totalShowrooms: dealers.length,
      uniqueCitiesCount: items.length
    };
  }, [dealers]);

  const handleCityClick = (cityName: string) => {
    if (onSelectCity) {
      onSelectCity(cityName);
    } else {
      onNavigate('groups');
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-xs py-12 transition-colors">
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

            {/* Dynamic Showroom Network Status Pill */}
            <div className="pt-2">
              <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                totalShowrooms > 0 
                  ? 'bg-slate-800/90 border-emerald-500/30 text-emerald-400' 
                  : 'bg-slate-800/90 border-slate-700 text-slate-400'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    totalShowrooms > 0 ? 'bg-emerald-400' : 'bg-slate-500'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    totalShowrooms > 0 ? 'bg-emerald-500' : 'bg-slate-400'
                  }`} />
                </span>
                <span>
                  {totalShowrooms > 0 ? (
                    <>
                      <strong>{totalShowrooms}</strong> Showroom{totalShowrooms > 1 ? 's' : ''} Registered
                    </>
                  ) : (
                    <span>0 Showrooms Registered</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Core Modules */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.footerTools}</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('quotetruth')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  {t.navQuote}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('groups')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  {t.navGroups}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('bidding')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  {t.navBidding}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('unbundling')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  {t.navTricks}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => onNavigate('savingsproof')} 
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  {t.navFuelCard}
                </button>
              </li>
              <li className="pt-1">
                <button 
                  type="button"
                  onClick={() => onNavigate('dealer')} 
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer text-left"
                >
                  <Building2 className="w-3 h-3" />
                  <span>Showroom Registration Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Indian Cities Covered — 100% Dynamic from Registered Showrooms */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {t.footerActiveCities}
              </h4>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
                totalShowrooms > 0 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {totalShowrooms > 0 ? `${totalShowrooms} Live` : '0 Live'}
              </span>
            </div>

            {activeCityItems.length === 0 ? (
              <div className="space-y-1.5 text-[11px] text-slate-400 pt-1">
                <p className="text-slate-300 font-semibold">0 Cities Active</p>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  No showrooms registered yet. Once showrooms register, active cities and showroom names will update here automatically.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('dealer')}
                    className="text-amber-400 hover:text-amber-300 font-semibold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Building2 className="w-3 h-3" />
                    <span>Register Showroom & Access Portal →</span>
                  </button>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-slate-600" />
                  <span>0 Cities & Showrooms Pan-India</span>
                </div>
              </div>
            ) : (
              <ul className="space-y-2 text-[11px] text-slate-300 pt-1">
                {activeCityItems.map((city) => {
                  const isSelected = selectedCity === city.name;
                  return (
                    <li key={city.name} className="space-y-1">
                      {/* City Name Header */}
                      <button
                        type="button"
                        onClick={() => handleCityClick(city.name)}
                        className={`w-full text-left group flex items-center justify-between py-0.5 px-1.5 -mx-1.5 rounded transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-blue-950/60 text-blue-300 border border-blue-800/60' 
                            : 'hover:bg-slate-800/60 hover:text-white'
                        }`}
                        title={`Click to filter by ${city.name}`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                          <span className="truncate">
                            <strong className={`font-semibold ${isSelected ? 'text-blue-300' : 'text-slate-200 group-hover:text-blue-400'}`}>
                              {city.name}
                            </strong>
                            <span className="text-slate-400 text-[10px] ml-1">
                              ({city.rtoCode})
                            </span>
                          </span>
                        </div>

                        {/* Showroom Count Badge */}
                        <span className="text-[10px] shrink-0 font-medium bg-slate-800 text-slate-300 group-hover:text-blue-200 group-hover:border-blue-500/40 border border-slate-700/80 px-1.5 py-0.2 rounded ml-2 transition-colors">
                          {city.showroomCount} {city.showroomCount === 1 ? 'Showroom' : 'Showrooms'}
                        </span>
                      </button>

                      {/* Registered Showroom Names & Brands under this City */}
                      <div className="pl-3 space-y-0.5">
                        {city.dealers.map((d) => (
                          <div key={d.id} className="text-[10px] text-slate-400 flex items-center gap-1.5 truncate">
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-300 font-medium truncate">{d.name}</span>
                            <span className="text-[9px] bg-slate-800 text-amber-400 px-1 py-0.1 rounded border border-slate-700 shrink-0">
                              {d.brand}
                            </span>
                          </div>
                        ))}
                      </div>
                    </li>
                  );
                })}

                {/* Dynamic Pan-India Summary */}
                <li className="pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleCityClick('All Cities')}
                    className="w-full text-left text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>{uniqueCitiesCount} Active {uniqueCitiesCount === 1 ? 'City' : 'Cities'} & {totalShowrooms} {totalShowrooms === 1 ? 'Showroom' : 'Showrooms'} Registered</span>
                    </span>
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Legal and Compliance */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.footerTrustTitle}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.footerTrustDesc}
            </p>
            <div className="pt-2 space-y-1.5">
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{t.trustFree}</span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Direct OEM Franchise Showroom Verification</span>
              </div>
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
