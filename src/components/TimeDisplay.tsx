import { useCurrentTime } from "../hooks/useCurrentTime";
import type { TimeDisplayProps } from "../types";

export const TimeDisplay = ({
	timezone,
	label,
	className = "",
}: TimeDisplayProps) => {
	const { formatTime, formatDate, getTimezone } = useCurrentTime(timezone);

	return (
		<div className={`p-6 bg-white rounded-lg shadow-sm border ${className}`}>
			<h3 className="text-lg font-semibold text-gray-800 mb-2">{label}</h3>
			<div className="space-y-1">
				<p className="text-3xl font-mono font-bold text-blue-600">
					{formatTime()}
				</p>
				<p className="text-sm text-gray-600">{formatDate()}</p>
				<p className="text-xs text-gray-500 font-mono">{getTimezone()}</p>
			</div>
		</div>
	);
};

TimeDisplay.displayName = "TimeDisplay";
