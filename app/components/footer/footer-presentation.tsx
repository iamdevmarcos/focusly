import { useTranslation } from "react-i18next";
import { HotKey } from "../hotkey";
import { YoutubePlayer } from "../youtube-player";

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

  return (
    <footer className="mb-5 flex w-screen flex-row items-center justify-center px-20 md:items-end md:justify-between">
      <div className="flex min-w-max flex-col items-center gap-4 md:items-start">
        <div className="group flex flex-col gap-4">
          <input
            placeholder={t("ytVideo.input")}
            className={`${
              showInput ? "block" : "hidden"
            } peer rounded-md border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out group-hover:block`}
            onKeyDown={handleKeyDown}
          />
          <YoutubePlayer videoUrl={videoUrl} />
        </div>

        <p className="text-center text-[14px] transition-opacity duration-1000 ease-in-out md:text-focusly-normal">
          {texts[textIndex]}
        </p>
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
