import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useNotifications } from "./notifications-context";
import { useSound } from "~/hooks/useSound";
import { useWakeLock } from "~/hooks/useWakeLock";

interface FocuslyContextProps {
  timeLeft: number;
  isRunning: boolean;
  sessionsCompleted: number;
  isResting: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setCustomTime: (value: number) => void;
  setRestTime: (value: number) => void;
  skipRestTime: () => void;
}

const FOCUS_TIME_DEFAULT = 0.2 * 60; // 25 minutes
const REST_TIME_DEFAULT = 0.1 * 60; // 5 minutes

const FocuslyContext = createContext<FocuslyContextProps | undefined>(
  undefined,
);

export const FocuslyProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const { playComplete } = useSound();
  const { sendNotification } = useNotifications();
  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME_DEFAULT);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTimeState] = useState(REST_TIME_DEFAULT);

  const updateTimeLeft = (time: number) => setTimeLeft(time);
  const toggleRunningState = (state: boolean) => setIsRunning(state);

  const resetTimer = useCallback(() => {
    const nextTime = isResting ? restTime : FOCUS_TIME_DEFAULT;
    updateTimeLeft(nextTime);
    toggleRunningState(false);
    releaseWakeLock();
    toast(t(isResting ? "rest_reset" : "session_reset"));
  }, [releaseWakeLock, t, isResting, restTime]);

  const startTimer = useCallback(() => {
    toggleRunningState(true);
    requestWakeLock();
    toast(t(isResting ? "rest_started" : "session_started"));
  }, [requestWakeLock, t, isResting]);

  const pauseTimer = useCallback(() => {
    toggleRunningState(false);
    releaseWakeLock();
    toast(t(isResting ? "rest_paused" : "session_paused"));
  }, [releaseWakeLock, t, isResting]);

  const setCustomTime = useCallback(
    (value: number) => {
      updateTimeLeft(value * 60);
      toggleRunningState(false);
      releaseWakeLock();
    },
    [releaseWakeLock],
  );

  const setRestTime = useCallback((value: number) => {
    setRestTimeState(value * 60);
  }, []);

  const handleTimerTick = useCallback(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startNewFocusSession = useCallback(() => {
    setIsResting(false);
    updateTimeLeft(FOCUS_TIME_DEFAULT);
    toast(t("rest_completed"));
    sendNotification(t("rest_completed"), t("back_to_focus"));
  }, [t, sendNotification]);

  const startRestSession = useCallback(() => {
    setSessionsCompleted((prev) => prev + 1);
    setIsResting(true);
    updateTimeLeft(restTime);
    toast(t("session_completed"));
    sendNotification(t("focusly_completed"), t("time_to_break"));
  }, [t, sendNotification, restTime]);

  const skipRestTime = useCallback(() => {
    if (isResting) {
      startNewFocusSession();
      toggleRunningState(true);
      toast(t("rest_skipped"));
    }
  }, [isResting, startNewFocusSession, t]);

  useEffect(() => handleTimerTick(), [handleTimerTick]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      if (isResting) {
        startNewFocusSession();
      } else {
        startRestSession();
      }
      toggleRunningState(false);
      playComplete();
    }
  }, [
    timeLeft,
    isRunning,
    isResting,
    playComplete,
    startNewFocusSession,
    startRestSession,
  ]);

  return (
    <FocuslyContext.Provider
      value={{
        isRunning,
        timeLeft,
        sessionsCompleted,
        isResting,
        startTimer,
        pauseTimer,
        resetTimer,
        setCustomTime,
        setRestTime,
        skipRestTime,
      }}
    >
      {children}
    </FocuslyContext.Provider>
  );
};

export const useFocusly = () => {
  const context = useContext(FocuslyContext);
  if (!context) {
    throw new Error("useFocusly must be used within a FocuslyProvider");
  }
  return context;
};
