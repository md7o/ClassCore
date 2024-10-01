import React from "react";
import bin from "../../../../assets/images/trash.png";
import pencil from "../../../../assets/images/pen.png";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

interface Student {
  studentName: string;
  dob: string;
  gender: string;
  country: string;
  collegeMajor: string;
  phone: string;
}

type TableHeader = {
  label: string;
  key: keyof Student | "actions";
};

interface StudentsTableDataProps {
  lang: string;
}

const TableDashboard: React.FC<StudentsTableDataProps> = ({ lang }) => {
  const { t, i18n } = useTranslation();

  const tableHeaders: TableHeader[] = [
    { label: t("Student_Name"), key: "studentName" },
    { label: t("Date_of_Birth"), key: "dob" },
    { label: t("Gender"), key: "gender" },
    { label: t("Country"), key: "country" },
    { label: t("College Major"), key: "collegeMajor" },
    { label: t("Phone"), key: "phone" },
    { label: t("Actions"), key: "actions" }, // Actions for edit/delete
  ];

  // Table rows as dynamic data
  const tableRows = [
    {
      studentName: "Mohammed Ayman",
      dob: "2004/04/10",
      gender: "Male",
      country: "Syria",
      collegeMajor: "Computer Science",
      phone: "0551227021",
    },
    {
      studentName: "Jane Doe",
      dob: "1995/12/01",
      gender: "Female",
      country: "USA",
      collegeMajor: "Mathematics",
      phone: "9876543210",
    },
  ];

  // const [data, setData] = useState<Student[]>([]);
  // const [isSearch, setIsSearch] = useState<string>("");
  // const [showModal, setShowModal] = useState(false);
  // const [studentDataToEdit, setStudentDataToEdit] = useState<Student | null>(
  //   null
  // );
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [studentIdToDelete, setStudentIdToDelete] = useState<string | null>(
  //   null
  // );
  // const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [birthDateFilter, setBirthDateFilter] = useState<Date | null>(null);
  // const [dateComparison, setDateComparison] = useState<string>("Equal_to");

  // const filteredData = data.filter((item) => {
  //   const itemDate = new Date(item.birthDate);
  //   const filterDate = birthDateFilter ? new Date(birthDateFilter) : null;

  //   const matchesName =
  //     item.firstName.toLowerCase().includes(isSearch.toLowerCase()) ||
  //     item.lastName.toLowerCase().includes(isSearch.toLowerCase());

  //   const matchesBirthDate = birthDateFilter
  //     ? filterDate &&
  //       {
  //         Equal_to: itemDate.toDateString() === filterDate.toDateString(),
  //         Greater_than: itemDate > filterDate,
  //         Less_than: itemDate < filterDate,
  //       }[dateComparison] // dateComparison should be the value of your select dropdown
  //     : true;

  //   return matchesName && matchesBirthDate;
  // });

  // const handleNextPage = () => {
  //   if (currentPage < Math.ceil(data.length / rowsPerPage)) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  //   const indexOfLastStudent = currentPage * rowsPerPage;
  //   const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  //   const currentStudents = filteredData.slice(
  //     indexOfFirstStudent,
  //     indexOfLastStudent
  //   );

  // const handleOpenModalForEdit = (studentData: Student) => {
  //   setStudentDataToEdit(studentData);
  //   setShowModal(true);
  // };

  // const handleDeleteClick = (id: string) => {
  //   setStudentIdToDelete(id);
  //   setShowDeleteModal(true);
  // };

  return (
    <div>
      <div className="lg:block hidden ">
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
            {tableRows.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                  {row.studentName}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                  {row.dob}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                  {row.gender}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                  {row.country}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                  {row.collegeMajor}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                  {row.phone}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-gray-900">
                  <div className="flex gap-3 w-16">
                    <button className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300">
                      <img src={bin} alt="delete" className="" />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300">
                      <img src={pencil} alt="edit" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden block">
        {tableRows.map((row, rowIndex) => (
          <div key={rowIndex}>
            <div className=" rounded-lg shadow-md md:px-14 px-0">
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
                        <div className="flex gap-3">
                          <button className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300">
                            <img src={pencil} alt="edit" className="w-5 h-5" />
                          </button>
                          <button className="text-red-500 hover:text-red-700 hover:scale-95 hover:brightness-75 duration-300">
                            <img src={bin} alt="delete" className="w-5 h-5" />
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
            {rowIndex < tableRows.length - 1 && (
              <hr className="my-4 border-gray-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableDashboard;
