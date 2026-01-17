import { useTranslation } from "react-i18next";
import { HotKey } from "../hotkey";
import { YoutubePlayer } from "../youtube-player";
import { useScreenSize } from "~/hooks/useScreenSize";

interface FooterProps {
  videoUrl: string;
  showInput: boolean;
  texts: string[];
  textIndex: number;
  setShowInput: (show: boolean) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const FooterPresentation = ({
  videoUrl,
  showInput,
  texts,
  textIndex,
  handleKeyDown,
}: FooterProps) => {
  const { t } = useTranslation();
  const { isMobile } = useScreenSize({});

  return (
    <footer className="mb-5 flex w-screen flex-row items-center justify-center px-20 md:items-end md:justify-between">
      <div className="flex min-w-max flex-col items-center gap-4 md:items-start">
        <div className="group flex flex-col gap-4">
          <input
            placeholder={t("ytVideo.input")}
            className={`${
              showInput ? "block" : "hidden"
            } peer rounded-md border border-focusly-text-secondary bg-focusly-bg px-4 py-2 text-focusly-text-primary transition-all duration-200 ease-in-out ${
              !isMobile ? "group-hover:block" : ""
            }`}
            onKeyDown={handleKeyDown}
          />
          <YoutubePlayer videoUrl={videoUrl} />
        </div>

        {texts[textIndex] === "buy_me_a_coffee_button" ? (
          <a
            href="https://buymeacoffee.com/focusly"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer rounded-sm bg-[#F9DE4B] px-4 py-2 text-center text-[14px] text-black transition-opacity duration-300 ease-in-out hover:opacity-50"
          >
            ☕️ Buy me a coffee
          </a>
        ) : (
          <p className="text-center text-[14px] transition-opacity duration-1000 ease-in-out md:text-focusly-normal">
            {texts[textIndex]}
          </p>
        )}
      </div>

      <div className="hidden md:flex md:flex-col md:gap-2.5">
        <HotKey keys={["R"]} description={`-> ${t("reset")}`} />
        <HotKey keys={["Backspace"]} description={`-> ${t("play_pause")}`} />
        <HotKey
          keys={["Control", "K"]}
          description={`-> ${t("actions.commands")}`}
        />
      </div>
    </footer>
  );
};
