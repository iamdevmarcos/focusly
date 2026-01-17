import { Suspense } from "react";
import { Github, Settings } from "lucide-react";
import { Button } from "../button";
import Modal from "../modal";
import { ThemeSwitcher } from "../theme-switcher";

interface HeaderPresentationProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  tempFocusTime: number | undefined;
  setTempFocusTime: (value: number | undefined) => void;
  tempRestTime: number | undefined;
  setTempRestTime: (value: number | undefined) => void;
  applySettings: () => void;
}

const HeaderPresentation = ({
  isOpen,
  openModal,
  closeModal,
  tempFocusTime,
  setTempFocusTime,
  tempRestTime,
  setTempRestTime,
  applySettings,
}: HeaderPresentationProps) => {

  return (
    <div className="flex w-screen flex-row items-center justify-between px-6 md:px-20">
      <img
        src="/images/logo-transparent.png"
        alt="Logo Focusly"
        className="h-[70px] w-[70px] md:h-20 md:w-20"
      />

      <div className="relative flex items-center gap-2">
        <ThemeSwitcher />

        <Button
          onClick={() =>
            window.open("https://github.com/iamdevmarcos", "_blank")
          }
          icon={<Github className="h-7 w-7" strokeWidth={1.5} />}
        />

        <Button
          icon={<Settings className="h-7 w-7" strokeWidth={1.5} />}
          onClick={openModal}
        />

        <Suspense fallback={null}>
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            title="Settings ⚙️"
          >
            <div className="flex flex-col justify-between gap-4">
              <div className="flex flex-col items-stretch justify-between gap-2 md:flex-row md:items-center md:gap-0">
                <label
                  htmlFor="focusTime"
                  className="text-left text-focusly-text-primary"
                >
                  Focus time (min):
                </label>
                <input
                  id="focusTime"
                  type="number"
                  value={tempFocusTime}
                  onChange={(e) =>
                    setTempFocusTime(parseInt(e.target.value, 10) || undefined)
                  }
                  placeholder="Enter focus time"
                  className="peer rounded-md border border-focusly-text-secondary bg-focusly-bg px-4 py-2 text-focusly-text-primary transition-all duration-200 ease-in-out"
                />
              </div>

              <div className="flex flex-col items-stretch justify-between gap-2 md:flex-row md:items-center md:gap-0">
                <label
                  htmlFor="restTime"
                  className="text-left text-focusly-text-primary"
                >
                  Rest time (min):
                </label>
                <input
                  id="restTime"
                  type="number"
                  value={tempRestTime}
                  onChange={(e) =>
                    setTempRestTime(parseInt(e.target.value, 10) || undefined)
                  }
                  placeholder="Enter rest time"
                  className="peer rounded-md border border-focusly-text-secondary bg-focusly-bg px-4 py-2 text-focusly-text-primary transition-all duration-200 ease-in-out"
                />
              </div>

              <button
                onClick={applySettings}
                className="scale-100 rounded-sm border border-focusly-text-secondary bg-focusly-bg px-8 py-4 text-focusly-normal font-semibold text-focusly-text-secondary opacity-100 transition-all duration-300 ease-out hover:bg-[image:var(--focusly-gradient-hover)] hover:text-focusly-text-primary"
              >
                Update settings
              </button>
            </div>
          </Modal>
        </Suspense>
      </div>
    </div>
  );
};

export default HeaderPresentation;
