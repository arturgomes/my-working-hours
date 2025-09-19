import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { AvailabilitySummary } from "./AvailabilitySummary";
import { CitySearchRTK } from "./CitySearchRTK";
import { TimeDisplay } from "./TimeDisplay";
import { WorkHoursForm } from "./WorkHoursForm";

export function Main() {
	const { t } = useTranslation();
	const { selectedCity, managerTimezone } = useSelector(
		(state: RootState) => state.workSchedule,
	);

	return (
		<main className="flex-grow max-w-4xl mx-auto px-6 py-8">
			<div className="space-y-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="flex flex-col gap-6">
						<WorkHoursForm className="h-auto" />
						<CitySearchRTK
							placeholder={t("citySearch.managerPlaceholder")}
							className="h-auto"
						/>
					</div>

					<AvailabilitySummary className="h-full" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<TimeDisplay
						label={t("timeDisplay.yourLocalTime")}
						className="h-auto"
					/>
					{selectedCity && managerTimezone && (
						<TimeDisplay
							timezone={managerTimezone}
							label={`${t("timeDisplay.cityTime", { city: selectedCity.city })}`}
							className="h-auto"
						/>
					)}
				</div>
			</div>
		</main>
	);
}
