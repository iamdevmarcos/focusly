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
    <footer className="mb-5 flex w-screen flex-row items-end justify-between px-20">
      <div className="flex flex-col items-start gap-4">
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

        <p className="text-focusly-normal transition-opacity duration-1000 ease-in-out">
          {texts[textIndex]}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
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
