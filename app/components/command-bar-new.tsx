import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";

const CommandBar = () => {
  return (
    <KBarPortal>
      <KBarPositioner
        className="fixed inset-0 z-50 transition-all duration-200"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KBarAnimator
          className="z-50 w-full max-w-[90%] overflow-hidden rounded-lg outline-none duration-200 md:max-w-screen-md"
          style={{
            backgroundColor: "oklch(0.176 0.0055 285.854 / 0.5)",
            backdropFilter: "blur(8px)",
            border: "1px solid oklch(0.322 0.0095 285.919)",
            fontFamily: "Geist, sans-serif",
            marginTop: "-20vh",
            letterSpacing: "-0.5px",
          }}
        >
          <div
            className="flex items-center px-3"
            style={{
              borderBottom: "1px solid oklch(0.322 0.0095 285.919)",
            }}
          >
            <KBarSearch
              className="flex h-10 w-full bg-transparent py-3 text-sm antialiased outline-none"
              style={{
                color: "oklch(0.985 0 0)",
                letterSpacing: "-0.5px",
              }}
              placeholder="Type a command or search..."
            />
          </div>
          <SearchResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

const SearchResults = () => {
  const { results } = useMatches();

  return (
    <div
      className="max-h-96 overflow-y-auto px-1 py-2 outline-none"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "oklch(0.242 0.006 285.959) transparent",
      }}
    >
      <KBarResults
        items={results}
        maxHeight={384}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div
              className="px-2 py-1.5 text-xs font-semibold uppercase"
              style={{
                color: "oklch(0.552 0.016 285.938)",
                fontFamily: "Geist, sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              {item}
            </div>
          ) : (
            <div
              className="relative flex h-10 cursor-default select-none items-center gap-4 rounded-md px-2 py-1.5 text-sm outline-none transition-colors"
              style={{
                backgroundColor: active
                  ? "oklch(0.242 0.006 285.959)"
                  : "transparent",
                color: active
                  ? "oklch(0.985 0 0)"
                  : "oklch(0.552 0.016 285.938)",
                fontFamily: "Geist, sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              <span className="flex-1">{item.name}</span>
              {item.shortcut && (
                <span
                  className="ml-auto text-xs font-medium"
                  style={{
                    color: "oklch(0.552 0.016 285.938)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {item.shortcut.map((key, index) => (
                    <kbd key={index} className="ml-1">
                      {key}
                    </kbd>
                  ))}
                </span>
              )}
            </div>
          )
        }
      />
    </div>
  );
};

export default CommandBar;
