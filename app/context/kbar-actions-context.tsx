import { Action } from "kbar";
import { createContext, PropsWithChildren, useContext } from "react";
import { useFocusly } from "./focusly-context";

interface KbarActionsProps {
  actions: Action[];
}

const KbarActionsContext = createContext<KbarActionsProps | undefined>(
  undefined,
);

export const KbarActionsProvider = ({ children }: PropsWithChildren) => {
  const { startTimer, pauseTimer, resetTimer } = useFocusly();

  const actions = [
    {
      id: "play",
      name: "🚀 Start Session",
      section: "commands",
      shortcut: ["Backspace"],
      keywords: "play, play timer, start",
      perform: startTimer,
    },
    {
      id: "pause",
      name: "⏸️ Pause Session",
      section: "commands",
      shortcut: ["Backspace"],
      keywords: "pause, pause timer",
      perform: pauseTimer,
    },
    {
      id: "reset",
      name: "🔄 Reset Session",
      section: "commands",
      shortcut: ["R"],
      keywords: "reset",
      perform: resetTimer,
    },
    {
      id: "create_task",
      name: "🗒️ Create new task",
      section: "commands",
      keywords: "create",
      shortcut: ["Control", "Enter"],
      perform: () => alert("click"),
    },
  ];

  return (
    <KbarActionsContext.Provider value={{ actions }}>
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
