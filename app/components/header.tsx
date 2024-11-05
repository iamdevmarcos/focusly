import { IoSettingsOutline } from "react-icons/io5";
import { BsCommand } from "react-icons/bs";
import { Button } from "./button";
import { useKBar } from "kbar";

export const Header = () => {
  const { query } = useKBar();

  return (
    <>
      <div className="flex w-screen flex-row items-center justify-between px-20">
        <img
          src="/images/logo-transparent.png"
          alt="Logo Focusly"
          className="h-20 w-20"
        />

        <div className="flex items-center gap-4">
          <Button
            onClick={query.toggle}
            icon={<BsCommand className="h-8 w-8" />}
          />
          <Button icon={<IoSettingsOutline className="h-8 w-8" />} />
        </div>
      </div>
    </>
  );
};
