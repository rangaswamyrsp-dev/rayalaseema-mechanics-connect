export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      leadership: 'Leadership',
      membership: 'Membership',
      welfare: 'Welfare',
      directory: 'Find a Mechanic',
      events: 'Events',
      training: 'Training',
      offers: 'Offers',
      faq: 'FAQ',
      contact: 'Contact',
      login: 'Login',
      register: 'Register',
    },
    home: {
      tagline: 'United Mechanics • Stronger Welfare • Better Future',
      heroTitle: 'Roadside 2-Wheeler Mechanics Society',
      heroDescription: 'Empowering mechanics through unity, welfare, and professional growth across Rayalaseema.',
      joinUs: 'Join Us',
      welfareOverview: 'Welfare Overview',
      membershipBenefits: 'Membership Benefits',
      noticesEvents: 'Notices & Events',
      findMechanic: 'Find a Mechanic',
      directorySearch: 'Search for professional mechanics near you',
    },
    common: {
      loading: 'Loading...',
      noData: 'Listings appear once approved by the association.',
      backToHome: 'Back to Home',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    }
  },
  te: {
    nav: {
      home: 'హోమ్',
      about: 'గురించి',
      leadership: 'నాయకత్వం',
      membership: 'సభ్యత్వం',
      welfare: 'సంక్షేమం',
      directory: 'మెకానిక్‌ని కనుగొనండి',
      events: 'ఈవెంట్స్',
      training: 'శిక్షణ',
      offers: 'ఆఫర్లు',
      faq: 'ప్రశ్నలు',
      contact: 'సంప్రదించండి',
      login: 'లాగిన్',
      register: 'రిజిస్టర్',
    },
    home: {
      tagline: 'ఐక్య మెకానిక్స్‌ • బలమైన సంక్షేమం • మెరుగైన భవిష్యత్తు',
      heroTitle: 'రోడ్‌సైడ్ టూ వీలర్ మెకానిక్స్ సొసైటీ',
      heroDescription: 'రాయలసీమ అంతటా ఐక్యత, సంక్షేమం మరియు వృత్తిపరమైన అభివృద్ధి ద్వారా మెకానిక్‌లను బలోపేతం చేయడం.',
      joinUs: 'మాతో చేరండి',
      welfareOverview: 'సంక్షేమ అవలోకనం',
      membershipBenefits: 'సభ్యత్వ ప్రయోజనాలు',
      noticesEvents: 'నోటీసులు & ఈవెంట్స్',
      findMechanic: 'మెకానిక్‌ని కనుగొనండి',
      directorySearch: 'మీకు సమీపంలో ఉన్న ప్రొఫెషనల్ మెకానిక్‌ల కోసం వెతకండి',
    },
    common: {
      loading: 'లోడింగ్...',
      noData: 'అసోసియేషన్ ఆమోదించిన తర్వాత జాబితాలు కనిపిస్తాయి.',
      backToHome: 'తిరిగి హోమ్‌కి',
      privacy: 'గోప్యతా విధానం',
      terms: 'నిబంధనలు & షరతులు',
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations['en'];
