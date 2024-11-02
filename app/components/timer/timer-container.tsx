import { useHotkeys } from "react-hotkeys-hook";
import { useFocusly } from "~/context/focusly-context";
import { formatMinutes } from "~/helpers/formatTime";
import { TimerPresentation } from "./timer-presentation";

export const TimerContainer = () => {
  const {
    timeLeft,
    startTimer,
    resetTimer,
    pauseTimer,
    isRunning,
    sessionsCompleted,
  } = useFocusly();

  useHotkeys("R", resetTimer);
  useHotkeys(" ", isRunning ? pauseTimer : startTimer); // backspace key
  useHotkeys("meta+enter", () => window.alert("Criar tarefa"));

  const formattedTimeLeft = formatMinutes(timeLeft);

  return (
    <TimerPresentation
      timeLeft={formattedTimeLeft}
      sessionsCompleted={sessionsCompleted}
      isRunning={isRunning}
      onReset={resetTimer}
      onPause={pauseTimer}
    />
  );
};
