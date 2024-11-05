import type { MetaFunction } from "@remix-run/node";
import { KBarProvider } from "kbar";
import CommandBar from "~/components/commands";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { TimerContainer } from "~/components/timer/timer-container";
import { useKbarActions } from "~/context/kbar-actions-context";
import i18n from "~/i18n/config";

export const meta: MetaFunction = () => {
  return [
    { title: i18n.t("title") },
    {
      name: "description",
      content: i18n.t("description"),
    },
  ];
};

export default function Index() {
  const { actions } = useKbarActions();

  return (
    <KBarProvider actions={actions}>
      <div className="flex h-screen flex-col items-center justify-between bg-focusly-gradient py-4 text-focusly-text-white">
        <CommandBar />
        <Header />
        <TimerContainer />
        <Footer />
      </div>
    </KBarProvider>
  );
}
