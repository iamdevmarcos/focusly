import { useHotkeys } from "react-hotkeys-hook";
import { useFocusly } from "~/context/focusly-context";
import { formatMinutes } from "~/helpers/formatTime";
import { TimerPresentation } from "./timer-presentation";
import { useEffect } from "react";
import { useNotifications } from "~/context/notifications-context";

export const TimerContainer = () => {
  const { showNotificationPrompt } = useNotifications();

  const {
    timeLeft,
    startTimer,
    resetTimer,
    pauseTimer,
    isRunning,
    sessionsCompleted,
  } = useFocusly();

  useEffect(() => {
    if (isRunning) showNotificationPrompt();
  }, [showNotificationPrompt, isRunning]);

  useHotkeys("R", resetTimer);
  useHotkeys(" ", isRunning ? pauseTimer : startTimer); // backspace key
  useHotkeys("meta+enter", () => window.alert("Criar tarefa"));

  return (
    <TimerPresentation
      timeLeft={formatMinutes(timeLeft)}
      sessionsCompleted={sessionsCompleted}
      isRunning={isRunning}
      onReset={resetTimer}
      onPause={pauseTimer}
    />
  );
};
