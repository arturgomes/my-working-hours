import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
	const { t } = useTranslation();
	return (
		<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						{t("header.title")}
					</h1>
					<p className="text-gray-600 dark:text-gray-300 mt-1">
						{t("header.subtitle")}
					</p>
				</div>
				<div className="flex items-center space-x-4">
					<LanguageSwitcher />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
