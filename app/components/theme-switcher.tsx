import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, type Theme } from "~/context/theme-context";

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Light", icon: <Sun className="h-4 w-4" strokeWidth={1.5} /> },
  { value: "dark", label: "Dark", icon: <Moon className="h-4 w-4" strokeWidth={1.5} /> },
  { value: "system", label: "System", icon: <Monitor className="h-4 w-4" strokeWidth={1.5} /> },
];

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentIcon =
    resolvedTheme === "dark" ? (
      <Moon className="h-7 w-7" strokeWidth={1.5} />
    ) : (
      <Sun className="h-7 w-7" strokeWidth={1.5} />
    );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center text-foreground transition-colors duration-200 hover:opacity-50"
        aria-label="Toggle theme"
      >
        {currentIcon}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-lg border border-border bg-background p-1 shadow-xl">
          {themes.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted ${
                theme === value
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
