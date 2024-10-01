import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import AddStudents from "./add_students";
import search from "../../../../assets/images/search.png";
import calendar from "../../../../assets/images/calendar.png";
import plus from "../../../../assets/images/plus.png";
import filter from "../../../../assets/images/filter.png";
import spin from "../../../../assets/images/loading.png";
import DeleteModal from "../../../modal/delete_modal";
import { useTranslation } from "react-i18next";
// import { getCookie } from "../../../../utils/cookieUtils";

interface Student {
  id?: string;
  studentName: string;
  birthDate: string;
  collegeMajor: string;
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [birthDateFilter, setBirthDateFilter] = useState<Date | null>(null);
  const [isSearch, setIsSearch] = useState<string>("");
  const [studentIdToDelete, setStudentIdToDelete] = useState<string | null>(
    null
  );
  const [dateComparison, setDateComparison] = useState<string>("Equal_to");
  const datePickerRef = useRef<DatePicker | null>(null);

  const handleOpenModalForAdd = () => {
    setStudentDataToEdit(null);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setStudentDataToEdit(null);
  };
  const confirmDelete = () => {
    if (studentIdToDelete) {
      handleDeleteStudent(studentIdToDelete);
      setShowDeleteModal(false);
    } else {
      console.error("Student ID is null or undefined.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const searchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearch(e.target.value);
  };
  const handleComparisonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateComparison(e.target.value);
  };

  // { Add Student } ==================================================
  const addStudent = async (studentData: Student) => {
    // const token = getCookie("authToken");

    try {
      await axios.post(
        "https://taxiapp.easybooks.me:8283/Student/Add",
        {
          studentName: studentData.studentName,
          birthDate: studentData.birthDate,
          collegeMajor: studentData.collegeMajor,
          country: studentData.country,
          phone: studentData.phone,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer `,
            "Content-Type": "application/json",
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // { Edit Student } ==================================================
  const handleEditStudent = async (updatedStudentData: Student) => {
    // const token = getCookie("authToken");

    try {
      await axios.put(
        "https://taxiapp.easybooks.me:8283/Student/Edit",
        {
          studentName: updatedStudentData.studentName,
          birthDate: updatedStudentData.birthDate,
          collegeMajor: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          country: updatedStudentData.country,
          phone: updatedStudentData.phone,
          id: updatedStudentData.id,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer `,
            "Content-Type": "application/json",
          },

          params: {
            Id: updatedStudentData.id,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // { Delete Student } ==================================================
  const handleDeleteStudent = async (id: string) => {
    const url = "https://taxiapp.easybooks.me:8283/Student/Remove";
    // const token = getCookie("authToken");

    try {
      await axios.delete(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer `,
        },
        params: {
          Id: id,
        },
      });

      setData((prevData) => prevData.filter((student) => student.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="">
      {/* <p className="text-3xl font-semibold">{t("Students_Data")}</p> */}

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
              ? "flex justify-between items-center"
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

          <DeleteModal
            show={showDeleteModal}
            onClose={cancelDelete}
            onConfirm={confirmDelete}
            // message="Are you sure you want to delete this student?"
          />

          <AddStudents
            showModal={showModal}
            handleCloseModal={() => setShowModal(false)}
            onAddStudent={addStudent}
            isEditMode={!!studentDataToEdit}
            onEditStudent={handleEditStudent}
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
            className="border-transparent  text-lg bg-transparent text-white focus:outline-none cursor-pointer w-28"
          />
        </div>
        {/* <select
                name="dateComparison"
                value={dateComparison}
                onChange={handleComparisonChange}
                className=" outline-none text-lg text-gray-700 mr-2"
                >
                <option value="Equal_to">{t("Equal_to")}</option>
                <option value="Greater_than">{t("Greater_than")}</option>
                <option value="Less_than">{t("Less_than")}</option>
                </select>
                
                <div className="h-8 w-0.5 bg-gray-500 opacity-20 mx-4" /> */}
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
            className=" py-2 rounded-xl px-5 text-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default UpperDashboard;
