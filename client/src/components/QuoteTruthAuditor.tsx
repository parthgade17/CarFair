import React, { useState, useEffect } from 'react';
import { 
  FileSearch, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  Scale, 
  Zap 
} from 'lucide-react';
import { QuoteTruthAudit, Car } from '../types';
import { auditQuotation, fetchCars } from '../services/api';

interface QuoteTruthAuditorProps {
  onJoinGroupForCar: (carId: string) => void;
  selectedCity: string;
}

export const QuoteTruthAuditor: React.FC<QuoteTruthAuditorProps> = ({
  onJoinGroupForCar,
  selectedCity
}) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState('tata-nexon');
  const [selectedVariantId, setSelectedVariantId] = useState('nexon-creative-plus');
  const [selectedState, setSelectedState] = useState('MH');

  // Quotation inputs
  const [exShowroom, setExShowroom] = useState(1169000);
  const [rto, setRto] = useState(132000);
  const [insurance, setInsurance] = useState(56000);
  const [handlingCharges, setHandlingCharges] = useState(22000);
  const [accessoryPack, setAccessoryPack] = useState(25000);
  const [extendedWarranty, setExtendedWarranty] = useState(16500);
  const [discounts, setDiscounts] = useState(15000);

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

  const currentCar = cars.find(c => c.id === selectedCarId) || cars[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Car Quotation Auditor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            QuoteTruth: Stop Dealer Markup Traps
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Indian dealers inflate insurance by 60% and charge illegal handling fees. Upload or input any quote to unbundle real costs.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Test Real Quotes:</span>
          <button
            onClick={() => handlePreset('nexon-pune')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            Tata Nexon (Pune)
          </button>
          <button
            onClick={() => handlePreset('creta-mumbai')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            Hyundai Creta (Mumbai)
          </button>
          <button
            onClick={() => handlePreset('xuv-blr')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            XUV700 (Bengaluru)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel - Clean White */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-blue-700" />
              <span>Dealership Quote Input</span>
            </h3>
            <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
              State: {selectedState}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Car Selection */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Vehicle</label>
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
                    {car.brand} {car.model} ({car.segment})
                  </option>
                ))}
              </select>
            </div>

            {/* Variant Selection */}
            {currentCar && (
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Variant</label>
                <select
                  value={selectedVariantId}
                  onChange={(e) => {
                    setSelectedVariantId(e.target.value);
                    const v = currentCar.variants.find(item => item.id === e.target.value);
                    if (v) setExShowroom(v.exShowroom);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                >
                  {currentCar.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} (Ex: ₹{v.exShowroom.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Two Column Number Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Ex-Showroom (₹)</label>
                <input
                  type="number"
                  value={exShowroom}
                  onChange={(e) => setExShowroom(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Quoted RTO Tax (₹)</label>
                <input
                  type="number"
                  value={rto}
                  onChange={(e) => setRto(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Dealer Insurance (₹)</label>
                <input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-red-700 font-semibold mb-1 flex items-center justify-between">
                  <span>Handling Fee (₹)</span>
                  <span className="text-[10px] text-red-700 font-bold bg-red-100 px-1 py-0.2 rounded">ILLEGAL</span>
                </label>
                <input
                  type="number"
                  value={handlingCharges}
                  onChange={(e) => setHandlingCharges(Number(e.target.value))}
                  className="w-full bg-red-50/50 border border-red-300 rounded-lg px-3 py-2 text-red-900 text-xs font-mono font-medium focus:bg-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Accessory Kit (₹)</label>
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
                  className="w-full bg-emerald-50/50 border border-emerald-300 rounded-lg px-3 py-2 text-emerald-900 text-xs font-mono font-medium focus:bg-white focus:border-emerald-600"
                />
              </div>
            </div>

            <button
              onClick={runAudit}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>{loading ? 'Auditing with QuoteTruth AI...' : 'Run QuoteTruth Audit Now'}</span>
            </button>
          </div>
        </div>

        {/* Audit Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {auditResult ? (
            <div className="space-y-6">
              {/* Score and Savings Header */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                      Quote Integrity Score
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

                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        auditResult.healthRating === 'CLEAN_DEAL'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : auditResult.healthRating === 'MODERATE_MARKUP'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {auditResult.healthRating.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Savings pill */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-right sm:min-w-[200px]">
                    <span className="text-[11px] text-emerald-800 font-semibold">Unbundled Potential Savings</span>
                    <div className="text-2xl font-extrabold text-emerald-700 font-mono">
                      ₹{auditResult.totalPossibleSavings.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-600">Waive traps & buy insurance direct</span>
                  </div>
                </div>

                {/* Side by side comparison */}
                <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500">Dealer Quoted On-Road:</span>
                    <div className="text-lg font-bold text-red-700 font-mono mt-0.5">
                      ₹{auditResult.dealerQuotedTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">CarFair Fair On-Road Total:</span>
                    <div className="text-lg font-bold text-emerald-700 font-mono mt-0.5">
                      ₹{auditResult.unbundledRecommendedTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detected Flags */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Detected Markup Traps & Illegal Surcharges ({auditResult.auditFlags.length})</span>
                </h4>

                {auditResult.auditFlags.map((flag) => (
                  <div 
                    key={flag.id} 
                    className={`rounded-xl p-4 border transition-all ${
                      flag.severity === 'CRITICAL'
                        ? 'bg-red-50/70 border-red-200 text-red-950'
                        : flag.severity === 'HIGH'
                          ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                          : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`w-4 h-4 shrink-0 ${
                          flag.severity === 'CRITICAL' ? 'text-red-600' : 'text-amber-600'
                        }`} />
                        <span className="font-bold text-sm text-slate-900">{flag.title}</span>
                      </div>
                      <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-white text-red-700 border border-slate-200">
                        +₹{flag.excessPaid.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                      {flag.explanation}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                      <span>Action:</span>
                      <span className="text-slate-700 font-normal">{flag.actionToTake}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Negotiation Script */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-700" />
                    <span>AI Negotiation Script (Send to Dealer on WhatsApp)</span>
                  </h4>
                  <button
                    onClick={copyNegotiationScript}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white transition-colors cursor-pointer"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript ? 'Copied to Clipboard!' : 'Copy Script'}</span>
                  </button>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 text-xs font-mono text-slate-800 leading-relaxed border border-slate-200">
                  {auditResult.aiNegotiationScript}
                </div>
              </div>

              {/* Convert Solo to Group Action */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Want Even Bigger Savings Than Individual Negotiation?
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Join {selectedCity}'s verified group for this vehicle. Dealerships bid in reverse auction.
                  </p>
                </div>
                <button
                  onClick={() => onJoinGroupForCar(selectedCarId)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-blue-700 hover:bg-blue-800 text-white shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Group Bids for this Car</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
              <FileSearch className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No Quotation Audited Yet</h4>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Select a preset on top or enter your showroom quotation details on the left and click "Run QuoteTruth Audit".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
