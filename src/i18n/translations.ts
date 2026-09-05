// KrishiSetu — Translations
// Supports: English (en), Hindi (hi), Marathi (mr)

export type Language = 'en' | 'hi' | 'mr';

export interface TranslationSchema {
  nav: {
    home: string;
    cropPlanning: string;
    market: string;
    advisory: string;
    operations: string;
    weather: string;
    resources: string;
    about: string;
  };
  hero: {
    headline: string;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trusted: string;
    feature1: string;
    feature2: string;
    feature3: string;
  };
  common: {
    sampleData: string;
    loading: string;
    save: string;
    cancel: string;
    edit: string;
    add: string;
    delete: string;
    view: string;
    search: string;
    filter: string;
    submit: string;
  };
  dashboard: {
    title: string;
    goodMorning: string;
    greetingSubtitle: string;
    farmOverview: string;
    todayAdvisory: string;
    marketSnapshot: string;
    currentCrop: string;
    upcomingTasks: string;
    alerts: string;
    noAdvice: string;
    noTasks: string;
    cropPromptTitle: string;
    cropPromptDesc: string;
    cropPlaceholder: string;
  };
  cropPlanning: {
    title: string;
    subtitle: string;
    location: string;
    landArea: string;
    soilType: string;
    soilPH: string;
    water: string;
    irrigation: string;
    prevCrop: string;
    season: string;
    budget: string;
    experience: string;
    generatePlan: string;
    recommended: string;
    suitability: string;
    yield: string;
    investment: string;
    revenue: string;
    profit: string;
    waterReq: string;
    duration: string;
    marketPrice: string;
    demand: string;
    risk: string;
    compareCrops: string;
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    temperature: string;
    humidity: string;
    ph: string;
    rainfall: string;
    analyzing: string;
    noRecommendations: string;
  };
  market: {
    title: string;
    currentPrice: string;
    priceChange: string;
    demand: string;
    supply: string;
    forecast: string;
    nearbyMarkets: string;
  };
  advisory: {
    title: string;
    subtitle: string;
    cropAdvisory: string;
    weatherAdvisory: string;
    irrigationAdvisory: string;
    pestDisease: string;
    uploadImage: string;
    waterTitle: string;
    pestTitle: string;
    newsTitle: string;
    loadingWeather: string;
    loadingNews: string;
    newsError: string;
    published: string;
    askDoctor: string;
    askDoctorDesc: string;
    tapToSelect: string;
    takePicture: string;
    analyzingImage: string;
    findDisease: string;
    confidence: string;
    treatment: string;
    scanAnother: string;
  };
  weather: {
    title: string;
    temperature: string;
    humidity: string;
    rainProbability: string;
    windSpeed: string;
    sevenDayForecast: string;
  };
  operations: {
    title: string;
    tasks: string;
    addTask: string;
    editTask: string;
    markComplete: string;
    setReminder: string;
  };
  expenses: {
    title: string;
    seeds: string;
    fertilizers: string;
    pesticides: string;
    labour: string;
    machinery: string;
    transportation: string;
    totalInvestment: string;
    expectedRevenue: string;
    expectedProfit: string;
    actualProfit: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    phone: string;
    email: string;
    enterPhone: string;
    enterEmail: string;
    password: string;
    enterPassword: string;
    imNotRobot: string;
    loginBtn: string;
    registerBtn: string;
    noAccount: string;
    hasAccount: string;
  };
  schemes: {
    title: string;
    subtitle: string;
    viewGuide: string;
    eligibility: string;
    documents: string;
    helpForm: string;
    fillingForm: string;
  };
}

const en: TranslationSchema = {
  nav: {
    home: 'Home',
    cropPlanning: 'Next Crop Recommendation',
    market: 'Market',
    advisory: 'Advisory',
    operations: 'Operations',
    weather: 'Weather',
    resources: 'Resources',
    about: 'About',
  },
  hero: {
    headline: 'Farm Smart. Grow More. Earn Better.',
    subheading:
      'KrishiSetu is an easy-to-use app that helps you plan your crops, check daily mandi prices, get weather updates, and manage your farm work all in one place.',
    ctaPrimary: 'Start Crop Plan',
    ctaSecondary: 'Check Mandi Prices',
    trusted: 'Trusted by 50,000+ Farmers',
    feature1: '100% Free to Use',
    feature2: 'Very Easy to Use',
    feature3: 'Available in Hindi & Marathi'
  },
  common: {
    sampleData: 'Sample Data',
    loading: 'Loading…',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    add: 'Add',
    delete: 'Delete',
    view: 'View',
    search: 'Search',
    filter: 'Filter',
    submit: 'Submit',
  },
  dashboard: {
    title: 'Dashboard',
    goodMorning: 'Good Morning, Farmer! 👋',
    greetingSubtitle: 'Here is your farm summary for today.',
    farmOverview: 'Farm Overview',
    todayAdvisory: "Today's Advice",
    marketSnapshot: 'Mandi Price',
    currentCrop: 'Current Crop',
    upcomingTasks: 'Farm Work (Tasks)',
    alerts: 'Alerts',
    noAdvice: 'No new advice at this time.',
    noTasks: 'No tasks added yet.',
    cropPromptTitle: 'Welcome to KrishiSetu! 🌱',
    cropPromptDesc: 'To give you the best advice, what crop are you currently growing?',
    cropPlaceholder: 'e.g. Wheat, Cotton, Soyabean...',
  },
  cropPlanning: {
    title: 'Next Crop Recommendation',
    subtitle: 'Get personalised crop recommendations based on your land, soil, and budget.',
    location: 'Location / Village',
    landArea: 'Land Area (acres)',
    soilType: 'Soil Type',
    soilPH: 'Soil pH',
    water: 'Water Availability',
    irrigation: 'Irrigation Type',
    prevCrop: 'Previous Crop',
    season: 'Season',
    budget: 'Budget (₹)',
    experience: 'Farming Experience (years)',
    generatePlan: 'Generate Crop Plan',
    recommended: 'Recommended Crops',
    suitability: 'Suitability',
    yield: 'Expected Yield',
    investment: 'Investment',
    revenue: 'Revenue',
    profit: 'Profit',
    waterReq: 'Water Requirement',
    duration: 'Duration',
    marketPrice: 'Market Price',
    demand: 'Market Demand',
    risk: 'Risk Level',
    compareCrops: 'Compare Crops',
    nitrogen: 'Soil Nitrogen (N)',
    phosphorus: 'Soil Phosphorus (P)',
    potassium: 'Soil Potassium (K)',
    temperature: 'Temperature (°C)',
    humidity: 'Humidity (%)',
    ph: 'Soil pH',
    rainfall: 'Rainfall (mm)',
    analyzing: 'Analyzing...',
    noRecommendations: 'No crop recommendations available.',
  },
  market: {
    title: 'Market Prices',
    currentPrice: 'Current Price',
    priceChange: 'Price Change',
    demand: 'Demand',
    supply: 'Supply',
    forecast: 'Price Forecast',
    nearbyMarkets: 'Nearby APMC Markets',
  },
  advisory: {
    title: 'Farm Advisory',
    subtitle: 'Latest updates, news, and simple advice to keep your crops healthy.',
    cropAdvisory: 'Crop Advisory',
    weatherAdvisory: 'Weather Advisory',
    irrigationAdvisory: 'Irrigation Advisory',
    pestDisease: 'Pest & Disease Alert',
    uploadImage: 'Upload Crop Image',
    waterTitle: 'When to give water',
    pestTitle: 'Insect Alerts',
    newsTitle: 'Live Farming News',
    loadingWeather: 'Loading live weather data to generate advice...',
    loadingNews: 'Loading latest agricultural news from the internet...',
    newsError: 'Could not load news at this time. Please try again later.',
    published: 'Published',
    askDoctor: 'Ask the Doctor (AI)',
    askDoctorDesc: 'Is your plant sick? Upload a photo and we will tell you the disease and medicine.',
    tapToSelect: 'Tap here to select a photo',
    takePicture: 'Take a picture or choose from gallery',
    analyzingImage: 'Analyzing Image...',
    findDisease: 'Find Disease & Medicine',
    confidence: 'Confidence',
    treatment: 'Treatment Advice:',
    scanAnother: 'Scan another plant',
  },
  weather: {
    title: 'Weather Forecast',
    temperature: 'Temperature',
    humidity: 'Humidity',
    rainProbability: 'Rain Probability',
    windSpeed: 'Wind Speed',
    sevenDayForecast: '7-Day Forecast',
  },
  operations: {
    title: 'Farm Operations',
    tasks: 'Tasks',
    addTask: 'Add Task',
    editTask: 'Edit Task',
    markComplete: 'Mark Complete',
    setReminder: 'Set Reminder',
  },
  expenses: {
    title: 'Expense Tracker',
    seeds: 'Seeds',
    fertilizers: 'Fertilizers',
    pesticides: 'Pesticides',
    labour: 'Labour',
    machinery: 'Machinery',
    transportation: 'Transportation',
    totalInvestment: 'Total Investment',
    expectedRevenue: 'Expected Revenue',
    expectedProfit: 'Expected Profit',
    actualProfit: 'Actual Profit',
  },
  auth: {
    loginTitle: 'Welcome to KrishiSetu',
    loginSubtitle: 'Login to access your farm dashboard and personalized advice.',
    registerTitle: 'Create an Account',
    registerSubtitle: 'Join KrishiSetu for smart farming advice.',
    phone: 'Phone Number',
    email: 'Email',
    enterPhone: 'Enter Phone Number',
    enterEmail: 'Enter Email Address',
    password: 'Password',
    enterPassword: 'Enter Password',
    imNotRobot: "I'm not a robot (Captcha)",
    loginBtn: 'Login',
    registerBtn: 'Register',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
  },
  schemes: {
    title: 'Government Schemes',
    subtitle: 'Find and apply for agricultural schemes, subsidies, and insurance.',
    viewGuide: 'View Guide',
    eligibility: 'Eligibility Check',
    documents: 'Required Documents',
    helpForm: 'Help me fill this form',
    fillingForm: 'Filling Form',
  },
};

const hi: TranslationSchema = {
  nav: {
    home: 'होम',
    cropPlanning: 'अगली फसल की सिफारिश',
    market: 'बाज़ार',
    advisory: 'सलाह',
    operations: 'खेती कार्य',
    weather: 'मौसम',
    resources: 'संसाधन',
    about: 'परिचय',
  },
  hero: {
    headline: 'स्मार्ट खेती। ज्यादा पैदावार। बेहतर कमाई।',
    subheading:
      'कृषिसिधु एक आसान ऐप है जो आपको अपनी फसल की योजना बनाने, दैनिक मंडी के भाव जांचने, मौसम की जानकारी प्राप्त करने और अपने खेत के सभी कार्यों को एक ही स्थान पर प्रबंधित करने में मदद करता है।',
    ctaPrimary: 'फसल योजना शुरू करें',
    ctaSecondary: 'मंडी के भाव देखें',
    trusted: '50,000+ किसानों द्वारा भरोसेमंद',
    feature1: '100% उपयोग में मुफ्त',
    feature2: 'उपयोग करने में बहुत आसान',
    feature3: 'हिंदी और मराठी में उपलब्ध'
  },
  common: {
    sampleData: 'नमूना डेटा',
    loading: 'लोड हो रहा है…',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    add: 'जोड़ें',
    delete: 'हटाएँ',
    view: 'देखें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    submit: 'जमा करें',
  },
  dashboard: {
    title: 'डैशबोर्ड',
    goodMorning: 'सुप्रभात, किसान! 👋',
    greetingSubtitle: 'यहाँ आपका आज का खेत सारांश है।',
    farmOverview: 'खेत का सारांश',
    todayAdvisory: 'आज की सलाह',
    marketSnapshot: 'मंडी के भाव',
    currentCrop: 'वर्तमान फसल',
    upcomingTasks: 'खेत के काम (टास्क)',
    alerts: 'अलर्ट',
    noAdvice: 'इस समय कोई नई सलाह नहीं है।',
    noTasks: 'अभी तक कोई काम नहीं जोड़ा गया है।',
    cropPromptTitle: 'कृषिसिधु में आपका स्वागत है! 🌱',
    cropPromptDesc: 'आपको बेहतरीन सलाह देने के लिए, अभी आप कौन सी फसल उगा रहे हैं?',
    cropPlaceholder: 'उदाहरण: गेहूं, कपास, सोयाबीन...',
  },
  cropPlanning: {
    title: 'अगली फसल की सिफारिश',
    subtitle: 'अपनी ज़मीन, मिट्टी और बजट के आधार पर व्यक्तिगत फसल सुझाव पाएँ।',
    location: 'स्थान / गाँव',
    landArea: 'भूमि क्षेत्र (एकड़)',
    soilType: 'मिट्टी का प्रकार',
    soilPH: 'मिट्टी का pH',
    water: 'जल उपलब्धता',
    irrigation: 'सिंचाई प्रकार',
    prevCrop: 'पिछली फसल',
    season: 'सीज़न',
    budget: 'बजट (₹)',
    experience: 'खेती अनुभव (वर्ष)',
    generatePlan: 'फसल योजना बनाएँ',
    recommended: 'अनुशंसित फसलें',
    suitability: 'उपयुक्तता',
    yield: 'अपेक्षित उपज',
    investment: 'निवेश',
    revenue: 'आमदनी',
    profit: 'लाभ',
    waterReq: 'जल आवश्यकता',
    duration: 'अवधि',
    marketPrice: 'बाज़ार भाव',
    demand: 'बाज़ार माँग',
    risk: 'जोखिम स्तर',
    compareCrops: 'फसलें तुलना करें',
    nitrogen: 'मिट्टी में नाइट्रोजन (N)',
    phosphorus: 'मिट्टी में फास्फोरस (P)',
    potassium: 'मिट्टी में पोटैशियम (K)',
    temperature: 'तापमान (°C)',
    humidity: 'आर्द्रता (नमी %)',
    ph: 'मिट्टी का pH',
    rainfall: 'बारिश (मिमी)',
    analyzing: 'विश्लेषण हो रहा है...',
    noRecommendations: 'कोई फसल सिफारिश उपलब्ध नहीं है।',
  },
  market: {
    title: 'बाज़ार भाव',
    currentPrice: 'वर्तमान भाव',
    priceChange: 'भाव परिवर्तन',
    demand: 'माँग',
    supply: 'आपूर्ति',
    forecast: 'भाव पूर्वानुमान',
    nearbyMarkets: 'नज़दीकी APMC मंडी',
  },
  advisory: {
    title: 'कृषि सलाह',
    subtitle: 'अपनी फसलों को स्वस्थ रखने के लिए नवीनतम अपडेट, समाचार और सरल सलाह।',
    cropAdvisory: 'फसल सलाह',
    weatherAdvisory: 'मौसम सलाह',
    irrigationAdvisory: 'सिंचाई सलाह',
    pestDisease: 'कीट व रोग चेतावनी',
    uploadImage: 'फसल की छवि अपलोड करें',
    waterTitle: 'पानी कब दें',
    pestTitle: 'कीट अलर्ट',
    newsTitle: 'कृषि समाचार (लाइव)',
    loadingWeather: 'सलाह के लिए मौसम का डेटा लोड हो रहा है...',
    loadingNews: 'इंटरनेट से नवीनतम कृषि समाचार लोड हो रहे हैं...',
    newsError: 'इस समय समाचार लोड नहीं हो सके। कृपया बाद में पुनः प्रयास करें।',
    published: 'प्रकाशित',
    askDoctor: 'डॉक्टर से पूछें (AI)',
    askDoctorDesc: 'क्या आपका पौधा बीमार है? फोटो अपलोड करें और हम बीमारी और दवा बताएंगे।',
    tapToSelect: 'फोटो चुनने के लिए यहाँ टैप करें',
    takePicture: 'तस्वीर लें या गैलरी से चुनें',
    analyzingImage: 'छवि का विश्लेषण हो रहा है...',
    findDisease: 'बीमारी और दवा खोजें',
    confidence: 'विश्वसनीयता',
    treatment: 'उपचार की सलाह:',
    scanAnother: 'दूसरा पौधा स्कैन करें',
  },
  weather: {
    title: 'मौसम पूर्वानुमान',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    rainProbability: 'बारिश की संभावना',
    windSpeed: 'हवा की गति',
    sevenDayForecast: '7 दिन का पूर्वानुमान',
  },
  operations: {
    title: 'खेती कार्य',
    tasks: 'कार्य',
    addTask: 'कार्य जोड़ें',
    editTask: 'कार्य संपादित करें',
    markComplete: 'पूर्ण चिह्नित करें',
    setReminder: 'रिमाइंडर सेट करें',
  },
  expenses: {
    title: 'खर्च ट्रैकर',
    seeds: 'बीज',
    fertilizers: 'उर्वरक',
    pesticides: 'कीटनाशक',
    labour: 'मज़दूरी',
    machinery: 'मशीनरी',
    transportation: 'परिवहन',
    totalInvestment: 'कुल निवेश',
    expectedRevenue: 'अपेक्षित आमदनी',
    expectedProfit: 'अपेक्षित लाभ',
    actualProfit: 'वास्तविक लाभ',
  },
  auth: {
    loginTitle: 'कृषिसिधु में आपका स्वागत है',
    loginSubtitle: 'अपने डैशबोर्ड और सलाह तक पहुंचने के लिए लॉगिन करें।',
    registerTitle: 'खाता बनाएं',
    registerSubtitle: 'स्मार्ट खेती की सलाह के लिए कृषिसिधु से जुड़ें।',
    phone: 'फ़ोन नंबर',
    email: 'ईमेल',
    enterPhone: 'फ़ोन नंबर दर्ज करें',
    enterEmail: 'ईमेल पता दर्ज करें',
    password: 'पासवर्ड',
    enterPassword: 'पासवर्ड दर्ज करें',
    imNotRobot: 'मैं रोबोट नहीं हूँ (कैप्चा)',
    loginBtn: 'लॉगिन करें',
    registerBtn: 'रजिस्टर करें',
    noAccount: 'क्या आपके पास खाता नहीं है?',
    hasAccount: 'क्या आपके पास पहले से खाता है?',
  },
  schemes: {
    title: 'सरकारी योजनाएं',
    subtitle: 'कृषि योजनाओं, सब्सिडी और बीमा के लिए खोजें और आवेदन करें।',
    viewGuide: 'गाइड देखें',
    eligibility: 'पात्रता जांच',
    documents: 'आवश्यक दस्तावेज',
    helpForm: 'यह फॉर्म भरने में मेरी मदद करें',
    fillingForm: 'फॉर्म भर रहे हैं',
  },
};

const mr: TranslationSchema = {
  nav: {
    home: 'मुख्यपृष्ठ',
    cropPlanning: 'पुढील पिकाची शिफारस',
    market: 'बाजार',
    advisory: 'सल्ला',
    operations: 'शेती कामे',
    weather: 'हवामान',
    resources: 'साधने',
    about: 'आमच्याबद्दल',
  },
  hero: {
    headline: 'स्मार्ट शेती. जास्त उत्पन्न. चांगली कमाई.',
    subheading:
      'कृषिसिधु एक सोपे अॅप आहे जे तुम्हाला तुमच्या पिकांचे नियोजन करण्यास, दररोजचे बाजारभाव तपासण्यास, हवामानाचे अपडेट मिळवण्यास आणि तुमची सर्व शेती कामे एकाच ठिकाणी व्यवस्थापित करण्यास मदत करते.',
    ctaPrimary: 'पीक योजना सुरू करा',
    ctaSecondary: 'बाजारभाव तपासा',
    trusted: '५०,०००+ शेतकऱ्यांचा विश्वास',
    feature1: 'वापरण्यासाठी १००% मोफत',
    feature2: 'वापरण्यास अतिशय सोपे',
    feature3: 'मराठी आणि हिंदीत उपलब्ध'
  },
  common: {
    sampleData: 'नमुना डेटा',
    loading: 'लोड होत आहे…',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    edit: 'संपादित करा',
    add: 'जोडा',
    delete: 'हटवा',
    view: 'पहा',
    search: 'शोधा',
    filter: 'फिल्टर',
    submit: 'सबमिट करा',
  },
  dashboard: {
    title: 'डॅशबोर्ड',
    goodMorning: 'शुभ प्रभात, शेतकरी! 👋',
    greetingSubtitle: 'येथे तुमचा आजचा शेतीचा सारांश आहे.',
    farmOverview: 'शेताचा आढावा',
    todayAdvisory: 'आजचा सल्ला',
    marketSnapshot: 'बाजारभाव',
    currentCrop: 'सध्याचे पीक',
    upcomingTasks: 'शेतीची कामे',
    alerts: 'सूचना',
    noAdvice: 'यावेळी कोणताही नवीन सल्ला नाही.',
    noTasks: 'अद्याप कोणतेही काम जोडलेले नाही.',
    cropPromptTitle: 'कृषिसिधु मध्ये आपले स्वागत आहे! 🌱',
    cropPromptDesc: 'तुम्हाला सर्वोत्तम सल्ला देण्यासाठी, सध्या तुम्ही कोणते पीक घेत आहात?',
    cropPlaceholder: 'उदा. गहू, कापूस, सोयाबीन...',
  },
  cropPlanning: {
    title: 'पुढील पिकाची शिफारस',
    subtitle: 'तुमच्या जमीन, माती आणि बजेटनुसार वैयक्तिक पीक शिफारशी मिळवा.',
    location: 'स्थान / गाव',
    landArea: 'जमीन क्षेत्र (एकर)',
    soilType: 'मातीचा प्रकार',
    soilPH: 'मातीचे pH',
    water: 'पाण्याची उपलब्धता',
    irrigation: 'सिंचन प्रकार',
    prevCrop: 'मागील पीक',
    season: 'हंगाम',
    budget: 'बजेट (₹)',
    experience: 'शेती अनुभव (वर्षे)',
    generatePlan: 'पीक योजना तयार करा',
    recommended: 'शिफारस केलेली पिके',
    suitability: 'योग्यता',
    yield: 'अपेक्षित उत्पन्न',
    investment: 'गुंतवणूक',
    revenue: 'महसूल',
    profit: 'नफा',
    waterReq: 'पाण्याची गरज',
    duration: 'कालावधी',
    marketPrice: 'बाजारभाव',
    demand: 'बाजार मागणी',
    risk: 'जोखीम पातळी',
    compareCrops: 'पिके तुलना करा',
    nitrogen: 'मातीतील नत्र (N)',
    phosphorus: 'मातीतील स्फुरद (P)',
    potassium: 'मातीतील पालाश (K)',
    temperature: 'तापमान (°C)',
    humidity: 'आर्द्रता (हवेतील ओलावा %)',
    ph: 'मातीचा सामू (pH)',
    rainfall: 'पाऊस (मिमी)',
    analyzing: 'विश्लेषण करत आहे...',
    noRecommendations: 'कोणत्याही पिकाची शिफारस उपलब्ध नाही.',
  },
  market: {
    title: 'बाजारभाव',
    currentPrice: 'सध्याचा भाव',
    priceChange: 'भाव बदल',
    demand: 'मागणी',
    supply: 'पुरवठा',
    forecast: 'भाव अंदाज',
    nearbyMarkets: 'जवळील APMC बाजार',
  },
  advisory: {
    title: 'कृषी सल्ला',
    subtitle: 'तुमची पिके निरोगी ठेवण्यासाठी नवीनतम अपडेट्स, बातम्या आणि सोपा सल्ला.',
    cropAdvisory: 'पीक सल्ला',
    weatherAdvisory: 'हवामान सल्ला',
    irrigationAdvisory: 'सिंचन सल्ला',
    pestDisease: 'कीड व रोग इशारा',
    uploadImage: 'पिकाची प्रतिमा अपलोड करा',
    waterTitle: 'पाणी कधी द्यावे',
    pestTitle: 'कीटक अलर्ट',
    newsTitle: 'शेती बातम्या (लाईव्ह)',
    loadingWeather: 'सल्ला तयार करण्यासाठी हवामानाचा डेटा लोड करत आहे...',
    loadingNews: 'इंटरनेटवरून नवीनतम शेतीच्या बातम्या लोड करत आहे...',
    newsError: 'सध्या बातम्या लोड करू शकलो नाही. कृपया नंतर पुन्हा प्रयत्न करा.',
    published: 'प्रकाशित',
    askDoctor: 'डॉक्टरांना विचारा (AI)',
    askDoctorDesc: 'तुमचे पीक आजारी आहे का? फोटो अपलोड करा आणि आम्ही रोग आणि औषध सांगू.',
    tapToSelect: 'फोटो निवडण्यासाठी येथे टॅप करा',
    takePicture: 'फोटो काढा किंवा गॅलरीमधून निवडा',
    analyzingImage: 'प्रतिमेचे विश्लेषण करत आहे...',
    findDisease: 'रोग आणि औषध शोधा',
    confidence: 'आत्मविश्वास',
    treatment: 'उपचाराचा सल्ला:',
    scanAnother: 'दुसरे पीक स्कॅन करा',
  },
  weather: {
    title: 'हवामान अंदाज',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    rainProbability: 'पावसाची शक्यता',
    windSpeed: 'वाऱ्याचा वेग',
    sevenDayForecast: '७ दिवसांचा अंदाज',
  },
  operations: {
    title: 'शेती कामे',
    tasks: 'कामे',
    addTask: 'काम जोडा',
    editTask: 'काम संपादित करा',
    markComplete: 'पूर्ण म्हणून चिन्हांकित करा',
    setReminder: 'रिमाइंडर सेट करा',
  },
  expenses: {
    title: 'खर्च ट्रॅकर',
    seeds: 'बियाणे',
    fertilizers: 'खते',
    pesticides: 'कीटकनाशके',
    labour: 'मजुरी',
    machinery: 'यंत्रसामग्री',
    transportation: 'वाहतूक',
    totalInvestment: 'एकूण गुंतवणूक',
    expectedRevenue: 'अपेक्षित महसूल',
    expectedProfit: 'अपेक्षित नफा',
    actualProfit: 'वास्तविक नफा',
  },
  auth: {
    loginTitle: 'कृषिसिधु मध्ये आपले स्वागत आहे',
    loginSubtitle: 'तुमचा डॅशबोर्ड आणि वैयक्तिक सल्ला पाहण्यासाठी लॉग इन करा.',
    registerTitle: 'खाते तयार करा',
    registerSubtitle: 'स्मार्ट शेतीच्या सल्ल्यासाठी कृषिसिधु मध्ये सामील व्हा.',
    phone: 'फोन नंबर',
    email: 'ईमेल',
    enterPhone: 'फोन नंबर प्रविष्ट करा',
    enterEmail: 'ईमेल पत्ता प्रविष्ट करा',
    password: 'पासवर्ड',
    enterPassword: 'पासवर्ड प्रविष्ट करा',
    imNotRobot: 'मी रोबोट नाही (कॅप्चा)',
    loginBtn: 'लॉग इन करा',
    registerBtn: 'नोंदणी करा',
    noAccount: 'खाते नाहीये का?',
    hasAccount: 'आधीच खाते आहे का?',
  },
  schemes: {
    title: 'सरकारी योजना',
    subtitle: 'कृषी योजना, सबसिडी आणि विम्यासाठी शोधा आणि अर्ज करा.',
    viewGuide: 'मार्गदर्शक पहा',
    eligibility: 'पात्रता तपासा',
    documents: 'आवश्यक कागदपत्रे',
    helpForm: 'हा फॉर्म भरण्यासाठी मला मदत करा',
    fillingForm: 'फॉर्म भरत आहे',
  },
};

export const translations: Record<Language, TranslationSchema> = { en, hi, mr };

/**
 * Resolve a dot-separated key like 'nav.home' against a TranslationSchema.
 * Returns the key itself if not found (graceful fallback).
 */
export function resolveTranslation(lang: Language, key: string): string {
  const parts = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = translations[lang];
  for (const part of parts) {
    if (node == null || typeof node !== 'object') return key;
    node = node[part];
  }
  if (typeof node === 'string') return node;
  // Fallback to English
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let enNode: any = translations['en'];
  for (const part of parts) {
    if (enNode == null || typeof enNode !== 'object') return key;
    enNode = enNode[part];
  }
  return typeof enNode === 'string' ? enNode : key;
}

export default translations;
