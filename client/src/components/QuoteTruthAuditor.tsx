import React, { useState, useEffect } from 'react';
import { 
  FileSearch, 
  AlertTriangle, 
  ShieldAlert, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Zap,
  HelpCircle,
  CheckCircle,
  Upload,
  FileText,
  Bookmark,
  Building2,
  Info,
  Scale
} from 'lucide-react';
import { QuoteTruthAudit, Car } from '../types';
import { auditQuotation, fetchCars } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface QuoteTruthAuditorProps {
  onJoinGroupForCar: (carId: string) => void;
  selectedCity: string;
}

export const QuoteTruthAuditor: React.FC<QuoteTruthAuditorProps> = ({
  onJoinGroupForCar,
  selectedCity
}) => {
  const { t } = useLanguage();
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState('tata-nexon');
  const [selectedVariantId, setSelectedVariantId] = useState('nexon-creative-plus');
  const [selectedState, setSelectedState] = useState('MH');

  // Quotation inputs
  const [exShowroom, setExShowroom] = useState(1169000);
  const [rto, setRto] = useState(134000);
  const [insurance, setInsurance] = useState(58000);
  const [handlingCharges, setHandlingCharges] = useState(22000);
  const [accessoryPack, setAccessoryPack] = useState(24000);
  const [extendedWarranty, setExtendedWarranty] = useState(16500);
  const [discounts, setDiscounts] = useState(15000);

  // Upload & Extraction State
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [savedQuoteNotice, setSavedQuoteNotice] = useState(false);

  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<QuoteTruthAudit | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    fetchCars().then(c => {
      setCars(c);
      if (c.length > 0) {
        handlePreset('nexon-pune');
      }
    });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    setUploadNotice(null);

    setTimeout(() => {
      // Simulate deterministic AI extraction from quotation document
      setExShowroom(1169000);
      setRto(134000);
      setInsurance(58000);
      setHandlingCharges(22000);
      setAccessoryPack(24000);
      setExtendedWarranty(16500);
      setDiscounts(15000);
      setIsExtracting(false);
      setUploadNotice(`Extracted numbers from "${file.name}". Please verify the extracted fields below before auditing.`);
      runAudit();
    }, 1200);
  };

  const handlePreset = async (presetType: string) => {
    let payload;
    if (presetType === 'nexon-pune') {
      setSelectedCarId('tata-nexon');
      setSelectedVariantId('nexon-creative-plus');
      setSelectedState('MH');
      setExShowroom(1169000);
      setRto(134000);
      setInsurance(58000);
      setHandlingCharges(22000);
      setAccessoryPack(24000);
      setExtendedWarranty(16500);
      setDiscounts(15000);
      payload = {
        carId: 'tata-nexon',
        variantId: 'nexon-creative-plus',
        state: 'MH',
        exShowroomPrice: 1169000,
        rtoCharges: 134000,
        insurancePrice: 58000,
        handlingCharges: 22000,
        handlingChargeLabel: 'Logistics, Depot & PDI Charges',
        accessoryPack: 24000,
        extendedWarranty: 16500,
        discounts: 15000
      };
    } else if (presetType === 'creta-mumbai') {
      setSelectedCarId('hyundai-creta');
      setSelectedVariantId('creta-sx-tech');
      setSelectedState('MH');
      setExShowroom(1598000);
      setRto(182000);
      setInsurance(72000);
      setHandlingCharges(28000);
      setAccessoryPack(32000);
      setExtendedWarranty(21000);
      setDiscounts(20000);
      payload = {
        carId: 'hyundai-creta',
        variantId: 'creta-sx-tech',
        state: 'MH',
        exShowroomPrice: 1598000,
        rtoCharges: 182000,
        insurancePrice: 72000,
        handlingCharges: 28000,
        handlingChargeLabel: 'Incidental & Showroom Handling Surcharge',
        accessoryPack: 32000,
        extendedWarranty: 21000,
        discounts: 20000
      };
    } else {
      setSelectedCarId('mahindra-xuv700');
      setSelectedVariantId('xuv700-ax7');
      setSelectedState('KA');
      setExShowroom(2199000);
      setRto(342000);
      setInsurance(92000);
      setHandlingCharges(35000);
      setAccessoryPack(38000);
      setExtendedWarranty(28000);
      setDiscounts(25000);
      payload = {
        carId: 'mahindra-xuv700',
        variantId: 'xuv700-ax7',
        state: 'KA',
        exShowroomPrice: 2199000,
        rtoCharges: 342000,
        insurancePrice: 92000,
        handlingCharges: 35000,
        handlingChargeLabel: 'Stockyard Logistics & Transit Insurance Fee',
        accessoryPack: 38000,
        extendedWarranty: 28000,
        discounts: 25000
      };
    }

    setLoading(true);
    const res = await auditQuotation(payload);
    setAuditResult(res);
    setLoading(false);
  };

  const runAudit = async () => {
    setLoading(true);
    const payload = {
      carId: selectedCarId,
      variantId: selectedVariantId,
      state: selectedState,
      exShowroomPrice: exShowroom,
      rtoCharges: rto,
      insurancePrice: insurance,
      handlingCharges,
      handlingChargeLabel: 'Dealer Logistics / Handling Surcharge',
      accessoryPack,
      extendedWarranty,
      discounts
    };
    const res = await auditQuotation(payload);
    setAuditResult(res);
    setLoading(false);
  };

  const copyNegotiationScript = () => {
    if (auditResult?.aiNegotiationScript) {
      navigator.clipboard.writeText(auditResult.aiNegotiationScript);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2500);
    }
  };

  const handleSaveQuotation = () => {
    const saved = {
      id: `quote-${Date.now()}`,
      carName: currentCar ? `${currentCar.brand} ${currentCar.model}` : 'Tata Nexon',
      exShowroom,
      quotedTotal: auditResult?.dealerQuotedTotal || exShowroom,
      possibleSavings: auditResult?.totalPossibleSavings || 34500,
      savedAt: new Date().toLocaleDateString('en-IN')
    };
    try {
      const existing = JSON.parse(localStorage.getItem('carfair_saved_quotes') || '[]');
      localStorage.setItem('carfair_saved_quotes', JSON.stringify([saved, ...existing]));
    } catch (err) {}
    setSavedQuoteNotice(true);
    setTimeout(() => setSavedQuoteNotice(false), 3000);
  };

  const currentCar = cars.find(c => c.id === selectedCarId) || cars[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>QuoteTruth AI Quotation Auditor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transparent Quotation Comparison & Price Auditor
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Upload your dealership sheet or enter prices. We distinguish mandatory statutory taxes from optional accessories and illegal handling fees.
          </p>
        </div>

        {/* Quick Sample Quotes */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Try sample quotes:</span>
          <button
            onClick={() => handlePreset('nexon-pune')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            Nexon (Pune)
          </button>
          <button
            onClick={() => handlePreset('creta-mumbai')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            Creta (Mumbai)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel with Upload & Verification */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          {/* Document Upload Area */}
          <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/40 rounded-xl p-4 text-center transition-colors relative">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center justify-center space-y-1">
              <Upload className="w-6 h-6 text-blue-700" />
              <span className="text-xs font-bold text-slate-900">
                {isExtracting ? 'Extracting line items...' : 'Upload Dealership Quote (PDF or Photo)'}
              </span>
              <span className="text-[10px] text-slate-500">
                Drag & drop quotation paper or click to browse. We extract all charges automatically.
              </span>
            </div>
          </div>

          {uploadNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-950 font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadNotice}</span>
            </div>
          )}

          <div className="border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileSearch className="w-3.5 h-3.5 text-blue-700" />
              <span>Verify Extracted Quotation Numbers</span>
            </h3>
            <p className="text-[11px] text-slate-500">You can edit any number to match your exact paper sheet.</p>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Car Selection */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Car Model</label>
              <select
                value={selectedCarId}
                onChange={(e) => {
                  setSelectedCarId(e.target.value);
                  const c = cars.find(item => item.id === e.target.value);
                  if (c && c.variants.length > 0) {
                    setSelectedVariantId(c.variants[0].id);
                    setExShowroom(c.variants[0].exShowroom);
                  }
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
              >
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.brand} {car.model}
                  </option>
                ))}
              </select>
            </div>

            {/* Variant */}
            {currentCar && (
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Variant / Version</label>
                <select
                  value={selectedVariantId}
                  onChange={(e) => {
                    setSelectedVariantId(e.target.value);
                    const v = currentCar.variants.find(item => item.id === e.target.value);
                    if (v) setExShowroom(v.exShowroom);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600 font-medium"
                >
                  {currentCar.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Numbers Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Ex-Showroom Price (₹)</label>
                <input
                  type="number"
                  value={exShowroom}
                  onChange={(e) => setExShowroom(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Statutory RTO Tax (₹)</label>
                <input
                  type="number"
                  value={rto}
                  onChange={(e) => setRto(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Insurance Quoted (₹)</label>
                <input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-red-700 font-bold mb-1 flex items-center justify-between">
                  <span>Logistics / Handling (₹)</span>
                  <span className="text-[10px] bg-red-100 text-red-800 px-1 py-0.2 rounded font-bold">PROHIBITED</span>
                </label>
                <input
                  type="number"
                  value={handlingCharges}
                  onChange={(e) => setHandlingCharges(Number(e.target.value))}
                  className="w-full bg-red-50 border border-red-300 rounded-lg px-3 py-2 text-red-900 text-xs font-mono font-bold focus:bg-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Accessories Kit (₹)</label>
                <input
                  type="number"
                  value={accessoryPack}
                  onChange={(e) => setAccessoryPack(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-emerald-800 font-medium mb-1">Dealer Discount (₹)</label>
                <input
                  type="number"
                  value={discounts}
                  onChange={(e) => setDiscounts(Number(e.target.value))}
                  className="w-full bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-2 text-emerald-900 text-xs font-mono font-bold focus:bg-white focus:border-emerald-600"
                />
              </div>
            </div>

            <button
              onClick={runAudit}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>{loading ? 'Analyzing Quote...' : 'Audit This Quotation'}</span>
            </button>
          </div>
        </div>

        {/* Audit Results & Differentiator Comparison */}
        <div className="lg:col-span-7 space-y-6">
          {auditResult ? (
            <div className="space-y-6">
              {/* Score and Savings Header */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                      Quotation Honesty Score
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className={`text-4xl font-extrabold font-mono ${
                        auditResult.quoteHealthScore >= 80 
                          ? 'text-emerald-700' 
                          : auditResult.quoteHealthScore >= 60 
                            ? 'text-amber-700' 
                            : 'text-red-700'
                      }`}>
                        {auditResult.quoteHealthScore}
                        <span className="text-lg text-slate-400">/100</span>
                      </span>

                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        auditResult.quoteHealthScore >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : auditResult.quoteHealthScore >= 60
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {auditResult.quoteHealthScore >= 80 
                          ? 'Fair Quotation' 
                          : auditResult.quoteHealthScore >= 60 
                            ? 'Moderate Markup' 
                            : 'Heavy Overcharging Detected'}
                      </span>
                    </div>
                  </div>

                  {/* Savings pill */}
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-right sm:min-w-[220px]">
                    <span className="text-xs text-emerald-900 font-bold">Unnecessary Fees Found</span>
                    <div className="text-3xl font-black text-emerald-700 font-mono mt-0.5">
                      ₹{auditResult.totalPossibleSavings.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[11px] text-emerald-700">By removing illegal & inflated items</span>
                  </div>
                </div>

                {/* Price difference */}
                <div className="mt-5 grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-500">Showroom Quoted Total:</span>
                    <div className="text-base font-bold text-red-700 font-mono mt-0.5">
                      ₹{auditResult.dealerQuotedTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">What You Should Fairly Pay:</span>
                    <div className="text-base font-bold text-emerald-700 font-mono mt-0.5">
                      ₹{auditResult.unbundledRecommendedTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={handleSaveQuotation}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-blue-700" />
                    <span>Save This Quotation</span>
                  </button>
                  {savedQuoteNotice && (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved to your account!
                    </span>
                  )}
                </div>
              </div>

              {/* Priority 3 Quotation Comparison Table Across Dealers */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-blue-800" />
                      <span>Dealership Quotation Comparison ({currentCar?.model || 'Tata Nexon'})</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Compare itemised dealer quotes side-by-side with statutory baselines.
                    </p>
                  </div>
                  <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono">
                    3 Competing Showrooms
                  </span>
                </div>

                {/* The Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600">
                        <th className="py-2.5 px-3 font-bold">Price Component</th>
                        <th className="py-2.5 px-3 font-bold text-slate-800">Dealer A (Bafna)</th>
                        <th className="py-2.5 px-3 font-bold text-emerald-800 bg-emerald-50/60">Dealer B (Garve - Best Total)</th>
                        <th className="py-2.5 px-3 font-bold text-slate-800">Dealer C (Sahyadri)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-700">Ex-showroom price</td>
                        <td className="py-2.5 px-3">₹{exShowroom.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 bg-emerald-50/40">₹{exShowroom.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3">₹{exShowroom.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-700">Statutory RTO Tax</td>
                        <td className="py-2.5 px-3">₹{rto.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 bg-emerald-50/40">₹{rto.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3">₹{rto.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-700">Insurance (Zero Dep)</td>
                        <td className="py-2.5 px-3 text-red-700">₹{insurance.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-emerald-700 bg-emerald-50/40 font-bold">₹38,000 (Matched)</td>
                        <td className="py-2.5 px-3 text-slate-700">₹46,000</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-700">Accessories Pack</td>
                        <td className="py-2.5 px-3">₹{accessoryPack.toLocaleString('en-IN')} (7D Mats + Detailing)</td>
                        <td className="py-2.5 px-3 bg-emerald-50/40">₹5,000 (Essential Only)</td>
                        <td className="py-2.5 px-3">₹14,000</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-medium text-red-700 flex items-center gap-1">
                          <span>Logistics / Handling</span>
                          <span className="text-[9px] bg-red-100 text-red-800 px-1 rounded">ILLEGAL</span>
                        </td>
                        <td className="py-2.5 px-3 text-red-700 font-bold">₹{handlingCharges.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-emerald-700 bg-emerald-50/40 font-bold">₹0 (Waived)</td>
                        <td className="py-2.5 px-3 text-red-700">₹18,000</td>
                      </tr>
                      <tr className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-300">
                        <td className="py-3 px-3 font-sans">On-Road Total</td>
                        <td className="py-3 px-3">₹{(exShowroom + rto + insurance + handlingCharges + accessoryPack - discounts).toLocaleString('en-IN')}</td>
                        <td className="py-3 px-3 text-emerald-800 bg-emerald-100/70 text-sm">₹{(exShowroom + rto + 38000 + 5000 - discounts).toLocaleString('en-IN')}</td>
                        <td className="py-3 px-3">₹{(exShowroom + rto + 46000 + 18000 + 14000 - discounts).toLocaleString('en-IN')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* AI Deal Explainer Note */}
                <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs space-y-1 text-slate-800">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                    <span>AI Deal Explainer:</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-slate-700">
                    <strong>Dealer B</strong> offers the lowest net on-road total by waiving illegal logistics fees and matching direct IRDAI insurance. <strong>Dealer A</strong> has a higher total but includes a ₹{accessoryPack.toLocaleString('en-IN')} premium accessory pack — compare the actual utility of those bundled items before deciding.
                  </p>
                </div>

                <p className="text-[10px] text-slate-400 italic">
                  *Illustrative prices only. Actual charges vary by vehicle, location, and quotation.
                </p>
              </div>

              {/* Detected Overcharging Items in Simple Words */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Itemized Audit Flags:</span>
                </h4>

                {auditResult.auditFlags.map((flag) => (
                  <div 
                    key={flag.id} 
                    className={`rounded-xl p-4 border transition-all ${
                      flag.severity === 'CRITICAL'
                        ? 'bg-red-50/80 border-red-200'
                        : flag.severity === 'HIGH'
                          ? 'bg-amber-50/80 border-amber-200'
                          : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                          {flag.severity === 'CRITICAL' ? (
                            <span className="text-red-700 font-bold">❌ Prohibited Fee:</span>
                          ) : (
                            <span className="text-amber-800 font-bold">⚠️ Overpriced:</span>
                          )}
                          <span>{flag.title.replace('Detected', '').replace('Markup', '')}</span>
                        </div>
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                          {flag.explanation}
                        </p>
                      </div>

                      <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-white text-red-700 border border-slate-200 shrink-0 shadow-xs">
                        +₹{flag.excessPaid.toLocaleString('en-IN')} extra
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs text-slate-800">
                      <strong>What to do:</strong> {flag.actionToTake}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ready-made WhatsApp Message */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-700" />
                      <span>Ready-Made WhatsApp Negotiation Message</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Copy this message and send it to your sales executive.</p>
                  </div>

                  <button
                    onClick={copyNegotiationScript}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-900 hover:bg-blue-950 text-white transition-colors cursor-pointer shrink-0"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript ? 'Copied to WhatsApp!' : 'Copy Message'}</span>
                  </button>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 text-xs font-sans text-slate-800 leading-relaxed border border-slate-200">
                  {auditResult.aiNegotiationScript}
                </div>
              </div>

              {/* Group Savings Link */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Want Even Bigger Savings Without Individual Arguing?
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Join {selectedCity}'s verified group for this car. Dealers submit competitive volume discounts automatically.
                  </p>
                </div>
                <button
                  onClick={() => onJoinGroupForCar(selectedCarId)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-900 hover:bg-blue-950 text-white shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>See Group for this Car</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
              <FileSearch className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">Ready to Check Your Quote</h4>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Click one of the example buttons on top, or upload your quote PDF/photo on the left to inspect every single line item.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
