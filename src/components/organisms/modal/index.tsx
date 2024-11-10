import React from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

export interface ModalProps {
  children?: JSX.Element;
  buttonIcon?: JSX.Element;
  width?: string;
  className?: string;
  isOpen: boolean;
  onRequestClose?: () => void;
  labelName?: string;
  show: boolean
}

export const CommonModal: React.FC<ModalProps> = ({
  children,
  width,
  labelName,
  isOpen,
  show = false,
  onRequestClose,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: width ? width : "480px",
      border: "none",
      padding: "24px",
      zIndex: "50",
      background: "#2d2d2d",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <>
      <Modal style={customStyles} isOpen={isOpen}>
        <button
          onClick={onRequestClose}
          className={`flex justify-between w-full ${show ? "hidden" :"block"}`}

        >
          <h3 className="text-lg leading-[27px] font-semibold text-white">
            {labelName}
          </h3>{" "}
          <AiOutlineClose size={20} className="text-white" />
        </button>
        {children}
      </Modal>
    </>
  );
};
