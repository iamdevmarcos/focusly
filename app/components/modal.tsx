import React, { ReactNode, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: ReactNode;
};

const Modal = ({ isOpen, closeModal, title, children }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
      />
      <div className="fixed inset-0 z-20 flex items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-sm border border-focusly-text-white bg-focusly-bg-dark text-left shadow-xl transition-all sm:w-full sm:max-w-xl">
          <div className="bg-focusly-bg-dark p-6">
            <div className="sm:flex sm:items-start">
              <div className="w-full text-left sm:mt-0 sm:text-left">
                <h3
                  className="text-focusly-medium font-semibold text-focusly-text-white"
                  id="modal-title"
                >
                  {title}
                </h3>
                <hr className="my-4 mt-6" />
                {children}
              </div>
            </div>
          </div>
          <button
            className="absolute right-6 top-4 text-focusly-text-white"
            onClick={closeModal}
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
