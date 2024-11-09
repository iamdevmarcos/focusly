/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsCommand } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "../button";
import { Suspense } from "react";
import Modal from "../modal";
import i18n from "~/i18n/config";

interface HeaderPresentationProps {
  query: any;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  tempFocusTime: number;
  setTempFocusTime: (value: number) => void;
  tempRestTime: number;
  setTempRestTime: (value: number) => void;
  applySettings: () => void;
}

const HeaderPresentation = ({
  query,
  isOpen,
  openModal,
  closeModal,
  tempFocusTime,
  setTempFocusTime,
  tempRestTime,
  setTempRestTime,
  applySettings,
}: HeaderPresentationProps) => (
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

      <Button
        icon={<IoSettingsOutline className="h-8 w-8" />}
        onClick={openModal}
      />

      <Suspense fallback={null}>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title={i18n.t("config.title")}
        >
          <div className="flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <label htmlFor="focusTime" className="text-focusly-text-white">
                {i18n.t("config.focus_time")}
              </label>
              <input
                id="focusTime"
                type="number"
                min="1"
                value={tempFocusTime}
                onChange={(e) =>
                  setTempFocusTime(parseInt(e.target.value, 10) || 1)
                }
                placeholder="Enter focus time"
                className="peer rounded-md border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="restTime" className="text-focusly-text-white">
                {i18n.t("config.rest_time")}
              </label>
              <input
                id="restTime"
                type="number"
                min="1"
                value={tempRestTime}
                onChange={(e) =>
                  setTempRestTime(parseInt(e.target.value, 10) || 1)
                }
                placeholder="Enter rest time"
                className="peer rounded-md border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <label htmlFor="language" className="text-focusly-text-white">
                {i18n.t("config.languageTitle")}:
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-focusly-text-white">
                  <input
                    type="radio"
                    name="language"
                    value="pt"
                    checked={i18n.language === "pt"}
                    onChange={() => i18n.changeLanguage("pt")}
                    className="appearance-none rounded-sm border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out checked:border-transparent checked:bg-gray-500"
                  />
                  {i18n.t("config.portuguese")}
                </label>
                <label className="flex items-center gap-2 text-focusly-text-white">
                  <input
                    type="radio"
                    name="language"
                    value="en"
                    checked={i18n.language === "en"}
                    onChange={() => i18n.changeLanguage("en")}
                    className="appearance-none rounded-sm border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out checked:border-transparent checked:bg-gray-500"
                  />
                  {i18n.t("config.english")}
                </label>
              </div>
            </div>

            <button
              onClick={applySettings}
              className="scale-100 rounded-sm border border-focusly-text-gray bg-focusly-gradient px-8 py-4 text-focusly-normal font-semibold text-focusly-text-gray opacity-100 transition-opacity duration-300 ease-out hover:border-focusly-bg-dark hover:bg-focusly-gradient-white hover:text-focusly-bg-dark"
            >
              {i18n.t("config.button")}
            </button>
          </div>
        </Modal>
      </Suspense>
    </div>
  </div>
);

export default HeaderPresentation;
