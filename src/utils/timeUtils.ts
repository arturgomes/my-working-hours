import type { AvailabilityStatus, WorkSchedule } from "../types";

export const parseTimeString = (
	timeString: string,
): { hours: number; minutes: number } => {
	const [hoursStr, minutesStr] = timeString.split(":");
	return {
		hours: parseInt(hoursStr, 10),
		minutes: parseInt(minutesStr, 10),
	};
};

export const formatTimeString = (hours: number, minutes: number): string => {
	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

export const isTimeWithinSchedule = (
	currentTime: Date,
	schedule: WorkSchedule,
	timezone?: string,
): boolean => {
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: timezone,
	};

	const currentTimeString = currentTime.toLocaleTimeString(
		"en-US",
		timeOptions,
	);
	const [currentHours, currentMinutes] = currentTimeString
		.split(":")
		.map(Number);

	const startTime = parseTimeString(schedule.startTime);
	const endTime = parseTimeString(schedule.endTime);

	const currentMinutesOfDay = currentHours * 60 + currentMinutes;
	const startMinutesOfDay = startTime.hours * 60 + startTime.minutes;
	const endMinutesOfDay = endTime.hours * 60 + endTime.minutes;

	// Handle overnight schedules (e.g., 22:00 - 06:00)
	if (startMinutesOfDay > endMinutesOfDay) {
		return (
			currentMinutesOfDay >= startMinutesOfDay ||
			currentMinutesOfDay <= endMinutesOfDay
		);
	}

	return (
		currentMinutesOfDay >= startMinutesOfDay &&
		currentMinutesOfDay <= endMinutesOfDay
	);
};

export const getNextAvailableTime = (
	currentTime: Date,
	schedule: WorkSchedule,
	_timezonee?: string,
): Date => {
	const tomorrow = new Date(currentTime);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const startTime = parseTimeString(schedule.startTime);
	const nextAvailable = new Date(tomorrow);
	nextAvailable.setHours(startTime.hours, startTime.minutes, 0, 0);

	return nextAvailable;
};

export const calculateAvailability = (
	userSchedule: WorkSchedule,
	userTimezone: string,
	managerTimezone?: string,
	translations?: { available: string; unavailable: string },
): AvailabilityStatus => {
	const now = new Date();
	const isAvailable = isTimeWithinSchedule(now, userSchedule, userTimezone);

	const userTimeString = now.toLocaleString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		timeZone: userTimezone,
	});

	const managerTimeString = managerTimezone
		? now.toLocaleString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
				timeZone: managerTimezone,
			})
		: userTimeString;

	// Use provided translations or fallback to English defaults
	const defaultTranslations = { available: "Available", unavailable: "Unavailable" };
	const t = translations || defaultTranslations;

	let message: string;
	let nextAvailable: string | undefined;

	if (isAvailable) {
		message = t.available;
	} else {
		message = t.unavailable;
		const nextAvailableDate = getNextAvailableTime(
			now,
			userSchedule,
			userTimezone,
		);
		nextAvailable = nextAvailableDate.toLocaleString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
			timeZone: userTimezone,
		});
	}

	return {
		isAvailable,
		message,
		nextAvailable,
		currentLocalTime: userTimeString,
		currentManagerTime: managerTimeString,
	};
};

export const convertScheduleToTimezone = (
	schedule: WorkSchedule,
	_fromTimezone: string,
	toTimezone: string,
): WorkSchedule => {
	const today = new Date();

	// Create dates for start and end times in the original timezone
	const startTime = parseTimeString(schedule.startTime);
	const endTime = parseTimeString(schedule.endTime);

	const startDate = new Date(today);
	startDate.setHours(startTime.hours, startTime.minutes, 0, 0);

	const endDate = new Date(today);
	endDate.setHours(endTime.hours, endTime.minutes, 0, 0);

	// Convert to target timezone
	const convertedStartTime = startDate.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: toTimezone,
	});

	const convertedEndTime = endDate.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: toTimezone,
	});

	return {
		startTime: convertedStartTime,
		endTime: convertedEndTime,
	};
};
