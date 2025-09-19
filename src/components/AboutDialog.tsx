import { Dialog as ArkDialog } from "@ark-ui/react";
import { useTranslation } from "react-i18next";
import { Dialog } from "./ui/Dialog";
import { AboutContent } from "./AboutContent";

interface AboutDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AboutDialog = ({ isOpen, onClose }: AboutDialogProps) => {
	const { t } = useTranslation();

	const footer = (
		<ArkDialog.CloseTrigger asChild>
			<button
				type="button"
				className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
				onClick={onClose}
			>
				{t("common.close")}
			</button>
		</ArkDialog.CloseTrigger>
	);

	return (
		<Dialog
			isOpen={isOpen}
			onClose={onClose}
			title={t("about.title")}
			footer={footer}
		>
			<AboutContent />
		</Dialog>
	);
};