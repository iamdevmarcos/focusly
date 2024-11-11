import { useEffect, useRef } from "react";
import { useScreenSize } from "~/hooks/useScreenSize";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const extractVideoOrPlaylistIdFromUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    if (params.has("list")) {
      return { type: "playlist", id: params.get("list") };
    }

    const videoId = params.get("v") || urlObj.pathname.split("/").pop();
    return { type: "video", id: videoId };
  } catch {
    console.error("Invalid URL format");
    return null;
  }
};

export const YoutubePlayer = ({ videoUrl }: { videoUrl: string }) => {
  const { isMobile } = useScreenSize({});
  const playerRef = useRef<any>(null);
  const containerId = "youtube-player";

  useEffect(() => {
    const result = extractVideoOrPlaylistIdFromUrl(videoUrl);

    if (!result) {
      console.error("Invalid YouTube URL");
      return;
    }

    const createPlayer = () => {
      if (playerRef.current) {
        if (result.type === "playlist") {
          playerRef.current.loadPlaylist({ list: result.id });
        } else {
          playerRef.current.loadVideoById(result.id);
        }
        return;
      }

      playerRef.current = new window.YT.Player(containerId, {
        videoId: result.type === "video" ? result.id : undefined,
        playerVars: {
          autoplay: isMobile ? 0 : 1,
          controls: 1,
          modestbranding: 1,
          playsinline: 1,
          listType: result.type === "playlist" ? "playlist" : undefined,
          list: result.type === "playlist" ? result.id : undefined,
        },
        events: {
          onReady: () => {
            // event.target.mute();
            // event.target.playVideo();
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

    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    loadYoutubeAPI();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoUrl]);

  return (
    <div
      id={containerId}
      className="h-[120px] w-[220px] rounded-md border border-focusly-text-gray bg-focusly-bg-dark transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 group-hover:h-[250px] group-hover:w-[400px] peer-focus:h-[250px] peer-focus:w-[400px]"
    />
  );
};
