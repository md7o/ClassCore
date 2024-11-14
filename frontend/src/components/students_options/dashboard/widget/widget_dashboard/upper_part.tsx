import React from "react";
import { useEffect, useState } from "react";
import searchIcon from "../../../../../assets/images/search.png";
import AddStudents from "./add_students";
import axios from "axios";
import plus from "../../../../../assets/images/plus.png";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  lang: string;
}

interface Student {
  _id?: string;
  name: string;
  birth: string;
  country: string;
  college: string;
  status: string;
  phone: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  lang,
}) => {
  const [users, setUsers] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studentDataToEdit, setStudentDataToEdit] = useState<Student | null>(
    null
  );
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setShowModal(false);
    setStudentDataToEdit(null);
  };

  const handleOpenModalForAdd = () => {
    setStudentDataToEdit(null);
    setShowModal(true);
  };

  const addStudent = async (student: Student) => {
    try {
      const response = await axios.post("http://localhost:3000/users", student);

      if (response.status === 201) {
        const addedStudent = response.data;

        setUsers((prevData) => [...prevData, addedStudent]);
        setShowModal(false);
        setStudentDataToEdit(null);
        window.location.reload();
      } else {
        console.error("Failed to add student:", response.status);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div
      className="flex flex-col-reverse lg:flex-row gap-5 justify-between items-center mb-5"
      style={{ direction: lang === "en" ? "rtl" : "ltr" }}
    >
      <AddStudents
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        onAddStudent={addStudent}
        isEditMode={isEditMode}
        studentDataToEdit={studentDataToEdit}
      />
      {/* Search and Add Fields */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
        <div
          className={` ${
            lang === "en"
              ? "flex justify-center items-center"
              : "flex flex-row-reverse justify-between items-center"
          }`}
        >
          <button
            className="w-full flex justify-start items-center text-white text-lg bg-background rounded-xl px-4 py-3 hover:bg-primary shadowing duration-200"
            onClick={handleOpenModalForAdd}
          >
            {lang === "en" ? "Add Student" : "إضافة طالب"}
            <img
              src={plus}
              alt="plus"
              className={`${lang === "en" ? "mx-2" : "ml-3"} w-4`}
            />
          </button>
        </div>
        <div className="relative w-72">
          <img
            src={searchIcon}
            alt="Search icon"
            className={`absolute top-1/2 pointer-events-none ${
              lang === "en" ? "right-3" : "left-3"
            } transform -translate-y-1/2 w-6`}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className={`w-full  py-1 rounded-xl px-5 text-xl ${
              lang === "en" ? "text-left" : "text-right"
            }`}
          />
        </div>
      </div>
      <p className="text-white text-4xl">
        {lang === "en" ? "Students List" : "قائمة الطلاب"}
      </p>
    </div>
  );
};

export default SearchBar;
