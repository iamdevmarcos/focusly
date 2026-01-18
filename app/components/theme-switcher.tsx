import { Sun, Moon } from "lucide-react";
import { useTheme } from "~/context/theme-context";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const currentIcon =
    resolvedTheme === "dark" ? (
      <Moon className="h-7 w-7" strokeWidth={1.5} />
    ) : (
      <Sun className="h-7 w-7" strokeWidth={1.5} />
    );

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 cursor-pointer items-center justify-center text-foreground transition-colors duration-200 hover:opacity-50"
      aria-label="Toggle theme"
    >
      {currentIcon}
    </button>
  );
}
