import { Briefcase } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/themeContext";

const DashboardHeader = ({ total, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme)

  return (
    <header className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">InternTrack</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Application Tracker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {total} {total === 1 ? "application" : "applications"}
            </span>
            <button
              onClick={onLogout}
              className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
            <button
              onClick={toggleTheme}
              className="rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
