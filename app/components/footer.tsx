import { useTranslation } from "react-i18next";
import { HotKey } from "./hotkey";
import { YoutubePlayer } from "./youtube-player";
import { KeyboardEvent, useState } from "react";

export const Footer = () => {
  const { t } = useTranslation();
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  );
  const [showInput, setShowInput] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newUrl = event.currentTarget.value;
      setVideoUrl(newUrl);
      setShowInput(false);
    }
  };

  return (
    <footer className="mb-5 flex w-screen flex-row items-end justify-between px-20">
      <div className="flex flex-col items-start gap-4">
        <div className="group flex flex-col gap-4">
          <input
            placeholder="Paste the videoURL and press enter"
            className={`${
              showInput ? "block" : "hidden"
            } peer rounded-md border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out group-hover:block`}
            onKeyDown={handleKeyDown}
          />
          <YoutubePlayer videoUrl={videoUrl} />
        </div>

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
      </div>

      <div className="flex flex-col gap-2.5">
        <HotKey keys={["R"]} description={`-> ${t("reset")}`} />
        <HotKey keys={["Backspace"]} description={`-> ${t("play_pause")}`} />
        <HotKey keys={["Control", "K"]} description={`-> Command Bar`} />

        <HotKey
          keys={["Control", "Enter"]}
          description={`-> ${t("create_task")}`}
        />
      </div>
    </footer>
  );
};
