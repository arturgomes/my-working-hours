import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const changeLanguage = async (language: string) => {
		console.log("changeLanguage", language);
		await i18n.changeLanguage(language);
		localStorage.setItem("i18nextLng", language);
	};

	return (
		<div className="flex items-center space-x-2">
			<select
				value={i18n.language}
				onChange={(e) => changeLanguage(e.target.value)}
				className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
			>
				<option value="en">English</option>
				<option value="de-DE">Deutsch</option>
				<option value="pt-BR">Português</option>
				<option value="es">Español</option>
				<option value="fr">Français</option>
				<option value="it">Italiano</option>
			</select>
		</div>
	);
};

LanguageSwitcher.displayName = "LanguageSwitcher";
