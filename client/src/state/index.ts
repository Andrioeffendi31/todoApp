import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
};

const initialState: initialStateType = {
  isSidebarOpen: true,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setIsDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setIsSidebarOpen, setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
