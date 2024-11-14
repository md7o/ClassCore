// import React, { useState, useRef, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import AddStudents from "../widget_dashboard/add_students";
// import plus from "../../../../../assets/images/plus.png";

// interface Student {
//   id?: string;
//   name: string;
//   birth: string;
//   college: string;
//   country: string;
//   status: string;
//   phone: string;
// }

// interface StudentsDataProps {
//   lang: string;
//   data: Student[];
//   onSetFilteredStudents: (students: Student[]) => void;
// }

// const UpperDashboard: React.FC<StudentsDataProps> = ({
//   lang,
//   data,
//   onSetFilteredStudents,
// }) => {
//   const { t } = useTranslation();
//   const [users, setUsers] = useState<Student[]>([]);
//   const [startDate, setStartDate] = useState<Date | null>(new Date());
//   const [showModal, setShowModal] = useState(false);
//   const [studentDataToEdit, setStudentDataToEdit] = useState<Student | null>(
//     null
//   );
//   const datePickerRef = useRef<DatePicker | null>(null);

//   const handleOpenModalForAdd = () => {
//     setStudentDataToEdit(null);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setStudentDataToEdit(null);
//   };

//   // { Add Student } ==================================================

//   const addStudent = async (student: Student) => {
//     try {
//       const response = await axios.post("http://localhost:3000/users", student);

//       if (response.status === 201) {
//         const addedStudent = response.data;

//         setUsers((prevData) => [...prevData, addedStudent]);
//         setShowModal(false);
//         setStudentDataToEdit(null);
//         window.location.reload();
//       } else {
//         console.error("Failed to add student:", response.status);
//       }
//     } catch (error) {
//       console.error("Error adding student:", error);
//     }
//   };

//   return (
//     <div>
//       <AddStudents
//         showModal={showModal}
//         handleCloseModal={handleCloseModal}
//         onAddStudent={addStudent}
//         studentDataToEdit={studentDataToEdit}
//       />
//       <div
//         className={`mb-6 ${
//           lang === "en"
//             ? "2.5xl:flex 2.5xl:flex-row 2.5xl:items-center gap-3 flex flex-col items-start"
//             : "2xl:flex 2xl:flex-row-reverse 2xl:items-center gap-3 flex flex-col items-end"
//         }`}
//       >
//         <div
//           className={` ${
//             lang === "en"
//               ? "flex justify-center items-center"
//               : "flex flex-row-reverse justify-between items-center"
//           }`}
//         >
//           <button
//             className="flex justify-start items-center text-white xl:text-lg text-sm bg-background rounded-xl px-5 py-3 hover:bg-primary shadowing duration-200"
//             onClick={handleOpenModalForAdd}
//           >
//             <img src={plus} alt="plus" className="w-4 ml-2 mr-4" />
//             {t("Add_Student")}
//           </button>
//         </div>
//         {/* <div className="flex justify-center items-center bg-background py-2.5 px-2 rounded-xl shadowing hover:bg-primary duration-300">
//           <img src={calendar} alt="Calendar icon" className="w-7 mx-3" />
//           <DatePicker
//             ref={datePickerRef}
//             selected={startDate}
//             onChange={(date) => {
//               setBirthDateFilter(date);
//               setStartDate(date);
//             }}
//             dateFormat="MM/dd/yyyy"
//             placeholderText="Select a date"
//             className="border-transparent text-lg bg-transparent text-white focus:outline-none cursor-pointer w-28"
//           />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default UpperDashboard;
