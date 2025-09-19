import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: "en",
		fallbackLng: "en",
		debug: false,

		interpolation: {
			escapeValue: false,
		},

		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},

		detection: {
			order: [
				"localStorage",
				"querystring",
				"cookie",
				"sessionStorage",
				"navigator",
				"htmlTag",
			],
			caches: ["localStorage", "cookie"],
			lookupLocalStorage: "i18nextLng",
			lookupCookie: "i18nextLng",
			lookupSessionStorage: "i18nextLng",
		},
	});

export default i18n;
