/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { YOUTUBE_CONFIG } from "~/config/youtube";

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

export const useYouTubeAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const initGapi = () => {
      if (!window.gapi) return;

      window.gapi.load("client", async () => {
        try {
          await window.gapi.client.init({
            apiKey: YOUTUBE_CONFIG.apiKey,
            discoveryDocs: YOUTUBE_CONFIG.discoveryDocs,
          });
        } catch (error) {
          console.error("Error initializing GAPI client:", error);
        }
      });
    };

    const checkGapi = setInterval(() => {
      if (window.gapi) {
        clearInterval(checkGapi);
        initGapi();
      }
    }, 100);

    return () => clearInterval(checkGapi);
  }, []);

  const signIn = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      setIsLoading(true);
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: YOUTUBE_CONFIG.clientId,
          scope: YOUTUBE_CONFIG.scopes.join(" "),
          callback: (response: any) => {
            setIsLoading(false);
            if (response.access_token) {
              setAccessToken(response.access_token);
              setIsAuthenticated(true);
              window.gapi.client.setToken({
                access_token: response.access_token,
              });

              fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
                headers: { Authorization: `Bearer ${response.access_token}` },
              })
                .then((res) => res.json())
                .then((userInfo) => {
                  setUser({
                    name: userInfo.name,
                    picture: userInfo.picture,
                    email: userInfo.email,
                  });
                })
                .catch((error) => {
                  console.error("Error fetching user info:", error);
                });

              resolve();
            } else if (response.error) {
              console.error("Error in OAuth callback:", response.error);
              reject(new Error(response.error));
            }
          },
        });
        client.requestAccessToken();
      } catch (error) {
        setIsLoading(false);
        console.error("Error signing in:", error);
        reject(error);
      }
    });
  }, []);

  const signOut = useCallback(() => {
    if (accessToken) {
      window.google.accounts.oauth2.revoke(accessToken);
    }
    setAccessToken(null);
    setIsAuthenticated(false);
    setUser(null);
    window.gapi.client.setToken(null);
  }, [accessToken]);

  return {
    isAuthenticated,
    isLoading,
    user,
    signIn,
    signOut,
  };
};
