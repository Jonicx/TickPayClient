import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  toggleLanguage: () => void;
  setLanguagePreference: (lang: Language) => void;
}

interface Translations {
  en: {
    [key: string]: string;
  };
  sw: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.about': 'About',
    'nav.myTickets': 'My Tickets',
    
    // Home page
    'home.tagline': 'Your Premium Ticket Experience',
    'home.title': 'Discover Amazing Events in Tanzania',
    'home.subtitle': 'From live concerts to sports events, food festivals to comedy shows - find and book tickets for the best experiences across Tanzania.',
    'home.exploreEvents': 'Explore Events',
    'home.myTickets': 'My Tickets',
    'home.featuredEvents': 'Featured Events',
    'home.featuredDesc': "Don't miss out on these popular events happening soon",
    'home.viewAllEvents': 'View All Events',
    'home.trustedBy': 'Trusted by Thousands',
    
    // Event cards
    'event.viewDetails': 'View Details',
    'event.byBoda': 'by boda',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.events': 'Matukio',
    'nav.about': 'Kuhusu',
    'nav.myTickets': 'Tiketi Zangu',
    
    // Home page
    'home.tagline': 'Uzoefu Wako wa Tiketi za Ubora',
    'home.title': 'Gundua Matukio ya Ajabu Tanzania',
    'home.subtitle': 'Kutoka tamasha za muziki hadi michezo, sherehe za chakula hadi vipindi vya ucheshi - tafuta na uagize tiketi za uzoefu bora nchini Tanzania.',
    'home.exploreEvents': 'Gundua Matukio',
    'home.myTickets': 'Tiketi Zangu',
    'home.featuredEvents': 'Matukio Maarufu',
    'home.featuredDesc': 'Usisahau matukio haya maarufu yanayotokea hivi karibuni',
    'home.viewAllEvents': 'Ona Matukio Yote',
    'home.trustedBy': 'Tunaaminika na Maelfu',
    
    // Event cards
    'event.viewDetails': 'Ona Maelezo',
    'event.byBoda': 'kwa boda',
    
    // Common
    'common.loading': 'Inapakia...',
    'common.error': 'Hitilafu',
    'common.retry': 'Jaribu Tena',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage for saved language preference (only on client side)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tickpay_language');
      return (saved as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    // Save language preference (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem('tickpay_language', language);
    }
    console.log('LanguageContext: language changed to:', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'sw' : 'en';
    console.log('LanguageContext: toggleLanguage: changing from', language, 'to', newLang);
    setLanguage(newLang);
  };

  const setLanguagePreference = (lang: Language) => {
    console.log('LanguageContext: setLanguagePreference to', lang);
    setLanguage(lang);
  };

  const value = {
    language,
    t,
    toggleLanguage,
    setLanguagePreference,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}