import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useFocusly } from "~/context/focusly-context";
import { formatMinutes } from "~/helpers/formatTime";
import { TimerPresentation } from "./timer-presentation";
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
    isResting,
    skipRestTime,
  } = useFocusly();

  useEffect(() => {
    if (isRunning) showNotificationPrompt();
  }, [showNotificationPrompt, isRunning]);

  useHotkeys("R", resetTimer);
  useHotkeys(" ", isRunning ? pauseTimer : startTimer); // Space key
  useHotkeys("meta+enter", () => window.alert("Criar tarefa"));

  const showSessionCompletedMessage = isRunning && !isResting;
  const showRestControls = sessionsCompleted >= 1 && isResting;
  const showStartRestButton = showRestControls && !isRunning;
  const showFocusButtonDesktop =
    sessionsCompleted >= 1 && !isResting && !isRunning;

  const showFocusButtonMobile =
    !isRunning && !isResting && !showSessionCompletedMessage;

  return (
    <TimerPresentation
      timeLeft={formatMinutes(timeLeft)}
      sessionsCompleted={sessionsCompleted}
      isRunning={isRunning}
      isResting={isResting}
      onReset={resetTimer}
      onPause={pauseTimer}
      skipRestTime={skipRestTime}
      startTimer={startTimer}
      showSessionCompletedMessage={showSessionCompletedMessage}
      showFocusButtonMobile={showFocusButtonMobile}
      showFocusButtonDesktop={showFocusButtonDesktop}
      showRestControls={showRestControls}
      showStartRestButton={showStartRestButton}
    />
  );
};
