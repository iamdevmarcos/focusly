import { useTranslation } from "react-i18next";
import { HotKey } from "./hotkey";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mb-5 flex w-screen flex-row items-end justify-between px-20">
      <p className="text-focusly-normal">
        Focusly — {t("by")}{" "}
        <a
          href="https://github.com/iamdevmarcos"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 hover:text-gray-400"
        >
          @marcosmendes
        </a>{" "}
        🔥
      </p>

      <div className="flex flex-col gap-2.5">
        <HotKey keys={["R"]} description={`-> ${t("reset")}`} />
        <HotKey keys={["Backspace"]} description={`-> ${t("play_pause")}`} />
        <HotKey
          keys={["Control", "Enter"]}
          description={`-> ${t("create_task")}`}
        />
      </div>
    </footer>
  );
};
