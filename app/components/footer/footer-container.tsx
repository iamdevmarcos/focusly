import { KeyboardEvent, useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { FooterPresentation } from "./footer-presentation";
import { useTranslation } from "react-i18next";
import { useScreenSize } from "~/hooks/useScreenSize";
import i18n from "~/i18n/config";

export const FooterContainer = () => {
  const { t } = useTranslation();
  const { isMobile } = useScreenSize({});
  const { city, country } = useLoaderData<{ city: string; country: string }>();

  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  );
  const [showInput, setShowInput] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    isMobile || i18n.language === "pt" ? t("shortTitle") : t("title"),
    `${t("last_visitor")} ${city}/${country}`,
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
