import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { AvailabilitySummaryProps } from "../types";
import {
	calculateAvailability,
	convertScheduleToTimezone,
} from "../utils/timeUtils";
import { Card } from "./ui/Card";
import { SubCard } from "./ui/SubCard";

export const AvailabilitySummary = ({
	className = "",
}: Omit<
	AvailabilitySummaryProps,
	"userSchedule" | "userTimezone" | "managerTimezone"
>) => {
	const { userSchedule, userTimezone, managerTimezone } = useSelector(
		(state: RootState) => state.workSchedule,
	);
	const { t } = useTranslation();

	const availability = useMemo(() => {
		return calculateAvailability(
			userSchedule,
			userTimezone,
			managerTimezone || undefined,
			{
				available: t("availability.available"),
				unavailable: t("availability.unavailable"),
			},
		);
	}, [userSchedule, userTimezone, managerTimezone, t]);

	const convertedSchedule = useMemo(() => {
		if (!managerTimezone) return null;
		return convertScheduleToTimezone(
			userSchedule,
			userTimezone,
			managerTimezone,
		);
	}, [userSchedule, userTimezone, managerTimezone]);

	const formatScheduleTime = (time: string) => {
		const [hours, minutes] = time.split(":");
		const date = new Date();
		date.setHours(parseInt(hours), parseInt(minutes));
		return date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	};

	if (!managerTimezone) {
		return (
			<SubCard theme="yellow" padding="lg" bordered className={className}>
				<h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
					{t("availability.title")}
				</h3>
				<p className="text-yellow-700 dark:text-yellow-300">
					{t("availability.selectLocationPrompt")}
				</p>
			</SubCard>
		);
	}

	return (
		<Card
			className={className}
			label={t("availability.title")}
			rightContent={
				<div
					className={`p-2 rounded-md ${
						availability.isAvailable
							? "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800"
							: "bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800"
					}`}
				>
					<div className="flex items-center space-x-2">
						<div
							className={`w-3 h-3 rounded-full ${
								availability.isAvailable
									? "bg-green-500 dark:bg-green-400"
									: "bg-red-500 dark:bg-red-400"
							}`}
						/>
						<span
							className={`font-medium text-sm ${
								availability.isAvailable
									? "text-green-800 dark:text-green-200"
									: "text-red-800 dark:text-red-200"
							}`}
						>
							{availability.message}
						</span>
					</div>

					{!availability.isAvailable && availability.nextAvailable && (
						<p className="text-xs text-red-700 dark:text-red-300 mt-1">
							{t("availability.nextAvailable", {
								time: availability.nextAvailable,
							})}
						</p>
					)}
				</div>
			}
		>
			<div className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<SubCard theme="blue">
						<h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
							{t("availability.yourTime")}
						</h4>
						<p className="text-lg font-mono font-bold text-blue-900 dark:text-blue-100">
							{availability.currentLocalTime}
						</p>
						<p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
							{t("availability.workHours", {
								startTime: formatScheduleTime(userSchedule.startTime),
								endTime: formatScheduleTime(userSchedule.endTime),
							})}
						</p>
					</SubCard>

					<SubCard theme="purple">
						<h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
							{t("availability.managerTime")}
						</h4>
						<p className="text-lg font-mono font-bold text-purple-900 dark:text-purple-100">
							{availability.currentManagerTime}
						</p>
						{convertedSchedule && (
							<p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
								{t("availability.yourHoursThere", {
									startTime: formatScheduleTime(convertedSchedule.startTime),
									endTime: formatScheduleTime(convertedSchedule.endTime),
								})}
							</p>
						)}
					</SubCard>
				</div>

				<SubCard theme="gray">
					<h4 className="font-medium text-gray-800 dark:text-white mb-2">
						💬 {t("availability.quickCommunication.title")}
					</h4>
					<p className="text-sm text-gray-700 dark:text-gray-300">
						{t("availability.quickCommunication.messagePrefix")}:{" "}
						<span className="font-mono font-medium">
							{convertedSchedule
								? `${formatScheduleTime(convertedSchedule.startTime)} - ${formatScheduleTime(convertedSchedule.endTime)}`
								: `${formatScheduleTime(userSchedule.startTime)} - ${formatScheduleTime(userSchedule.endTime)}`}
						</span>{" "}
						{t("availability.quickCommunication.messageSuffix")}
					</p>
				</SubCard>
			</div>
		</Card>
	);
};
