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
  ChevronRight
} from 'lucide-react';
import { CarFairLogo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  userRole: 'BUYER' | 'DEALER' | 'COMMUNITY';
  setUserRole: (role: 'BUYER' | 'DEALER' | 'COMMUNITY') => void;
}

export const CITIES = ['All Cities', 'Pune', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Hyderabad', 'Ahmedabad'];

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
      {/* Top Banner Alert */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-center text-slate-200 flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white shrink-0 tracking-wide uppercase">
          PILOT LIVE
        </span>
        <span className="text-slate-300 text-xs truncate sm:text-clip">
          <strong className="text-white font-semibold">{selectedCity === 'All Cities' ? 'Pune & Metros' : selectedCity}:</strong> Compare real dealer quotes and see what a collective buyer group could save.
        </span>
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
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-slate-200 shadow-xl py-1 z-50">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        selectedCity === city
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
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
