import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-20 flex items-center justify-center p-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative transform overflow-hidden rounded-sm border border-focusly-text-secondary bg-focusly-bg text-left shadow-xl sm:w-full sm:max-w-xl"
            >
              <div className="bg-focusly-bg p-6">
                <div className="sm:flex sm:items-start">
                  <div className="w-full text-left sm:mt-0 sm:text-left">
                    <h3
                      className="text-focusly-medium font-semibold text-focusly-text-primary"
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
                className="absolute right-6 top-4 text-focusly-text-primary"
                onClick={closeModal}
              >
                ❌
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Modal);
