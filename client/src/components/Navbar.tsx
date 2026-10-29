import React, { useState } from 'react';
import { 
  ShieldCheck, 
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
  Globe
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

  // Dynamic translated nav links
  const navLinks = [
    { id: 'groups', label: t.navGroups, icon: Users, badge: 'Save ₹60k+' },
    { id: 'quotetruth', label: t.navQuote, icon: FileSearch, badge: 'Free AI' },
    { id: 'bidding', label: t.navBidding, icon: Gavel },
    { id: 'unbundling', label: t.navTricks, icon: Calculator },
    { id: 'deallock', label: t.navPriceLock, icon: Lock },
    { id: 'savingsproof', label: t.navFuelCard, icon: Award, badge: 'Reward' },
    { id: 'exchange', label: t.navSellCar, icon: Repeat },
    { id: 'account', label: t.navAccount, icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Top Banner Alert */}
      <div className="bg-slate-900 px-4 py-2 text-xs text-center text-slate-200 flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
          OCTOBER DEALS
        </span>
        <span className="text-slate-300">
          <strong>{selectedCity === 'All Cities' ? 'Pune & Mumbai' : selectedCity}</strong> {t.topAlert} {t.octoberDeals}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Official Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('groups')}>
            <CarFairLogo size="sm" showTagline={true} />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls: Quick Language Pills + City Selector + Simple Role Switcher */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick 3-Language Toggle Pills */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[11px] font-bold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
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
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
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
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="हिंदी"
              >
                हिंदी
              </button>
            </div>

            {/* City Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:border-slate-400 shadow-xs transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-700" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
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

            {/* Role Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setUserRole('BUYER')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  userRole === 'BUYER'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3 h-3" />
                <span>{t.roleBuyer}</span>
              </button>
              <button
                onClick={() => setUserRole('DEALER')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  userRole === 'DEALER'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3 h-3" />
                <span>{t.roleDealer}</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">भाषा / Language:</span>
            <div className="flex gap-1 text-xs font-bold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded ${language === 'en' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-1 rounded ${language === 'mr' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded ${language === 'hi' ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                हिंदी
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">{t.selectCity}:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 font-medium"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => setUserRole('BUYER')}
              className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                userRole === 'BUYER' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              {t.roleBuyer}
            </button>
            <button
              onClick={() => setUserRole('DEALER')}
              className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                userRole === 'DEALER' ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              {t.roleDealer}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    isActive ? 'bg-blue-700 text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};