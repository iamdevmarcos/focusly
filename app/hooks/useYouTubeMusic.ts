/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";

interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
}

export const useYouTubeMusic = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const fetchPlaylists = useCallback(async () => {
    try {
      const response = await window.gapi.client.youtube.playlists.list({
        part: "snippet",
        mine: true,
        maxResults: 25,
      });

      const items = response.result.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      }));

      setPlaylists(items);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }, []);

  const searchPlaylists = useCallback(async (query: string) => {
    try {
      const response = await window.gapi.client.youtube.search.list({
        part: "snippet",
        q: query,
        type: "playlist",
        maxResults: 10,
      });

      const items = response.result.items.map((item: any) => ({
        id: item.id.playlistId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      }));

      return items;
    } catch (error) {
      console.error("Error searching playlists:", error);
      return [];
    }
  }, []);

  const play = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, []);

  return {
    playlists,
    currentPlaylist,
    isPlaying,
    playerRef,
    fetchPlaylists,
    searchPlaylists,
    setCurrentPlaylist,
    play,
    pause,
    setVolume,
  };
};
