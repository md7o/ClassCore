import React, { ReactNode } from "react";

import warning from "../../assets/images/warning.png";

interface AddDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  warningMessage?: string;
}

const DeleteModal: React.FC<AddDeleteModalProps> = ({
  show,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Are you sure you want to delete this student's information?",
  warningMessage = "This action cannot be undone.",
}) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-start pt-80 bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl min-h-1/4">
        <div className="bg-red-500 p-4 flex justify-center rounded-b-lg h-52">
          <img src={warning} alt="Warning" className="p-10" />
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-medium text-red-500 text-center mt-5">
            {title}
          </h2>
          <p className="text-lg text-gray-700 text-center mt-8">{message}</p>
          <p className="text-lg text-red-500 text-center mt-4">
            {warningMessage}
          </p>
          <div className="flex justify-center gap-6 mt-10 my-10">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-6 py-4 text-lg rounded-xl hover:bg-red-600 w-full"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="ring-1 ring-red-500 text-red-500 px-6 py-4 text-lg rounded-xl w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
