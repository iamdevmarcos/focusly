import { KeyboardEvent, useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { FooterPresentation } from "./footer-presentation";

export const FooterContainer = () => {
  const { city, country } = useLoaderData<{ city: string; country: string }>();

  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  );
  const [showInput, setShowInput] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Focusly — by @marcosmendes 🔥",
    `Last visitor from: ${city}/${country}`,
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
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

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
