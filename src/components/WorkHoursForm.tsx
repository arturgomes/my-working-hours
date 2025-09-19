import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();
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
	const onSubmit = useCallback(
		(data: WorkScheduleFormData) => {
			dispatch(updateSchedule(data));
		},
		[dispatch],
	);

	useEffect(() => {
		if (
			isValid &&
			(watchedValues.startTime !== schedule.startTime ||
				watchedValues.endTime !== schedule.endTime)
		) {
			const timer = setTimeout(() => {
				handleSubmit(onSubmit)();
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [watchedValues, isValid, schedule, handleSubmit, onSubmit]);

	return (
		<div
			className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${className}`}
		>
			<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
				{t("workSchedule.title")}
			</h3>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="startTime"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						>
							{t("workSchedule.startTimeLabel")}
						</label>
						<Controller
							name="startTime"
							control={control}
							render={({ field }) => (
								<input
									{...field}
									id="startTime"
									type="time"
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
										errors.startTime
											? "border-red-500"
											: "border-gray-300 dark:border-gray-600"
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
						<label
							htmlFor="endTime"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						>
							{t("workSchedule.endTimeLabel")}
						</label>
						<Controller
							name="endTime"
							control={control}
							render={({ field }) => (
								<input
									{...field}
									id="endTime"
									type="time"
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
										errors.endTime
											? "border-red-500"
											: "border-gray-300 dark:border-gray-600"
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

				<div className="text-xs text-gray-500 dark:text-gray-400">
					<p>• {t("workSchedule.autoSaveNote")}</p>
					<p>• {t("workSchedule.overnightSupportNote")}</p>
				</div>
			</form>
		</div>
	);
};

WorkHoursForm.displayName = "WorkHoursForm";
