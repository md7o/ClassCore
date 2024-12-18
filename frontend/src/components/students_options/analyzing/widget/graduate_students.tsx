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

interface CoursesLanguage {
  lang: string;
}

const GraduateStudents: React.FC<CoursesLanguage> = ({ lang }) => {
  const [users, setUsers] = useState<Student[]>([]);

  // ====FETCH USER====
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://classcore.onrender.com/users");
        if (!response.ok) {
          console.error("Error fetching users:", response.statusText);
          return;
        }
        const data = await response.json();
        console.log("Fetched Data:", data); // Log the full fetched data
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUser();
  }, []);

  const graduateStudents = users.filter(
    (user) => user.status.trim().toLowerCase() === "graduate"
  );

  return (
    <div className="bg-darkColor rounded-lg lg:w-2/3 w-full h-smallHplus p-5">
      <p
        className={`text-white text-2xl pb-10 pt-2 ${
          lang === "en"
            ? "flex flex-row justify-start"
            : "flex flex-row-reverse justify-start"
        } items-center gap-2`}
      >
        <FaUserGraduate />
        {lang === "en" ? "List of Graduates" : "قائمة الخريجين"}
      </p>
      {/* Scrollable section */}
      <div className="max-h-96 overflow-y-auto ">
        {graduateStudents.length > 0 ? (
          graduateStudents.map((student, index) => (
            <div
              className={`flex ${
                lang === "en" ? "flex-row" : "flex-row-reverse"
              } justify-between items-center py-3 border-b border-white border-opacity-15`}
              key={student._id || index}
            >
              {lang === "en" ? (
                <p className="flex text-white lg:text-2xl text-lg px-5">
                  {index + 1}- {student.name}
                </p>
              ) : (
                <p className="flex text-white lg:text-2xl text-lg px-5">
                  {student.name} -{index + 1}
                </p>
              )}
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
