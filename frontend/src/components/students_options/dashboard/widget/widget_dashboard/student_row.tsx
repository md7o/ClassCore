import React from "react";
import binIcon from "../../../../../assets/images/trash.png";
import pencilIcon from "../../../../../assets/images/pen.png";

interface Student {
  _id?: string;
  name: string;
  birth: string;
  country: string;
  college: string;
  status: string;
  phone: string;
}

interface StudentRowProps {
  student: Student;
  handleEditStudent: (id: string) => void;
  handleDeleteClick: (id: string) => void;
  handleUserClick: (id: string) => void;
}

const StudentRow: React.FC<StudentRowProps> = ({
  student,
  handleEditStudent,
  handleDeleteClick,
  handleUserClick,
}) => {
  return (
    <tr className="hover:bg-gray-200 duration-200 cursor-pointer bg-white ">
      <td className="px-6 py-4 whitespace-nowrap  font-medium text-gray-900">
        {student.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
        {student.birth}
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
        {student.country}
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
        {student.college}
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
        {student.status}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        {student.phone}
      </td>
      <td className="px-6 py-4 whitespace-nowrap  font-medium flex justify-end">
        <img
          className="w-7 mx-2"
          src={pencilIcon}
          alt="Edit"
          onClick={() => handleEditStudent(student._id!)}
        />
        <img
          className="w-7 mx-2"
          src={binIcon}
          alt="Delete"
          onClick={() => handleDeleteClick(student._id!)}
        />
      </td>
    </tr>
  );
};

export default StudentRow;
