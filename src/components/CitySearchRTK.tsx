import { Combobox, createListCollection } from "@ark-ui/react/combobox";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useLazySearchCitiesQuery } from "../store/api/timezoneApi";
import { setSelectedCity } from "../store/slices/workScheduleSlice";
import type { CitySearchResult, SearchInputProps } from "../types";
import { Card } from "./ui/Card";

export const CitySearchRTK = ({
	placeholder = "Search for a city...",
	className = "",
}: Omit<SearchInputProps, "onCitySelect">) => {
	const { t } = useTranslation();
	const [searchQuery, setSearchQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const selectedCity = useSelector(
		(state: RootState) => state.workSchedule.selectedCity,
	);

	const [searchCities, { data: suggestions = [], isLoading, error }] =
		useLazySearchCitiesQuery();

	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchQuery.trim().length >= 2) {
				searchCities(searchQuery);
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [searchQuery, searchCities]);

	const displayValue = useMemo(() => {
		if (selectedCity) {
			return selectedCity.display_name;
		}
		return searchQuery;
	}, [selectedCity, searchQuery]);

	const collection = useMemo(
		() =>
			createListCollection({
				items: suggestions.map((city) => ({
					label: city.display_name,
					value: city.display_name,
					city,
				})),
			}),
		[suggestions],
	);

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

	const handleClearSelectedCity = () => {
		dispatch(setSelectedCity(null));
		setSearchQuery("");
	};

	return (
		<Card label={t("citySearch.title")} className={className}>
			<div className="flex flex-col gap-2">
				{selectedCity ? (
					<CitySearchRTKSelected
						selectedCity={selectedCity}
						onClearSelectedCity={handleClearSelectedCity}
					/>
				) : (
					<Combobox.Root
						open={isOpen}
						onOpenChange={({ open }) => setIsOpen(open)}
						onValueChange={({ value }) => {
							const item = collection.find(value[0]);
							if (item?.city) {
								handleCitySelect(item.city);
							}
						}}
						collection={collection}
					>
						<Combobox.Control className="relative">
							<Combobox.Input
								value={displayValue}
								onChange={(e) => handleInputChange(e.target.value)}
								placeholder={placeholder}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							/>
							<Combobox.Trigger className="absolute right-3 top-1/2 transform -translate-y-1/2">
								{isLoading ? (
									<div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
								) : (
									<svg
										className="w-5 h-5 text-gray-400 dark:text-gray-300"
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
								)}
							</Combobox.Trigger>
						</Combobox.Control>

						<Combobox.Positioner>
							<Combobox.Content className="mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
								{isLoading && (
									<div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 flex items-center">
										<div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
										{t("citySearch.searching")}
									</div>
								)}

								{error && (
									<div className="px-4 py-3 text-sm text-orange-600 bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-700 rounded">
										<p className="font-medium">
											{t("citySearch.usingOfflineData")}
										</p>
										<p className="text-xs">{t("citySearch.apiUnavailable")}</p>
									</div>
								)}

								{!isLoading &&
									!error &&
									suggestions.length === 0 &&
									searchQuery.trim().length >= 2 && (
										<div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
											{t("citySearch.noResultsFound", { query: searchQuery })}
										</div>
									)}

								{searchQuery.trim().length === 0 && (
									<div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
										{t("citySearch.startTyping")}
									</div>
								)}

								{suggestions.map((city) => (
									<Combobox.Item
										key={city.timezone}
										item={city.display_name}
										className="px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
									>
										<div>
											<div className="font-medium text-gray-900 dark:text-white">
												{city.city}
											</div>
											<div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
												{city.timezone}
											</div>
											{city.country && (
												<div className="text-xs text-gray-400 dark:text-gray-500">
													{city.country}
												</div>
											)}
										</div>
									</Combobox.Item>
								))}
							</Combobox.Content>
						</Combobox.Positioner>
					</Combobox.Root>
				)}
			</div>
		</Card>
	);
};

function CitySearchRTKSelected({
	selectedCity,
	onClearSelectedCity,
}: {
	selectedCity: CitySearchResult;
	onClearSelectedCity: () => void;
}) {
	const { t } = useTranslation();
	return (
		<div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
			<div className="flex flex-row justify-between gap-2 items-center">
				<div className="flex flex-col justify-between">
					<p className="text-sm text-blue-800 dark:text-blue-200">
						<span className="font-medium">{t("citySearch.selectedLabel")}</span>{" "}
						{selectedCity.city}
					</p>
					<p className="text-xs text-blue-600 dark:text-blue-400 font-mono">
						{selectedCity.timezone}
					</p>
				</div>
				<button
					type="button"
					onClick={onClearSelectedCity}
					className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors"
					title={t("citySearch.clearSelectedCity")}
				>
					<svg
						className="w-3 h-3"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<title>{t("citySearch.clearSelectedCity")}</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
