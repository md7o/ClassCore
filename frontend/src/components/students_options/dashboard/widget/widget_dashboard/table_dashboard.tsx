import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaList } from "react-icons/fa";
import axios from "axios";
import bin from "../../../../../assets/images/trash.png";
import pencil from "../../../../../assets/images/pen.png";
import DeleteModal from "../../../../modal/delete_modal";
import AddStudents from "./add_students";

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

type TableHeader = {
  label: string;
  key: keyof Student | "actions";
};

interface StudentsTableDataProps {
  lang: string;
  filteredStudents: Student[];
}

const TableDashboard: React.FC<StudentsTableDataProps> = ({
  lang,
  filteredStudents,
}) => {
  const { t, i18n } = useTranslation();
  const [users, setUsers] = useState<Student[]>([]);
  const [studentIdToDelete, setStudentIdToDelete] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUserClick = (userId: string) => {
    navigate(`/user_setting_page/${userId}`);
  };

  // =========DELTE MODAL==========

  const [isModalVisible, setIsModalVisible] = useState(false);

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
      const response = await axios.delete(
        `http://localhost:3000/users/${studentIdToDelete}`
      );

      if (response.status === 200) {
        console.log("Delete successful:", response.data.message);

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== studentIdToDelete)
        );
        setIsModalVisible(false);
        setStudentIdToDelete(null);
      } else {
        console.error("Failed to delete user:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting the user:", error);
    }
  };

  // =========EDIT MODAL==========
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [studentDataToEdit, setStudentDataToEdit] = useState<Student | null>(
    null
  );

  const handleEditStudent = (id: string) => {
    const studentToEdit = users.find((user) => user._id === id);

    if (studentToEdit) {
      setStudentDataToEdit(studentToEdit); // Pass the entire student object
      setIsEditMode(true); // Enable edit mode
      setShowModal(true); // Open the modal
    } else {
      console.error("Student not found");
    }
  };

  const handleEditUser = async (updateData: Partial<Student>) => {
    if (!studentDataToEdit) {
      console.error("No student data to edit.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${studentDataToEdit._id}`, // Use the correct ID
        updateData
      );

      if (response.status === 200) {
        console.log("Update successful:", response.data.message);

        // Update the users list with the updated data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === studentDataToEdit._id
              ? { ...user, ...updateData }
              : user
          )
        );

        window.location.reload();
        setShowModal(false); // Close the modal after editing
        setStudentDataToEdit(null); // Reset the student data
      } else {
        console.error("Failed to update user:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error updating the user:", error);
    }
  };

  const tableHeaders: TableHeader[] = [
    { label: t("Student_Name"), key: "name" },
    { label: t("Date_of_Birth"), key: "birth" },
    { label: t("Country"), key: "country" },
    { label: t("College Major"), key: "college" },
    { label: t("Status"), key: "status" },
    { label: t("Phone"), key: "phone" },
    { label: t("Actions"), key: "actions" },
  ];

  // ====FETCH USERS====
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (row: Student) => {
    if (row._id) {
      // Check if _id is defined
      handleUserClick(row._id);
    } else {
      console.error("User ID is undefined");
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="w-14 h-14 border-8 border-t-primary border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return <div className=" text-white text-3xl text-center">{error}</div>;
  return (
    <div>
      {/* ====EDIT MODAL==== */}
      <AddStudents
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        onEditStudent={handleEditUser}
        isEditMode={isEditMode}
        studentDataToEdit={studentDataToEdit}
      />
      {/* ====DELETE MODAL==== */}
      <DeleteModal
        show={isModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Confirmation"
        message="Are you sure you want to delete this item?"
        warningMessage="This action is irreversible."
      />

      {/* ====DESKTOP RESPONSE==== */}
      <div className="2.5xl:block hidden ">
        <table className="w-full rounded-lg overflow-hidden ">
          <thead>
            <tr
              className={`bg-background text-white py-5 mb-5 rounded-lg uppercase text-xs `}
            >
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className=" px-6 py-3 text-left font-medium tracking-wider"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 text-md">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                    {row.name}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                    {row.birth}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                    {row.country}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                    {row.college}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                    {row.status}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                    {row.phone}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                    <div className="flex gap-3">
                      <button
                        className="text-white bg-green-500 w-6 h-6 p-1 flex justify-center items-center rounded-full hover:text-gray-300 hover:scale-95 hover:brightness-75 duration-300"
                        onClick={() => handleRowClick(row)}
                      >
                        <FaList />
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300 w-6"
                        onClick={() => handleEditStudent(row._id!)} // use edit handler here
                      >
                        <img src={pencil} alt="edit" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 hover:scale-95 hover:brightness-75 duration-300 w-6"
                        onClick={() => handleDeleteClick(row._id!)} // use delete handler here
                      >
                        <img src={bin} alt="delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="text-center text-white"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ====MOBILE RESPONSE==== */}
      <div className="2.5xl:hidden block">
        {users.map((row, rowIndex) => (
          <div key={rowIndex}>
            <div className=" rounded-lg shadow-md  px-0">
              <div className="space-y-2">
                {tableHeaders.map((header, headerIndex) => (
                  <div
                    key={headerIndex}
                    className="flex justify-between py-2 bg-background rounded-lg px-5"
                    style={{ direction: lang === "en" ? "ltr" : "rtl" }}
                  >
                    <p className="font-medium text-white md:text-lg">
                      {header.label}:
                    </p>
                    <p className="text-white font-light md:text-lg">
                      {header.key === "actions" ? (
                        <div className="flex gap-3 ">
                          <button
                            onClick={() => handleRowClick(row)}
                            className="text-white bg-green-500 w-6 h-6 p-1 flex justify-center items-center rounded-full hover:text-gray-300 hover:scale-95 hover:brightness-75 duration-300"
                          >
                            <FaList />
                          </button>
                          <button
                            className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300 w-6"
                            onClick={() => handleRowClick(row)}
                          >
                            <img src={pencil} alt="edit" />
                          </button>

                          <button
                            className="text-red-500 hover:text-red-700 hover:scale-95 hover:brightness-75 duration-300 w-6"
                            onClick={() => handleRowClick(row)}
                          >
                            <img src={bin} alt="delete" />
                          </button>
                        </div>
                      ) : (
                        row[header.key]
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {rowIndex < users.length - 1 && (
              <hr className="my-4 border-gray-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableDashboard;
