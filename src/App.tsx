import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AvailabilitySummary, TimeDisplay, WorkHoursForm } from "./components";
import { CitySearchSimple } from "./components/CitySearchSimple";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import type { RootState } from "./store";

function App() {
	const { t } = useTranslation();
	const { managerTimezone, selectedCity } = useSelector(
		(state: RootState) => state.workSchedule,
	);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
			{/* Header */}
			<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
				<div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							{t('header.title')}
						</h1>
						<p className="text-gray-600 dark:text-gray-300 mt-1">
							{t('header.subtitle')}
						</p>
					</div>
					<div className="flex items-center space-x-4">
						<LanguageSwitcher />
						<ThemeToggle />
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-6 py-8">
				<div className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="flex flex-col gap-6">
							{/* Work Hours Form */}
							<WorkHoursForm className="h-auto" />
							{/* City Search */}
							<CitySearchSimple
								placeholder="Search for your manager's city..."
								className="h-auto"
							/>
						</div>

						{/* Availability Summary */}
						<AvailabilitySummary className="h-full" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Local Time Display */}
						<TimeDisplay label="Your Local Time" className="h-auto" />
						{/* Manager's Time Display - Only show if city is selected */}
						{selectedCity && managerTimezone && (
							<TimeDisplay
								timezone={managerTimezone}
								label={`${selectedCity.city} Time`}
								className="h-auto"
							/>
						)}
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<p className="text-center text-sm text-gray-500 dark:text-gray-400">
						Built with React 19, RTK Query, and Ark UI
					</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
