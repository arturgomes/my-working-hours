import { Combobox } from "@ark-ui/react/combobox";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMMON_TIMEZONES, TIMEZONE_CITY_MAP } from "../data/timezones";
import type { RootState } from "../store";
import { setSelectedCity } from "../store/slices/workScheduleSlice";
import type { CitySearchResult, SearchInputProps } from "../types";

export const CitySearchSimple = ({
	placeholder = "Search for a city...",
	className = "",
}: Omit<SearchInputProps, "onCitySelect">) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const selectedCity = useSelector(
		(state: RootState) => state.workSchedule.selectedCity,
	);

	// Create searchable city list
	const allCities = useMemo(() => {
		return COMMON_TIMEZONES.map((timezone) => {
			const cityData = TIMEZONE_CITY_MAP[timezone];
			return {
				timezone,
				city:
					cityData?.city || timezone.split("/").pop()?.replace(/_/g, " ") || "",
				country: cityData?.country || "",
				display_name: `${cityData?.city || timezone.split("/").pop()?.replace(/_/g, " ")}${cityData?.country ? ` (${cityData.country})` : ""}`,
			};
		});
	}, []);

	// Filter cities based on search query
	const suggestions = useMemo(() => {
		if (!searchQuery.trim()) return [];

		return allCities
			.filter(
				(city) =>
					city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
					city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
					city.timezone.toLowerCase().includes(searchQuery.toLowerCase()),
			)
			.slice(0, 10);
	}, [searchQuery, allCities]);

	// Update suggestions visibility
	useEffect(() => {
		setIsOpen(searchQuery.trim().length >= 1 && suggestions.length > 0);
	}, [searchQuery, suggestions]);

	// Memoized display value
	const displayValue = useMemo(() => {
		if (selectedCity) {
			return selectedCity.display_name;
		}
		return searchQuery;
	}, [selectedCity, searchQuery]);

	const handleCitySelect = (city: CitySearchResult) => {
		setSearchQuery(city.display_name);
		setIsOpen(false);
		dispatch(setSelectedCity(city));
	};

	const handleInputChange = (value: string) => {
		setSearchQuery(value);
		// Clear selection if user is typing something different
		if (selectedCity && value !== selectedCity.display_name) {
			dispatch(setSelectedCity(null));
		}
	};

	return (
		<div
			className={`p-6 bg-white rounded-lg shadow-sm border w-full ${className}`}
		>
			<Combobox.Root
				open={isOpen}
				onOpenChange={({ open }) => setIsOpen(open)}
				onValueChange={({ value }) => {
					const selectedCity = suggestions.find(
						(city) => city.display_name === value[0],
					);
					if (selectedCity) {
						handleCitySelect(selectedCity);
					}
				}}
			>
				<Combobox.Label className="block text-sm font-medium text-gray-700 mb-2">
					Search Manager's Location
				</Combobox.Label>

				<Combobox.Control className="relative">
					<Combobox.Input
						value={displayValue}
						onChange={(e) => handleInputChange(e.target.value)}
						placeholder={placeholder}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
					/>
					<Combobox.Trigger className="absolute right-3 top-1/2 transform -translate-y-1/2">
						<svg
							className="w-5 h-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Search</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</Combobox.Trigger>
				</Combobox.Control>

				<Combobox.Positioner>
					<Combobox.Content className="mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
						{suggestions.length === 0 && searchQuery.trim().length >= 1 && (
							<div className="px-4 py-3 text-sm text-gray-500">
								No cities found for "{searchQuery}"
							</div>
						)}

						{searchQuery.trim().length === 0 && (
							<div className="px-4 py-3 text-sm text-gray-500">
								Start typing to search cities...
							</div>
						)}

						{suggestions.map((city) => (
							<Combobox.Item
								key={city.timezone}
								item={city.display_name}
								className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
							>
								<div>
									<div className="font-medium text-gray-900">{city.city}</div>
									<div className="text-xs text-gray-500 font-mono">
										{city.timezone}
									</div>
									{city.country && (
										<div className="text-xs text-gray-400">{city.country}</div>
									)}
								</div>
							</Combobox.Item>
						))}
					</Combobox.Content>
				</Combobox.Positioner>
			</Combobox.Root>

			{selectedCity && (
				<div className="mt-2 p-2 bg-blue-50 rounded-lg">
					<p className="text-sm text-blue-800">
						<span className="font-medium">Selected:</span> {selectedCity.city}
					</p>
					<p className="text-xs text-blue-600 font-mono">
						{selectedCity.timezone}
					</p>
				</div>
			)}

			<div className="mt-1 text-xs text-gray-500">
				💡 Showing {allCities.length} major cities worldwide
			</div>
		</div>
	);
};

CitySearchSimple.displayName = "CitySearchSimple";
