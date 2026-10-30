import React, { useState, useRef } from 'react';
import { 
  FileSearch, 
  Gavel, 
  Lock, 
  Award, 
  Repeat, 
  Calculator, 
  Menu, 
  X, 
  MapPin, 
  Users, 
  Building2,
  ChevronDown,
  User,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Search
} from 'lucide-react';
import { CarFairLogo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations';
import { BUYER_NAV_CITIES } from '../constants/cities';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  userRole: 'BUYER' | 'DEALER' | 'COMMUNITY';
  setUserRole: (role: 'BUYER' | 'DEALER' | 'COMMUNITY') => void;
}

export const CITIES = BUYER_NAV_CITIES;

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  userRole,
  setUserRole
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // The 7 core car-buying options in the scrollbar
  const navLinks = [
    { id: 'groups', label: t.navGroups, icon: Users },
    { id: 'quotetruth', label: t.navQuote, icon: FileSearch },
    { id: 'bidding', label: t.navBidding, icon: Gavel },
    { id: 'unbundling', label: t.navTricks, icon: Calculator },
    { id: 'deallock', label: t.navPriceLock, icon: Lock },
    { id: 'savingsproof', label: t.navFuelCard, icon: Award },
    { id: 'exchange', label: t.navSellCar, icon: Repeat },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Floating Looping Notification Marquee (Moving Towards Right) */}
      <div className="relative bg-slate-950 text-slate-200 border-b border-slate-800/80 overflow-hidden py-1.5 select-none shadow-xs">
        {/* Subtle left & right gradient fade masks for clean floating entry/exit */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-slate-950 to-transparent z-10" />

        {/* Marquee Track moving to the right in an infinite seamless loop */}
        <div className="animate-marquee-right flex items-center cursor-default">
          {[0, 1].map((copyIndex) => (
            <div key={copyIndex} className="flex items-center gap-8 px-4 shrink-0">
              {/* Item 1 */}
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                  PILOT LIVE
                </span>
                <span className="text-slate-300 font-medium whitespace-nowrap">
                  <strong className="text-white font-bold">{selectedCity === 'All Cities' ? 'Pune & Metros' : selectedCity}:</strong> Compare real dealer quotes & see what collective buying saves.
                </span>
              </div>

              <span className="text-slate-700 font-bold">•</span>

              {/* Item 2 */}
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-blue-400" />
                  QUOTETRUTH AI
                </span>
                <span className="text-slate-300 font-medium whitespace-nowrap">
                  Upload dealer quotation to catch hidden insurance markups & illegal handling fees.
                </span>
              </div>

              <span className="text-slate-700 font-bold">•</span>

              {/* Item 3 */}
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                  <Zap className="w-3 h-3 text-amber-400" />
                  SMART DEAL
                </span>
                <span className="text-slate-300 font-medium whitespace-nowrap">
                  <strong className="text-amber-300">Smart Buyers Ki Smart Deal:</strong> 100% Free for buyers • Direct showroom allocation • Zero broker commission.
                </span>
              </div>

              <span className="text-slate-700 font-bold">•</span>

              {/* Item 4 */}
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3 text-purple-400" />
                  REVERSE BIDDING
                </span>
                <span className="text-slate-300 font-medium whitespace-nowrap">
                  Authorized dealerships compete with lowest on-road prices and guaranteed delivery SLA.
                </span>
              </div>

              <span className="text-slate-700 font-bold">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* 1. Official Logo (Left) */}
          <div 
            className="flex items-center cursor-pointer shrink-0 py-1" 
            onClick={() => setActiveTab('groups')}
          >
            <CarFairLogo size="sm" showTagline={true} />
          </div>

          {/* 2. Scroll Bar for the 7 Options (Clean Horizontal Scrollable Strip with Arrows) */}
          <div className="hidden lg:flex items-center flex-1 min-w-0 max-w-2xl mx-1 xl:mx-2 relative bg-slate-50/80 px-1 py-1 rounded-2xl border border-slate-200/80">
            {/* Scroll Left Button */}
            <button
              onClick={() => handleScroll('left')}
              className="p-1 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors shrink-0 cursor-pointer"
              title="Scroll options left"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Container with the 7 Options */}
            <div 
              ref={scrollContainerRef}
              className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 scroll-smooth shrink"
              style={{ scrollbarWidth: 'thin' }}
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? 'text-blue-700 bg-white border border-blue-300 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                    <span className="whitespace-nowrap">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={() => handleScroll('right')}
              className="p-1 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors shrink-0 cursor-pointer"
              title="Scroll options right"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Account Option + User Controls (Inside the navbar, clearly integrated!) */}
          <div className="hidden md:flex items-center gap-2 xl:gap-2.5 shrink-0">
            
            {/* Dedicated Account Button (Inside the Navbar!) */}
            <button
              onClick={() => setActiveTab('account')}
              className={`h-9 flex items-center gap-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs ${
                activeTab === 'account'
                  ? 'bg-blue-700 text-white border border-blue-700 shadow-sm'
                  : 'bg-blue-50/90 hover:bg-blue-100 text-blue-900 border border-blue-200 hover:border-blue-300'
              }`}
              title={t.navAccount}
            >
              <User className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'account' ? 'text-white' : 'text-blue-700'}`} />
              <span>{t.navAccount}</span>
            </button>

            {/* Language Switcher Pills */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0 h-9">
              <span className="pl-1.5 pr-1 text-slate-400 flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 shrink-0" />
              </span>
              <button
                onClick={() => setLanguage('en')}
                className={`h-7 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center ${
                  language === 'en'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`h-7 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center ${
                  language === 'mr'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="मराठी"
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`h-7 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center ${
                  language === 'hi'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="हिंदी"
              >
                हिंदी
              </button>
            </div>

            {/* City Selector Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="h-9 flex items-center gap-1.5 px-2.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
                  <div className="p-2 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search 100+ cities..."
                        value={citySearchTerm}
                        onChange={(e) => setCitySearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    {CITIES.filter(c => c.toLowerCase().includes(citySearchTerm.toLowerCase())).map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setIsCityDropdownOpen(false);
                          setCitySearchTerm('');
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          selectedCity === city
                            ? 'bg-blue-50 text-blue-750 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && <span className="text-[10px] text-blue-700 font-bold">✓</span>}
                      </button>
                    ))}
                    {CITIES.filter(c => c.toLowerCase().includes(citySearchTerm.toLowerCase())).length === 0 && (
                      <div className="py-4 text-center text-xs text-slate-400">
                        No matching city found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher: Buyer vs Showroom */}
            <div className="hidden xl:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0 h-9">
              <button
                onClick={() => setUserRole('BUYER')}
                className={`h-7 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  userRole === 'BUYER'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>{t.roleBuyer}</span>
              </button>
              <button
                onClick={() => setUserRole('DEALER')}
                className={`h-7 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  userRole === 'DEALER'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span>{t.roleDealer}</span>
              </button>
            </div>

          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab('account')}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer border ${
                activeTab === 'account'
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3.5 shadow-lg">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>भाषा / Language:</span>
            </div>
            <div className="flex gap-1.5 text-xs font-bold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${language === 'en' ? 'bg-blue-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${language === 'mr' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${language === 'hi' ? 'bg-amber-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Mobile City Selector */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              <span>{t.selectCity}:</span>
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl px-3 py-1.5 font-bold focus:bg-white"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Mobile Role Switcher */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => setUserRole('BUYER')}
              className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                userRole === 'BUYER' ? 'bg-blue-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.roleBuyer}</span>
            </button>
            <button
              onClick={() => setUserRole('DEALER')}
              className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                userRole === 'DEALER' ? 'bg-amber-700 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.roleDealer}</span>
            </button>
          </div>

          {/* Account Button Mobile */}
          <button
            onClick={() => {
              setActiveTab('account');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeTab === 'account' ? 'bg-blue-700 text-white shadow-xs' : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4" />
              <span>{t.navAccount}</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-blue-800">
              Profile
            </span>
          </button>

          {/* Nav Links Mobile */}
          <div className="grid grid-cols-1 gap-1 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    isActive ? 'bg-blue-700 text-white font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
