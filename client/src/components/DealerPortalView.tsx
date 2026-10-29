import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Gavel, 
  Key, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Check, 
  AlertCircle,
  Camera,
  Upload,
  Edit3,
  Sliders,
  Clock,
  Car as CarIcon,
  Sparkles,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { Dealer, BuyingGroup, CarImageItem } from '../types';
import { 
  fetchDealers, 
  fetchGroups, 
  submitDealerBid, 
  verifyBuyerPin,
  getDealerInventory,
  saveDealerInventory,
  DealerInventorySettings
} from '../services/api';
import { getCarPhotos } from '../services/photoStorage';
import { CarGalleryModal } from './CarGalleryModal';
import { UploadCarPhotoModal } from './UploadCarPhotoModal';

interface DealerPortalViewProps {
  selectedCity?: string;
}

export const DealerPortalView: React.FC<DealerPortalViewProps> = ({ selectedCity = 'Pune' }) => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [groups, setGroups] = useState<BuyingGroup[]>([]);
  const [selectedDealerId, setSelectedDealerId] = useState('dealer-bafna-tata-pune');
  const [filterCity, setFilterCity] = useState(selectedCity === 'All Cities' ? 'All' : selectedCity);

  // Dynamic Inventory & Stock State
  const [inventory, setInventory] = useState<DealerInventorySettings>(getDealerInventory());
  const [isEditingInventory, setIsEditingInventory] = useState(false);
  const [editFloorStock, setEditFloorStock] = useState(inventory.readyStockCount);
  const [editTransitStock, setEditTransitStock] = useState(inventory.inTransitCount);
  const [editDeliveryDays, setEditDeliveryDays] = useState(inventory.fastDeliveryDays);
  const [editTargetCount, setEditTargetCount] = useState(inventory.monthlyTargetCount);
  const [stockSavedNotice, setStockSavedNotice] = useState(false);

  // Photo Management
  const [selectedPhotoCar, setSelectedPhotoCar] = useState('tata-nexon');
  const [galleryCar, setGalleryCar] = useState<{ id: string; name: string } | null>(null);
  const [uploadCar, setUploadCar] = useState<{ id: string; name: string } | null>(null);
  const [photoRefreshKey, setPhotoRefreshKey] = useState(0);
  const [currentCarPhotos, setCurrentCarPhotos] = useState<CarImageItem[]>([]);

  // Verify PIN State
  const [voucherInput, setVoucherInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);

  // Quick Bid State
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [bidDiscount, setBidDiscount] = useState(52000);
  const [deliveryDays, setDeliveryDays] = useState(inventory.fastDeliveryDays || 6);
  const [bidSuccessMessage, setBidSuccessMessage] = useState('');
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);

  const availableCars = [
    { id: 'tata-nexon', name: 'Tata Nexon Creative+ / Smart+' },
    { id: 'hyundai-creta', name: 'Hyundai Creta SX (Tech) IVT' },
    { id: 'mahindra-xuv700', name: 'Mahindra XUV700 AX7 Diesel AT' },
    { id: 'mahindra-scorpio-n', name: 'Mahindra Scorpio-N Z4 Diesel MT' }
  ];

  useEffect(() => {
    fetchDealers().then(d => {
      setDealers(d);
      if (d.length > 0) setSelectedDealerId(d[0].id);
    });
    loadGroups();
  }, [filterCity]);

  useEffect(() => {
    setCurrentCarPhotos(getCarPhotos(selectedPhotoCar));
  }, [selectedPhotoCar, photoRefreshKey]);

  const loadGroups = async () => {
    const g = await fetchGroups(filterCity === 'All' ? undefined : filterCity);
    setGroups(g);
    if (g.length > 0) setSelectedGroupId(g[0].id);
  };

  const handleSaveInventory = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: DealerInventorySettings = {
      ...inventory,
      readyStockCount: Number(editFloorStock),
      inTransitCount: Number(editTransitStock),
      fastDeliveryDays: Number(editDeliveryDays),
      monthlyTargetCount: Number(editTargetCount)
    };
    setInventory(updated);
    saveDealerInventory(updated);
    setIsEditingInventory(false);
    setStockSavedNotice(true);
    setTimeout(() => setStockSavedNotice(false), 3000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim().length !== 6) {
      setVerificationResult({
        success: false,
        message: 'Please enter a valid 6-digit Buyer Claim PIN.'
      });
      return;
    }
    setVerifying(true);
    const res = await verifyBuyerPin(voucherInput, pinInput);
    setVerificationResult(res);
    setVerifying(false);
  };

  const handleDealerBid = async (e: React.FormEvent, groupId: string) => {
    e.preventDefault();
    setIsSubmittingBid(true);
    const currentDealer = dealers.find(d => d.id === selectedDealerId);
    const res = await submitDealerBid(groupId, {
      dealerId: selectedDealerId,
      dealerName: currentDealer?.name || 'Authorized Dealership',
      exShowroomDiscount: bidDiscount,
      corporateExchangeBonus: 15000,
      freebies: ['5-Yr Extended Warranty', '7D Premium Mats', 'Ceramic Polish'],
      insuranceMatchPrice: 32000,
      waivedHandlingCharges: true,
      deliveryDays,
      terms: 'Authorized plant allocation. Price protected under CarFair pool agreement.'
    });

    if (res.success) {
      setBidSuccessMessage(`Offer submitted! Your lowest quote is now live for ${res.group.carName}.`);
      await loadGroups();
      setTimeout(() => setBidSuccessMessage(''), 4000);
    }
    setIsSubmittingBid(false);
  };

  const currentDealer = dealers.find(d => d.id === selectedDealerId) || dealers[0];
  const targetPercent = Math.min(100, Math.round((inventory.monthlyTargetAchieved / inventory.monthlyTargetCount) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Showroom Partner Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dealership Portal: Win Ready Bulk Buyer Pools
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Hit your monthly volume sales targets with 15–20 pre-approved buyers, zero customer acquisition cost, and express delivery allocation.
          </p>
        </div>

        {/* Dealer Switcher */}
        {dealers.length > 0 && (
          <div className="bg-white border border-slate-300 rounded-xl p-2.5 flex items-center gap-2 shadow-xs">
            <span className="text-xs text-slate-500 font-medium pl-1">Logged-in Showroom:</span>
            <select
              value={selectedDealerId}
              onChange={(e) => setSelectedDealerId(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-2.5 py-1.5 focus:bg-white focus:outline-none focus:border-amber-600 font-bold cursor-pointer"
            >
              {dealers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.city})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Dynamic Target & Live Inventory Bar */}
      <div className="bg-gradient-to-r from-amber-50/90 via-amber-50/60 to-orange-50/70 border border-amber-300 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-950 uppercase tracking-wider">
                Monthly Target Status
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-[10px] font-black">
                {targetPercent}% Achieved ({inventory.monthlyTargetAchieved}/{inventory.monthlyTargetCount} Cars)
              </span>
              {stockSavedNotice && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Stock Updated!
                </span>
              )}
            </div>
            <p className="text-xs text-slate-700">
              <strong>{currentDealer?.name}:</strong> {inventory.monthlyTargetCount - inventory.monthlyTargetAchieved} more deliveries needed to unlock the {inventory.quarterlyBonusAmount} OEM quarterly bonus slab.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white/80 border border-amber-200 rounded-xl px-3 py-2 text-center">
              <span className="text-[10px] text-slate-500 font-medium block">Ready on Floor</span>
              <span className="text-lg font-black font-mono text-slate-900">{inventory.readyStockCount} Units</span>
            </div>

            <div className="bg-white/80 border border-amber-200 rounded-xl px-3 py-2 text-center">
              <span className="text-[10px] text-slate-500 font-medium block">In Transit</span>
              <span className="text-lg font-black font-mono text-emerald-800">{inventory.inTransitCount} Units</span>
            </div>

            <div className="bg-white/80 border border-amber-200 rounded-xl px-3 py-2 text-center">
              <span className="text-[10px] text-slate-500 font-medium block">Delivery SLA</span>
              <span className="text-lg font-black font-mono text-blue-900">{inventory.fastDeliveryDays} Days</span>
            </div>

            <button
              onClick={() => setIsEditingInventory(!isEditingInventory)}
              className="px-3 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isEditingInventory ? 'Close Editor' : 'Update Stock & Transit'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Stock Editor Drawer */}
        {isEditingInventory && (
          <form onSubmit={handleSaveInventory} className="pt-4 border-t border-amber-200 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-white/70 p-4 rounded-xl">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Ready on Floor (Units)</label>
              <input
                type="number"
                min="0"
                value={editFloorStock}
                onChange={(e) => setEditFloorStock(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Units in Transit</label>
              <input
                type="number"
                min="0"
                value={editTransitStock}
                onChange={(e) => setEditTransitStock(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-emerald-700"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Fast Delivery SLA (Days)</label>
              <input
                type="number"
                min="1"
                value={editDeliveryDays}
                onChange={(e) => setEditDeliveryDays(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer shadow-xs"
              >
                Save Live Stock
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Prominent Showroom Vehicle Photography & Upload Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-extrabold text-slate-900">
                Showroom Vehicle Stock Photography Studio
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Buyers in car pools can inspect multi-angle showroom stock photos before locking deals. Show your ready inventory!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const c = availableCars.find(x => x.id === selectedPhotoCar) || availableCars[0];
                setUploadCar(c);
              }}
              className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>+ Upload Car Photo</span>
            </button>
            <button
              onClick={() => {
                const c = availableCars.find(x => x.id === selectedPhotoCar) || availableCars[0];
                setGalleryCar(c);
              }}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Gallery</span>
            </button>
          </div>
        </div>

        {/* Model Tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          {availableCars.map((car) => {
            const count = getCarPhotos(car.id).length;
            const isSelected = selectedPhotoCar === car.id;
            return (
              <button
                key={car.id}
                onClick={() => setSelectedPhotoCar(car.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-amber-600 text-white shadow-xs' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <CarIcon className="w-3.5 h-3.5" />
                <span>{car.name.split(' ')[0]} {car.name.split(' ')[1]}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                  isSelected ? 'bg-amber-800 text-amber-100' : 'bg-slate-200 text-slate-800'
                }`}>
                  {count} photos
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Photo Grid for Selected Car */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {currentCarPhotos.slice(0, 5).map((img, idx) => (
            <div key={img.id || idx} className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3 shadow-2xs">
              <img 
                src={img.url} 
                alt={img.caption || 'Car Photo'} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300">
                  {img.category || 'SHOWROOM'}
                </span>
                <span className="text-[10px] font-medium truncate">{img.caption || 'Stock Unit'}</span>
              </div>
            </div>
          ))}

          {/* Quick Upload Tile */}
          <button
            onClick={() => {
              const c = availableCars.find(x => x.id === selectedPhotoCar) || availableCars[0];
              setUploadCar(c);
            }}
            className="rounded-xl border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-50 flex flex-col items-center justify-center p-3 text-center aspect-4/3 transition-colors cursor-pointer"
          >
            <Upload className="w-5 h-5 text-amber-700 mb-1" />
            <span className="text-xs font-bold text-amber-900">+ Add Angle</span>
            <span className="text-[10px] text-amber-700">File or Camera</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Groups to Bid On */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-700" />
              <span>Active Buyer Pools Looking for Showroom Offers ({groups.length})</span>
            </h3>

            {/* City Filter */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg px-2 py-1 cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi NCR">Delhi NCR</option>
              </select>
            </div>
          </div>

          {bidSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-bold flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{bidSuccessMessage}</span>
            </div>
          )}

          <div className="space-y-4">
            {groups.map((group) => {
              const winningBid = group.bids && group.bids.length > 0 ? group.bids[0] : null;
              return (
                <div
                  key={group.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{group.carName}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{group.communityName}</span> • 
                        <strong className="text-emerald-700 font-bold">{group.verifiedBuyers} Pre-Approved Buyers</strong>
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 text-blue-800 border border-slate-200">
                      {group.city}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-xs border border-slate-100">
                    <div>
                      <span className="text-slate-500 font-medium">Pool Target:</span>
                      <div className="font-bold text-slate-800">{group.targetBuyers} Buyers</div>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Joined Buyers:</span>
                      <div className="font-bold text-slate-900">{group.currentBuyers} Ready</div>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Lowest Showroom Offer:</span>
                      <div className="font-bold font-mono text-emerald-700">₹{group.currentBestGroupPrice.toLocaleString('en-IN')}</div>
                    </div>
                  </div>

                  {winningBid && (
                    <div className="text-[11px] bg-amber-50/70 border border-amber-200 rounded-lg p-2 flex items-center justify-between text-amber-950">
                      <span><strong>Current Leading Showroom:</strong> {winningBid.dealerName} (-₹{winningBid.exShowroomDiscount.toLocaleString('en-IN')} discount)</span>
                      <span className="font-mono font-bold text-emerald-800">{winningBid.deliveryDays} Days Delivery</span>
                    </div>
                  )}

                  {/* Quick Submit Bid form */}
                  <form onSubmit={(e) => handleDealerBid(e, group.id)} className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs items-end">
                    <div>
                      <label className="block text-slate-600 font-medium text-[11px] mb-1">Your Cash Discount (₹)</label>
                      <input
                        type="number"
                        step="1000"
                        defaultValue={bidDiscount}
                        onChange={(e) => setBidDiscount(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 font-mono font-bold focus:bg-white focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-medium text-[11px] mb-1">Delivery Time (Days)</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        defaultValue={deliveryDays}
                        onChange={(e) => setDeliveryDays(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 font-mono font-bold focus:bg-white focus:border-amber-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingBid}
                      className="py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      <Gavel className="w-3.5 h-3.5" />
                      <span>{isSubmittingBid ? 'Submitting...' : 'Submit Dealer Bid'}</span>
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: DealLock OTP Verification Portal */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Key className="w-4 h-4 text-amber-700" />
              <h3 className="text-sm font-bold text-slate-900">Showroom Check-In: Verify Buyer PIN</h3>
            </div>

            <p className="text-xs text-slate-600">
              When a CarFair buyer arrives at your showroom with their Price Lock Pass, enter their 6-digit PIN below to confirm the booking price.
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Price Lock Pass Number</label>
                <input
                  type="text"
                  placeholder="e.g. CF-LOCK-MH-8812"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono text-xs focus:bg-white focus:border-amber-600 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Buyer's 6-Digit PIN</label>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN (e.g. 849201)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-amber-50/50 border border-amber-300 rounded-lg px-3 py-2.5 text-center font-mono text-base font-bold tracking-widest text-slate-900 focus:bg-white focus:border-amber-600"
                />
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{verifying ? 'Verifying...' : 'Verify PIN & Confirm Booking'}</span>
              </button>
            </form>

            {verificationResult?.success && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs space-y-2 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{verificationResult.message}</span>
                </div>
                {verificationResult.data && (
                  <div className="text-[11px] text-slate-700 pt-2 border-t border-emerald-200/60 space-y-1">
                    <p><strong>Buyer:</strong> {verificationResult.data.buyerName}</p>
                    <p><strong>Vehicle:</strong> {verificationResult.data.carName} {verificationResult.data.variantName}</p>
                    <p><strong>Locked On-Road Price:</strong> ₹{verificationResult.data.lockedPrice?.toLocaleString('en-IN')}</p>
                    <p className="text-emerald-800 font-bold">Guaranteed Savings: ₹{verificationResult.data.guaranteedSavings?.toLocaleString('en-IN')}</p>
                  </div>
                )}
              </div>
            )}

            {verificationResult && !verificationResult.success && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{verificationResult.message}</span>
              </div>
            )}
          </div>

          {/* Dealership Benefits Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Why Authorised Dealerships Partner with CarFair</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 pl-4 list-disc text-[11px]">
              <li><strong>Zero Cold Calling:</strong> Verified buyers with pre-approved finance ready to purchase.</li>
              <li><strong>Volume Target Triggers:</strong> Achieve OEM quarterly bonuses easily with group orders.</li>
              <li><strong>Fast Inventory Rotation:</strong> Clear transit stock in 5 to 8 days.</li>
              <li><strong>Secure PIN Verification:</strong> Transparent booking confirmation.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {galleryCar && (
        <CarGalleryModal
          isOpen={!!galleryCar}
          onClose={() => setGalleryCar(null)}
          carId={galleryCar.id}
          carName={galleryCar.name}
          images={getCarPhotos(galleryCar.id)}
          userRole="DEALER"
          onOpenUpload={(cId, cName) => setUploadCar({ id: cId, name: cName })}
        />
      )}

      {/* Upload Modal */}
      {uploadCar && (
        <UploadCarPhotoModal
          isOpen={!!uploadCar}
          onClose={() => setUploadCar(null)}
          carId={uploadCar.id}
          carName={uploadCar.name}
          dealerName={dealers.find(d => d.id === selectedDealerId)?.name || 'Authorized Dealership'}
          onPhotoUploaded={() => setPhotoRefreshKey(prev => prev + 1)}
        />
      )}
    </div>
  );
};
