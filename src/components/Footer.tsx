import { useTranslation } from "react-i18next";

export function Footer() {
	const { t } = useTranslation();
	return (
		<footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
			<div className="max-w-4xl mx-auto px-6 py-4">
				<p className="text-center text-sm text-gray-500 dark:text-gray-400">
					{t("footer.builtWith")}
				</p>
			</div>
		</footer>
	);
}
