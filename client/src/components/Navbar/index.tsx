import React, { useEffect } from "react";
import { LogOut, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarOpen } from "@/state";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.global.isSidebarOpen);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage")); // Trigger storage event
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* search bar */}
      <div className="flex items-center gap-8">
        {isSidebarOpen ? null : (
          <button onClick={() => dispatch(setIsSidebarOpen())}>
            <Menu className="h-8 w-8 cursor-pointer dark:text-white" />
          </button>
        )}
        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-1 top-1/2 mr-2 h-4 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded-md border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="Search Todo"
          />
        </div>
      </div>
      {/* icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode())}
          className={
            isDarkMode
              ? "rounded-md p-2 dark:hover:bg-gray-700"
              : "rounded-md p-2 dark:hover:bg-gray-100"
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <button
          onClick={handleLogout}
          className={
            isDarkMode
              ? "h-min w-min rounded-md p-2 dark:hover:bg-gray-700"
              : "h-min w-min rounded-md p-2 dark:hover:bg-gray-100"
          }
        >
          <LogOut className="h-6 w-6 cursor-pointer dark:text-white" />
        </button>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
