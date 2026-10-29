import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Car, 
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
  ChevronDown
} from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'groups', label: 'Buy Together', icon: Users, badge: 'Live Bids' },
    { id: 'quotetruth', label: 'QuoteTruth AI', icon: FileSearch, badge: 'Auditor' },
    { id: 'bidding', label: 'Live Bidding Arena', icon: Gavel },
    { id: 'unbundling', label: 'Unbundle Traps', icon: Calculator },
    { id: 'deallock', label: 'DealLock Pass', icon: Lock },
    { id: 'savingsproof', label: 'SavingsProof', icon: Award, badge: '₹5k Fuel' },
    { id: 'exchange', label: 'Car Exchange', icon: Repeat },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-all">
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900/60 border-b border-blue-500/20 px-4 py-1.5 text-xs text-center text-blue-200 flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
          OCTOBER TARGET RUSH
        </span>
        <span>
          Dealers are competing for month-end OEM quotas in <strong>{selectedCity === 'All Cities' ? 'Pune & Mumbai' : selectedCity}</strong>. Average savings: ₹68,400 per buyer!
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('groups')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                  Car<span className="text-blue-500">Fair</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                  India Verified
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Group Buying & Quote Auditor</p>
            </div>
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-white bg-blue-600/20 border border-blue-500/40 shadow-sm shadow-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      isActive 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-800 text-blue-300 border border-blue-900/60'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* City Selector & Role Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* City Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700/80 text-slate-200 hover:border-slate-500 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                        selectedCity === city
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setUserRole('BUYER')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  userRole === 'BUYER'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-3 h-3" />
                <span>Buyer</span>
              </button>
              <button
                onClick={() => setUserRole('DEALER')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  userRole === 'DEALER'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3 h-3" />
                <span>Dealer Arena</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          {/* City selector on mobile */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400">Current City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Role switcher on mobile */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            <button
              onClick={() => setUserRole('BUYER')}
              className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${
                userRole === 'BUYER' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Buyer View
            </button>
            <button
              onClick={() => setUserRole('DEALER')}
              className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${
                userRole === 'DEALER' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Dealer Bidding
            </button>
          </div>

          {/* Links */}
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-blue-300">
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
