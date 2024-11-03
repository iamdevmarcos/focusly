import { Howl } from "howler";
import { useEffect } from "react";

export const useSound = () => {
  useEffect(() => {
    // need that for works on safari
    const silentSound = new Howl({
      src: ["/sounds/finish.mp3"],
      volume: 0,
      preload: true,
    });

    const playSilentSound = () => silentSound.play();
    window.addEventListener("click", playSilentSound, { once: true });

    return () => {
      window.removeEventListener("click", playSilentSound);
    };
  }, []);

  const playSound = ({
    source,
    duration = undefined,
  }: {
    source: string;
    duration?: number;
  }) => {
    const sound = new Howl({
      src: [`/sounds/${source}`],
      volume: 0.5,
      preload: true,
      loop: !!duration,
    });

    const soundId = sound.play();

    if (duration) {
      setTimeout(() => {
        sound.stop(soundId);
      }, duration);
    }

    return soundId;
  };

  const playComplete = () => {
    return playSound({ source: "finish.mp3", duration: 8000 });
  };

  return {
    playComplete,
  };
};
