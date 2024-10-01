import logoutDoor from "../../assets/images/logoutDoor.png";

interface AddLogouteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const LogoutModal: React.FC<AddLogouteModalProps> = ({
  show,
  onClose,
  onConfirm,
  message,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-96 bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl min-h-1/4">
        <div className="bg-primary p-4 flex justify-center rounded-b-lg h-52">
          <img src={logoutDoor} alt="Warning" className="p-10" />
        </div>
        <div className="p-6">
          <p className="text-3xl font-medium text-primary text-center mt-5">
            Sign out
          </p>
          <p className="text-lg text-gray-700 text-center mb-8 mt-2">
            Are you sure you would like to sign out of your account?
          </p>

          <div className="flex justify-center gap-6 mt-10 my-10">
            <button
              onClick={onConfirm}
              className="bg-primary text-white px-6 py-4 text-lg rounded-xl hover:opacity-70 duration-200 w-full"
            >
              Sign out
            </button>
            <button
              onClick={onClose}
              className="ring-1 ring-primary px-6 py-4 text-lg text-primary rounded-xl w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
