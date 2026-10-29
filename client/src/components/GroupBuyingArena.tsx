import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ShieldCheck, 
  Gavel, 
  Sparkles, 
  ArrowRight, 
  PlusCircle, 
  Filter,
  Check,
  Building,
  Fuel,
  Calendar,
  PhoneCall
} from 'lucide-react';
import { BuyingGroup, Car } from '../types';
import { fetchGroups, joinGroup, createGroup, fetchCars } from '../services/api';

interface GroupBuyingArenaProps {
  selectedCity: string;
  onLockDealForGroup: (group: BuyingGroup) => void;
  onViewBidsForGroup: (group: BuyingGroup) => void;
}

export const GroupBuyingArena: React.FC<GroupBuyingArenaProps> = ({
  selectedCity,
  onLockDealForGroup,
  onViewBidsForGroup
}) => {
  const [groups, setGroups] = useState<BuyingGroup[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState('All');

  // Join Modal
  const [activeJoinGroup, setActiveJoinGroup] = useState<BuyingGroup | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [purchaseTimeline, setPurchaseTimeline] = useState('Within 15 Days');
  const [isFinancingPreApproved, setIsFinancingPreApproved] = useState(true);
  const [joinSuccessMessage, setJoinSuccessMessage] = useState('');

  // Create Group Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCarId, setNewCarId] = useState('tata-nexon');
  const [newCommunityName, setNewCommunityName] = useState('Amanora Park Town Pune');
  const [newTargetBuyers, setNewTargetBuyers] = useState(20);

  const loadData = async () => {
    setLoading(true);
    const [fetchedGroups, fetchedCars] = await Promise.all([
      fetchGroups(selectedCity === 'All Cities' ? undefined : selectedCity, selectedBrand),
      fetchCars()
    ]);
    setGroups(fetchedGroups);
    setCars(fetchedCars);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedCity, selectedBrand]);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJoinGroup) return;

    const res = await joinGroup(activeJoinGroup.id, {
      name: buyerName,
      phone: buyerPhone,
      purchaseTimeline,
      isFinancingPreApproved
    });

    if (res.success) {
      setJoinSuccessMessage(`Spot reserved in ${activeJoinGroup.carName}! You have unlocked the group discount tier.`);
      setTimeout(() => {
        setJoinSuccessMessage('');
        setActiveJoinGroup(null);
        loadData();
      }, 2000);
    }
  };

  const handleCreateGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createGroup({
      carId: newCarId,
      city: selectedCity === 'All Cities' ? 'Pune' : selectedCity,
      state: 'MH',
      communityName: newCommunityName,
      targetBuyers: newTargetBuyers,
      initiatorName: buyerName || 'Parth Gade',
      initiatorPhone: buyerPhone || '9890123456'
    });

    if (res.success) {
      setIsCreateModalOpen(false);
      loadData();
    }
  };

  const brands = ['All', 'Tata', 'Hyundai', 'Mahindra', 'Maruti Suzuki', 'Kia'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Collective Bargaining Pools</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Active Verified Buying Groups ({selectedCity})
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Authorized dealerships compete with bulk discounts on these groups. Join a group to freeze the best on-road price.
          </p>
        </div>

        {/* Start Group CTA */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 flex items-center gap-2 self-start md:self-auto shrink-0 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Start a Society / Office Group</span>
        </button>
      </div>

      {/* Brand Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-slate-500 font-semibold mr-2 shrink-0 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Brand:
        </span>
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              selectedBrand === brand
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Groups Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading verified groups...</div>
      ) : groups.length === 0 ? (
        <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <Users className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No active groups in {selectedCity} for this brand</h3>
          <p className="text-xs">Be the first to create a group for your apartment society or office colleagues!</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
          >
            Start This Group Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => {
            const carDetails = cars.find(c => c.id === group.carId);
            const imageUrl = carDetails?.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
            const progressPercent = Math.min(100, Math.round((group.currentBuyers / group.targetBuyers) * 100));
            const winningBid = group.bids.find(b => b.isWinning) || group.bids[0];

            return (
              <div
                key={group.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col group relative"
              >
                {/* Car Image with Badges */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={imageUrl}
                    alt={group.carName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider bg-slate-950/80 backdrop-blur-md text-white border border-slate-700/80 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      {group.city}
                    </span>

                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border ${
                      group.status === 'ACTIVE_BIDDING'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : group.status === 'DEAL_LOCKED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    }`}>
                      {group.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Community Name Tag */}
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-slate-200 truncate flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{group.communityName}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {group.carName}
                    </h3>

                    {/* Pricing Highlight */}
                    <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-500 line-through font-mono">
                          Showroom: ₹{group.baselineShowroomPrice.toLocaleString('en-IN')}
                        </span>
                        <div className="text-lg font-black text-emerald-400 font-mono">
                          ₹{group.currentBestGroupPrice.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400">Total Unlocked Savings</span>
                        <div className="text-xs font-bold font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                          -₹{group.verifiedSavingsTotal.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Buyers count */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-blue-400" />
                          <strong>{group.currentBuyers} Buyers</strong> ({group.verifiedBuyers} Verified Ready)
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          Target: {group.targetBuyers}
                        </span>
                      </div>

                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5">
                        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>
                          {group.discountTiers[group.currentUnlockedTier]?.perk || 'Tier unlocked'}
                        </span>
                      </p>
                    </div>

                    {/* Winning Dealer Quote snippet */}
                    {winningBid && (
                      <div className="mt-4 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Leading OEM Bidder:</span>
                          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                            Ready in {winningBid.deliveryDays} Days
                          </span>
                        </div>
                        <p className="font-semibold text-white truncate">{winningBid.dealerName}</p>
                        <p className="text-[11px] text-slate-400 truncate">
                          Includes: {winningBid.freebies.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => setActiveJoinGroup(group)}
                      className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Join Group ({group.currentBuyers}/{group.targetBuyers})</span>
                    </button>

                    <button
                      onClick={() => onViewBidsForGroup(group)}
                      title="Inspect Dealer Bids"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    >
                      <Gavel className="w-4 h-4 text-amber-400" />
                    </button>

                    <button
                      onClick={() => onLockDealForGroup(group)}
                      title="Generate DealLock Voucher"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Join Group Modal */}
      {activeJoinGroup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>Join {activeJoinGroup.carName}</span>
            </h3>

            {joinSuccessMessage ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-semibold text-emerald-200">{joinSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9822012345"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Purchase Timeline Readiness</label>
                  <select
                    value={purchaseTimeline}
                    onChange={(e) => setPurchaseTimeline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
                  >
                    <option value="Immediate">Immediate (Within 7 Days)</option>
                    <option value="Within 15 Days">Within 15 Days (Target Month-End)</option>
                    <option value="Within 30 Days">Within 30 Days</option>
                    <option value="Next 60 Days">Next 60 Days</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="financePreApprove"
                    checked={isFinancingPreApproved}
                    onChange={(e) => setIsFinancingPreApproved(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-700"
                  />
                  <label htmlFor="financePreApprove" className="text-slate-300 text-[11px]">
                    I have pre-approved loan or ready downpayment (Grants "Verified Buyer" badge)
                  </label>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">CarFair Commitment Guarantee:</p>
                  <p>• Free group membership with no hidden booking commissions.</p>
                  <p>• You buy directly from OEM Authorized Showrooms under DealLock terms.</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveJoinGroup(null)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                  >
                    Confirm My Spot
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-400" />
              <span>Start a Community Buying Pool</span>
            </h3>

            <p className="text-xs text-slate-400">
              Create a group for your housing society (e.g., Amanora, DLF Phase 5, Hiranandani) or tech company (Infosys, TCS, Google). We approach OEM dealer heads directly.
            </p>

            <form onSubmit={handleCreateGroupSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Car Model</label>
                <select
                  value={newCarId}
                  onChange={(e) => setNewCarId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
                >
                  {cars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.brand} {c.model} ({c.segment})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Community / Society Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amanora Park Town Tower 12 or TCS Hinjewadi"
                  value={newCommunityName}
                  onChange={(e) => setNewCommunityName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Buyers Needed</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={newTargetBuyers}
                  onChange={(e) => setNewTargetBuyers(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Launch Group Pool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
