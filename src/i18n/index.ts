import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

interface LanguageOption {
	code: string;
	label: string;
}
export const SUPPORTED_LANGUAGES: LanguageOption[] = [
	{ code: "en", label: "English" },
	{ code: "de", label: "Deutsch" },
	{ code: "pt", label: "Português" },
	{ code: "es", label: "Español" },
	{ code: "fr", label: "Français" },
	{ code: "it", label: "Italiano" },
];

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
		// Update supported languages to include all options
		supportedLngs: SUPPORTED_LANGUAGES.map((lang) => lang.code),
		// This setting is crucial - it tells i18n to use just the language code without region
		load: "languageOnly",
		returnEmptyString: false,
	});

export default i18n;
