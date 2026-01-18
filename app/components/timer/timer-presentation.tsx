/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { motion, AnimatePresence } from "framer-motion";

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
    className="scale-100 rounded-sm border border-focusly-text-secondary bg-focusly-bg px-6 py-4 text-focusly-normal font-semibold text-focusly-text-secondary opacity-100 transition-all duration-300 ease-out hover:bg-[image:var(--focusly-gradient-hover)] hover:text-focusly-text-primary md:px-8 md:py-4"
  >
    {children}
  </button>
);

export const TimerPresentation = ({
  timeLeft,
  sessionsCompleted,
  isRunning,
  skipRestTime,
  startTimer,
  onPause,
  showSessionCompletedMessage,
  showFocusButtonMobile,
  showFocusButtonDesktop,
  showRestControls,
  showStartRestButton,
}: TimerPresentationProps) => {
  return (
    <main className="flex flex-col items-center text-[70px] font-semibold md:gap-8 md:text-focusly-heading">
      <h1 onClick={isRunning ? onPause : startTimer}>{timeLeft}</h1>

      <AnimatePresence>
        {showSessionCompletedMessage && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-focusly-normal md:text-focusly-medium"
          >
            {`Completed sessions -> ${sessionsCompleted} 🥳`}
          </motion.p>
        )}
      </AnimatePresence>

      {showFocusButtonMobile && (
        <div className={`flex items-center gap-4`}>
          <ActionButton onClick={startTimer}>Start focus 🔥</ActionButton>
        </div>
      )}

      {showFocusButtonDesktop && (
        <div className={`flex items-center gap-4`}>
          <ActionButton onClick={startTimer}>Start focus 🔥</ActionButton>
        </div>
      )}

      {showRestControls && (
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <ActionButton onClick={skipRestTime}>Skip rest</ActionButton>
          {showStartRestButton && (
            <ActionButton onClick={startTimer}>Start rest</ActionButton>
          )}
        </div>
      )}
    </main>
  );
};
