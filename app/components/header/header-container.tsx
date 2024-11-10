import { useState } from "react";
import { useKBar } from "kbar";
import { useModal } from "~/hooks/useModal";
import { useFocusly } from "~/context/focusly-context";
import HeaderPresentation from "./header-presentation";

export const HeaderContainer = () => {
  const { query } = useKBar();
  const { isOpen, openModal, closeModal } = useModal();
  const { setCustomTime, setRestTime, focusTime, restTime } = useFocusly();

  const [tempFocusTime, setTempFocusTime] = useState<number | undefined>(
    Math.floor(focusTime / 60),
  );
  const [tempRestTime, setTempRestTime] = useState(Math.floor(restTime / 60));

  const applySettings = () => {
    if (
      tempFocusTime &&
      tempFocusTime > 0 &&
      tempRestTime &&
      tempRestTime > 0
    ) {
      setCustomTime(tempFocusTime);
      setRestTime(tempRestTime);
      closeModal();
    }
  };

  return (
    <HeaderPresentation
      query={query}
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
      tempFocusTime={tempFocusTime}
      setTempFocusTime={setTempFocusTime}
      tempRestTime={tempRestTime}
      setTempRestTime={setTempRestTime}
      applySettings={applySettings}
    />
  );
};

export default HeaderContainer;
