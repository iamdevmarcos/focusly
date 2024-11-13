import { Action } from "kbar";
import { createContext, PropsWithChildren, useContext } from "react";
import { useFocusly } from "./focusly-context";
import { useTranslation } from "react-i18next";

interface KbarActionsProps {
  actions: Action[];
}

const KbarActionsContext = createContext<KbarActionsProps | undefined>(
  undefined,
);

export const KbarActionsProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const { startTimer, pauseTimer, resetTimer } = useFocusly();

  const actions = [
    {
      id: "play",
      name: t("actions.play"),
      section: t("actions.commands"),
      shortcut: ["Backspace"],
      keywords: "play, play timer, start",
      perform: startTimer,
    },
    {
      id: "pause",
      name: t("actions.pause"),
      section: t("actions.commands"),
      shortcut: ["Backspace"],
      keywords: "pause, pause timer",
      perform: pauseTimer,
    },
    {
      id: "reset",
      name: t("actions.reset"),
      section: t("actions.commands"),
      shortcut: ["R"],
      keywords: "reset",
      perform: resetTimer,
    },
    {
      id: "github",
      name: "🚀 Github",
      section: t("actions.commands"),
      shortcut: ["Github"],
      perform: () => window.open("https://github.com/iamdevmarcos", "_blank"),
    },
    {
      id: "linkedin_page",
      name: "🔗 LinkedIn",
      section: t("actions.commands"),
      shortcut: ["LinkedIn"],
      perform: () =>
        window.open("https://www.linkedin.com/company/focusly-app", "_blank"),
    },
    {
      id: "buymeacoffee",
      name: "☕️ Buy me a coffee",
      section: t("actions.commands"),
      shortcut: ["☕️"],
      perform: () => window.open("https://buymeacoffee.com/focusly", "_blank"),
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
