import React, { useState, ReactNode, ChangeEvent } from "react";

interface showRegisterModalProps {
  show: boolean;
  onClose: () => void;
  confirm?: () => void;
  children?: ReactNode;
}

const RegisterModal: React.FC<showRegisterModalProps> = ({
  show,
  onClose,
  confirm,
  children,
}) => {
  const [studentName, setStudentName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");

  if (!show) return null;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentName(e.target.value);
  };
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center md:pt-20 bg-black w-full bg-opacity-70 z-50">
      <div className="bg-darkColor rounded-lg overflow-hidden w-full max-w-2xl min-h-1/4">
        <div className="flex justify-between items-center m-5">
          <h1 className="text-4xl text-white">Register</h1>
          <button onClick={onClose} className="text-4xl text-white">
            x
          </button>
        </div>
        <div className="w-2/3 mx-auto p-4 rounded-b-lg h-52">
          <label className="block text-gray-500 font-medium text-md">
            Student Name
          </label>
          <input
            type="text"
            name="firstName"
            value={studentName}
            onChange={handleNameChange}
            className={
              "w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 "
            }
          />
          <label className="block text-gray-500 font-medium text-md">
            Student id
          </label>
          <input
            type="text"
            name="firstName"
            value={studentId}
            onChange={handleIdChange}
            className={
              "w-full px-3 py-3 my-2 border rounded-xl text-black font-medium ring-1 "
            }
          />
        </div>
        <div className="mx-6">
          <div className="flex justify-center gap-6 mt-10 my-10">
            <button
              onClick={confirm}
              className="ring-1 ring-primary px-6 py-4 text-2xl text-primary hover:bg-primary hover:text-white duration-200 rounded-xl w-full"
            >
              Register
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default RegisterModal;
