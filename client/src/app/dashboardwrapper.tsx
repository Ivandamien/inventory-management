// "use client";
// import React, { useEffect } from "react";
// import Navbar from "./(components)/Navbar";
// import Sidebar from "./(components)/Sidebar";
// import StoreProvider, { useAppSelector } from "./redux";

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const isSidebarCollapsed = useAppSelector(
//     (state) => state.global.isSidebarCollapsed
//   );
//   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   });
//   return (
//     <div
//       className={` ${
//         isDarkMode ? "dark" : ""
//       } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
//     >
//       <Sidebar />
//       <main
//         className={`flex flex-col w-full py-7 px-9 bg-gray-50 ${
//           isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
//         }`}
//       >
//         <Navbar />
//         {children}
//       </main>
//     </div>
//   );
// };

// const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <StoreProvider>
//       <DashboardLayout>{children}</DashboardLayout>
//     </StoreProvider>
//   );
// };

// export default DashboardWrapper;

"use client";
import React, { useEffect } from "react";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import StoreProvider, { useAppSelector, useAppDispatch } from "./redux";
import { setIsHydrated } from "@/state";
import PremiumLoadingScreen from "./(components)/Loader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const isHydrated = useAppSelector((state) => state.global.isHydrated);

  // Initialize theme on component mount
  useEffect(() => {
    // Apply the current theme state to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }

    // Mark as hydrated
    dispatch(setIsHydrated(true));
  }, [isDarkMode, dispatch]);

  // Apply theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  // Don't render until hydrated to prevent flash
  if (!isHydrated) {
    return <PremiumLoadingScreen />;
  }

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
