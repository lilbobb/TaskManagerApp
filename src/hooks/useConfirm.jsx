import { useRef, useCallback } from "react";

export const useConfirm = () => {
  const ref = useRef(null);

  const confirmAction = useCallback((message, onConfirm) => {
    if (window.confirm(message)) {
      onConfirm();
    }
  }, []);

  const getConfirmation = (message, onConfirm) => {
    return () => confirmAction(message, onConfirm);
  };

  return { getConfirmation, ref };
};
