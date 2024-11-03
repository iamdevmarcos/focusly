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

interface FocuslyContextProps {
  timeLeft: number;
  isRunning: boolean;
  sessionsCompleted: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setCustomTime: (value: number) => void;
}

const defaultTime = 25 * 60; // 25 minutes

const FocuslyContext = createContext<FocuslyContextProps | undefined>(
  undefined,
);

export const FocuslyProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const { playComplete } = useSound();
  const { sendNotification } = useNotifications();

  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    toast(t("session_started"));
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
    toast(t("session_paused"));
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(defaultTime);
    setIsRunning(false);
    toast(t("session_reset"));
  }, []);

  const setCustomTime = useCallback((value: number) => {
    setTimeLeft(value * 60);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setSessionsCompleted((prev) => prev + 1);
      setIsRunning(false);
      setTimeLeft(defaultTime);

      playComplete();
      toast(t("session_completed"));
      sendNotification(t("focusly_completed"), t("time_to_break"));
    }
  }, [timeLeft, isRunning]);

  return (
    <FocuslyContext.Provider
      value={{
        isRunning,
        timeLeft,
        sessionsCompleted,
        startTimer,
        pauseTimer,
        resetTimer,
        setCustomTime,
      }}
    >
      {children}
    </FocuslyContext.Provider>
  );
};

export const useFocusly = () => {
  const context = useContext(FocuslyContext);
  if (!context)
    throw new Error("useFocusly deve ser usado dentro de um FocuslyProvider");

  return context;
};
