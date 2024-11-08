import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import { KBarProvider } from "kbar";
import CommandBar from "~/components/commands";
import { FooterContainer } from "~/components/footer/footer-container";
import { HeaderContainer } from "~/components/header/header-container";
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

export const loader: LoaderFunction = async ({ request }) => {
  const ip =
    request.headers.get("X-Forwarded-For") ||
    request.headers.get("x-real-ip") ||
    "me";

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const locationData = await response.json();

    console.log({ locationData });
    const city = locationData.city || "California";
    const country = locationData.country_name || "USA";

    return json({ city, country });
  } catch (error) {
    console.log({ error });
  }
};

export default function Index() {
  const { actions } = useKbarActions();

  return (
    <KBarProvider actions={actions}>
      <div className="flex h-screen flex-col items-center justify-between bg-focusly-gradient py-4 text-focusly-text-white">
        <CommandBar />
        <HeaderContainer />
        <TimerContainer />
        <FooterContainer />
      </div>
    </KBarProvider>
  );
}
