/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, Suspense } from "react";
import { BsCommand } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "../button";
import Modal from "../modal";
import i18n from "~/i18n/config";
import { useTranslation } from "react-i18next";

interface HeaderPresentationProps {
  query: any;
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
  query,
  isOpen,
  openModal,
  closeModal,
  tempFocusTime,
  setTempFocusTime,
  tempRestTime,
  setTempRestTime,
  applySettings,
}: HeaderPresentationProps) => {
  const { t } = useTranslation();

  const [tempLanguage, setTempLanguage] = useState<string>(i18n.language);

  const handleApplySettings = () => {
    i18n.changeLanguage(tempLanguage);
    applySettings();
  };

  return (
    <div className="flex w-screen flex-row items-center justify-between px-6 md:px-20">
      <img
        src="/images/logo-transparent.png"
        alt="Logo Focusly"
        className="h-[70px] w-[70px] md:h-20 md:w-20"
      />

      <div className="relative flex items-center gap-4">
        <Button
          onClick={query.toggle}
          icon={<BsCommand className="h-8 w-8" />}
        />

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
              <div className="flex flex-col items-stretch justify-between gap-2 md:flex-row md:items-center md:gap-0">
                <label
                  htmlFor="focusTime"
                  className="text-left text-focusly-text-white"
                >
                  {i18n.t("config.focus_time")}
                </label>
                <input
                  id="focusTime"
                  type="number"
                  value={tempFocusTime}
                  onChange={(e) =>
                    setTempFocusTime(parseInt(e.target.value, 10) || undefined)
                  }
                  placeholder={t("rest.input")}
                  className="peer rounded-md border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out"
                />
              </div>

              <div className="flex flex-col items-stretch justify-between gap-2 md:flex-row md:items-center md:gap-0">
                <label
                  htmlFor="restTime"
                  className="text-left text-focusly-text-white"
                >
                  {i18n.t("config.rest_time")}
                </label>
                <input
                  id="restTime"
                  type="number"
                  value={tempRestTime}
                  onChange={(e) =>
                    setTempRestTime(parseInt(e.target.value, 10) || undefined)
                  }
                  placeholder={t("focus_input")}
                  className="peer rounded-md border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out"
                />
              </div>

              <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                <label htmlFor="language" className="text-focusly-text-white">
                  {i18n.t("config.languageTitle")}:
                </label>
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                  <label className="flex items-center gap-2 text-focusly-text-white">
                    <input
                      type="radio"
                      name="language"
                      value="pt"
                      checked={tempLanguage === "pt"}
                      onChange={() => setTempLanguage("pt")}
                      className="appearance-none rounded-sm border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out checked:border-transparent checked:bg-gray-500"
                    />
                    {i18n.t("config.portuguese")}
                  </label>
                  <label className="flex items-center gap-2 text-focusly-text-white">
                    <input
                      type="radio"
                      name="language"
                      value="en"
                      checked={tempLanguage === "en"}
                      onChange={() => setTempLanguage("en")}
                      className="appearance-none rounded-sm border border-focusly-text-gray bg-focusly-bg-dark px-4 py-2 transition-all duration-200 ease-in-out checked:border-transparent checked:bg-gray-500"
                    />
                    {i18n.t("config.english")}
                  </label>
                </div>
              </div>

              <button
                onClick={handleApplySettings}
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
};

export default HeaderPresentation;
