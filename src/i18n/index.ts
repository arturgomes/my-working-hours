import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		debug: import.meta.env.DEV,
		defaultNS: "translation",
		ns: ["translation"],
		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			lookupLocalStorage: "i18nextLng",
			caches: ["localStorage"],
			excludeCacheFor: ["cimode"],
		},
		react: {
			useSuspense: true,
		},
		interpolation: {
			escapeValue: false,
		},
		supportedLngs: ["en", "es", "fr"],
		load: "languageOnly",
		returnEmptyString: false,
	});

export default i18n;
