/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useScreenSize } from "~/hooks/useScreenSize";
import { MdInstallDesktop } from "react-icons/md";
import { Button } from "./button";

export const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  const [isChrome, setIsChrome] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { isMobile } = useScreenSize({});

  useEffect(() => {
    const checkIfInstalled = () => {
      setIsInstalled(window.matchMedia("(display-mode: standalone)").matches);
    };

    window.addEventListener("load", checkIfInstalled);

    const secureProtocol = window.location.protocol === "https:";
    setIsSecure(secureProtocol);

    if (!secureProtocol) return;
    const userAgent = window.navigator.userAgent;

    const isChromeBrowser = /Chrome/.test(userAgent);
    setIsChrome(isChromeBrowser);

    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("load", checkIfInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null);
      setIsInstallable(false);
      setIsInstalled(true);
    });
  };

  if (!isSecure || !isChrome || isInstalled || isMobile) return <></>;

  if (isInstallable && isChrome) {
    return (
      <Button onClick={handleInstallClick}>
        <MdInstallDesktop className="h-8 w-8" />
      </Button>
    );
  }

  return <></>;
};
