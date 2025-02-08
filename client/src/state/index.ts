import { createSlice } from "@reduxjs/toolkit";
import { User } from "./api";
import { set } from "lodash";

export type initialStateType = {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  currentUser: User;
};

const initialState: initialStateType = {
  isSidebarOpen: true,
  isDarkMode: false,
  currentUser: {
    username: "",
    email: "",
    userId: 0,
    profilePictureUrl: "",
    teamId: 0,
    role: "",
  },
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
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setIsSidebarOpen, setIsDarkMode, setCurrentUser } = globalSlice.actions;
export default globalSlice.reducer;
