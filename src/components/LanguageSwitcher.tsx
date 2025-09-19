import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n";

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const [currentLang, setCurrentLang] = useState(i18n.language);

	// Effect to sync the component state with i18n's language
	useEffect(() => {
		setCurrentLang(i18n.language);
	}, [i18n.language]);

	// Helper function to get the selected value for the dropdown
	const getSelectValue = (): string => {
		// With the 'load: "languageOnly"' setting, i18n will use simple language codes
		return currentLang;
	};

	const changeLanguage = async (language: string) => {
		try {
			await i18n.changeLanguage(language);
			// Let the useEffect handle the state update
			// Note: Don't use localStorage directly in artifacts
		} catch (error) {
			console.error("Failed to change language:", error);
		}
	};

	return (
		<div className="flex items-center space-x-2">
			<select
				value={getSelectValue()}
				onChange={(e) => changeLanguage(e.target.value)}
				className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
			>
				{SUPPORTED_LANGUAGES.map((option) => (
					<option key={option.code} value={option.code}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
