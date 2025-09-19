export interface TimezoneData {
	timezone: string;
	datetime: string;
	utc_offset: string;
	day_of_year: number;
	week_number: number;
	dst: boolean;
	dst_offset: number;
	utc_datetime: string;
	unixtime: number;
	raw_offset: number;
}

export interface CitySearchResult {
	timezone: string;
	city: string;
	country?: string;
	display_name: string;
}

export interface WorkSchedule {
	startTime: string; // HH:MM format
	endTime: string; // HH:MM format
}

export interface AvailabilityStatus {
	isAvailable: boolean;
	message: string;
	nextAvailable?: string;
	currentLocalTime: string;
	currentManagerTime: string;
}

export interface TimeDisplayProps {
	timezone?: string;
	label: string;
	className?: string;
}

export interface SearchInputProps {
	onCitySelect: (city: CitySearchResult) => void;
	placeholder?: string;
	className?: string;
}

export interface WorkHoursInputProps {
	schedule: WorkSchedule;
	onScheduleChange: (schedule: WorkSchedule) => void;
	className?: string;
}

export interface AvailabilitySummaryProps {
	userSchedule: WorkSchedule;
	userTimezone: string;
	managerTimezone?: string;
	className?: string;
}
