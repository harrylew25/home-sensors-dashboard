import { create } from "zustand";

interface FilterStore {
  filter: "all" | "temp" | "humidity" | "energy" | "dock";
  setFilter: (filter: "all" | "temp" | "humidity" | "energy" | "dock") => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));

// TODO: add date range filter
