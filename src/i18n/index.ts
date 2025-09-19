import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Load translation files
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Fallback language
    fallbackLng: 'en',

    // Debug mode in development
    debug: import.meta.env.DEV,

    // Namespace configuration
    defaultNS: 'translation',
    ns: ['translation'],

    // Backend configuration
    backend: {
      // Path to load resources from
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Language detection options
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag'],

      // Keys or params to lookup language from
      lookupLocalStorage: 'i18nextLng',

      // Cache user language on
      caches: ['localStorage'],

      // Optional expire and versions
      excludeCacheFor: ['cimode'], // Never cache cimode
    },

    // React-i18next options
    react: {
      // Use React's suspense feature
      useSuspense: true,
    },

    // Interpolation options
    interpolation: {
      // Not needed for React as it escapes by default
      escapeValue: false,
    },

    // Supported languages
    supportedLngs: ['en', 'es', 'fr'],

    // Load languages non-preemptively
    load: 'languageOnly',

    // When to return empty string instead of key
    returnEmptyString: false,
  });

export default i18n;