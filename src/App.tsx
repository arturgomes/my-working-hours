import { useSelector } from "react-redux";
import { AvailabilitySummary, TimeDisplay, WorkHoursForm } from "./components";
import { CitySearchSimple } from "./components/CitySearchSimple";
import type { RootState } from "./store";

function App() {
	const { managerTimezone, selectedCity } = useSelector(
		(state: RootState) => state.workSchedule,
	);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<h1 className="text-3xl font-bold text-gray-900">
						Work Hours Calculator
					</h1>
					<p className="text-gray-600 mt-1">
						Calculate your availability across timezones
					</p>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-6 py-8">
				<div className="space-y-6">
					<div className="flex flex-row gap-4">
						<div className="flex flex-col gap-4 w-full">
							{/* Work Hours Form */}
							<WorkHoursForm className="w-full" />
							{/* City Search */}

							<CitySearchSimple
								placeholder="Search for your manager's city..."
								className="w-full"
							/>
						</div>

						{/* Availability Summary */}
						<AvailabilitySummary className="w-full" />
					</div>

					<div className="flex flex-row gap-4 w-full justify-between">
						{/* Local Time Display */}
						<TimeDisplay label="Your Local Time" className="w-full" />
						{/* Manager's Time Display - Only show if city is selected */}
						{selectedCity && managerTimezone && (
							<TimeDisplay
								timezone={managerTimezone}
								label={`${selectedCity.city} Time`}
								className="w-full"
							/>
						)}
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-white border-t mt-12">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<p className="text-center text-sm text-gray-500">
						Built with React 19, RTK Query, and Ark UI
					</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
