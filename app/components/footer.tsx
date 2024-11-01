import { HotKey } from "./hotkey";

export const Footer = () => {
  return (
    <footer className="mb-5 flex w-screen flex-row items-end justify-between px-20">
      <p className="text-focusly-normal">
        Focusly — by{" "}
        <a
          href="https://github.com/iamdevmarcos"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 hover:text-gray-400"
        >
          @marcosmendes
        </a>{" "}
        🔥
      </p>

      <div className="flex flex-col gap-2.5">
        <HotKey keys={["R"]} description="-> Reset Time" />
        <HotKey keys={["Backspace"]} description="-> Play/Pause" />
        <HotKey keys={["Control", "Enter"]} description="-> Create Task" />
      </div>
    </footer>
  );
};
