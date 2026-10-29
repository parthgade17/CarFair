import React, { useState } from 'react';
import { 
  Repeat, 
  Car, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Zap,
  Building,
  DollarSign
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Repeat className="w-3.5 h-3.5" />
          <span>Competing Multi-Dealer Trade-In Bidding</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Never Accept a Single Showroom's Lowball Exchange Offer
        </h2>
        <p className="text-sm text-slate-400">
          Showrooms routinely under-value trade-in cars by ₹40,000 to ₹70,000 to compensate for headline new car discounts. CarFair invites 3 certified pre-owned networks to bid for your old car simultaneously.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Old Car Form */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Car className="w-4 h-4 text-blue-400" />
            <span>Your Existing Car Details</span>
          </h3>

          <form onSubmit={handleEstimate} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Make / Brand</label>
                <select
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
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
                <label className="block text-slate-300 font-medium mb-1">Model & Variant</label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Registration Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
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
                <label className="block text-slate-300 font-medium mb-1">Kilometers Driven</label>
                <input
                  type="number"
                  value={kilometers}
                  onChange={(e) => setKilometers(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Fuel Type</label>
                <select
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Location City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>{loading ? 'Requesting Certified Bids...' : 'Get Competing Trade-In Bids'}</span>
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {exchangeResult ? (
            <div className="space-y-6">
              {/* Highlight Advantage */}
              <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-xl">
                <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  CarFair Trade-in Advantage
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mt-1">
                  + ₹{exchangeResult.exchangeAdvantage.toLocaleString('en-IN')} Extra
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Compared to single showroom counter quote for your {exchangeResult.vehicleSummary}.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400">Single Dealer Lowball:</span>
                    <div className="font-mono text-rose-400 font-bold line-through">
                      ₹{exchangeResult.singleDealerAverageOffer.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Top Certified Network Bid:</span>
                    <div className="font-mono text-emerald-400 font-black text-base">
                      ₹{exchangeResult.competingBids[0].bidAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Competing Bids Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Competing Trade-In Bidders
                </h4>

                {exchangeResult.competingBids.map((bid: any, i: number) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">{bid.network}</div>
                      <div className="text-[11px] text-slate-400">{bid.inspectionType} • Instant Bank Transfer</div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-black text-emerald-400 text-sm">
                        ₹{bid.bidAmount.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-slate-500">Certified Offer</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <Repeat className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-semibold text-white">Find Out Your Real Car Value</h4>
              <p className="text-xs max-w-sm mx-auto">
                Enter your existing car details and click "Get Competing Trade-In Bids" to see 3 certified offers instantly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
