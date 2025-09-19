import { clsx } from "clsx";
import type { ReactNode } from "react";

export interface CardProps {
	/** The content to display inside the card */
	children: ReactNode;
	/** Additional CSS classes */
	className?: string;
	/** The label to display inside the card */
	label?: string;
	/** The content to display inside the card */
	rightContent?: ReactNode;
}

/**
 * Card - A reusable UI component for creating cards with dark mode support
 *
 * @example
 * // Basic usage
 * <Card>
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 *
 * @example
 * // With custom className
 * <Card className="mb-4">
 *   <p>Card with margin bottom</p>
 * </Card>
 */
export const Card = ({
	children,
	className = "",
	label = "",
	rightContent = null,
}: CardProps) => {
	return (
		<div
			className={clsx(
				"p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700",
				className,
			)}
		>
			<div className="flex flex-row gap-4 items-start mb-4">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-white flex-1">
					{label}
				</h3>
				{/* Current Status */}
				{rightContent}
			</div>
			{children}
		</div>
	);
};

Card.displayName = "Card";
