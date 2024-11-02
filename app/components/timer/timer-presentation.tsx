interface TimerPresentationProps {
  timeLeft: string;
  sessionsCompleted: number;
  isRunning: boolean;
  onReset: () => void;
  onPause: () => void;
}

export const TimerPresentation = ({
  timeLeft,
  sessionsCompleted,
  isRunning,
}: TimerPresentationProps) => {
  return (
    <main className="flex flex-col items-center gap-8 text-focusly-heading">
      <h1>{timeLeft}</h1>

      {isRunning && (
        <p
          className={`animate-fadeIn text-focusly-medium transition-opacity duration-500 ease-in-out`}
        >
          {`🚀 Sessões completadas -> ${sessionsCompleted} 🥳`}
        </p>
      )}
    </main>
  );
};
