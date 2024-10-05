import { useState, useEffect } from "react";
import { FaUserGraduate } from "react-icons/fa";

interface Student {
  _id?: string;
  name: string;
  birth: string;
  college: string;
  country: string;
  status: string;
  phone: string;
}

const GraduateStudents = () => {
  const [users, setUsers] = useState<Student[]>([]);

  // ====FETCH USER====
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error Fetching Users:", error);
      }
    };
    fetchUser();
  });

  const graduateStudents = users.filter((user) => user.status === "Graduate");

  return (
    <div className="bg-darkColor rounded-lg lg:w-2/3 w-full h-smallHplus p-5">
      <p className="text-white text-2xl p-5 flex items-center gap-2">
        <FaUserGraduate />
        List of Graduates
      </p>
      {/* Scrollable section */}
      <div className="max-h-96 overflow-y-auto ">
        {graduateStudents.length > 0 ? (
          graduateStudents.map((student, index) => (
            <div
              className="flex justify-between items-center py-3 border-b border-white border-opacity-15"
              key={index}
            >
              <p className="text-white lg:text-2xl text-lg px-5">
                {index + 1}- {student.name}
              </p>
              <p className="text-white font-bold lg:text-2xl px-5">
                {student.status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white text-2xl px-5">
            There is no graduate student
          </p>
        )}
      </div>
    </div>
  );
};

export default GraduateStudents;
