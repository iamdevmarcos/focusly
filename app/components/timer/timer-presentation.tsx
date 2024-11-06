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
}

export const TimerPresentation = ({
  timeLeft,
  sessionsCompleted,
  isRunning,
  isResting,
  skipRestTime,
  startTimer,
}: TimerPresentationProps) => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center gap-8 text-focusly-heading">
      <h1>{timeLeft}</h1>

      {isRunning && !isResting && (
        <p className="animate-fadeIn text-focusly-medium transition-opacity duration-500 ease-in-out">
          {`${t("sessions_completed")} -> ${sessionsCompleted} 🥳`}
        </p>
      )}

      {sessionsCompleted >= 1 && isResting && (
        <div className="flex items-center gap-4">
          <button
            onClick={skipRestTime}
            className="hover:bg-focusly-gradient-white scale-100 rounded-sm border border-focusly-text-gray bg-focusly-gradient px-8 py-4 text-focusly-normal font-semibold text-focusly-text-gray opacity-100 transition-opacity duration-300 ease-out hover:border-focusly-bg-dark hover:text-focusly-bg-dark"
          >
            Pular descanso
          </button>

          {!isRunning && (
            <button
              onClick={startTimer}
              className="hover:bg-focusly-gradient-white scale-100 rounded-sm border border-focusly-text-gray bg-focusly-gradient px-8 py-4 text-focusly-normal font-semibold text-focusly-text-gray opacity-100 transition-opacity duration-300 ease-out hover:border-focusly-bg-dark hover:text-focusly-bg-dark"
            >
              Iniciar descanso
            </button>
          )}
        </div>
      )}
    </main>
  );
};
