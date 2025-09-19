import { useCallback, useState } from "react";
import type { CitySearchResult, TimezoneData } from "../types";

const WORLD_TIME_API_BASE = "https://worldtimeapi.org/api";

export const useTimezoneAPI = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchTimezones = useCallback(async (): Promise<string[]> => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`${WORLD_TIME_API_BASE}/timezone`);
			if (!response.ok) {
				throw new Error("Failed to fetch timezones");
			}
			const timezones = await response.json();
			return timezones;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Unknown error occurred";
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchTimezoneData = useCallback(
		async (timezone: string): Promise<TimezoneData> => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`${WORLD_TIME_API_BASE}/timezone/${timezone}`,
				);
				if (!response.ok) {
					throw new Error(`Failed to fetch timezone data for ${timezone}`);
				}
				const data = await response.json();
				return data;
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Unknown error occurred";
				setError(errorMessage);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	const searchCities = useCallback(
		async (query: string): Promise<CitySearchResult[]> => {
			if (!query.trim()) return [];

			try {
				const timezones = await fetchTimezones();
				const filtered = timezones
					.filter(
						(tz) =>
							tz.toLowerCase().includes(query.toLowerCase()) ||
							tz
								.split("/")
								.some((part) =>
									part.toLowerCase().includes(query.toLowerCase()),
								),
					)
					.slice(0, 10) // Limit results
					.map((timezone) => {
						const parts = timezone.split("/");
						const city = parts[parts.length - 1].replace(/_/g, " ");
						const region = parts.length > 1 ? parts[0] : "";

						return {
							timezone,
							city,
							country: region,
							display_name: `${city}${region ? ` (${region})` : ""}`,
						};
					});

				return filtered;
			} catch (_errr) {
				setError("Failed to search cities");
				return [];
			}
		},
		[fetchTimezones],
	);

	return {
		loading,
		error,
		fetchTimezones,
		fetchTimezoneData,
		searchCities,
	};
};
