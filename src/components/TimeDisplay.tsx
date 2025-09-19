import { useCurrentTime } from "../hooks/useCurrentTime";
import type { TimeDisplayProps } from "../types";
import { Card } from "./ui/Card";

export const TimeDisplay = ({
	timezone,
	label,
	className = "",
}: TimeDisplayProps) => {
	const { formatTime, formatDate, getTimezone } = useCurrentTime(timezone);

	return (
		<Card className={className} label={label}>
			<div className="space-y-1">
				<p className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">
					{formatTime()}
				</p>
				<p className="text-sm text-gray-600 dark:text-gray-300">
					{formatDate()}
				</p>
				<p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
					{getTimezone()}
				</p>
			</div>
		</Card>
	);
};
