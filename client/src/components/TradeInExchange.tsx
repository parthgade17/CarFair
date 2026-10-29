import React, { useState } from 'react';
import { 
  Repeat, 
  Car, 
  Zap,
  CheckCircle2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { estimateOldCarExchange } from '../services/api';

export const TradeInExchange: React.FC = () => {
  const [make, setMake] = useState('Maruti Suzuki');
  const [model, setModel] = useState('Swift VXi');
  const [year, setYear] = useState('2019');
  const [kilometers, setKilometers] = useState('48000');
  const [fuel, setFuel] = useState('Petrol');
  const [city, setCity] = useState('Pune');

  const [loading, setLoading] = useState(false);
  const [exchangeResult, setExchangeResult] = useState<any>(null);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await estimateOldCarExchange({
      make,
      model,
      year,
      kilometers,
      fuel,
      city
    });
    setExchangeResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Repeat className="w-3.5 h-3.5" />
          <span>Multi-Buyer Car Exchange</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Sell Your Old Car at the Highest Price
        </h2>
        <p className="text-sm text-slate-600">
          Never accept a single showroom's exchange offer. Showrooms routinely under-value old cars by ₹40,000 to ₹70,000 to offset new car discounts. We get 3 verified networks to bid against each other for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Old Car Form */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Car className="w-4 h-4 text-blue-700" />
            <span>Enter Your Old Car Details</span>
          </h3>

          <form onSubmit={handleEstimate} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Make / Brand</label>
                <select
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600 font-medium"
                >
                  <option value="Maruti Suzuki">Maruti Suzuki</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Honda">Honda</option>
                  <option value="Tata">Tata Motors</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Mahindra">Mahindra</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Model & Variant</label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Year of Purchase</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600 font-medium"
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Total Kilometers</label>
                <input
                  type="number"
                  value={kilometers}
                  onChange={(e) => setKilometers(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Fuel Type</label>
                <select
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600 font-medium"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>{loading ? 'Fetching 3 competing bids...' : 'Get 3 Competing Bids Instantly'}</span>
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {exchangeResult ? (
            <div className="space-y-6">
              {/* Highlight Advantage */}
              <div className="bg-emerald-50/80 border border-emerald-300 rounded-2xl p-6 shadow-xs">
                <span className="text-xs text-emerald-900 font-bold uppercase tracking-wider">
                  Your Extra Cash In Hand
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-mono mt-1">
                  + ₹{exchangeResult.exchangeAdvantage.toLocaleString('en-IN')} Extra
                </div>
                <p className="text-xs text-slate-700 mt-1">
                  More money than a single showroom exchange quote for your {exchangeResult.vehicleSummary}.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-emerald-200 text-xs">
                  <div>
                    <span className="text-slate-500">Single Showroom Lowball:</span>
                    <div className="font-mono text-red-700 font-bold line-through">
                      ₹{exchangeResult.singleDealerAverageOffer.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-600 font-medium">Highest Certified Network Bid:</span>
                    <div className="font-mono text-emerald-700 font-black text-base">
                      ₹{exchangeResult.competingBids[0].bidAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Competing Bids Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Top 3 Competing Buyer Offers
                </h4>

                {exchangeResult.competingBids.map((bid: any, i: number) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{bid.network}</div>
                      <div className="text-[11px] text-slate-500">{bid.inspectionType} • Instant Bank Transfer</div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-black text-emerald-700 text-sm">
                        ₹{bid.bidAmount.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Ready Cash Offer
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
              <Repeat className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">Find Out What Your Car is Really Worth</h4>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Click "Get 3 Competing Bids Instantly" to see 3 live certified offers for your car right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};