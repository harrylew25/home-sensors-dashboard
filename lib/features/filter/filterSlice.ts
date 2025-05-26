import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SensorType } from "../../services/sensorsApi";

type FilterType = "all" | SensorType;

export interface FilterStore {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const initialState: FilterStore = {
  filter: "all",
  setFilter: () => {},
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
