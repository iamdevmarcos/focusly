/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  const [isArcBrowser, setIsArcBrowser] = useState(false);

  useEffect(() => {
    const secureProtocol = window.location.protocol === "https:";
    setIsSecure(secureProtocol);

    if (!secureProtocol) return;
    const userAgent = window.navigator.userAgent;

    const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent);
    setIsIOS(isIOSDevice);

    const isSafariBrowser =
      /^((?!chrome|android).)*safari/i.test(userAgent) && isIOSDevice;
    setIsSafari(isSafariBrowser);

    const isArc = userAgent.includes("Arc");
    setIsArcBrowser(isArc);

    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null);
      setIsInstallable(false);
    });
  };

  if (!isSecure || isArcBrowser) return null;

  if (isInstallable) {
    return (
      <button
        onClick={handleInstallClick}
        className="scale-100 rounded-sm border border-focusly-text-gray bg-focusly-gradient px-8 py-4 text-focusly-normal font-semibold text-focusly-text-gray opacity-100 transition-opacity duration-300 ease-out hover:border-focusly-bg-dark hover:bg-focusly-gradient-white hover:text-focusly-bg-dark"
      >
        Instalar o App
      </button>
    );
  }

  if (isIOS && isSafari) {
    return (
      <div className="rounded-md bg-focusly-gradient p-4 text-focusly-text-white">
        <p className="mb-2">
          Para instalar o app no iOS, toque no ícone de compartilhamento{" "}
          <span role="img" aria-label="ícone de compartilhamento">
            📲
          </span>{" "}
          na barra inferior e, em seguida, selecione{" "}
          <strong>Adicionar à Tela de Início</strong>.
        </p>
      </div>
    );
  }

  return null;
};
