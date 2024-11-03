import { useCallback, useEffect, useState } from "react";

export const useWakeLock = () => {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  const requestWakeLock = useCallback(async () => {
    try {
      if ("wakeLock" in navigator && !wakeLock) {
        const newWakeLock = await navigator.wakeLock.request("screen");
        setWakeLock(newWakeLock);

        console.log("Wake Lock is active");

        newWakeLock.addEventListener("release", () => {
          console.log("Wake Lock was released");
          setWakeLock(null);
        });
      }
    } catch (err) {
      console.error(`Failed to request Wake Lock: ${err}`);
    }
  }, [wakeLock]);

  const releaseWakeLock = useCallback(async () => {
    if (wakeLock) {
      try {
        await wakeLock.release();
        setWakeLock(null);
        console.log("Wake Lock is released");
      } catch (err) {
        console.error(`Failed to release Wake Lock: ${err}`);
      }
    }
  }, [wakeLock]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && !wakeLock) {
        await requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [requestWakeLock, wakeLock]);

  return { requestWakeLock, releaseWakeLock };
};
