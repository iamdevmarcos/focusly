import { Howl } from "howler";
import { useEffect, useRef } from "react";

export const useSound = () => {
  const soundCacheRef = useRef<Map<string, Howl>>(new Map());

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
      // Cleanup all cached sounds
      soundCacheRef.current.forEach((sound) => sound.unload());
      soundCacheRef.current.clear();
    };
  }, []);

  const playSound = ({
    source,
    duration = undefined,
  }: {
    source: string;
    duration?: number;
  }) => {
    // Check if sound is already cached
    let sound = soundCacheRef.current.get(source);

    if (!sound) {
      // Create and cache new sound
      sound = new Howl({
        src: [`/sounds/${source}`],
        volume: 0.5,
        preload: true,
        loop: !!duration,
      });
      soundCacheRef.current.set(source, sound);
    }

    const soundId = sound.play();

    if (duration) {
      setTimeout(() => {
        sound!.stop(soundId);
      }, duration);
    }

    return soundId;
  };

  const playComplete = () => {
    return playSound({ source: "finish.mp3", duration: 5000 });
  };

  return {
    playComplete,
  };
};
