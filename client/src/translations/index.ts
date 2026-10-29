export type Language = 'en' | 'mr' | 'hi';

export interface Translations {
  // Navigation & Header
  topAlert: string;
  octoberDeals: string;
  navGroups: string;
  navQuote: string;
  navBidding: string;
  navTricks: string;
  navPriceLock: string;
  navFuelCard: string;
  navSellCar: string;
  navAccount: string;
  roleBuyer: string;
  roleDealer: string;
  selectCity: string;

  // Hero Section
  heroBadge: string;
  heroHeadlineMain: string;
  heroHeadlineHighlight: string;
  btnJoinGroupFree: string;
  btnCheckQuote: string;
  trustFree: string;
  trustDelivery: string;
  trustWarranty: string;
  trustFuelCard: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  statSaved: string;
  statSavedDesc: string;
  statAvgSaving: string;
  statAvgSavingDesc: string;
  statShowrooms: string;
  statShowroomsDesc: string;
  statDeliveryTime: string;
  statDeliveryTimeDesc: string;

  // Car Groups Arena
  groupsBadge: string;
  groupsTitle: string;
  groupsSubtitle: string;
  btnStartGroup: string;
  filterBrand: string;
  allBrands: string;
  loadingGroups: string;
  noGroupsFound: string;
  cardShowroomPrice: string;
  cardGroupPrice: string;
  cardYourSaving: string;
  cardBuyersJoined: string;
  cardSpotsLeft: string;
  cardLowestOffer: string;
  cardDeliveryIn: string;
  btnJoinGroup: string;
  btnSeeOffers: string;
  btnGetPriceLock: string;
  modalJoinTitle: string;
  modalFullName: string;
  modalPhone: string;
  modalTimeline: string;
  modalPreApproved: string;
  modalGuaranteeFree: string;
  modalGuaranteeDirect: string;
  btnSaveSpot: string;
  btnCancel: string;

  // QuoteTruth Auditor
  quoteBadge: string;
  quoteTitle: string;
  quoteSubtitle: string;
  quickSampleNexon: string;
  quickSampleCreta: string;
  quoteFormTitle: string;
  quoteCarModel: string;
  quoteExShowroom: string;
  quoteInsurance: string;
  quoteHandling: string;
  quoteAccessories: string;
  quoteFastag: string;
  btnAuditQuote: string;
  btnAuditing: string;
  auditScoreTitle: string;
  auditScoreFair: string;
  auditScoreInflated: string;
  auditTotalSavingsFound: string;
  whatsappTitle: string;
  btnCopyWhatsapp: string;
  copiedWhatsapp: string;

  // Account Page
  accountTitle: string;
  accountSubtitle: string;
  tabBuyerProfile: string;
  tabDealerProfile: string;
  tabLanguageSettings: string;
  langSectionTitle: string;
  langSectionDesc: string;
  activeLanguage: string;
  langEn: string;
  langMr: string;
  langHi: string;
  buyerNameLabel: string;
  buyerPhoneLabel: string;
  buyerEmailLabel: string;
  buyerCityLabel: string;
  btnSaveProfile: string;
  savedSuccess: string;
  myActiveGroups: string;
  myPriceLockPasses: string;
  myFuelRewards: string;
  dealerOrgLabel: string;
  dealerCityLabel: string;
  dealerQuotaLabel: string;
  dealerStockLabel: string;
  dealerPinCheckinTitle: string;
  dealerPinCheckinDesc: string;
  btnValidatePin: string;

  // Price Lock Pass
  passTitle: string;
  passLockedBadge: string;
  passCertificateDesc: string;
  passNumber: string;
  passCar: string;
  passDealer: string;
  passSoloPrice: string;
  passGroupPrice: string;
  passSavings: string;
  passPinNotice: string;
  passPinDesc: string;
  btnPrintPass: string;
  btnCheckBillFuelCard: string;

  // 4 Secrets (Unbundling)
  secretsBadge: string;
  secretsTitle: string;
  secretsSubtitle: string;
  secret1Title: string;
  secret1Desc: string;
  secret2Title: string;
  secret2Desc: string;
  secret3Title: string;
  secret3Desc: string;
  secret4Title: string;
  secret4Desc: string;
  secretsTotalSaved: string;
  secretsBeforeGroup: string;

  // Fuel Card Claim
  fuelBadge: string;
  fuelTitle: string;
  fuelSubtitle: string;
  fuelFormTitle: string;
  fuelInvoiceNo: string;
  fuelTotalPaid: string;
  btnVerifyBillClaim: string;
  fuelRewardUnlocked: string;
  fuelCardDispatched: string;
  fuelVoucherCode: string;
  btnCopyVoucher: string;

  // Old Car Trade-In
  tradeBadge: string;
  tradeTitle: string;
  tradeSubtitle: string;
  tradeMake: string;
  tradeModel: string;
  tradeYear: string;
  tradeKm: string;
  tradeFuel: string;
  btnGet3Bids: string;
  tradeExtraCash: string;

  // Footer
  footerDesc: string;
  footerMadeFor: string;
  footerTools: string;
  footerActiveCities: string;
  footerTrustTitle: string;
  footerTrustDesc: string;
  footerRights: string;
}

export const translations: Record<Language, Translations> = {
  // ================= ENGLISH =================
  en: {
    topAlert: 'Car showrooms in',
    octoberDeals: 'are giving group discounts this month. Buyers are saving ₹50,000 to ₹85,000 per car!',
    navGroups: 'Car Groups',
    navQuote: 'Check Quote',
    navBidding: 'Dealers Competing',
    navTricks: '4 Money Tricks',
    navPriceLock: 'Price Lock Pass',
    navFuelCard: '₹5,000 Fuel Card',
    navSellCar: 'Sell Old Car',
    navAccount: 'Account',
    roleBuyer: 'Buyer',
    roleDealer: 'Showroom',
    selectCity: 'Select City',

    heroBadge: "India's Verified Group Car-Buying Platform",
    heroHeadlineMain: 'Smart Buyers Ki',
    heroHeadlineHighlight: 'Smart Deal!',
    btnJoinGroupFree: 'Join a Car Group for Free',
    btnCheckQuote: 'Check My Showroom Quote',
    trustFree: '100% Free for Buyers',
    trustDelivery: 'Official Showroom Delivery',
    trustWarranty: 'Full Factory Warranty',
    trustFuelCard: '₹5,000 Free Petrol Card',
    howItWorksTitle: '3 Simple Steps to Group Savings',
    howItWorksSubtitle: 'Direct from official showrooms with zero middleman hassle.',
    step1Title: 'Join a Car Group (Free)',
    step1Desc: 'Choose your desired car model and reserve your spot in a group of 15–20 buyers in your city. No advance fees required.',
    step2Title: 'Showrooms Compete',
    step2Desc: 'Official dealerships in your region submit bulk offers to win the group. You unlock maximum cash discounts and free official perks.',
    step3Title: 'Pick Up at Showroom & Save',
    step3Desc: 'Show your 6-digit Price Lock PIN at the dealership. Pay directly, take delivery with full factory warranty, and save ₹50k–₹1L!',
    statSaved: '₹1.42 Cr+',
    statSavedDesc: 'Saved by Indian Car Buyers',
    statAvgSaving: '₹68,400',
    statAvgSavingDesc: 'Average Savings Per Car',
    statShowrooms: '24 Showrooms',
    statShowroomsDesc: 'Authorised Partner Dealerships',
    statDeliveryTime: '7 Days',
    statDeliveryTimeDesc: 'Average Stock Delivery Time',

    groupsBadge: 'Active Car Buying Groups in',
    groupsTitle: 'Buy Together, Save More Money',
    groupsSubtitle: 'Join verified car pools in your city and unlock bulk showroom discounts with zero agent fees.',
    btnStartGroup: 'Start Group for Society / Office',
    filterBrand: 'Filter by Brand:',
    allBrands: 'All',
    loadingGroups: 'Loading car groups...',
    noGroupsFound: 'No active groups in this city for this brand.',
    cardShowroomPrice: 'Showroom Price:',
    cardGroupPrice: 'Group Price:',
    cardYourSaving: 'Your Total Saving',
    cardBuyersJoined: 'Buyers Joined',
    cardSpotsLeft: 'spots left',
    cardLowestOffer: 'Lowest Showroom Offer:',
    cardDeliveryIn: 'Delivery in',
    btnJoinGroup: 'Join Group (Free)',
    btnSeeOffers: 'See All Showroom Offers',
    btnGetPriceLock: 'Get Price Lock Pass',
    modalJoinTitle: 'Join Car Group',
    modalFullName: 'Your Full Name',
    modalPhone: 'WhatsApp / Mobile Number',
    modalTimeline: 'When are you planning to buy?',
    modalPreApproved: 'I have cash ready or bank loan pre-approved (Gives you priority delivery)',
    modalGuaranteeFree: 'Zero joining fee, zero commissions from you.',
    modalGuaranteeDirect: 'You buy directly from official brand showrooms with full warranty.',
    btnSaveSpot: 'Save My Spot (Free)',
    btnCancel: 'Cancel',

    quoteBadge: 'Free AI Showroom Bill Checker',
    quoteTitle: 'Check Your Showroom Quotation',
    quoteSubtitle: 'Indian showrooms often add ₹20,000 to ₹45,000 in unnecessary or illegal fees. Upload or type your quote to spot them instantly.',
    quickSampleNexon: 'Try with Nexon Quote',
    quickSampleCreta: 'Try with Creta Quote',
    quoteFormTitle: 'Showroom Quotation Checker',
    quoteCarModel: 'Car Model & City',
    quoteExShowroom: 'Ex-Showroom Price (₹)',
    quoteInsurance: 'Insurance Cost (₹)',
    quoteHandling: 'Handling / Depot Charges (₹)',
    quoteAccessories: 'Accessories Kit (₹)',
    quoteFastag: 'FASTag + Municipal Tax (₹)',
    btnAuditQuote: 'Check My Quote Instantly',
    btnAuditing: 'Checking quote line by line...',
    auditScoreTitle: 'Quotation Audit Result',
    auditScoreFair: 'Fair Quotation (No major extra markups)',
    auditScoreInflated: 'Inflated Quotation (Overpriced add-ons found)',
    auditTotalSavingsFound: 'Total Extra Charges You Can Remove',
    whatsappTitle: 'Ready-Made WhatsApp Message to Send Your Dealer',
    btnCopyWhatsapp: 'Copy WhatsApp Message',
    copiedWhatsapp: 'Copied to clipboard!',

    accountTitle: 'Account & Settings',
    accountSubtitle: 'Manage your profile, active car groups, price lock passes, and language preferences.',
    tabBuyerProfile: 'Car Buyer Account',
    tabDealerProfile: 'Showroom Partner Account',
    tabLanguageSettings: 'Language / भाषा / भाषा निवडा',
    langSectionTitle: 'Choose Your Preferred Language',
    langSectionDesc: 'Switch the entire website between English, Marathi, or Hindi in one click.',
    activeLanguage: 'Active Language:',
    langEn: 'English (Default)',
    langMr: 'मराठी (Marathi)',
    langHi: 'हिंदी (Hindi)',
    buyerNameLabel: 'Your Full Name',
    buyerPhoneLabel: 'WhatsApp / Mobile Phone',
    buyerEmailLabel: 'Email Address',
    buyerCityLabel: 'Home City',
    btnSaveProfile: 'Save Profile Changes',
    savedSuccess: 'Profile saved successfully!',
    myActiveGroups: 'My Active Car Groups',
    myPriceLockPasses: 'My Price Lock Passes (Vouchers)',
    myFuelRewards: 'My Claimed Petrol Card Rewards',
    dealerOrgLabel: 'Dealership Organization Name',
    dealerCityLabel: 'Showroom City Hub',
    dealerQuotaLabel: 'Monthly Sales Target Quota',
    dealerStockLabel: 'Ready Stock Units in Transit',
    dealerPinCheckinTitle: 'Showroom Booking Check-In (Verify Buyer PIN)',
    dealerPinCheckinDesc: 'When a CarFair buyer arrives, enter their 6-digit PIN below to confirm the locked group price.',
    btnValidatePin: 'Validate PIN & Confirm Booking',

    passTitle: 'CarFair Price Lock Pass',
    passLockedBadge: 'PRICE LOCKED',
    passCertificateDesc: 'Official Showroom Price Guarantee Certificate',
    passNumber: 'Pass Number',
    passCar: 'Your Selected Car',
    passDealer: 'Assigned Showroom',
    passSoloPrice: 'Regular Showroom Price',
    passGroupPrice: 'Your Group Locked Price',
    passSavings: 'Your Total Money Saved',
    passPinNotice: 'Show This 6-Digit PIN to the Showroom Manager',
    passPinDesc: 'Give this 6-digit PIN to the sales manager when paying your booking amount to confirm your locked group price.',
    btnPrintPass: 'Print Pass / Save PDF',
    btnCheckBillFuelCard: 'Check Final Bill & Claim Card',

    secretsBadge: 'Save Money Before Even Negotiating',
    secretsTitle: '4 Showroom Secrets That Cost You ₹50,000+',
    secretsSubtitle: 'Showrooms make very little profit on the car price itself. Their real profits come from 4 extra items added to your quotation.',
    secret1Title: '1. Showroom Insurance vs Direct Online',
    secret1Desc: 'Showrooms charge high insurance rates due to commissions. Online rates for zero-dep are much lower.',
    secret2Title: "2. Illegal 'Handling & Depot' Charges",
    secret2Desc: 'Supreme Court and Ministry of Road Transport (MoRTH) have banned depot/handling fees.',
    secret3Title: '3. Forced Mandatory Accessory Kits',
    secret3Desc: 'Showrooms pack cheap perfume and chrome strips for ₹25k. Buy only essential mats for ₹4,500.',
    secret4Title: '4. Overpriced Extended Warranty',
    secret4Desc: 'Pay official car manufacturer rates instead of dealership internal markups.',
    secretsTotalSaved: 'Cash Saved Right in Your Pocket',
    secretsBeforeGroup: 'And this is BEFORE counting your group discount!',

    fuelBadge: 'Buyer Delivery Reward',
    fuelTitle: 'Claim Your ₹5,000 Free Petrol Card',
    fuelSubtitle: "Took delivery of your new car? Enter your final showroom bill amounts below. We verify that the dealer didn't sneak in extra charges, and unlock your ₹5,000 HPCL/IOCL fuel voucher.",
    fuelFormTitle: 'Final Showroom Bill Checker',
    fuelInvoiceNo: 'Invoice / Bill Number',
    fuelTotalPaid: 'Final Total Amount Paid to Showroom (₹)',
    btnVerifyBillClaim: 'Verify Bill & Claim ₹5,000 Petrol Card',
    fuelRewardUnlocked: 'BILL VERIFIED • CARD UNLOCKED',
    fuelCardDispatched: '₹5,000 HPCL / IOCL Petrol Card Ready!',
    fuelVoucherCode: 'Your Petrol Card Digital Voucher',
    btnCopyVoucher: 'Copy Voucher Code',

    tradeBadge: 'Multi-Buyer Car Exchange',
    tradeTitle: 'Sell Your Old Car at the Highest Price',
    tradeSubtitle: 'Never accept a single showroom exchange offer. We get 3 verified buyer networks to bid against each other for you.',
    tradeMake: 'Make / Brand',
    tradeModel: 'Model & Variant',
    tradeYear: 'Year of Purchase',
    tradeKm: 'Total Kilometers Driven',
    tradeFuel: 'Fuel Type',
    btnGet3Bids: 'Get 3 Competing Bids Instantly',
    tradeExtraCash: 'Your Extra Cash In Hand',

    footerDesc: "India's first group car-buying network and quotation checker. We help car buyers come together so authorized showrooms offer bulk fleet discounts.",
    footerMadeFor: 'Built for Indian car buyers and families.',
    footerTools: 'Helpful Tools',
    footerActiveCities: 'Active Cities',
    footerTrustTitle: 'Our Trust Promise',
    footerTrustDesc: 'CarFair follows the guidelines of the Ministry of Road Transport and Highways (MoRTH) and IRDAI insurance rules.',
    footerRights: '© 2026 CarFair India. All rights reserved.'
  },

  // ================= MARATHI (मराठी) =================
  mr: {
    topAlert: 'मधील अधिकृत कार शोरूम्स या महिन्यात ग्रुप डिस्काउंट देत आहेत.',
    octoberDeals: 'खरेदीदार प्रत्येक कारवर ₹५०,००० ते ₹८५,००० ची थेट बचत करत आहेत!',
    navGroups: 'कार ग्रुप्स',
    navQuote: 'कोटेशन तपासा',
    navBidding: 'शोरूम्स स्पर्धा',
    navTricks: '४ युक्त्या',
    navPriceLock: 'प्राईस लॉक',
    navFuelCard: '₹५,००० पेट्रोल कार्ड',
    navSellCar: 'जुनी कार विका',
    navAccount: 'खाते',
    roleBuyer: 'ग्राहक',
    roleDealer: 'शोरूम',
    selectCity: 'शहर निवडा',

    heroBadge: 'भारतातील पहिले व्हेरिफाईड ग्रुप कार-खरेदी प्लॅटफॉर्म',
    heroHeadlineMain: 'स्मार्ट बायर्सची',
    heroHeadlineHighlight: 'स्मार्ट डील!',
    btnJoinGroupFree: 'कार ग्रुपमध्ये मोफत सामील व्हा',
    btnCheckQuote: 'माझे शोरूम कोटेशन तपासा',
    trustFree: 'खरेदीदारांसाठी १००% मोफत',
    trustDelivery: 'अधिकृत शोरूममधून डिलिव्हरी',
    trustWarranty: 'पूर्ण कंपनी वॉरंटी',
    trustFuelCard: '₹५,००० मोफत पेट्रोल कार्ड',
    howItWorksTitle: 'ग्रुप बचतीचे ३ सोपे टप्पे',
    howItWorksSubtitle: 'कोणत्याही एजंटशिवाय थेट अधिकृत शोरूममधून सुरक्षित खरेदी.',
    step1Title: 'कार ग्रुपमध्ये सामील व्हा (मोफत)',
    step1Desc: 'तुमची आवडती कार निवडा आणि तुमच्या शहरातील १५-२० खरेदीदारांच्या ग्रुपमध्ये मोफत जागा बुक करा.',
    step2Title: 'शोरूम्सची स्पर्धा',
    step2Desc: 'अधिकृत शोरूम्स एकत्र खरेदी करणाऱ्या ग्रुपला जिंकण्यासाठी सर्वात कमी ऑन-रोड किंमत ऑफर करतात.',
    step3Title: 'शोरूममधून कार घ्या आणि पैसे वाचवा',
    step3Desc: 'तुमचा ६-अंकी प्राईस लॉक पिन शोरूममध्ये दाखवा. थेट कार घ्या आणि ₹५० हजार ते ₹१ लाख वाचवा!',
    statSaved: '₹१.४२ कोटी+',
    statSavedDesc: 'भारतीय खरेदीदारांची झालेली बचत',
    statAvgSaving: '₹६८,४००',
    statAvgSavingDesc: 'प्रत्येक कारवरील सरासरी बचत',
    statShowrooms: '२४ शोरूम्स',
    statShowroomsDesc: 'अधिकृत पार्टनर डीलरशिप्स',
    statDeliveryTime: '७ दिवस',
    statDeliveryTimeDesc: 'सरासरी डिलिव्हरी वेळ',

    groupsBadge: 'मधील सक्रिय कार खरेदी ग्रुप्स',
    groupsTitle: 'एकत्र खरेदी करा, जास्त पैसे वाचवा',
    groupsSubtitle: 'तुमच्या शहरातील व्हेरिफाईड कार ग्रुप्समध्ये सामील व्हा आणि शून्य शुल्कात शोरूम डिस्काउंट मिळवा.',
    btnStartGroup: 'सोसायटी किंवा ऑफिससाठी ग्रुप सुरू करा',
    filterBrand: 'ब्रँडनुसार निवडा:',
    allBrands: 'सर्व',
    loadingGroups: 'कार ग्रुप्स लोड होत आहेत...',
    noGroupsFound: 'या शहरात या ब्रँडसाठी सध्या कोणताही सक्रिय ग्रुप उपलब्ध नाही.',
    cardShowroomPrice: 'शोरूम किंमत:',
    cardGroupPrice: 'ग्रुप किंमत:',
    cardYourSaving: 'तुमची एकूण बचत',
    cardBuyersJoined: 'खरेदीदार सामील',
    cardSpotsLeft: 'जागा शिल्लक',
    cardLowestOffer: 'सर्वात कमी शोरूम ऑफर:',
    cardDeliveryIn: 'डिलिव्हरी',
    btnJoinGroup: 'ग्रुपमध्ये सामील व्हा (मोफत)',
    btnSeeOffers: 'सर्व शोरूम ऑफर्स पहा',
    btnGetPriceLock: 'प्राईस लॉक पास मिळवा',
    modalJoinTitle: 'कार ग्रुपमध्ये सामील व्हा',
    modalFullName: 'तुमचे पूर्ण नाव',
    modalPhone: 'व्हॉट्सअॅप / मोबाईल नंबर',
    modalTimeline: 'तुम्ही कार कधी खरेदी करणार आहात?',
    modalPreApproved: 'माझे रोख पैसे किंवा बँक लोन तयार आहे (यामुळे तुम्हाला प्राधान्याने डिलिव्हरी मिळते)',
    modalGuaranteeFree: 'शून्य नोंदणी फी, तुमच्याकडून कोणतेही कमिशन घेतले जात नाही.',
    modalGuaranteeDirect: 'तुम्ही थेट अधिकृत ब्रँड शोरूममधून पूर्ण वॉरंटीसह कार खरेदी करता.',
    btnSaveSpot: 'माझी जागा बुक करा (मोफत)',
    btnCancel: 'रद्द करा',

    quoteBadge: 'मोफत AI शोरूम कोटेशन तपासणी साधन',
    quoteTitle: 'तुमचे शोरूम कोटेशन तपासा',
    quoteSubtitle: 'शोरूम्स बऱ्याचदा ₹२०,००० ते ₹४५,००० चे अनावश्यक किंवा बेकायदेशीर छुपे शुल्क लावतात. एका क्लिकवर तपासा.',
    quickSampleNexon: 'नेक्सॉन कोटेशनने तपासा',
    quickSampleCreta: 'क्रेटा कोटेशनने तपासा',
    quoteFormTitle: 'शोरूम कोटेशन तपासणी फॉर्म',
    quoteCarModel: 'कार मॉडेल आणि शहर',
    quoteExShowroom: 'एक्स-शोरूम किंमत (₹)',
    quoteInsurance: 'विमा (Insurance) खर्च (₹)',
    quoteHandling: 'हँडलिंग / डेपो चार्जेस (₹)',
    quoteAccessories: 'अ‍ॅक्सेसरीज किट (₹)',
    quoteFastag: 'फास्टॅग + स्थानिक कर (₹)',
    btnAuditQuote: 'माझे कोटेशन लगेच तपासा',
    btnAuditing: 'कोटेशन तपासत आहोत...',
    auditScoreTitle: 'कोटेशन तपासणी निकाल',
    auditScoreFair: 'वाजवी कोटेशन (कोणतेही मोठे छुपे शुल्क नाही)',
    auditScoreInflated: 'जास्त किंमत लावलेलं कोटेशन (छुपे शुल्क आढळले)',
    auditTotalSavingsFound: 'तुम्ही कमी करू शकता असे छुपे शुल्क',
    whatsappTitle: 'शोरूम मॅनेजरला पाठवण्यासाठी तयार व्हॉट्सअॅप मेसेज',
    btnCopyWhatsapp: 'व्हॉट्सअॅप मेसेज कॉपी करा',
    copiedWhatsapp: 'कॉपी झाले!',

    accountTitle: 'खाते आणि भाषा सेटिंग्ज',
    accountSubtitle: 'तुमचे प्रोफाईल, सक्रिय कार ग्रुप्स, प्राईस लॉक पास आणि भाषा प्राधान्ये व्यवस्थापित करा.',
    tabBuyerProfile: 'कार खरेदीदार खाते',
    tabDealerProfile: 'शोरूम पार्टनर खाते',
    tabLanguageSettings: 'भाषा निवडा (Language Settings)',
    langSectionTitle: 'तुमची पसंतीची भाषा निवडा',
    langSectionDesc: 'संपूर्ण वेबसाईट एका क्लिकवर इंग्रजी, मराठी किंवा हिंदीमध्ये बदला.',
    activeLanguage: 'सध्याची भाषा:',
    langEn: 'English (इंग्रजी)',
    langMr: 'मराठी (Marathi - सक्रिय)',
    langHi: 'हिंदी (Hindi)',
    buyerNameLabel: 'तुमचे पूर्ण नाव',
    buyerPhoneLabel: 'व्हॉट्सअॅप / मोबाईल नंबर',
    buyerEmailLabel: 'ईमेल पत्ता',
    buyerCityLabel: 'राहण्याचे शहर',
    btnSaveProfile: 'बदल सेव्ह करा',
    savedSuccess: 'प्रोफाईल यशस्वीरीत्या सेव्ह झाले!',
    myActiveGroups: 'माझे सक्रिय कार ग्रुप्स',
    myPriceLockPasses: 'माझे प्राईस लॉक पासेस (व्हाउचर्स)',
    myFuelRewards: 'माझे मिळालेले पेट्रोल कार्ड व्हाउचर्स',
    dealerOrgLabel: 'डीलरशिप शोरूमचे नाव',
    dealerCityLabel: 'शोरूम शहर',
    dealerQuotaLabel: 'महिन्याचे विक्री उद्दिष्ट',
    dealerStockLabel: 'उपलब्ध शिल्लक गाड्या',
    dealerPinCheckinTitle: 'शोरूम बुकिंग व्हेरिफिकेशन (ग्राहकाचा पिन टाका)',
    dealerPinCheckinDesc: 'ग्राहक शोरूममध्ये आल्यावर त्यांचा ६-अंकी पिन खाली टाकून डिस्काउंट कन्फर्म करा.',
    btnValidatePin: 'पिन तपासा आणि बुकिंग कन्फर्म करा',

    passTitle: 'CarFair प्राईस लॉक पास',
    passLockedBadge: 'किंमत लॉक केली आहे',
    passCertificateDesc: 'अधिकृत शोरूम किंमत हमी प्रमाणपत्र',
    passNumber: 'पास क्रमांक',
    passCar: 'तुमची निवडलेली कार',
    passDealer: 'नियुक्त शोरूम',
    passSoloPrice: 'शोरूमची सामान्य किंमत',
    passGroupPrice: 'तुमची ग्रुप लॉक केलेली किंमत',
    passSavings: 'तुमची एकूण झालेली बचत',
    passPinNotice: 'हा ६-अंकी पिन शोरूम मॅनेजरला दाखवा',
    passPinDesc: 'बुकिंग रक्कम भरताना हा ६-अंकी पिन सेल्स मॅनेजरला द्या, जेणेकरून तुमचे ग्रुप डिस्काउंट सुरक्षित राहील.',
    btnPrintPass: 'पास प्रिंट करा / PDF सेव्ह करा',
    btnCheckBillFuelCard: 'बिल तपासा आणि कार्ड मिळवा',

    secretsBadge: 'वाटाघाटी सुरू करण्यापूर्वीच पैसे वाचवा',
    secretsTitle: 'शोरूमची ४ गुपिते जी तुमचे ₹५०,०००+ वाया घालवतात',
    secretsSubtitle: 'शोरूम्स कारच्या मूळ किमतीवर फार कमी नफा कमवतात. त्यांचा खरा नफा कोटेशनमधील ४ अतिरिक्त शुल्कांमधून येतो.',
    secret1Title: '१. शोरूम विमा विरूद्ध थेट ऑनलाईन विमा',
    secret1Desc: 'शोरूम्स कमिशनसाठी महागडा विमा लावतात. तेच झिरो-डेप कव्हर ऑनलाईन खूप स्वस्त मिळते.',
    secret2Title: "२. बेकायदेशीर 'हँडलिंग आणि डेपो' चार्जेस",
    secret2Desc: 'सर्वोच्च न्यायालय आणि रस्ते वाहतूक मंत्रालयाने (MoRTH) हँडलिंग चार्जेस बेकायदेशीर ठरवले आहेत.',
    secret3Title: '३. जबरदस्तीने दिले जाणारे अ‍ॅक्सेसरीज किट्स',
    secret3Desc: 'शोरूम्स ₹२५ हजारात स्वस्त परफ्यूम आणि क्रोम पट्ट्या देतात. फक्त महत्त्वाचे मॅट्स ₹४,५०० मध्ये मिळतात.',
    secret4Title: '४. वाढीव किमतीची एक्सटेंडेड वॉरंटी',
    secret4Desc: 'शोरूमच्या वाढीव शुल्काऐवजी थेट कार उत्पादक कंपनीच्या अधिकृत दरात वॉरंटी घ्या.',
    secretsTotalSaved: 'थेट तुमच्या खिशात वाचलेले पैसे',
    secretsBeforeGroup: 'आणि ही बचत ग्रुप डिस्काउंट मोजण्यापूर्वीची आहे!',

    fuelBadge: 'डिलिव्हरी बक्षीस',
    fuelTitle: 'तुमचे ₹५,००० मोफत पेट्रोल कार्ड मिळवा',
    fuelSubtitle: 'नवीन कारची डिलिव्हरी घेतली? तुमचे अंतिम बिल खाली टाका. शोरूमने कोणतेही छुपे शुल्क लावले नसल्याची खात्री करून आम्ही तुमचे कार्ड अनलॉक करू.',
    fuelFormTitle: 'अंतिम शोरूम बिल तपासणी',
    fuelInvoiceNo: 'बिल / इनव्हॉईस क्रमांक',
    fuelTotalPaid: 'शोरूमला भरलेली अंतिम एकूण रक्कम (₹)',
    btnVerifyBillClaim: 'बिल तपासा आणि ₹५,००० पेट्रोल कार्ड मिळवा',
    fuelRewardUnlocked: 'बिल तपासले • कार्ड अनलॉक झाले',
    fuelCardDispatched: '₹५,००० चे HPCL / IOCL पेट्रोल कार्ड तयार आहे!',
    fuelVoucherCode: 'तुमचे पेट्रोल कार्ड डिजिटल व्हाउचर',
    btnCopyVoucher: 'व्हाउचर कोड कॉपी करा',

    tradeBadge: 'मल्टी-डीलर कार एक्सचेंज',
    tradeTitle: 'तुमची जुनी कार सर्वोत्तम किमतीत विका',
    tradeSubtitle: 'एकाच शोरूमची कमी किंमत कधीही स्वीकारू नका. आम्ही ३ प्रमाणित खरेदीदारांकडून स्पर्धा लावून तुम्हाला जास्तीत जास्त पैसे मिळवून देतो.',
    tradeMake: 'कार कंपनी / ब्रँड',
    tradeModel: 'मॉडेल आणि व्हेरिएंट',
    tradeYear: 'खरेदीचे वर्ष',
    tradeKm: 'एकूण धावलेले किलोमीटर',
    tradeFuel: 'इंधन प्रकार',
    btnGet3Bids: '३ सर्वोत्तम ऑफर्स लगेच मिळवा',
    tradeExtraCash: 'तुमच्या हातात मिळणारे जास्तीचे पैसे',

    footerDesc: 'भारतातील पहिले ग्रुप कार-खरेदी आणि कोटेशन तपासणी नेटवर्क. अधिकृत शोरूम्सकडून मोठ्या सवलती मिळवून देण्यासाठी आम्ही खरेदीदारांना एकत्र आणतो.',
    footerMadeFor: 'भारतीय कार खरेदीदार आणि कुटुंबांसाठी तयार केलेले.',
    footerTools: 'उपयुक्त साधने',
    footerActiveCities: 'सक्रिय शहरे',
    footerTrustTitle: 'आमची विश्वासार्ह हमी',
    footerTrustDesc: 'CarFair रस्ते वाहतूक मंत्रालय (MoRTH) आणि IRDAI च्या नियमांनुसार काम करते.',
    footerRights: '© २०२६ CarFair India. सर्व हक्क राखीव.'
  },

  // ================= HINDI (हिंदी) =================
  hi: {
    topAlert: 'के कार शोरूम्स इस महीने ग्रुप डिस्काउंट दे रहे हैं।',
    octoberDeals: 'खरीदार प्रति कार ₹५०,००० से ₹८५,००० तक की सीधी बचत कर रहे हैं!',
    navGroups: 'कार ग्रुप्स',
    navQuote: 'कोट चेक करें',
    navBidding: 'शोरूम स्पर्धा',
    navTricks: '४ पैसे की बचत',
    navPriceLock: 'प्राइस लॉक',
    navFuelCard: '₹५,००० फ्यूल कार्ड',
    navSellCar: 'पुरानी कार बेचें',
    navAccount: 'खाता',
    roleBuyer: 'खरीदार',
    roleDealer: 'शोरूम',
    selectCity: 'शहर चुनें',

    heroBadge: 'भारत का पहला वेरीफाइड ग्रुप कार-खरीद प्लेटफॉर्म',
    heroHeadlineMain: 'स्मार्ट बायर्स की',
    heroHeadlineHighlight: 'स्मार्ट डील!',
    btnJoinGroupFree: 'कार ग्रुप में मुफ्त जुड़ें',
    btnCheckQuote: 'मेरा शोरूम कोटेशन जांचें',
    trustFree: 'खरीदारों के लिए १००% मुफ्त',
    trustDelivery: 'आधिकारिक शोरूम से डिलीवरी',
    trustWarranty: 'पूरी कंपनी वारंटी',
    trustFuelCard: '₹५,००० फ्री पेट्रोल कार्ड',
    howItWorksTitle: 'ग्रुप बचत के ३ आसान चरण',
    howItWorksSubtitle: 'बिना किसी बिचौलिए के सीधे आधिकारिक शोरूम से सुरक्षित खरीदारी।',
    step1Title: 'कार ग्रुप में जुड़ें (मुफ्त)',
    step1Desc: 'अपनी मनपसंद कार चुनें और अपने शहर के १५-२० खरीदारों के ग्रुप में बिना किसी अग्रिम शुल्क के सीट रिजर्व करें।',
    step2Title: 'शोरूम्स की होड़',
    step2Desc: 'आधिकारिक डीलरशिप्स ग्रुप को जीतने के लिए सबसे कम ऑन-रोड कीमत की बोली लगाते हैं।',
    step3Title: 'शोरूम से कार उठाएं और बचत करें',
    step3Desc: 'अपना ६-अंकों का प्राइस लॉक पिन शोरूम में दिखाएं। सीधे डिलीवरी लें और ₹५० हजार से ₹१ लाख तक बचाएं!',
    statSaved: '₹१.४२ करोड़+',
    statSavedDesc: 'भारतीय खरीदारों द्वारा बचाए गए',
    statAvgSaving: '₹६८,४००',
    statAvgSavingDesc: 'प्रति कार औसत बचत',
    statShowrooms: '२४ शोरूम्स',
    statShowroomsDesc: 'आधिकारिक पार्टनर डीलरशिप्स',
    statDeliveryTime: '७ दिन',
    statDeliveryTimeDesc: 'औसत डिलीवरी समय',

    groupsBadge: 'में सक्रिय कार खरीद ग्रुप्स',
    groupsTitle: 'साथ मिलकर खरीदें, ज्यादा पैसे बचाएं',
    groupsSubtitle: 'अपने शहर के वेरीफाइड कार ग्रुप्स में जुड़ें और शून्य चार्ज पर भारी शोरूम डिस्काउंट पाएं।',
    btnStartGroup: 'सोसायटी या ऑफिस के लिए ग्रुप शुरू करें',
    filterBrand: 'ब्रांड अनुसार चुनें:',
    allBrands: 'सभी',
    loadingGroups: 'कार ग्रुप्स लोड हो रहे हैं...',
    noGroupsFound: 'इस शहर में इस ब्रांड के लिए फिलहाल कोई ग्रुप उपलब्ध नहीं है।',
    cardShowroomPrice: 'शोरूम कीमत:',
    cardGroupPrice: 'ग्रुप कीमत:',
    cardYourSaving: 'आपकी कुल बचत',
    cardBuyersJoined: 'खरीदार जुड़े',
    cardSpotsLeft: 'सीटें बाकी',
    cardLowestOffer: 'सबसे कम शोरूम ऑफर:',
    cardDeliveryIn: 'डिलीवरी',
    btnJoinGroup: 'ग्रुप में जुड़ें (फ्री)',
    btnSeeOffers: 'सभी शोरूम ऑफर्स देखें',
    btnGetPriceLock: 'प्राइस लॉक पास पाएं',
    modalJoinTitle: 'कार ग्रुप में जुड़ें',
    modalFullName: 'आपका पूरा नाम',
    modalPhone: 'व्हाट्सएप / मोबाइल नंबर',
    modalTimeline: 'आप कार कब खरीदने की योजना बना रहे हैं?',
    modalPreApproved: 'मेरे पास नकद राशि या बैंक लोन स्वीकृत है (प्राथमिकता डिलीवरी मिलेगी)',
    modalGuaranteeFree: 'शून्य जॉइनिंग फीस, आपसे कोई कमीशन नहीं लिया जाता।',
    modalGuaranteeDirect: 'आप सीधे आधिकारिक ब्रांड शोरूम से पूरी वारंटी के साथ कार खरीदते हैं।',
    btnSaveSpot: 'मेरी सीट रिजर्व करें (मुफ्त)',
    btnCancel: 'रद्द करें',

    quoteBadge: 'फ्री AI शोरूम बिल चेकर',
    quoteTitle: 'अपना शोरूम कोटेशन जांचें',
    quoteSubtitle: 'भारतीय शोरूम्स अक्सर कोटेशन में ₹२०,००० से ₹४५,००० तक के गैर-जरूरी या अवैध चार्ज जोड़ते हैं। एक क्लिक में जांचें।',
    quickSampleNexon: 'नेक्सॉन कोट से जांचें',
    quickSampleCreta: 'क्रेटा कोट से जांचें',
    quoteFormTitle: 'शोरूम कोटेशन जांच फॉर्म',
    quoteCarModel: 'कार मॉडल और शहर',
    quoteExShowroom: 'एक्स-शोरूम कीमत (₹)',
    quoteInsurance: 'इंश्योरेंस खर्च (₹)',
    quoteHandling: 'हैंडलिंग / डिपो चार्ज (₹)',
    quoteAccessories: 'एक्सेसरीज किट (₹)',
    quoteFastag: 'फास्टैग + नगर निगम टैक्स (₹)',
    btnAuditQuote: 'मेरा कोटेशन तुरंत जांचें',
    btnAuditing: 'कोटेशन जांचा जा रहा है...',
    auditScoreTitle: 'कोटेशन जांच परिणाम',
    auditScoreFair: 'उचित कोटेशन (कोई बड़ा छुपा चार्ज नहीं)',
    auditScoreInflated: 'महंगा कोटेशन (अतिरिक्त चार्ज पाए गए)',
    auditTotalSavingsFound: 'अतिरिक्त चार्ज जो आप हटा सकते हैं',
    whatsappTitle: 'डीलर को भेजने के लिए तैयार व्हाट्सएप संदेश',
    btnCopyWhatsapp: 'व्हाट्सएप संदेश कॉपी करें',
    copiedWhatsapp: 'कॉपी हो गया!',

    accountTitle: 'खाता और भाषा सेटिंग्स',
    accountSubtitle: 'अपनी प्रोफाइल, सक्रिय कार ग्रुप्स, प्राइस लॉक पास और भाषा प्राथमिकताएं प्रबंधित करें।',
    tabBuyerProfile: 'कार खरीदार खाता',
    tabDealerProfile: 'शोरूम पार्टनर खाता',
    tabLanguageSettings: 'भाषा चुनें (Language Settings)',
    langSectionTitle: 'अपनी पसंदीदा भाषा चुनें',
    langSectionDesc: 'पूरी वेबसाइट को एक क्लिक में अंग्रेजी, मराठी या हिंदी में बदलें।',
    activeLanguage: 'सक्रिय भाषा:',
    langEn: 'English (अंग्रेजी)',
    langMr: 'मराठी (Marathi)',
    langHi: 'हिंदी (Hindi - सक्रिय)',
    buyerNameLabel: 'आपका पूरा नाम',
    buyerPhoneLabel: 'व्हाट्सएप / मोबाइल नंबर',
    buyerEmailLabel: 'ईमेल पता',
    buyerCityLabel: 'शहर',
    btnSaveProfile: 'बदलाव सेव करें',
    savedSuccess: 'प्रोफाइल सफलतापूर्वक सेव हो गई!',
    myActiveGroups: 'मेरे सक्रिय कार ग्रुप्स',
    myPriceLockPasses: 'मेरे प्राइस लॉक पास (वाउचर्स)',
    myFuelRewards: 'मेरे पेट्रोल कार्ड वाउचर्स',
    dealerOrgLabel: 'डीलरशिप शोरूम का नाम',
    dealerCityLabel: 'शोरूम शहर',
    dealerQuotaLabel: 'मासिक बिक्री लक्ष्य',
    dealerStockLabel: 'उपलब्ध स्टॉक यूनिट्स',
    dealerPinCheckinTitle: 'शोरूम बुकिंग सत्यापन (ग्राहक का पिन दर्ज करें)',
    dealerPinCheckinDesc: 'जब खरीदार पहुंचे, तो लॉक की गई ग्रुप कीमत की पुष्टि के लिए उनका ६-अंकों का पिन दर्ज करें।',
    btnValidatePin: 'पिन सत्यापित करें और बुकिंग दर्ज करें',

    passTitle: 'CarFair प्राइस लॉक पास',
    passLockedBadge: 'कीमत लॉक है',
    passCertificateDesc: 'आधिकारिक शोरूम मूल्य गारंटी प्रमाणपत्र',
    passNumber: 'पास संख्या',
    passCar: 'आपकी चुनी हुई कार',
    passDealer: 'आवंटित शोरूम',
    passSoloPrice: 'शोरूम की सामान्य कीमत',
    passGroupPrice: 'आपकी ग्रुप लॉक कीमत',
    passSavings: 'आपकी कुल बचत',
    passPinNotice: 'यह ६-अंकों का पिन शोरूम मैनेजर को दिखाएं',
    passPinDesc: 'बुकिंग राशि का भुगतान करते समय यह ६-अंकों का पिन सेल्स मैनेजर को दें ताकि आपकी डिस्काउंट कीमत मान्य रहे।',
    btnPrintPass: 'पास प्रिंट करें / PDF सेव करें',
    btnCheckBillFuelCard: 'बिल जांचें और कार्ड पाएं',

    secretsBadge: 'मोलभाव से पहले ही पैसे बचाएं',
    secretsTitle: 'शोरूम के ४ राज जो आपके ₹५०,०००+ खर्च करवाते हैं',
    secretsSubtitle: 'शोरूम्स कार की मूल कीमत पर बहुत कम मुनाफा कमाते हैं। उनका असली मुनाफा कोटेशन में जोड़े गए ४ अतिरिक्त आइटम से आता है।',
    secret1Title: '१. शोरूम इंश्योरेंस बनाम डायरेक्ट ऑनलाइन',
    secret1Desc: 'शोरूम कमीशन के कारण महंगा इंश्योरेंस देते हैं। वही जीरो-डेप कवर ऑनलाइन काफी सस्ता मिलता है।',
    secret2Title: "२. अवैध 'हैंडलिंग और डिपो' चार्ज",
    secret2Desc: 'सुप्रीम कोर्ट और सड़क परिवहन मंत्रालय (MoRTH) ने हैंडलिंग चार्ज को अवैध घोषित किया है।',
    secret3Title: '३. जबरन दिए जाने वाले एक्सेसरीज किट',
    secret3Desc: 'शोरूम्स ₹२५ हजार में सस्ते परफ्यूम और क्रोम देते हैं। केवल जरूरी मैट्स ₹४,५०० में मिल जाते हैं।',
    secret4Title: '४. अधिक कीमत वाली एक्सटेंडेड वारंटी',
    secret4Desc: 'शोरूम के आंतरिक मुनाफे के बजाय सीधे निर्माता कंपनी की आधिकारिक दरों पर वारंटी लें।',
    secretsTotalSaved: 'सीधे आपकी जेब में बची हुई रकम',
    secretsBeforeGroup: 'और यह बचत ग्रुप डिस्काउंट जोड़ने से पहले की है!',

    fuelBadge: 'डिलीवरी इनाम',
    fuelTitle: 'अपना ₹५,००० मुफ्त पेट्रोल कार्ड क्लेम करें',
    fuelSubtitle: 'नई कार की डिलीवरी ले ली? अपना अंतिम शोरूम बिल दर्ज करें। कोई अतिरिक्त चार्ज न होने की पुष्टि के बाद आपका पेट्रोल कार्ड तुरंत अनलॉक होगा।',
    fuelFormTitle: 'फाइनल शोरूम बिल जांच',
    fuelInvoiceNo: 'बिल / इनवॉयस नंबर',
    fuelTotalPaid: 'शोरूम को दी गई कुल रकम (₹)',
    btnVerifyBillClaim: 'बिल जांचें और ₹५,००० पेट्रोल कार्ड पाएं',
    fuelRewardUnlocked: 'बिल सत्यापित • कार्ड अनलॉक',
    fuelCardDispatched: '₹५,००० का HPCL / IOCL पेट्रोल कार्ड तैयार है!',
    fuelVoucherCode: 'आपका पेट्रोल कार्ड डिजिटल वाउचर',
    btnCopyVoucher: 'वाउचर कोड कॉपी करें',

    tradeBadge: 'मल्टी-डीलर कार एक्सचेंज',
    tradeTitle: 'अपनी पुरानी कार सबसे ऊंची कीमत पर बेचें',
    tradeSubtitle: 'किसी एक शोरूम का कम ऑफर कभी स्वीकार न करें। हम ३ प्रमाणित खरीदारों से मुकाबला करवाकर आपको ज्यादा नकद दिलाते हैं।',
    tradeMake: 'कार कंपनी / ब्रांड',
    tradeModel: 'मॉडल और वेरिएंट',
    tradeYear: 'खरीद का वर्ष',
    tradeKm: 'कुल चले किलोमीटर',
    tradeFuel: 'ईंधन प्रकार',
    btnGet3Bids: '३ सर्वश्रेष्ठ ऑफर्स तुरंत पाएं',
    tradeExtraCash: 'आपके हाथ में मिलने वाली अतिरिक्त नकदी',

    footerDesc: 'भारत का पहला ग्रुप कार-खरीद और कोटेशन जांच नेटवर्क। आधिकारिक शोरूम्स से भारी छूट पाने के लिए हम खरीदारों को एकजुट करते हैं।',
    footerMadeFor: 'भारतीय कार खरीदारों और परिवारों के लिए निर्मित।',
    footerTools: 'उपयोगी टूल्स',
    footerActiveCities: 'सक्रिय शहर',
    footerTrustTitle: 'हमारा विश्वास वादा',
    footerTrustDesc: 'CarFair सड़क परिवहन मंत्रालय (MoRTH) और IRDAI के नियमों के अनुसार काम करता है।',
    footerRights: '© २०२६ CarFair India. सर्वाधिकार सुरक्षित।'
  }
};
