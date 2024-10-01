import React, { ReactNode } from "react";
import { AiFillCloseCircle } from "react-icons/ai"; // Corrected import

interface AddModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const AddModal: React.FC<AddModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-20 bg-black bg-opacity-50 z-50">
      <div className="bg-darkColor rounded-lg shadow-xl max-w-3xl w-full relative">
        <div className="w-full h-2 bg-primary rounded-t-lg" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-3xl p-4 text-gray-500 hover:text-white duration-200"
        >
          <AiFillCloseCircle />
        </button>
        {children}
      </div>
    </div>
  );
};

export default AddModal;
