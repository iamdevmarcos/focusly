import { type MetaFunction } from "@remix-run/node";
import { KBarProvider } from "kbar";
import CommandBar from "~/components/commands";
import { FooterContainer } from "~/components/footer/footer-container";
import { HeaderContainer } from "~/components/header/header-container";
import { TimerContainer } from "~/components/timer/timer-container";
import { useKbarActions } from "~/context/kbar-actions-context";

export const meta: MetaFunction = () => {
  return [
    { title: "Focusly — Get Things Done, as Planned. 🔥" },
    {
      name: "description",
      content:
        "A modern, minimalist, and easy-to-use Pomodoro timer to help you get things done as planned.",
    },
  ];
};

export default function Index() {
  const { actions } = useKbarActions();

  return (
    <KBarProvider actions={actions}>
      <div className="flex h-screen flex-col items-center justify-between bg-focusly-gradient py-4 text-focusly-text-primary">
        <CommandBar />
        <HeaderContainer />
        <TimerContainer />
        <FooterContainer />
      </div>
    </KBarProvider>
  );
}
