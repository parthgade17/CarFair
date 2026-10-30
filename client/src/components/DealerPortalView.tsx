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
  RefreshCw,
  PlusCircle,
  Trash2,
  Image as ImageIcon,
  X,
  ExternalLink,
  Tag
} from 'lucide-react';
import { Dealer, BuyingGroup, CarImageItem, Car } from '../types';
import { 
  fetchDealers, 
  fetchGroups, 
  fetchCars,
  submitDealerBid, 
  verifyBuyerPin,
  getDealerInventory,
  saveDealerInventory,
  addShowroomVehicle,
  deleteShowroomVehicle,
  clearAllShowroomData,
  isDemoCleared,
  DealerInventorySettings,
  getActiveRegisteredDealer,
  registerShowroomDealer,
  logoutRegisteredDealer
} from '../services/api';
import { getCarPhotos } from '../services/photoStorage';
import { CarGalleryModal } from './CarGalleryModal';
import { UploadCarPhotoModal } from './UploadCarPhotoModal';

interface DealerPortalViewProps {
  selectedCity?: string;
  onSwitchToBuyer?: () => void;
}

export const DealerPortalView: React.FC<DealerPortalViewProps> = ({ 
  selectedCity = 'Pune',
  onSwitchToBuyer
}) => {
  const [registeredDealer, setRegisteredDealer] = useState<Dealer | null>(getActiveRegisteredDealer());
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [groups, setGroups] = useState<BuyingGroup[]>([]);
  const [showroomCars, setShowroomCars] = useState<Car[]>([]);
  const [selectedDealerId, setSelectedDealerId] = useState(registeredDealer?.id || '');
  const [filterCity, setFilterCity] = useState(selectedCity === 'All Cities' ? 'All' : selectedCity);

  // Showroom Registration Form State
  const [regName, setRegName] = useState('');
  const [regBrand, setRegBrand] = useState('Tata');
  const [regCity, setRegCity] = useState(selectedCity === 'All Cities' ? 'Pune' : selectedCity);
  const [regLocation, setRegLocation] = useState('');
  const [regContactPerson, setRegContactPerson] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDealerCode, setRegDealerCode] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  // Dynamic Inventory & Target Stock State
  const [inventory, setInventory] = useState<DealerInventorySettings>(getDealerInventory());
  const [isEditingInventory, setIsEditingInventory] = useState(false);
  const [editFloorStock, setEditFloorStock] = useState(inventory.readyStockCount);
  const [editTransitStock, setEditTransitStock] = useState(inventory.inTransitCount);
  const [editDeliveryDays, setEditDeliveryDays] = useState(inventory.fastDeliveryDays);
  const [editTargetCount, setEditTargetCount] = useState(inventory.monthlyTargetCount);
  const [stockSavedNotice, setStockSavedNotice] = useState(false);

  // Add Vehicle Modal & Form State
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [isClearingData, setIsClearingData] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const [formBrand, setFormBrand] = useState('Tata');
  const [formCustomBrand, setFormCustomBrand] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formVariant, setFormVariant] = useState('');
  const [formSegment, setFormSegment] = useState('Compact SUV');
  const [formPrice, setFormPrice] = useState(1150000);
  const [formFuel, setFormFuel] = useState('Petrol');
  const [formTransmission, setFormTransmission] = useState('Manual');
  const [formMileage, setFormMileage] = useState('18.2 kmpl');
  const [formEngineCc, setFormEngineCc] = useState(1199);
  const [formSeating, setFormSeating] = useState(5);
  const [formTagline, setFormTagline] = useState('Showroom stock available for immediate allocation');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formImageFilePreview, setFormImageFilePreview] = useState<string | null>(null);
  const [formReadyStock, setFormReadyStock] = useState(4);
  const [formInTransit, setFormInTransit] = useState(6);
  const [formCreatePool, setFormCreatePool] = useState(true);
  const [formPoolTarget, setFormPoolTarget] = useState(15);
  const [formPoolDiscount, setFormPoolDiscount] = useState(48000);
  const [isSubmittingVehicle, setIsSubmittingVehicle] = useState(false);

  // Photo Management
  const [selectedPhotoCar, setSelectedPhotoCar] = useState('');
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

  useEffect(() => {
    const active = getActiveRegisteredDealer();
    setRegisteredDealer(active);
    if (active) {
      setSelectedDealerId(active.id);
      setFormBrand(active.brand);
    }
    fetchDealers().then(d => {
      setDealers(d);
      if (!active && d.length > 0) {
        setSelectedDealerId(d[0].id);
      }
    });
    loadAllData();
  }, [filterCity]);

  const handleRegisterShowroom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      setRegError('Please enter your Showroom / Dealership name.');
      return;
    }
    if (!regLocation.trim()) {
      setRegError('Please enter your Showroom area / location.');
      return;
    }
    if (!regContactPerson.trim()) {
      setRegError('Please enter the Sales Manager or GM contact name.');
      return;
    }
    if (!regPhone.trim()) {
      setRegError('Please enter an official contact phone number.');
      return;
    }

    setIsRegistering(true);
    setRegError(null);

    const res = await registerShowroomDealer({
      name: regName.trim(),
      brand: regBrand,
      city: regCity,
      location: regLocation.trim(),
      contactPerson: regContactPerson.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
      dealerCode: regDealerCode.trim()
    });

    if (res.success) {
      setRegisteredDealer(res.dealer);
      setSelectedDealerId(res.dealer.id);
      setFormBrand(res.dealer.brand);
      setStatusNotice(`🎉 Showroom successfully registered! Welcome, ${res.dealer.name}.`);
      await loadAllData();
    }
    setIsRegistering(false);
  };

  const handleLogoutDealer = () => {
    if (confirm('Are you sure you want to log out of this showroom? You can register or log in with another showroom at any time.')) {
      logoutRegisteredDealer();
      setRegisteredDealer(null);
    }
  };

  useEffect(() => {
    if (selectedPhotoCar) {
      setCurrentCarPhotos(getCarPhotos(selectedPhotoCar));
    } else if (showroomCars.length > 0) {
      setSelectedPhotoCar(showroomCars[0].id);
      setCurrentCarPhotos(getCarPhotos(showroomCars[0].id));
    } else {
      setCurrentCarPhotos([]);
    }
  }, [selectedPhotoCar, photoRefreshKey, showroomCars]);

  const loadAllData = async () => {
    const [g, c] = await Promise.all([
      fetchGroups(filterCity === 'All' ? undefined : filterCity),
      fetchCars()
    ]);
    setGroups(g);
    setShowroomCars(c);
    if (g.length > 0) setSelectedGroupId(g[0].id);
    if (c.length > 0 && !selectedPhotoCar) {
      setSelectedPhotoCar(c[0].id);
    }
    const inv = getDealerInventory();
    setInventory(inv);
    setEditFloorStock(inv.readyStockCount);
    setEditTransitStock(inv.inTransitCount);
    setEditDeliveryDays(inv.fastDeliveryDays);
    setEditTargetCount(inv.monthlyTargetCount);
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormImageFilePreview(result);
        setFormImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalBrand = formBrand === 'Other' ? formCustomBrand.trim() : formBrand;
    if (!finalBrand) {
      alert('Please enter or select a vehicle brand.');
      return;
    }
    if (!formModel.trim()) {
      alert('Please enter a vehicle model name (e.g. Brezza, Nexon, Creta).');
      return;
    }
    setIsSubmittingVehicle(true);
    const currentDealer = registeredDealer || dealers.find(d => d.id === selectedDealerId);
    const finalImage = formImageFilePreview || formImageUrl;
    if (!finalImage) {
      alert('Please upload a vehicle photograph from your device/camera or enter a photo URL.');
      setIsSubmittingVehicle(false);
      return;
    }

    const res = await addShowroomVehicle({
      brand: finalBrand,
      model: formModel.trim(),
      variantName: formVariant.trim() || `${formModel.trim()} ${formFuel} ${formTransmission}`,
      segment: formSegment,
      exShowroomPrice: Number(formPrice),
      fuelType: formFuel,
      transmission: formTransmission,
      engineCc: Number(formEngineCc),
      seating: Number(formSeating),
      mileage: formMileage,
      imageUrl: finalImage,
      tagline: formTagline,
      city: registeredDealer?.city || (filterCity === 'All' ? selectedCity : filterCity),
      dealerId: registeredDealer?.id || selectedDealerId || 'dealer-showroom',
      dealerName: registeredDealer?.name || currentDealer?.name || 'Authorized Showroom Partner',
      readyStock: Number(formReadyStock),
      inTransit: Number(formInTransit),
      createBuyerPool: formCreatePool,
      poolTargetBuyers: Number(formPoolTarget),
      poolDiscount: Number(formPoolDiscount)
    });

    if (res.success) {
      setIsAddCarModalOpen(false);
      setFormModel('');
      setFormVariant('');
      setFormImageFilePreview(null);
      setFormImageUrl('');
      setStatusNotice(`🎉 "${res.car.brand} ${res.car.model}" has been added! It is now live and visible to buyers on the website.`);
      await loadAllData();
      setTimeout(() => setStatusNotice(null), 5000);
    }
    setIsSubmittingVehicle(false);
  };

  const handleDeleteCar = async (carId: string, carName: string) => {
    if (!confirm(`Are you sure you want to remove "${carName}" from the showroom? This will also remove any linked buyer pools.`)) {
      return;
    }
    await deleteShowroomVehicle(carId);
    setStatusNotice(`"${carName}" was removed from showroom inventory.`);
    await loadAllData();
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const handleClearAllData = async () => {
    if (!confirm('Are you sure you want to delete ALL demo vehicles and buyer pools? This clears all static/demo data and leaves a completely clean showroom ready for your own vehicle listings.')) {
      return;
    }
    setIsClearingData(true);
    const res = await clearAllShowroomData();
    setStatusNotice(res.message);
    await loadAllData();
    setIsClearingData(false);
    setTimeout(() => setStatusNotice(null), 6000);
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
    const currentDealer = registeredDealer || dealers.find(d => d.id === selectedDealerId);
    const res = await submitDealerBid(groupId, {
      dealerId: registeredDealer?.id || selectedDealerId || 'dealer-showroom',
      dealerName: registeredDealer?.name || currentDealer?.name || 'Authorized Dealership',
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
      await loadAllData();
      setTimeout(() => setBidSuccessMessage(''), 4000);
    }
    setIsSubmittingBid(false);
  };

  // If showroom is not registered yet, display the dedicated Showroom Registration Gateway
  if (!registeredDealer) {
    return (
      <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/40 via-white to-slate-50">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Top navigation */}
          <div className="flex items-center justify-between">
            {onSwitchToBuyer ? (
              <button
                onClick={onSwitchToBuyer}
                className="text-xs font-bold text-slate-600 hover:text-blue-900 inline-flex items-center gap-1.5 cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors"
              >
                ← Return to Buyer Platform
              </button>
            ) : <div />}
            <span className="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full uppercase tracking-wider">
              Dealership Gateway
            </span>
          </div>

          {/* Heading Banner */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-amber-700" />
              <span>OEM Authorised Dealership Onboarding</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Register Your Dealership Showroom
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Register your showroom to unlock verified buyer pools in your city, manage vehicle catalog photos, and compete for ready group deliveries.
            </p>
          </div>

          {/* Registration Form Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Showroom Profile & Contact Credentials</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                These credentials will be documented on your binding price quotations and Price Lock passes issued to buyers.
              </p>
            </div>

            {regError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterShowroom} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Showroom Name */}
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    Showroom / Dealership Legal Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kothari Wheels Flagship / Garve Automotive"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-semibold"
                  />
                </div>

                {/* Brand Franchise */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    OEM Brand Franchise <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={regBrand}
                    onChange={(e) => setRegBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-bold cursor-pointer"
                  >
                    <option value="Tata">Tata Motors</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Maruti Suzuki">Maruti Suzuki / Nexa</option>
                    <option value="Mahindra">Mahindra & Mahindra</option>
                    <option value="Kia">Kia Motors</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="MG">MG Motor</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Skoda">Skoda</option>
                    <option value="Other">Other Brand</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Showroom City <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-bold cursor-pointer"
                  >
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                  </select>
                </div>

                {/* Showroom Location / Branch Area */}
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    Showroom Location / Branch Area <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Baner Road & Aundh Flagship Store"
                    value={regLocation}
                    onChange={(e) => setRegLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-semibold"
                  />
                </div>

                {/* General Manager / Contact Person */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Sales Head / General Manager <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kunal Deshmukh (Group Sales Head)"
                    value={regContactPerson}
                    onChange={(e) => setRegContactPerson(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-semibold"
                  />
                </div>

                {/* Official Contact Phone */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Official Contact Phone / Mobile <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98220 44100"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-mono font-semibold"
                  />
                </div>

                {/* Official Email */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Official Dealership Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. sales@kothariwheels.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-semibold"
                  />
                </div>

                {/* OEM Dealer Code */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    OEM Dealer Code / GST (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. OEM-MH-4091"
                    value={regDealerCode}
                    onChange={(e) => setRegDealerCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs focus:bg-white focus:border-amber-600 font-mono"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full py-3.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{isRegistering ? 'Registering Showroom...' : 'Register Showroom & Access Portal →'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Pre-Approved Buyers</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Direct cohorts of 15–20 buyers ready to buy in your city with verified intent.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-blue-700" />
                <span>Volume Bonus Slabs</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Unlock monthly OEM volume quarterly bonus slabs with bulk allocation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-700" />
                <span>6-Digit PIN Check-In</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Verify buyers with Price Lock PINs at your showroom counter before delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentDealer = registeredDealer;
  const targetPercent = Math.min(100, Math.round((inventory.monthlyTargetAchieved / inventory.monthlyTargetCount) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Quick Actions */}
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

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsAddCarModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-102"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Vehicle to Showroom</span>
          </button>

          <button
            onClick={handleClearAllData}
            disabled={isClearingData}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-200 hover:border-red-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Wipe demo data and reset showroom inventory to fresh clean state"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isClearingData ? 'Clearing...' : 'Clear Demo Data'}</span>
          </button>

          {/* Registered Showroom Profile Pill (Replaced dropdown selector) */}
          <div className="bg-white border border-slate-300 rounded-2xl px-3.5 py-2 flex items-center gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 flex items-center justify-center font-bold shrink-0">
              <Building2 className="w-4 h-4 text-amber-700" />
            </div>
            <div className="min-w-0 pr-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
                <span className="truncate">{registeredDealer.name}</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded border border-emerald-300 shrink-0">
                  {registeredDealer.brand}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {registeredDealer.location}, {registeredDealer.city} • {registeredDealer.contactPerson}
              </div>
            </div>
            <button
              onClick={handleLogoutDealer}
              className="text-[11px] font-bold text-slate-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-red-200 transition-colors cursor-pointer shrink-0"
              title="Switch or re-register showroom credentials"
            >
              Switch
            </button>
          </div>
        </div>
      </div>

      {/* Global Status Feedback Notice */}
      {statusNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-950 font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusNotice}</span>
          </div>
          <button onClick={() => setStatusNotice(null)} className="text-emerald-700 hover:text-emerald-950 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

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
              <strong>{currentDealer?.name}:</strong> {showroomCars.length === 0 ? 'Showroom catalog is clean (0 vehicles). Add vehicles below to activate live stock tracking and buyer group offers.' : `${inventory.monthlyTargetCount - inventory.monthlyTargetAchieved} more deliveries needed to unlock the ${inventory.quarterlyBonusAmount} OEM quarterly bonus slab.`}
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

      {/* DYNAMIC SHOWROOM FLEET & VEHICLE LISTINGS (Visible to Buyers when added) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <CarIcon className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-extrabold text-slate-900">
                Showroom Vehicle Stock & Catalog ({showroomCars.length} Models Listed)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Vehicles listed here appear live on the Buyer Portal with your uploaded photographs, ex-showroom pricing, and delivery readiness.
            </p>
          </div>

          <button
            onClick={() => setIsAddCarModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add New Vehicle</span>
          </button>
        </div>

        {showroomCars.length === 0 ? (
          <div className="py-12 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-3 bg-slate-50/50">
            <CarIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-700">No Vehicles Currently Listed</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your showroom catalog is clean. Click below to add a vehicle model with specifications and photos. Once added, it will immediately be visible to car buyers on the platform!
            </p>
            <button
              onClick={() => setIsAddCarModalOpen(true)}
              className="mt-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add First Vehicle Now</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
            {showroomCars.map((car) => {
              const primaryVariant = car.variants && car.variants.length > 0 ? car.variants[0] : null;
              const linkedGroup = groups.find(g => g.carId === car.id);
              const carPhotos = getCarPhotos(car.id);
              const displayImg = carPhotos.length > 0 ? carPhotos[0].url : car.image;

              return (
                <div
                  key={car.id}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/40 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Vehicle Photo with Badges */}
                    <div className="relative h-44 bg-slate-200 overflow-hidden group/img">
                      <img
                        src={displayImg}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {car.segment}
                      </div>
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                        <button
                          onClick={() => handleDeleteCar(car.id, `${car.brand} ${car.model}`)}
                          className="p-1.5 rounded-lg bg-red-600/90 hover:bg-red-700 text-white text-[10px] shadow-xs cursor-pointer transition-colors"
                          title="Delete vehicle from showroom"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white drop-shadow font-semibold">
                        <span>{car.fuelTypes.join(' / ')} • {car.transmissions.join(' / ')}</span>
                        <span className="bg-emerald-600/90 px-2 py-0.5 rounded text-[10px] font-bold">Live on Buyer Side</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">
                          {car.brand} {car.model}
                        </h4>
                        <p className="text-xs text-slate-600 truncate mt-0.5">
                          {primaryVariant ? primaryVariant.name : car.tagline}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Ex-Showroom Price</span>
                          <span className="font-bold font-mono text-slate-900 text-xs">
                            {primaryVariant ? `₹${primaryVariant.exShowroom.toLocaleString('en-IN')}` : car.priceRange}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Mileage / Spec</span>
                          <span className="font-bold text-slate-800 text-xs">
                            {primaryVariant?.mileage || '18.2 kmpl'}
                          </span>
                        </div>
                      </div>

                      {linkedGroup && (
                        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                          <div className="flex items-center justify-between font-bold">
                            <span>Active Buyer Pool</span>
                            <span className="text-emerald-800 font-mono">{linkedGroup.currentBuyers} Joined</span>
                          </div>
                          <p className="text-[10px] text-slate-600">
                            Current lowest price: ₹{linkedGroup.currentBestGroupPrice.toLocaleString('en-IN')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => setUploadCar({ id: car.id, name: `${car.brand} ${car.model}` })}
                      className="flex-1 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>+ Add Photos</span>
                    </button>
                    <button
                      onClick={() => setGalleryCar({ id: car.id, name: `${car.brand} ${car.model}` })}
                      className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
                    >
                      Gallery ({carPhotos.length})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Showroom Vehicle Photography Studio */}
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
                const target = showroomCars.find(x => x.id === selectedPhotoCar) || showroomCars[0];
                if (target) {
                  setUploadCar({ id: target.id, name: `${target.brand} ${target.model}` });
                } else {
                  setIsAddCarModalOpen(true);
                }
              }}
              className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>+ Upload Car Photo</span>
            </button>
          </div>
        </div>

        {/* Dynamic Model Tabs */}
        {showroomCars.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {showroomCars.map((car) => {
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
                  <span>{car.brand} {car.model}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                    isSelected ? 'bg-amber-800 text-amber-100' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {count} photos
                  </span>
                </button>
              );
            })}
          </div>
        )}

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
              const target = showroomCars.find(x => x.id === selectedPhotoCar) || showroomCars[0];
              if (target) {
                setUploadCar({ id: target.id, name: `${target.brand} ${target.model}` });
              } else {
                setIsAddCarModalOpen(true);
              }
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

          {groups.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2">
              <Users className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No Active Buyer Pools in this City</h4>
              <p className="text-xs text-slate-500">
                When you list a vehicle above, a corresponding group pool is automatically created for buyers to join!
              </p>
            </div>
          ) : (
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
          )}
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

      {/* ADD SHOWROOM VEHICLE MODAL */}
      {isAddCarModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Showroom Inventory Addition</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Add New Vehicle to Showroom Fleet
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  This vehicle will become immediately visible on the Buyer portal with your photos, specs, and price.
                </p>
              </div>
              <button
                onClick={() => setIsAddCarModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVehicleSubmit} className="space-y-5 text-xs">
              {/* Brand & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vehicle Brand *</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:bg-white focus:border-emerald-600"
                  >
                    <option value="Tata">Tata Motors</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Hyundai">Hyundai India</option>
                    <option value="Mahindra">Mahindra & Mahindra</option>
                    <option value="Kia">Kia India</option>
                    <option value="Toyota">Toyota Kirloskar</option>
                    <option value="Honda">Honda Cars</option>
                    <option value="MG">MG Motor India</option>
                    <option value="Skoda">Skoda Auto</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Other">Other (Custom Brand)</option>
                  </select>
                  {formBrand === 'Other' && (
                    <input
                      type="text"
                      placeholder="Enter brand name"
                      value={formCustomBrand}
                      onChange={(e) => setFormCustomBrand(e.target.value)}
                      className="mt-2 w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vehicle Model Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Brezza, Nexon, Creta, Scorpio-N"
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:bg-white focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              {/* Variant & Segment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Exact Variant Name</label>
                  <input
                    type="text"
                    placeholder="e.g. ZXi+ Dual Tone AT / AX7L Diesel"
                    value={formVariant}
                    onChange={(e) => setFormVariant(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:border-emerald-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Segment</label>
                  <select
                    value={formSegment}
                    onChange={(e) => setFormSegment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-medium"
                  >
                    <option value="Compact SUV">Compact SUV</option>
                    <option value="Mid-Size SUV">Mid-Size SUV</option>
                    <option value="Premium 7-Seater">Premium 7-Seater SUV</option>
                    <option value="Premium Hatchback">Premium Hatchback</option>
                    <option value="Sedan">Executive Sedan</option>
                    <option value="EV">Electric Vehicle (EV)</option>
                  </select>
                </div>
              </div>

              {/* Price, Fuel & Transmission */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ex-Showroom Price (₹) *</label>
                  <input
                    type="number"
                    step="5000"
                    min="200000"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-mono font-bold text-slate-900 focus:bg-white focus:border-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fuel Type</label>
                  <select
                    value={formFuel}
                    onChange={(e) => setFormFuel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-900"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric (EV)</option>
                    <option value="CNG">CNG</option>
                    <option value="Hybrid">Strong Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Transmission</label>
                  <select
                    value={formTransmission}
                    onChange={(e) => setFormTransmission(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-900"
                  >
                    <option value="Manual">Manual (MT)</option>
                    <option value="Automatic">Automatic (AT / TC)</option>
                    <option value="AMT">AMT</option>
                    <option value="DCT">Dual-Clutch (DCT / DCA)</option>
                    <option value="IVT">IVT / CVT</option>
                  </select>
                </div>
              </div>

              {/* Specs: Mileage, Engine CC, Seating */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ARAI Mileage</label>
                  <input
                    type="text"
                    value={formMileage}
                    onChange={(e) => setFormMileage(e.target.value)}
                    placeholder="e.g. 19.8 kmpl"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Engine Displacement (cc)</label>
                  <input
                    type="number"
                    value={formEngineCc}
                    onChange={(e) => setFormEngineCc(Number(e.target.value))}
                    placeholder="e.g. 1462"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Seating Capacity</label>
                  <select
                    value={formSeating}
                    onChange={(e) => setFormSeating(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium"
                  >
                    <option value={5}>5-Seater</option>
                    <option value={6}>6-Seater Captain Seats</option>
                    <option value={7}>7-Seater</option>
                  </select>
                </div>
              </div>

              {/* Vehicle Photograph & Upload Studio */}
              <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800">Vehicle Stock Photograph *</label>
                  <span className="text-[10px] text-slate-500">Upload from camera / device or use preset</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block p-3 border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 rounded-xl text-center cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
                      <span className="block font-bold text-emerald-950 text-xs">Choose Image File</span>
                      <span className="block text-[10px] text-emerald-700">PNG, JPG, WebP from your device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    {formImageFilePreview || formImageUrl ? (
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-16/9 bg-slate-100">
                        <img
                          src={formImageFilePreview || formImageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1 right-1 bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Image Selected
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 aspect-16/9 flex items-center justify-center text-slate-400 text-xs">
                        No image chosen yet
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Or Paste Image URL directly:</label>
                  <input
                    type="url"
                    placeholder="https://example.com/vehicle-stock-photo.jpg"
                    value={formImageUrl}
                    onChange={(e) => {
                      setFormImageUrl(e.target.value);
                      setFormImageFilePreview(null);
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              {/* Ready Stock & Buyer Pool Option */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-amber-50/60 border border-amber-200 rounded-2xl">
                <div>
                  <label className="block font-bold text-amber-950 mb-1">Ready Showroom Units</label>
                  <input
                    type="number"
                    min="0"
                    value={formReadyStock}
                    onChange={(e) => setFormReadyStock(Number(e.target.value))}
                    className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-amber-950 mb-1">Units in Transit</label>
                  <input
                    type="number"
                    min="0"
                    value={formInTransit}
                    onChange={(e) => setFormInTransit(Number(e.target.value))}
                    className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 font-bold"
                  />
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-amber-200/80">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formCreatePool}
                      onChange={(e) => setFormCreatePool(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span>Launch Buyer Pool Immediately for this car in {filterCity === 'All' ? selectedCity : filterCity}</span>
                  </label>
                  <p className="text-[10px] text-slate-500 pl-6 mt-0.5">
                    Creates an active buyer group on the homepage and groups tab so local buyers can instantly reserve spots.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddCarModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingVehicle}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isSubmittingVehicle ? 'Saving & Publishing...' : 'Publish Vehicle to Showroom'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          dealerName={registeredDealer?.name || 'Authorized Dealership'}
          onPhotoUploaded={() => setPhotoRefreshKey(prev => prev + 1)}
        />
      )}
    </div>
  );
};
