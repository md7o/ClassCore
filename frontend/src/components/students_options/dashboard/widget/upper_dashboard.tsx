import React, { useState, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import AddStudents from "./add_students";
import search from "../../../../assets/images/search.png";
import calendar from "../../../../assets/images/calendar.png";
import plus from "../../../../assets/images/plus.png";
import DeleteModal from "../../../modal/delete_modal";
import { useTranslation } from "react-i18next";

interface Student {
  id?: string;
  name: string;
  birth: string;
  college: string;
  country: string;
  phone: string;
}

interface StudentsDataProps {
  lang: string;
}

const UpperDashboard: React.FC<StudentsDataProps> = ({ lang }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Student[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [showModal, setShowModal] = useState(false);
  const [studentDataToEdit, setStudentDataToEdit] = useState<Student | null>(
    null
  );
  const [birthDateFilter, setBirthDateFilter] = useState<Date | null>(null);
  const [isSearch, setIsSearch] = useState<string>("");

  const datePickerRef = useRef<DatePicker | null>(null);

  const handleOpenModalForAdd = () => {
    setStudentDataToEdit(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStudentDataToEdit(null);
  };

  const searchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearch(e.target.value);
  };

  // const handleComparisonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // Add future comparison handling if needed
  // };

  // { Add Student } ==================================================
  // Add Student
  const addStudent = async (student: Student) => {
    try {
      const response = await axios.post("http://localhost:3000/users", student);

      if (response.status === 201) {
        const addedStudent = response.data;

        setData((prevData) => [...prevData, addedStudent]);
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
    <div>
      <div
        className={`mb-6 ${
          lang === "en"
            ? "sm:flex sm:flex-row sm:items-center gap-3 flex flex-col items-start"
            : "sm:flex sm:flex-row-reverse sm:items-center gap-3 flex flex-col items-end"
        }`}
      >
        <div
          className={` ${
            lang === "en"
              ? "flex justify-center items-center"
              : "flex flex-row-reverse justify-between items-center"
          }`}
        >
          <button
            className="flex justify-start items-center text-white xl:text-lg text-sm bg-background rounded-xl px-5 py-3 hover:bg-primary shadowing duration-200"
            onClick={handleOpenModalForAdd}
          >
            <img src={plus} alt="plus" className="w-4 ml-2 mr-4" />
            {t("Add_Student")}
          </button>

          <AddStudents
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            onAddStudent={addStudent}
            studentDataToEdit={studentDataToEdit}
          />
        </div>

        <div className="flex justify-center items-center bg-background py-2.5 px-2 rounded-xl shadowing hover:bg-primary duration-300">
          <img src={calendar} alt="Calendar icon" className="w-7 mx-3" />
          <DatePicker
            ref={datePickerRef}
            selected={startDate}
            onChange={(date) => {
              setBirthDateFilter(date);
              setStartDate(date);
            }}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date"
            className="border-transparent text-lg bg-transparent text-white focus:outline-none cursor-pointer w-28"
          />
        </div>

        <div className="relative">
          <img
            src={search}
            alt="Search icon"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6"
          />

          <input
            type="text"
            value={isSearch}
            onChange={searchName}
            placeholder={t("search_place_holder")}
            className="py-2 rounded-xl px-5 text-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default UpperDashboard;
