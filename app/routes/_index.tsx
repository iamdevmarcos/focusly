import type { MetaFunction } from "@remix-run/node";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { TimerContainer } from "~/components/timer/timer-container";
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
  return (
    <div className="bg-focusly-gradient flex h-screen flex-col items-center justify-between py-4 text-focusly-text-white">
      <Header />
      <TimerContainer />
      <Footer />
    </div>
  );
}
