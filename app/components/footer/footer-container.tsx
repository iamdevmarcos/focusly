import { useEffect, useState } from "react";
import { FooterPresentation } from "./footer-presentation";
import { useScreenSize } from "~/hooks/useScreenSize";
import { useYoutubeMusic } from "~/context/youtube-music-context";

export const FooterContainer = () => {
  const { isMobile } = useScreenSize({});
  const { currentPlaylist } = useYoutubeMusic();
  const [textIndex, setTextIndex] = useState(0);

  const defaultVideoUrl = "https://www.youtube.com/watch?v=jfKfPfyJRdk";
  const videoUrl = currentPlaylist
    ? `https://www.youtube.com/playlist?list=${currentPlaylist}`
    : defaultVideoUrl;

  const texts = [
    isMobile
      ? "Get Things Done, as Planned. 🔥"
      : "Focusly — Get Things Done, as Planned. 🔥",
    "buy_me_a_coffee_button",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [texts.length]);

  return (
    <FooterPresentation
      videoUrl={videoUrl}
      texts={texts}
      textIndex={textIndex}
    />
  );
};
