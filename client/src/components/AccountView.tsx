import React, { useState, useEffect } from 'react';
import { 
  User, 
  Building2, 
  Globe, 
  ShieldCheck, 
  Check, 
  Key, 
  Car as CarIcon, 
  Award, 
  Fuel, 
  FileCheck, 
  Copy, 
  CheckCircle2, 
  Users,
  Settings,
  Bell,
  MapPin,
  Phone,
  Mail,
  Camera,
  Upload
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations';
import { CarFairLogo } from './Logo';
import { Car, BuyingGroup } from '../types';
import { fetchCars, getStoredGroups, getDealerInventory, getActiveRegisteredDealer } from '../services/api';
import { getCarPhotos } from '../services/photoStorage';
import { CarGalleryModal } from './CarGalleryModal';
import { UploadCarPhotoModal } from './UploadCarPhotoModal';
import { ALL_INDIAN_CITIES } from '../constants/cities';

interface AccountViewProps {
  onNavigateToTab: (tab: string) => void;
  selectedCity: string;
}

export const AccountView: React.FC<AccountViewProps> = ({
  onNavigateToTab,
  selectedCity
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [accountRole, setAccountRole] = useState<'BUYER' | 'DEALER'>('BUYER');

  // Buyer Form state
  const [buyerName, setBuyerName] = useState('Parth Gade');
  const [buyerPhone, setBuyerPhone] = useState('+91 98901 23456');
  const [buyerEmail, setBuyerEmail] = useState('parth.gade@example.com');
  const [buyerCity, setBuyerCity] = useState(selectedCity || 'Pune');
  const [profileSaved, setProfileSaved] = useState(false);

  // Showroom Form state
  const registered = getActiveRegisteredDealer();
  const [dealerName, setDealerName] = useState(registered?.name || '');
  const [dealerCity, setDealerCity] = useState(registered?.city || selectedCity || 'Pune');
  const [dealerManager, setDealerManager] = useState(registered?.contactPerson || '');
  const [dealerPhone, setDealerPhone] = useState(registered?.phone || '');

  // Showroom Photo Management State
  const [galleryCar, setGalleryCar] = useState<{ id: string; name: string } | null>(null);
  const [uploadCar, setUploadCar] = useState<{ id: string; name: string } | null>(null);
  const [photoRefreshKey, setPhotoRefreshKey] = useState(0);

  // Dynamic Showroom & User Group State
  const [showroomCars, setShowroomCars] = useState<Car[]>([]);
  const [userGroups, setUserGroups] = useState<BuyingGroup[]>([]);
  const [inventory, setInventory] = useState(getDealerInventory());

  useEffect(() => {
    fetchCars().then(setShowroomCars);
    setUserGroups(getStoredGroups());
    setInventory(getDealerInventory());
  }, [photoRefreshKey]);

  // PIN validation in dealer mode
  const [pinInput, setPinInput] = useState('');
  const [pinStatus, setPinStatus] = useState<string | null>(null);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleValidatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.length === 6) {
      setPinStatus('SUCCESS');
    } else {
      setPinStatus('ERROR');
    }
  };

  const copyVoucherCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Account Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
            <User className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.accountTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {accountRole === 'BUYER' ? t.tabBuyerProfile : t.tabDealerProfile}
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {t.accountSubtitle}
          </p>
        </div>

        {/* Role Toggle Button */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs self-start md:self-auto shrink-0 shadow-xs h-11">
          <button
            onClick={() => setAccountRole('BUYER')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              accountRole === 'BUYER'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>{t.roleBuyer}</span>
          </button>
          <button
            onClick={() => setAccountRole('DEALER')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              accountRole === 'DEALER'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>{t.roleDealer}</span>
          </button>
        </div>
      </div>

      {/* LANGUAGE SELECTOR SECTION - PROMINENT 3 LANGUAGES */}
      <div className="bg-white border-2 border-blue-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{t.langSectionTitle}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{t.langSectionDesc}</p>
            </div>
          </div>
          <div className="self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <span>{t.activeLanguage}</span>
              <strong className="text-blue-700 uppercase tracking-wide">
                {language === 'en' ? 'English' : language === 'mr' ? 'मराठी' : 'हिंदी'}
              </strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* English */}
          <button
            onClick={() => setLanguage('en')}
            className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[144px] ${
              language === 'en'
                ? 'bg-blue-50/70 border-blue-600 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900">English</span>
                {language === 'en' ? (
                  <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-slate-300" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">Default platform language</p>
            </div>
            <div className="pt-3">
              <span className="inline-block text-[11px] font-bold text-blue-800 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs">
                Active Platform
              </span>
            </div>
          </button>

          {/* Marathi */}
          <button
            onClick={() => setLanguage('mr')}
            className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[144px] ${
              language === 'mr'
                ? 'bg-emerald-50/70 border-emerald-600 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900">मराठी (Marathi)</span>
                {language === 'mr' ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-slate-300" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">महाराष्ट्र, पुणे आणि मुंबईसाठी</p>
            </div>
            <div className="pt-3">
              <span className="inline-block text-[11px] font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                स्थानिक भाषा
              </span>
            </div>
          </button>

          {/* Hindi */}
          <button
            onClick={() => setLanguage('hi')}
            className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[144px] ${
              language === 'hi'
                ? 'bg-amber-50/70 border-amber-600 shadow-xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900">हिंदी (Hindi)</span>
                {language === 'hi' ? (
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-slate-300" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">सरल और स्पष्ट हिंदी भाषा</p>
            </div>
            <div className="pt-3">
              <span className="inline-block text-[11px] font-bold text-amber-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
                राष्ट्रीय भाषा
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* BUYER MODE ACCOUNT DETAILS */}
      {accountRole === 'BUYER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Profile Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-blue-700" />
              <span>{t.tabBuyerProfile}</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.buyerNameLabel}</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.buyerPhoneLabel}</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.buyerEmailLabel}</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.buyerCityLabel}</label>
                <div className="relative">
                  <select
                    value={buyerCity}
                    onChange={(e) => setBuyerCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600 font-medium cursor-pointer"
                  >
                    {ALL_INDIAN_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{profileSaved ? t.savedSuccess : t.btnSaveProfile}</span>
              </button>
            </form>
          </div>

          {/* Right: Active Groups, Price Lock Pass & Petrol Rewards */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Group Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-700" />
                  <span>{t.myActiveGroups}</span>
                </h4>
                {userGroups.length > 0 && (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
                    Active Member
                  </span>
                )}
              </div>

              {userGroups.length > 0 ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-base font-bold text-slate-900">{userGroups[0].carName}</div>
                    <p className="text-xs text-slate-500 mt-0.5">{userGroups[0].communityName} • {userGroups[0].currentBuyers}/{userGroups[0].targetBuyers} Buyers Joined</p>
                    <p className="text-xs text-emerald-700 font-bold mt-1">Status: {userGroups[0].status.replace('_', ' ')}</p>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('bidding')}
                    className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shrink-0 cursor-pointer"
                  >
                    View Competing Bids
                  </button>
                </div>
              ) : (
                <div className="py-6 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center space-y-2">
                  <p className="text-xs text-slate-600 font-medium">You haven't joined any active car buying groups yet.</p>
                  <button
                    onClick={() => onNavigateToTab('groups')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Explore Active Groups</span>
                  </button>
                </div>
              )}
            </div>

            {/* Price Lock Pass Reference */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{t.myPriceLockPasses}</span>
                </h4>
              </div>

              <div className="py-6 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center space-y-1.5">
                <p className="text-xs text-slate-600 font-medium">No active Price Lock Pass yet.</p>
                <p className="text-[11px] text-slate-400">
                  Join a car pool and once a showroom accepts the cohort deal, your verified 6-digit showroom check-in PIN will be generated here.
                </p>
              </div>
            </div>

            {/* Claimed Rewards */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-emerald-700" />
                  <span>{t.myFuelRewards}</span>
                </h4>
                <span className="text-xs font-bold text-emerald-700 font-mono">₹5,000 HPCL Card</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-900 uppercase">Voucher Code</span>
                  <div className="font-mono text-base font-bold text-emerald-800">PETRO-MH12-5000-8812</div>
                  <p className="text-[11px] text-slate-600">Valid at any HPCL / IOCL petrol pump in India</p>
                </div>

                <button
                  onClick={() => copyVoucherCode('PETRO-MH12-5000-8812')}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                >
                  {copiedVoucher ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOWROOM (DEALER) MODE ACCOUNT DETAILS */}
      {accountRole === 'DEALER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Dealership Profile Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="w-4 h-4 text-amber-700" />
              <span>{t.tabDealerProfile}</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.dealerOrgLabel}</label>
                <input
                  type="text"
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">{t.dealerCityLabel}</label>
                <input
                  type="text"
                  value={dealerCity}
                  onChange={(e) => setDealerCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Sales Head Contact</label>
                <input
                  type="text"
                  value={dealerManager}
                  onChange={(e) => setDealerManager(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Direct Phone</label>
                <input
                  type="text"
                  value={dealerPhone}
                  onChange={(e) => setDealerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateToTab('bidding')}
                  className="w-full py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span>Submit Group Bids Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Target Status & Buyer PIN Validation */}
          <div className="lg:col-span-7 space-y-6">
            {/* Target Rush Progress */}
            <div className="bg-amber-50/70 border border-amber-300 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  {t.dealerQuotaLabel}
                </span>
                <span className="text-xs font-black bg-amber-200 text-amber-950 px-2 py-0.5 rounded">
                  {Math.round(((inventory.monthlyTargetAchieved || 0) / (inventory.monthlyTargetCount || 20)) * 100)}% Achieved
                </span>
              </div>
              <p className="text-xs text-slate-700">
                {showroomCars.length === 0
                  ? 'Showroom catalog is clean. Add vehicles to activate buyer pools and volume target bonuses.'
                  : `${Math.max(0, (inventory.monthlyTargetCount || 20) - (inventory.monthlyTargetAchieved || 0))} more CarFair group deliveries required this month to unlock ${inventory.quarterlyBonusAmount || '₹45 Lakh'} manufacturer quarterly bonus slab.`}
              </p>
              <div className="w-full bg-amber-200/60 h-2.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-amber-700 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round(((inventory.monthlyTargetAchieved || 0) / (inventory.monthlyTargetCount || 20)) * 100))}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-600 pt-1">
                <span>Completed: {inventory.monthlyTargetAchieved || 0} Units</span>
                <span className="font-bold text-amber-900">Target: {inventory.monthlyTargetCount || 20} Units</span>
              </div>
            </div>

            {/* Quick Buyer PIN Check-In */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Key className="w-4 h-4 text-amber-700" />
                <h4 className="text-sm font-bold text-slate-900">{t.dealerPinCheckinTitle}</h4>
              </div>

              <p className="text-xs text-slate-600">
                {t.dealerPinCheckinDesc}
              </p>

              <form onSubmit={handleValidatePin} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Buyer's 6-Digit PIN</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 849201"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full bg-amber-50 border-2 border-amber-300 rounded-lg px-3 py-2 text-amber-900 font-mono font-bold text-lg tracking-widest text-center focus:bg-white focus:border-amber-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.btnValidatePin}</span>
                </button>
              </form>

              {pinStatus === 'SUCCESS' && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>PIN Verified! Buyer Price Lock Pass confirmed and VIN allocated successfully.</span>
                </div>
              )}

              {pinStatus === 'ERROR' && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs">
                  Please enter a valid 6-digit numeric PIN.
                </div>
              )}
            </div>

            {/* Showroom Vehicle Stock Photos Management */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-700" />
                  <h4 className="text-sm font-bold text-slate-900">Showroom Vehicle Photos & Stock Gallery</h4>
                </div>
                {showroomCars.length > 0 && (
                  <button
                    onClick={() => setUploadCar({ id: showroomCars[0].id, name: `${showroomCars[0].brand} ${showroomCars[0].model}` })}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>+ Upload Photos</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-600">
                Buyers in car groups can view authentic photos of cars currently in your showroom inventory.
              </p>

              {showroomCars.length === 0 ? (
                <div className="py-8 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center space-y-2">
                  <p className="text-xs text-slate-600 font-medium">No showroom vehicles listed yet.</p>
                  <button
                    onClick={() => onNavigateToTab('dealer')}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Add Showroom Vehicle in Portal</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {showroomCars.map((car) => {
                    const photos = getCarPhotos(car.id);
                    const thumb = photos[0]?.url || car.image;
                    return (
                      <div
                        key={car.id}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:bg-white hover:border-amber-300 transition-all"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {thumb && (
                            <img
                              src={thumb}
                              alt={car.model}
                              className="w-12 h-10 object-cover rounded-xl shrink-0 border border-slate-200"
                            />
                          )}
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-slate-900 truncate">{car.brand} {car.model}</h5>
                            <span className="text-[10px] font-semibold text-slate-500">
                              {photos.length} Verified Photos
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setGalleryCar({ id: car.id, name: `${car.brand} ${car.model}` })}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-[11px] font-bold shadow-2xs cursor-pointer"
                            title="View buyer gallery preview"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setUploadCar({ id: car.id, name: `${car.brand} ${car.model}` })}
                            className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-2xs cursor-pointer"
                            title="Upload new photos"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Car Gallery Modal for Buyer & Dealer Preview */}
      {galleryCar && (
        <CarGalleryModal
          isOpen={!!galleryCar}
          onClose={() => setGalleryCar(null)}
          carId={galleryCar.id}
          carName={galleryCar.name}
          images={getCarPhotos(galleryCar.id)}
          userRole={accountRole}
          onOpenUpload={accountRole === 'DEALER' ? (cId, cName) => setUploadCar({ id: cId, name: cName }) : undefined}
        />
      )}

      {/* Showroom Upload Photo Modal */}
      {uploadCar && (
        <UploadCarPhotoModal
          isOpen={!!uploadCar}
          onClose={() => setUploadCar(null)}
          carId={uploadCar.id}
          carName={uploadCar.name}
          dealerName={dealerName}
          onPhotoUploaded={() => {
            setPhotoRefreshKey(prev => prev + 1);
          }}
        />
      )}
    </div>
  );
};