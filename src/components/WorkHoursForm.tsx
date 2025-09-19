import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
	type WorkScheduleFormData,
	workScheduleSchema,
} from "../schemas/workScheduleSchema";
import type { RootState } from "../store";
import { updateSchedule } from "../store/slices/workScheduleSlice";
import type { WorkHoursInputProps } from "../types";

export const WorkHoursForm = ({
	className = "",
}: Omit<WorkHoursInputProps, "schedule" | "onScheduleChange">) => {
	const dispatch = useDispatch();
	const schedule = useSelector(
		(state: RootState) => state.workSchedule.userSchedule,
	);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		watch,
	} = useForm<WorkScheduleFormData>({
		resolver: zodResolver(workScheduleSchema),
		defaultValues: schedule,
		mode: "onChange",
	});

	const watchedValues = watch();

	// Auto-save on valid changes
	const onSubmit = (data: WorkScheduleFormData) => {
		dispatch(updateSchedule(data));
	};

	// Auto-save when form is valid and values change
	React.useEffect(() => {
		if (
			isValid &&
			(watchedValues.startTime !== schedule.startTime ||
				watchedValues.endTime !== schedule.endTime)
		) {
			const timer = setTimeout(() => {
				handleSubmit(onSubmit)();
			}, 500); // Debounce auto-save

			return () => clearTimeout(timer);
		}
	}, [watchedValues, isValid, schedule, handleSubmit, onSubmit]);

	return (
		<div className={`p-6 bg-white rounded-lg shadow-sm border ${className}`}>
			<h3 className="text-lg font-semibold text-gray-800 mb-4">
				Your Work Schedule
			</h3>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Start Time
						</label>
						<Controller
							name="startTime"
							control={control}
							render={({ field }) => (
								<input
									{...field}
									type="time"
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
										errors.startTime ? "border-red-500" : "border-gray-300"
									}`}
								/>
							)}
						/>
						{errors.startTime && (
							<p className="mt-1 text-sm text-red-600">
								{errors.startTime.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							End Time
						</label>
						<Controller
							name="endTime"
							control={control}
							render={({ field }) => (
								<input
									{...field}
									type="time"
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
										errors.endTime ? "border-red-500" : "border-gray-300"
									}`}
								/>
							)}
						/>
						{errors.endTime && (
							<p className="mt-1 text-sm text-red-600">
								{errors.endTime.message}
							</p>
						)}
					</div>
				</div>

				<div className="text-xs text-gray-500">
					<p>• Changes are automatically saved</p>
					<p>• Overnight schedules are supported (e.g., 22:00 - 06:00)</p>
				</div>
			</form>
		</div>
	);
};

WorkHoursForm.displayName = "WorkHoursForm";
