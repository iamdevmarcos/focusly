/* eslint-disable @typescript-eslint/no-explicit-any */
import { Youtube } from "lucide-react";
import { useState } from "react";
import { useYoutubeMusic } from "~/context/youtube-music-context";

export const YoutubeMusicIntegration = () => {
  const {
    isAuthenticated,
    signIn,
    user,
    playlists,
    setCurrentPlaylist,
    fetchPlaylists,
  } = useYoutubeMusic();

  const [showModal, setShowModal] = useState(false);

  const handleConnect = async () => {
    await signIn();
    await fetchPlaylists();
    setShowModal(true);
  };

  return (
    <>
      {!isAuthenticated ? (
        <button
          onClick={handleConnect}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          <Youtube size={20} />
          <span style={{ letterSpacing: "-0.8px" }}>YT Music</span>
        </button>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="relative flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
          <Youtube size={20} />

          {user && (
            <img
              src={user.picture}
              alt={user.name}
              className="absolute -left-2 -top-3 h-6 w-6 rounded-full"
            />
          )}
        </button>
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          style={{ letterSpacing: "-0.8px" }}
        >
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-900">
            <h2 className="mb-4 text-2xl font-bold">Select Playlist</h2>

            <div className="grid gap-4">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => {
                    setCurrentPlaylist(playlist.id);
                    setShowModal(false);
                  }}
                  className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <img
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    className="h-16 w-16 rounded"
                  />
                  <span className="font-medium">{playlist.title}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full rounded-lg bg-gray-200 px-4 py-2 dark:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
