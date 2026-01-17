import { KeyboardEvent, useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { FooterPresentation } from "./footer-presentation";
import { useScreenSize } from "~/hooks/useScreenSize";

export const FooterContainer = () => {
  const { isMobile } = useScreenSize({});
  const { city, country } = useLoaderData<{ city: string; country: string }>();

  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  );
  const [showInput, setShowInput] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    isMobile ? "Get Things Done, as Planned. 🔥" : "Focusly — Get Things Done, as Planned. 🔥",
    `Last visitor from -> ${city}/${country}`,
    "buy_me_a_coffee_button",
  ];

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newUrl = event.currentTarget.value;
      setVideoUrl(newUrl);
      setShowInput(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [texts.length]);

  return (
    <FooterPresentation
      videoUrl={videoUrl}
      showInput={showInput}
      texts={texts}
      textIndex={textIndex}
      setShowInput={setShowInput}
      handleKeyDown={handleKeyDown}
    />
  );
};
