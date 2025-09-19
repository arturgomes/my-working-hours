import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AboutDialog } from "./AboutDialog";

export function Footer() {
	const { t } = useTranslation();
	const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);

	return (
		<>
			<footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-2">
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{t("footer.builtWith")}
						</p>
						<button
							type="button"
							onClick={() => setIsAboutDialogOpen(true)}
							className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
						>
							{t("footer.aboutApp")}
						</button>
					</div>
				</div>
			</footer>
			<AboutDialog
				isOpen={isAboutDialogOpen}
				onClose={() => setIsAboutDialogOpen(false)}
			/>
		</>
	);
}
