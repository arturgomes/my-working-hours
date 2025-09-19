import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { CitySearchResult, WorkSchedule } from "../../types";

interface WorkScheduleState {
	userSchedule: WorkSchedule;
	userTimezone: string;
	selectedCity: CitySearchResult | null;
	managerTimezone: string | null;
}

const initialState: WorkScheduleState = {
	userSchedule: {
		startTime: "09:00",
		endTime: "17:00",
	},
	userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	selectedCity: null,
	managerTimezone: null,
};

export const workScheduleSlice = createSlice({
	name: "workSchedule",
	initialState,
	reducers: {
		updateSchedule: (state, action: PayloadAction<WorkSchedule>) => {
			state.userSchedule = action.payload;
		},
		setSelectedCity: (
			state,
			action: PayloadAction<CitySearchResult | null>,
		) => {
			state.selectedCity = action.payload;
			state.managerTimezone = action.payload?.timezone || null;
		},
		setUserTimezone: (state, action: PayloadAction<string>) => {
			state.userTimezone = action.payload;
		},
		resetSchedule: (state) => {
			state.userSchedule = initialState.userSchedule;
			state.selectedCity = null;
			state.managerTimezone = null;
		},
	},
});

export const {
	updateSchedule,
	setSelectedCity,
	setUserTimezone,
	resetSchedule,
} = workScheduleSlice.actions;

export default workScheduleSlice.reducer;
