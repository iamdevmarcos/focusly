import { useTranslation } from "react-i18next";

interface TimerPresentationProps {
  timeLeft: string;
  sessionsCompleted: number;
  isRunning: boolean;
  isResting: boolean;
  onReset: () => void;
  onPause: () => void;
  skipRestTime: () => void;
  startTimer: () => void;
  showSessionCompletedMessage: boolean;
  showFocusButton: boolean;
  showRestControls: boolean;
  showStartRestButton: boolean;
}

const ActionButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className="scale-100 rounded-sm border border-focusly-text-gray bg-focusly-gradient px-8 py-4 text-focusly-normal font-semibold text-focusly-text-gray opacity-100 transition-opacity duration-300 ease-out hover:border-focusly-bg-dark hover:bg-focusly-gradient-white hover:text-focusly-bg-dark"
  >
    {children}
  </button>
);

export const TimerPresentation = ({
  timeLeft,
  sessionsCompleted,
  skipRestTime,
  startTimer,
  showSessionCompletedMessage,
  showFocusButton,
  showRestControls,
  showStartRestButton,
}: TimerPresentationProps) => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center gap-8 text-focusly-heading">
      <h1>{timeLeft}</h1>

      {showSessionCompletedMessage && (
        <p className="animate-fadeIn text-focusly-medium transition-opacity duration-500 ease-in-out">
          {`${t("sessions_completed")} -> ${sessionsCompleted} 🥳`}
        </p>
      )}

      {showFocusButton && (
        <div className="flex items-center gap-4">
          <ActionButton onClick={startTimer}>Iniciar foco 🔥</ActionButton>
        </div>
      )}

      {showRestControls && (
        <div className="flex items-center gap-4">
          <ActionButton onClick={skipRestTime}>Pular descanso</ActionButton>
          {showStartRestButton && (
            <ActionButton onClick={startTimer}>Iniciar descanso</ActionButton>
          )}
        </div>
      )}
    </main>
  );
};
