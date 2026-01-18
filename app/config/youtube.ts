declare global {
  interface Window {
    ENV: {
      GOOGLE_CLOUD_CLIENT_ID: string;
      GOOGLE_CLOUD_API_KEY: string;
    };
  }
}

export const YOUTUBE_CONFIG = {
  clientId:
    typeof window !== "undefined"
      ? window.ENV?.GOOGLE_CLOUD_CLIENT_ID || ""
      : "",
  apiKey:
    typeof window !== "undefined" ? window.ENV?.GOOGLE_CLOUD_API_KEY || "" : "",
  scopes: [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
  ],
};
