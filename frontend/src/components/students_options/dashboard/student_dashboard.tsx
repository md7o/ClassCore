import React, { useState, useEffect } from "react";
import axios from "axios";
import UpperDashboard from "./widget/widget_dashboard/upper_dashboard";
import TableDashboard from "./widget/widget_dashboard/table_dashboard";
import "react-datepicker/dist/react-datepicker.css";
import LogoutModal from "../../modal/logout_modal";
import { useTranslation } from "react-i18next";

// interface Student {
//   firstName: string;
//   lastName: string;
//   birthDate: string;
//   [key: string]: any;
// }

interface Student {
  _id?: string;
  name: string;
  birth: string;
  college: string;
  country: string;
  status: string;
  phone: string;
}

interface StudentsDataProps {
  lang: string;
}

const StudentsData: React.FC<StudentsDataProps> = ({ lang }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  const [showModal, setShowModal] = useState(false);

  const handleAddStudent = (studentData: any) => {
    console.log("Student Added:", studentData);
    setShowModal(false);
  };

  const handleLogout = () => {
    console.log("User has logged out");
    setShowLogoutModal(false);
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // const filteredData = data.filter((item: Student) => {
  //   const itemDate = new Date(item.birthDate);
  //   const filterDate = birthDateFilter ? new Date(birthDateFilter) : null;

  //   const matchesName =
  //     item.firstName.toLowerCase().includes(isSearch.toLowerCase()) ||
  //     item.lastName.toLowerCase().includes(isSearch.toLowerCase());

  //   const matchesBirthDate = filterDate
  //     ? {
  //         Equal_to: itemDate.toDateString() === filterDate.toDateString(),
  //         Greater_than: itemDate > filterDate,
  //         Less_than: itemDate < filterDate,
  //       }[dateComparison]
  //     : true;

  //   return matchesName && matchesBirthDate;
  // });

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://taxiapp.easybooks.me:8283/Student/GetAll",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    if (lang) {
      i18n.changeLanguage(lang);
    }
    fetchData();
  }, [lang, i18n]);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const indexOfLastStudent = currentPage * rowsPerPage;
  // const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  // const currentStudents = filteredData.slice(
  //   indexOfFirstStudent,
  //   indexOfLastStudent
  // );

  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(filteredData.length / rowsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  return (
    <div className="w-full ">
      <div className="bg-darkColor rounded-xl xl:mx-8 p-20 xl:px-32 px-5 ">
        {/* UpperDashboard */}
        <UpperDashboard
          lang={lang}
          onSetFilteredStudents={setFilteredStudents}
        />
        <div className="bg-gray-200 h-0.5 rounded-full mb-6" />
        {/* TableDashboard */}
        <TableDashboard lang={lang} filteredStudents={filteredStudents} />

        <div
          className={` ${
            lang === "en"
              ? "flex justify-between items-center"
              : "flex flex-row-reverse justify-between items-center"
          }`}
        >
          <div
            className={` ${
              lang === "en"
                ? "flex items-center"
                : "flex flex-row-reverse items-center"
            }`}
          >
            <label
              htmlFor="rowsPerPage"
              className="text-lg text-gray-700 mr-2 font-medium opacity-60"
            >
              {t("Rows_Per_Page")}
            </label>
            <select
              name="rowsPerPage"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="ring-2 px-5 py-1 ring-gray-400 rounded-lg mx-2 text-lg text-gray-700"
            >
              <option value={25}>25</option>
              <option value={15}>15</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
          <LogoutModal
            show={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
            message="Are you sure you want to log out of your account?"
          />
        )}
      </div>
    </div>
  );
};

export default StudentsData;
