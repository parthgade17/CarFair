import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GroupBuyingArena } from './components/GroupBuyingArena';
import { QuoteTruthAuditor } from './components/QuoteTruthAuditor';
import { LiveReverseBiddingView } from './components/LiveReverseBiddingView';
import { DealLockPass } from './components/DealLockPass';
import { SavingsProofAuditor } from './components/SavingsProofAuditor';
import { UnbundlingCalculator } from './components/UnbundlingCalculator';
import { TradeInExchange } from './components/TradeInExchange';
import { DealerPortalView } from './components/DealerPortalView';
import { AccountView } from './components/AccountView';
import { Footer } from './components/Footer';
import { BuyingGroup, ReverseBid, DealLockVoucher } from './types';
import { generateDealLockVoucher, fetchGroups } from './services/api';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('groups');
  const [selectedCity, setSelectedCity] = useState('Pune');
  const [userRole, setUserRole] = useState<'BUYER' | 'DEALER' | 'COMMUNITY'>('BUYER');

  const [activeGroupForBidding, setActiveGroupForBidding] = useState<BuyingGroup | null>(null);
  const [activeVoucher, setActiveVoucher] = useState<DealLockVoucher | null>(null);
  const [defaultGroup, setDefaultGroup] = useState<BuyingGroup | null>(null);

  useEffect(() => {
    fetchGroups().then((groups) => {
      if (groups.length > 0) {
        setDefaultGroup(groups[0]);
        if (!activeGroupForBidding) {
          setActiveGroupForBidding(groups[0]);
        }
      }
    });
  }, []);

  const handleLockDealForGroup = async (group: BuyingGroup) => {
    const winningBid = group.bids.find(b => b.isWinning) || group.bids[0];
    const voucher = await generateDealLockVoucher({
      groupId: group.id,
      carName: group.carName,
      variantName: 'Selected Variant',
      buyerName: 'Parth Gade',
      buyerPhone: '+91 98901 23456',
      dealerId: winningBid ? winningBid.dealerId : 'dealer-bafna',
      dealerName: winningBid ? winningBid.dealerName : 'Bafna Tata Motors Flagship',
      lockedOnRoadPrice: winningBid ? winningBid.finalOnRoadPerUnit : group.currentBestGroupPrice,
      baselineShowroomPrice: group.baselineShowroomPrice,
      guaranteedDeliveryDays: winningBid ? winningBid.deliveryDays : 7,
      includedPerks: winningBid ? winningBid.freebies : ['5-Yr Extended Warranty', '7D Mats'],
      city: group.city
    });
    setActiveVoucher(voucher);
    setActiveTab('deallock');
  };

  const handleLockDealFromBid = async (bid: ReverseBid) => {
    if (!activeGroupForBidding) return;
    const voucher = await generateDealLockVoucher({
      groupId: activeGroupForBidding.id,
      carName: activeGroupForBidding.carName,
      variantName: 'Allocated Variant',
      buyerName: 'Parth Gade',
      buyerPhone: '+91 98901 23456',
      dealerId: bid.dealerId,
      dealerName: bid.dealerName,
      lockedOnRoadPrice: bid.finalOnRoadPerUnit,
      baselineShowroomPrice: activeGroupForBidding.baselineShowroomPrice,
      guaranteedDeliveryDays: bid.deliveryDays,
      includedPerks: bid.freebies,
      city: activeGroupForBidding.city
    });
    setActiveVoucher(voucher);
    setActiveTab('deallock');
  };

  const handleViewBidsForGroup = (group: BuyingGroup) => {
    setActiveGroupForBidding(group);
    setActiveTab('bidding');
  };

  const handleProceedToInvoiceAudit = (voucher: DealLockVoucher) => {
    setActiveVoucher(voucher);
    setActiveTab('savingsproof');
  };

  const handleJoinGroupForCar = (carId: string) => {
    setActiveTab('groups');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      <main className="flex-1">
        {activeTab === 'account' ? (
          <AccountView
            onNavigateToTab={(tab) => setActiveTab(tab)}
            selectedCity={selectedCity}
          />
        ) : userRole === 'DEALER' ? (
          <DealerPortalView />
        ) : (
          <>
            {activeTab === 'groups' && (
              <>
                <HeroSection
                  selectedCity={selectedCity}
                  onExploreGroups={() => {
                    const el = document.getElementById('groups-arena');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onAuditQuote={() => setActiveTab('quotetruth')}
                />
                <div id="groups-arena">
                  <GroupBuyingArena
                    selectedCity={selectedCity}
                    userRole={userRole}
                    onLockDealForGroup={handleLockDealForGroup}
                    onViewBidsForGroup={handleViewBidsForGroup}
                  />
                </div>
              </>
            )}

            {activeTab === 'quotetruth' && (
              <QuoteTruthAuditor
                selectedCity={selectedCity}
                onJoinGroupForCar={handleJoinGroupForCar}
              />
            )}

            {activeTab === 'bidding' && (
              <LiveReverseBiddingView
                group={activeGroupForBidding || defaultGroup || {
                  id: 'grp-default',
                  carId: 'tata-nexon',
                  variantId: 'nexon-creative-plus',
                  carName: 'Tata Nexon Creative+ 1.2 AMT',
                  city: selectedCity === 'All Cities' ? 'Pune' : selectedCity,
                  state: 'MH',
                  communityName: 'Verified Metro Buyers',
                  status: 'ACTIVE_BIDDING',
                  biddingEndsAt: new Date().toISOString(),
                  targetBuyers: 20,
                  currentBuyers: 18,
                  verifiedBuyers: 14,
                  discountTiers: [],
                  currentUnlockedTier: 2,
                  baselineShowroomPrice: 1362000,
                  currentBestGroupPrice: 1294000,
                  verifiedSavingsTotal: 68000,
                  bids: []
                }}
                onLockDeal={handleLockDealFromBid}
                onBackToGroups={() => setActiveTab('groups')}
              />
            )}

            {activeTab === 'unbundling' && (
              <UnbundlingCalculator />
            )}

            {activeTab === 'deallock' && (
              <DealLockPass
                voucher={activeVoucher || {
                  voucherCode: 'CF-LOCK-MH-9482',
                  status: 'ACTIVE_LOCKED',
                  createdAt: new Date().toISOString(),
                  validUntil: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
                  buyer: { name: 'Parth Gade', phone: '+91 98901 23456', city: selectedCity },
                  vehicle: { carName: 'Tata Nexon Creative+', variantName: '1.2 Turbo AMT Dual Tone' },
                  dealer: { dealerId: 'dealer-bafna', dealerName: 'Bafna Tata Motors (Shivajinagar)', city: selectedCity },
                  financialLock: {
                    lockedOnRoadPrice: 1294000,
                    baselineShowroomPrice: 1362000,
                    guaranteedSavings: 68000,
                    maxStatutoryRtoCap: 'Parivahan rate only',
                    handlingChargesWaived: true,
                    priceProtectionClause: 'Price protected under CarFair verified deal lock.'
                  },
                  fulfillment: { guaranteedDeliveryDays: 7, promisedPerks: ['5-Yr Extended Warranty', '7D Mats', 'Anti-Rust Coating'] },
                  verificationSecurity: {
                    dealerClaimOtp: '849201',
                    digitalSignature: '9f81a7b42c',
                    antiBypassReward: '₹5,000 HPCL/IOCL Fuel Card on invoice upload.'
                  }
                }}
                onProceedToInvoiceAudit={handleProceedToInvoiceAudit}
                onBack={() => setActiveTab('groups')}
              />
            )}

            {activeTab === 'savingsproof' && (
              <SavingsProofAuditor
                initialVoucher={activeVoucher}
                onBack={() => setActiveTab('groups')}
              />
            )}

            {activeTab === 'exchange' && (
              <TradeInExchange />
            )}
          </>
        )}
      </main>

      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
