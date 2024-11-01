import type { MetaFunction } from "@remix-run/node";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Timer } from "~/components/timer";

export const meta: MetaFunction = () => {
  return [
    { title: "Focusly — Get Things Done, as Planned." },
    {
      name: "description",
      content:
        "A modern Pomodoro app to boost your productivity and help you stay on track.",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen flex-col items-center justify-between bg-focusly-bg-dark py-4 text-focusly-text-white">
      <Header />
      <Timer />
      <Footer />
    </div>
  );
}
