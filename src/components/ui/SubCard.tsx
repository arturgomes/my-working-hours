import type { ReactNode } from "react";
import { clsx } from "clsx";

// Define theme variants for the subcard component
const themeVariants = {
	blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
	purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
	gray: "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600",
	yellow: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
	green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
	red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
	white: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
} as const;

export type SubCardTheme = keyof typeof themeVariants;

export interface SubCardProps {
	/** The content to display inside the subcard */
	children: ReactNode;
	/** Theme variant for background and border colors */
	theme?: SubCardTheme;
	/** Additional CSS classes */
	className?: string;
	/** Padding size variant */
	padding?: "sm" | "md" | "lg";
	/** Whether to show border */
	bordered?: boolean;
}

const paddingVariants = {
	sm: "p-2",
	md: "p-4",
	lg: "p-6",
} as const;

/**
 * SubCard - A reusable UI component for creating themed sub-sections within cards
 *
 * @example
 * // Basic usage with blue theme
 * <SubCard theme="blue">
 *   <h4>Your Time</h4>
 *   <p>Current time information</p>
 * </SubCard>
 *
 * @example
 * // With custom padding and border
 * <SubCard theme="purple" padding="sm" bordered>
 *   <span>Manager's Time</span>
 * </SubCard>
 */
export const SubCard = ({
	children,
	theme = "gray",
	className = "",
	padding = "md",
	bordered = false,
}: SubCardProps) => {
	return (
		<div
			className={clsx(
				// Base styles
				"rounded-lg transition-colors",
				// Padding variant
				paddingVariants[padding],
				// Theme variant
				themeVariants[theme],
				// Optional border
				bordered && "border",
				// Custom className
				className,
			)}
		>
			{children}
		</div>
	);
};

SubCard.displayName = "SubCard";