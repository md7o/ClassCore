import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get userId from URL
import EditStudent from "./edit_user";
import axios from "axios";

interface Student {
  _id: string;
  name: string;
  birth: string;
  country: string;
  college: string;
  status: string;
  phone: string;
}

interface StudentsTableDataProps {
  lang: string;
}

const EditUserStatu: React.FC<StudentsTableDataProps> = ({ lang }) => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =========EDIT MODAL==========
  const [showModal, setShowModal] = useState<boolean>(false);
  const [studentDataToEdit, setStudentDataToEdit] = useState<Student | null>(
    null
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setStudentDataToEdit(null);
  };

  const handleEditStudent = () => {
    if (user) {
      setStudentDataToEdit(user);
      setShowModal(true);
    }
  };

  const handleEditUser = async (updateData: Partial<Student>) => {
    if (!studentDataToEdit) {
      console.error("No student data to edit.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${studentDataToEdit._id}`,
        updateData
      );

      if (response.status === 200) {
        console.log("Update successful:", response.data.message);

        // Update the user state with the updated data
        setUser((prevUser) =>
          prevUser ? { ...prevUser, ...updateData } : prevUser
        );
        window.location.reload();
        setShowModal(false);
        setStudentDataToEdit(null);
      } else {
        console.error("Failed to update user:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error updating the user:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        if (response.status === 200) {
          setUser(response.data);
        } else {
          throw new Error("User not found");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="w-14 h-14 border-8 border-t-primary border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-2xl">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-white">No user data available.</div>;
  }

  return (
    <div>
      <EditStudent
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        onEditStudent={handleEditUser}
        studentDataToEdit={studentDataToEdit}
        fieldsToShow={["status"]}
      />
      {user ? (
        <div className="text-white text-2xl  bg-darkColor rounded-lg p-5 h-smallHplus md:w-biggW w-large">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-3xl font-bold mb-5">
              User Settings
            </h1>
          </div>
          <div className="">
            <p className="mt-3 mb-5">
              <strong>User statu:</strong> {user.status}
            </p>
            <div className="w-full h-hightLine bg-gray-50 my-5" />

            <button
              onClick={handleEditStudent}
              className="bg-blue-600 px-10 py-2 rounded-lg font-bold mx-auto flex"
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <div className="text-white">No user data available.</div>
      )}
    </div>
  );
};

export default EditUserStatu;
