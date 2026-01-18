import { HotKey } from "../hotkey";
import { YoutubePlayer } from "../youtube-player";

interface FooterProps {
  videoUrl: string;
  texts: string[];
  textIndex: number;
}

export const FooterPresentation = ({
  videoUrl,
  texts,
  textIndex,
}: FooterProps) => {
  return (
    <footer className="mb-5 flex w-screen flex-row items-center justify-center px-20 md:items-end md:justify-between">
      <div className="flex min-w-max flex-col items-center gap-4 md:items-start">
        <div className="group">
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
        <HotKey keys={["R"]} description="-> Reset Time" />
        <HotKey keys={["Backspace"]} description="-> Play/Pause" />
        <HotKey keys={["Control", "K"]} description="-> Commands List" />
      </div>
    </footer>
  );
};
