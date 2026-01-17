import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useNotifications } from "./notifications-context";
import { useSound } from "~/hooks/useSound";
import { useWakeLock } from "~/hooks/useWakeLock";

interface FocuslyContextProps {
  focusTime: number;
  restTime: number;
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

const FOCUS_TIME_DEFAULT = 25 * 60; // 25 minutes
const REST_TIME_DEFAULT = 5 * 60; // 5 minutes

const FocuslyContext = createContext<FocuslyContextProps | undefined>(
  undefined,
);

export const FocuslyProvider = ({ children }: PropsWithChildren) => {
  const { playComplete } = useSound();
  const { sendNotification } = useNotifications();
  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  const [focusTime, setFocusTime] = useState(FOCUS_TIME_DEFAULT);
  const [restTime, setRestTimeState] = useState(REST_TIME_DEFAULT);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const updateTimeLeft = (time: number) => setTimeLeft(time);
  const toggleRunningState = (state: boolean) => setIsRunning(state);

  const resetTimer = useCallback(() => {
    const nextTime = isResting ? restTime : focusTime;
    updateTimeLeft(nextTime);
    toggleRunningState(false);
    releaseWakeLock();
    toast(isResting ? "Rest reset! 🔄" : "Session reset! 🚀");
  }, [releaseWakeLock, isResting, focusTime, restTime]);

  const startTimer = useCallback(() => {
    toggleRunningState(true);
    requestWakeLock();
    toast(isResting ? "Rest started! 😴" : "Session started! 🔥");
  }, [requestWakeLock, isResting]);

  const pauseTimer = useCallback(() => {
    toggleRunningState(false);
    releaseWakeLock();
    toast(isResting ? "Rest paused! ⏸️" : "Session paused! ⏸️");
  }, [releaseWakeLock, isResting]);

  const setCustomTime = useCallback(
    (value: number) => {
      const newFocusTime = value * 60;
      setFocusTime(newFocusTime);
      if (!isResting) updateTimeLeft(newFocusTime);
      toggleRunningState(false);
      releaseWakeLock();
    },
    [releaseWakeLock, isResting],
  );

  const setRestTime = useCallback(
    (value: number) => {
      const newRestTime = value * 60;
      setRestTimeState(newRestTime);
      if (isResting) updateTimeLeft(newRestTime);
    },
    [isResting],
  );

  const handleTimerTick = useCallback(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startNewFocusSession = useCallback(() => {
    setIsResting(false);
    updateTimeLeft(focusTime);
    toast("Rest completed! 🔥");
    sendNotification("Rest completed!", "Back to focus!");
  }, [sendNotification, focusTime]);

  const startRestSession = useCallback(() => {
    setSessionsCompleted((prev) => prev + 1);
    setIsResting(true);
    updateTimeLeft(restTime);
    toast("Session completed! 🎉");
    sendNotification("Focusly session completed!", "Time to take a break 🎉");
  }, [sendNotification, restTime]);

  const skipRestTime = useCallback(() => {
    if (isResting) {
      startNewFocusSession();
      toggleRunningState(true);
      toast("Rest skipped! 🔥");
    }
  }, [isResting, startNewFocusSession]);

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
        focusTime,
        restTime,
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
