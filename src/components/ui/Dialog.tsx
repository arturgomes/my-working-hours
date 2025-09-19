import { Dialog as ArkDialog } from "@ark-ui/react";
import type { ReactNode } from "react";

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	footer?: ReactNode;
}

export const Dialog = ({ isOpen, onClose, title, children, footer }: DialogProps) => {
	return (
		<ArkDialog.Root open={isOpen} onOpenChange={({ open }) => !open && onClose()}>
			<ArkDialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
			<ArkDialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<ArkDialog.Content className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
					<ArkDialog.Title className="text-xl font-semibold text-gray-900 dark:text-white p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
						{title}
					</ArkDialog.Title>
					<ArkDialog.Description className="text-gray-600 dark:text-gray-300 p-6 overflow-y-auto">
						{children}
					</ArkDialog.Description>
					{footer && (
						<div className="flex justify-end p-6 pt-4 border-t border-gray-200 dark:border-gray-700">
							{footer}
						</div>
					)}
				</ArkDialog.Content>
			</ArkDialog.Positioner>
		</ArkDialog.Root>
	);
};