import React from "react";
import StudentRow from "./student_row";
import bin from "../../../../../assets/images/trash.png";
import pencil from "../../../../../assets/images/pen.png";

interface Student {
  _id?: string;
  name: string;
  birth: string;
  country: string;
  college: string;
  status: string;
  phone: string;
}

interface StudentListProps {
  students: Student[];
  handleEditStudent: (id: string) => void;
  handleDeleteClick: (id: string) => void;
  handleUserClick: (id: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  handleEditStudent,
  handleDeleteClick,
  handleUserClick,
}) => {
  return (
    <div>
      <div className="2.5xl:block hidden">
        <table className="w-full rounded-lg overflow-hidden ">
          <thead>
            <tr className="bg-background text-white py-5 mb-5 rounded-lg uppercase text-xs">
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Birth
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                College
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left font-medium tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow
                key={student._id}
                student={student}
                handleEditStudent={handleEditStudent}
                handleDeleteClick={handleDeleteClick}
                handleUserClick={handleUserClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="2.5xl:hidden block">
        {students.length > 0 ? (
          students.map((student, rowIndex) => (
            <div key={rowIndex}>
              <div className="rounded-lg shadow-md px-2 bg-background text-white">
                <div className="space-y-2 font-bold">
                  <div className="flex justify-between py-2 rounded-lg px-5 ">
                    <p className=" md:text-lg">Name:</p>
                    <p className=" font-light md:text-lg">{student.name}</p>
                  </div>
                  {/* =========Line======= */}
                  <div className="w-full h-hightLine bg-white" />
                  <div className="flex justify-between py-2 rounded-lg px-5">
                    <p className="  md:text-lg">Birth:</p>
                    <p className=" font-light md:text-lg">{student.birth}</p>
                  </div>
                  {/* =========Line======= */}
                  <div className="w-full h-hightLine bg-white" />
                  <div className="flex justify-between py-2 rounded-lg px-5">
                    <p className="  md:text-lg">Country:</p>
                    <p className=" font-light md:text-lg">{student.country}</p>
                  </div>
                  {/* =========Line======= */}
                  <div className="w-full h-hightLine bg-white" />
                  <div className="flex justify-between py-2 rounded-lg px-5">
                    <p className="  md:text-lg">College:</p>
                    <p className=" font-light md:text-lg">{student.college}</p>
                  </div>
                  {/* =========Line======= */}
                  <div className="w-full h-hightLine bg-white" />
                  <div className="flex justify-between py-2 rounded-lg px-5">
                    <p className="  md:text-lg">Status:</p>
                    <p className=" font-light md:text-lg">{student.status}</p>
                  </div>
                  {/* =========Line======= */}
                  <div className="w-full h-hightLine bg-white" />
                  <div className="flex justify-between py-2 rounded-lg px-5">
                    <p className="  md:text-lg">Phone:</p>
                    <p className=" font-light md:text-lg">{student.phone}</p>
                  </div>
                  {/* =========Line======= */}
                  <div className="w-full h-hightLine bg-white" />
                  <div className="flex justify-between py-2 rounded-lg px-5">
                    <p className=" md:text-lg">Actions:</p>
                    <div className="flex gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700 hover:scale-95 hover:brightness-75 duration-300 w-6"
                        onClick={() => handleEditStudent(student._id!)}
                        title={"Edit"}
                      >
                        <img src={pencil} alt="edit" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 hover:scale-95 hover:brightness-75 duration-300 w-6"
                        onClick={() => handleDeleteClick(student._id!)}
                        title={"Delete"}
                      >
                        <img src={bin} alt="delete" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {rowIndex < students.length - 1 && (
                <hr className="my-4 border-gray-500" />
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-white">No students found.</div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
