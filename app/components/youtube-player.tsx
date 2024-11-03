import { useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YoutubePlayer = ({ videoId }: { videoId: string }) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const createPlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();
          },
        },
      });
    };

    const loadYoutubeAPI = () => {
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;

        document.body.appendChild(script);
        window.onYouTubeIframeAPIReady = createPlayer;
      } else {
        createPlayer();
      }
    };

    loadYoutubeAPI();

    return () => {
      if (playerRef.current) playerRef.current.destroy();
    };
  }, [videoId]);

  return (
    <div
      id="youtube-player"
      className="h-[120px] w-[220px] rounded-md border border-focusly-text-gray bg-focusly-bg-dark transition-all duration-300 ease-in-out hover:h-[250px] hover:w-[400px] hover:border-gray-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
    />
  );
};
