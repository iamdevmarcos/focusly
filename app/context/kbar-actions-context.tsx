import { Action } from "kbar";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useFocusly } from "./focusly-context";

interface KbarActionsProps {
  actions: Action[];
}

const KbarActionsContext = createContext<KbarActionsProps | undefined>(
  undefined,
);

export const KbarActionsProvider = ({ children }: PropsWithChildren) => {
  const { startTimer, pauseTimer, resetTimer } = useFocusly();

  const actions = useMemo(
    () => [
      {
        id: "play",
        name: "🚀 Start Session",
        section: "Commands List",
        shortcut: ["Backspace"],
        keywords: "play, play timer, start",
        perform: startTimer,
      },
      {
        id: "pause",
        name: "⏸️ Pause Session",
        section: "Commands List",
        shortcut: ["Backspace"],
        keywords: "pause, pause timer",
        perform: pauseTimer,
      },
      {
        id: "reset",
        name: "🔄 Reset Session",
        section: "Commands List",
        shortcut: ["R"],
        keywords: "reset",
        perform: resetTimer,
      },
      {
        id: "github",
        name: "🚀 Github",
        section: "Commands List",
        shortcut: ["Github"],
        perform: () => window.open("https://github.com/iamdevmarcos", "_blank"),
      },
      {
        id: "buymeacoffee",
        name: "☕️ Buy me a coffee",
        section: "Commands List",
        shortcut: ["☕️"],
        perform: () =>
          window.open("https://buymeacoffee.com/focusly", "_blank"),
      },
    ],
    [startTimer, pauseTimer, resetTimer],
  );

  const contextValue = useMemo(() => ({ actions }), [actions]);

  return (
    <KbarActionsContext.Provider value={contextValue}>
      {children}
    </KbarActionsContext.Provider>
  );
};

export const useKbarActions = () => {
  const context = useContext(KbarActionsContext);
  if (!context) {
    throw new Error(
      "useKbarActions deve ser usado dentro de um KbarActionsProvider",
    );
  }
  return context;
};
