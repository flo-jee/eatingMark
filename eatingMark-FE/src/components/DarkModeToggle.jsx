import { useDarkMode } from "../hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  const icon = isDark ? (
    <Sun
      size={20}
      className="text-yellow-400 transition-transform duration-300 hover:rotate-12"
    />
  ) : (
    <Moon
      size={20}
      className="text-gray-800 dark:text-white transition-transform duration-300 hover:-rotate-12"
    />
  );

  const label = isDark ? "라이트 모드로 전환" : "다크 모드로 전환";

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={label}
      title={label}
      className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {icon}
    </button>
  );
}

export default DarkModeToggle;
