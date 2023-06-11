import { useState } from "preact/hooks";
import { ModalTypeValues } from "src/types/modalTypes";

const useModalStrip = () => {
  const [message, setMessage] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);

  const openModalStrip = (
    modalType: ModalTypeValues,
    message: string,
    time: number
  ) => {
    if (timeInterval) {
      clearTimeout(timeInterval);
    }

    setModalType(modalType);
    setMessage(message);

    setTimeInterval(
      setTimeout(() => {
        setModalType(null);
        setMessage(null);
      }, time)
    );
  };

  return { openModalStrip, message, modalType };
};

export default useModalStrip;
