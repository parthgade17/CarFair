import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  Sparkles, 
  PlusCircle, 
  Filter, 
  Check, 
  Building, 
  Gavel, 
  ShieldCheck,
  ChevronRight,
  Gift,
  Clock,
  HelpCircle
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
  const [newCommunityName, setNewCommunityName] = useState('Amanora Park Town, Pune');
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
      setJoinSuccessMessage(`🎉 You're in! Your spot is saved for ${activeJoinGroup.carName}. Your group discount is locked!`);
      setTimeout(() => {
        setJoinSuccessMessage('');
        setActiveJoinGroup(null);
        loadData();
      }, 2200);
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Active Car Buying Groups in {selectedCity}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Buy Together, Save More Money
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Join verified car pools in {selectedCity} and unlock bulk showroom discounts with zero agent fees.
          </p>
        </div>

        {/* Start Group CTA */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-700 hover:bg-blue-800 text-white shadow-xs flex items-center gap-2 self-start md:self-auto shrink-0 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Start Group for Society / Office</span>
        </button>
      </div>

      {/* How It Works Simple Banner */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
            1
          </div>
          <div>
            <div className="font-bold text-slate-900">Join a Car Group for Free</div>
            <p className="text-slate-600 text-[11px] mt-0.5">Pick the car you like. Reserve your spot with zero advance fees.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
            2
          </div>
          <div>
            <div className="font-bold text-slate-900">Showrooms Compete</div>
            <p className="text-slate-600 text-[11px] mt-0.5">Authorised dealerships bid their lowest price to win the group.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
            3
          </div>
          <div>
            <div className="font-bold text-slate-900">Pick Up & Save ₹50,000+</div>
            <p className="text-slate-600 text-[11px] mt-0.5">Show your 6-digit Price Lock PIN at the showroom and pay less.</p>
          </div>
        </div>
      </div>

      {/* Brand Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-slate-500 font-semibold mr-2 shrink-0 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filter by Brand:
        </span>
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              selectedBrand === brand
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Groups Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading car groups for {selectedCity}...</div>
      ) : groups.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-500 space-y-3 shadow-xs">
          <Users className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No active groups in {selectedCity} for this brand</h3>
          <p className="text-xs">Be the first to start a group for your apartment building or office!</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
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
            const spotsRemaining = Math.max(0, group.targetBuyers - group.currentBuyers);

            return (
              <div
                key={group.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group relative"
              >
                {/* Car Image with Badges */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={imageUrl}
                    alt={group.carName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200 flex items-center gap-1 shadow-xs">
                      <MapPin className="w-3 h-3 text-blue-700" />
                      {group.city}
                    </span>

                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                      group.status === 'ACTIVE_BIDDING'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : group.status === 'DEAL_LOCKED'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-blue-100 text-blue-900 border-blue-300'
                    }`}>
                      {group.status === 'ACTIVE_BIDDING' ? 'Showrooms Bidding Now' : group.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Community Name Tag */}
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white drop-shadow truncate flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                    <span>{group.communityName}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {group.carName}
                    </h3>

                    {/* Pricing Highlight */}
                    <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 line-through font-mono">
                          Showroom: ₹{group.baselineShowroomPrice.toLocaleString('en-IN')}
                        </span>
                        <div className="text-lg font-black text-emerald-700 font-mono">
                          ₹{group.currentBestGroupPrice.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-medium">Your Total Saving</span>
                        <div className="text-xs font-bold font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          -₹{group.verifiedSavingsTotal.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Buyers count */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 font-medium flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-blue-700" />
                          <strong>{group.currentBuyers} Buyers Joined</strong>
                        </span>
                        <span className="text-amber-700 font-semibold text-[11px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          {spotsRemaining > 0 ? `${spotsRemaining} spots left` : 'Goal Reached'}
                        </span>
                      </div>

                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-700"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-600 flex items-center gap-1 pt-0.5">
                        <Gift className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>
                          {group.discountTiers[group.currentUnlockedTier]?.perk || 'Bulk discount unlocked'}
                        </span>
                      </p>
                    </div>

                    {/* Winning Dealer Quote snippet */}
                    {winningBid && (
                      <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Lowest Showroom Offer:</span>
                          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                            Delivery in {winningBid.deliveryDays} Days
                          </span>
                        </div>
                        <p className="font-bold text-slate-900 truncate">{winningBid.dealerName}</p>
                        <p className="text-[11px] text-slate-600 truncate">
                          Includes: {winningBid.freebies.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setActiveJoinGroup(group)}
                      className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-blue-700 hover:bg-blue-800 text-white shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Join Group (Free)</span>
                    </button>

                    <button
                      onClick={() => onViewBidsForGroup(group)}
                      title="See All Showroom Offers"
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    >
                      <Gavel className="w-4 h-4 text-amber-600" />
                    </button>

                    <button
                      onClick={() => onLockDealForGroup(group)}
                      title="Get Price Lock Pass"
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
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
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-xl relative">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-700" />
              <span>Join {activeJoinGroup.carName} Group</span>
            </h3>

            {joinSuccessMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-700 mx-auto" />
                <p className="text-xs font-semibold text-emerald-900">{joinSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">WhatsApp / Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9822012345"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">We will only send your group updates and Price Lock Pass.</p>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">When are you planning to buy?</label>
                  <select
                    value={purchaseTimeline}
                    onChange={(e) => setPurchaseTimeline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600 font-medium"
                  >
                    <option value="Immediate">In the next 7 days (Ready now)</option>
                    <option value="Within 15 Days">Within 15 days (This month)</option>
                    <option value="Within 30 Days">Within 30 days</option>
                    <option value="Next 60 Days">Just exploring (Next 2 months)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="financePreApprove"
                    checked={isFinancingPreApproved}
                    onChange={(e) => setIsFinancingPreApproved(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-700 border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="financePreApprove" className="text-slate-700 text-[11px] font-medium cursor-pointer">
                    I have cash ready or bank loan pre-approved (Gives you priority delivery)
                  </label>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">100% Free & Direct:</p>
                  <p>• Zero joining fee, zero commissions from you.</p>
                  <p>• You buy directly from official brand showrooms with full warranty.</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveJoinGroup(null)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold cursor-pointer"
                  >
                    Save My Spot (Free)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-700" />
              <span>Start a Group for Society or Office</span>
            </h3>

            <p className="text-xs text-slate-600">
              Live in a residential society (like Amanora, DLF, Godrej) or work at a tech park? Start a group with neighbors or colleagues to get bulk corporate fleet discounts.
            </p>

            <form onSubmit={handleCreateGroupSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Which car do you want?</label>
                <select
                  value={newCarId}
                  onChange={(e) => setNewCarId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600 font-medium"
                >
                  {cars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.brand} {c.model} ({c.segment})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Society or Office Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amanora Park Town Tower 12 or Infosys Hinjewadi"
                  value={newCommunityName}
                  onChange={(e) => setNewCommunityName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">How many buyers to aim for?</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={newTargetBuyers}
                  onChange={(e) => setNewTargetBuyers(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono font-medium focus:bg-white focus:border-blue-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">Usually 10 to 20 buyers gives the best discount.</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold cursor-pointer"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};