/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useYouTubeAuth } from "~/hooks/useYouTubeAuth";
import { useYouTubeMusic } from "~/hooks/useYouTubeMusic";

interface YoutubeMusicContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  signIn: () => Promise<void>;
  signOut: () => void;
  playlists: any[];
  currentPlaylist: string | null;
  fetchPlaylists: () => Promise<void>;
  searchPlaylists: (query: string) => Promise<any[]>;
  setCurrentPlaylist: (id: string) => void;
}

const YoutubeMusicContext = createContext<YoutubeMusicContextProps | undefined>(
  undefined,
);

export const YoutubeMusicProvider = ({ children }: PropsWithChildren) => {
  const auth = useYouTubeAuth();
  const music = useYouTubeMusic();

  const contextValue = useMemo(
    () => ({
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      user: auth.user,
      signIn: auth.signIn,
      signOut: auth.signOut,
      playlists: music.playlists,
      currentPlaylist: music.currentPlaylist,
      fetchPlaylists: music.fetchPlaylists,
      searchPlaylists: music.searchPlaylists,
      setCurrentPlaylist: music.setCurrentPlaylist,
    }),
    [auth, music],
  );

  return (
    <YoutubeMusicContext.Provider value={contextValue}>
      {children}
    </YoutubeMusicContext.Provider>
  );
};

export const useYoutubeMusic = () => {
  const context = useContext(YoutubeMusicContext);
  if (!context) {
    throw new Error("useYoutubeMusic must be used within YoutubeMusicProvider");
  }
  return context;
};
