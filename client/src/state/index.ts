// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface InitialStateTypes {
//   isSidebarCollapsed: boolean;
//   isDarkMode: boolean;
// }

// const initialState: InitialStateTypes = {
//   isSidebarCollapsed: false,
//   isDarkMode: false,
// };

// export const globalSlice = createSlice({
//   name: "global",
//   initialState,
//   reducers: {
//     setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
//       state.isSidebarCollapsed = action.payload;
//     },
//     setIsDarkMode: (state, action: PayloadAction<boolean>) => {
//       state.isDarkMode = action.payload;
//     },
//   },
// });
// export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;
// export default globalSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  isHydrated: boolean; // Track hydration status
}

// Function to get initial theme preference
const getInitialTheme = (): boolean => {
  if (typeof window === "undefined") return false;

  // Check localStorage first
  const stored = localStorage.getItem("persist:root");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const global = JSON.parse(parsed.global || "{}");
      if (typeof global.isDarkMode === "boolean") {
        return global.isDarkMode;
      }
    } catch (e) {
      // Handle parsing errors gracefully
    }
  }

  // Fallback to system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: getInitialTheme(),
  isHydrated: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      // Apply theme immediately to document
      if (typeof window !== "undefined") {
        if (action.payload) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
    setIsHydrated: (state, action: PayloadAction<boolean>) => {
      state.isHydrated = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode, setIsHydrated } =
  globalSlice.actions;
export default globalSlice.reducer;
