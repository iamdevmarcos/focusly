import { IoSettingsOutline } from "react-icons/io5";
import { BsCommand } from "react-icons/bs";
import { Button } from "./button";
import { useKBar } from "kbar";

export const Header = () => {
  const { query } = useKBar();

  return (
    <div className="flex w-screen flex-row items-center justify-between px-20">
      <img
        src="/images/logo-transparent.png"
        alt="Logo Focusly"
        className="h-20 w-20"
      />

      <div className="relative flex items-center gap-4">
        <div className="relative">
          <Button
            data-ripple-light="true"
            data-tooltip-target="tooltip-animation"
            onClick={query.toggle}
            icon={<BsCommand className="h-8 w-8" />}
          />

          <div
            data-tooltip="tooltip-animation"
            data-tooltip-mount="opacity-100 scale-100"
            data-tooltip-unmount="opacity-0 scale-0 pointer-events-none"
            data-tooltip-transition="transition-all duration-200 origin-top"
            className="absolute z-50 whitespace-nowrap rounded-md border border-focusly-text-gray bg-focusly-gradient px-4 py-2 font-sans text-sm font-normal text-focusly-text-white focus:outline-none"
          >
            control + k
          </div>
        </div>

        <Button icon={<IoSettingsOutline className="h-8 w-8" />} />
      </div>
    </div>
  );
};
