import { IoSettingsOutline } from "react-icons/io5";
import { BsCommand } from "react-icons/bs";
import { Button } from "./button";

export const Header = () => {
  return (
    <div className="flex w-screen flex-row items-center justify-between px-20">
      <img src="/images/logo.png" alt="Logo Focusly" className="h-20 w-20" />

      <div className="flex items-center gap-4">
        <Button icon={<BsCommand className="h-8 w-8" />} />
        <Button icon={<IoSettingsOutline className="h-8 w-8" />} />
      </div>
    </div>
  );
};
