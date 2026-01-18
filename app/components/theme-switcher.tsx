import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "~/context/theme-context";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 cursor-pointer items-center justify-center text-foreground transition-colors duration-200 hover:opacity-50"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {resolvedTheme === "dark" ? (
            <Moon className="h-7 w-7" strokeWidth={1.5} />
          ) : (
            <Sun className="h-7 w-7" strokeWidth={1.5} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
