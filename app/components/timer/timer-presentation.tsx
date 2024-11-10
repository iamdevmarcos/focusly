/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
  showFocusButtonMobile: boolean;
  showFocusButtonDesktop: boolean;
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
    className="scale-100 rounded-sm border border-focusly-text-gray bg-focusly-gradient px-6 py-4 text-focusly-normal font-semibold text-focusly-text-gray opacity-100 transition-opacity duration-300 ease-out hover:border-focusly-bg-dark hover:bg-focusly-gradient-white hover:text-focusly-bg-dark md:px-8 md:py-4"
  >
    {children}
  </button>
);

export const TimerPresentation = ({
  timeLeft,
  sessionsCompleted,
  isRunning,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isResting,
  skipRestTime,
  startTimer,
  onPause,
  showSessionCompletedMessage,
  showFocusButtonMobile,
  showFocusButtonDesktop,
  showRestControls,
  showStartRestButton,
}: TimerPresentationProps) => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center text-[70px] font-semibold md:gap-8 md:text-focusly-heading">
      <h1 onClick={isRunning ? onPause : startTimer}>{timeLeft}</h1>

      {showSessionCompletedMessage && (
        <p className="animate-fadeIn text-focusly-normal transition-opacity duration-500 ease-in-out md:text-focusly-medium">
          {`${t("sessions_completed")} -> ${sessionsCompleted} 🥳`}
        </p>
      )}

      <div
        className={`flex items-center gap-4 ${
          showFocusButtonMobile ||
          (showFocusButtonDesktop && !showSessionCompletedMessage)
            ? "block"
            : "hidden"
        } md:${showFocusButtonDesktop && !showSessionCompletedMessage ? "flex" : "hidden"}`}
      >
        <ActionButton onClick={startTimer}>{t("startFocus")}</ActionButton>
      </div>

      {showRestControls && (
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <ActionButton onClick={skipRestTime}>
            {t("skipRestFocus")}
          </ActionButton>
          {showStartRestButton && (
            <ActionButton onClick={startTimer}>
              {t("startRestFocus")}
            </ActionButton>
          )}
        </div>
      )}
    </main>
  );
};
