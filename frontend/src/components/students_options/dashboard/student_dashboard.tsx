import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddStudents from "./widget/widget_dashboard/add_students";
import SearchBar from "./widget/widget_dashboard/upper_part";
import StudentList from "./widget/widget_dashboard/table_title";
import DeleteModal from "../../../components/modal/delete_modal";
import "react-datepicker/dist/react-datepicker.css";

interface Student {
  _id?: string;
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

const TableDashboard: React.FC<StudentsTableDataProps> = ({ lang }) => {
  const [users, setUsers] = useState<Student[]>([]);
  const [studentIdToDelete, setStudentIdToDelete] = useState<string | null>(
    null
  );
  const [lodaing, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [texts, setTexts] = useState<string>("");
  const [studentDataToEdit, setStudentDataToEdit] = useState<Student | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const loadingTimeouts: NodeJS.Timeout[] = [];

    [
      "Lodaing Data...",
      "Warming up the engines...",
      "That may take some time...",
      "Fetching information, please wait...",
      "Hold on, we're getting things ready...",
      "Almost ready, please stand by..",
      "Loading... Almost there!",
      "Don’t go anywhere, we’re almost done...",
    ].forEach((text, i) => {
      const loadingTimeout = setTimeout(() => {
        setTexts(text);
      }, 4000 * i);

      loadingTimeouts.push(loadingTimeout);
    });

    return () => {
      loadingTimeouts.forEach((id) => clearTimeout(id));
    };
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://classcore.onrender.com/users");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError("Error fetching users: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (userId: string) => {
    navigate(`/user_setting_page/${userId}`);
  };

  const handleDeleteClick = (id: string) => {
    setStudentIdToDelete(id);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setShowModal(false);
    setStudentDataToEdit(null);
  };

  const handleConfirmDelete = async () => {
    try {
      if (users.findIndex((user) => user._id === studentIdToDelete) < 3) {
        setIsModalVisible(false);
        setStudentIdToDelete(null);
        return;
      }

      const response = await axios.delete(
        `https://classcore.onrender.com/users/${studentIdToDelete}`
      );
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== studentIdToDelete)
        );
        setIsModalVisible(false);
        setStudentIdToDelete(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting the user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditStudent = (id: string) => {
    const studentToEdit = users.find((user) => user._id === id);
    if (studentToEdit) {
      setStudentDataToEdit(studentToEdit);
      setIsEditMode(true);
      setShowModal(true);
    }
  };

  const printAlert = () => {
    alert("The data has been updated successfully");
  };

  const handleEditUser = async (updateData: Partial<Student>) => {
    setLoading(true);
    try {
      if (users.findIndex((user) => user._id === studentDataToEdit!._id) < 3) {
        setShowModal(false);
        setStudentDataToEdit(null);
        return;
      }

      const response = await axios.patch(
        `https://classcore.onrender.com/users/${studentDataToEdit!._id}`,
        updateData
      );
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === studentDataToEdit!._id
              ? { ...user, ...updateData }
              : user
          )
        );
        setShowModal(false);
        setStudentDataToEdit(null);
        printAlert();
      }
    } catch (error) {
      console.error("Error updating the user:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (lodaing)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50 ">
        <div className="w-14 h-14 border-8 border-t-primary border-gray-300 rounded-full animate-spin" />
        <p className="text-white text-xl py-5">{texts}</p>
      </div>
    );

  if (error)
    return <div className=" text-white text-3xl text-center">{error}</div>;

  return (
    <div className="bg-darkColor rounded-xl xl:mx-8 md:p-20 p-10 xl:px-32 px-5">
      <AddStudents
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        onEditStudent={handleEditUser}
        isEditMode={isEditMode}
        studentDataToEdit={studentDataToEdit}
      />
      <DeleteModal
        show={isModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Confirmation"
        message="Are you sure you want to delete this item?"
        warningMessage="This action is irreversible."
      />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        lang={lang}
      />
      <p className="lg:text-left text-center text-gray-300 text-md opacity-40 pb-2">
        The first 3 students cannot be edited or deleted
      </p>
      <StudentList
        students={filteredUsers}
        handleEditStudent={handleEditStudent}
        handleDeleteClick={handleDeleteClick}
        handleUserClick={handleUserClick}
      />
    </div>
  );
};

export default TableDashboard;
