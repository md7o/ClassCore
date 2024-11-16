import { useState, useEffect } from "react";
import { FaEarthAmericas } from "react-icons/fa6";

interface Student {
  _id?: string;
  name: string;
  birth: string;
  college: string;
  country: string;
  phone: string;
}

interface CoursesLanguage {
  lang: string;
}

const StudentsCountries: React.FC<CoursesLanguage> = ({ lang }) => {
  const [users, setUsers] = useState<Student[]>([]);

  // ====FETCH USER====
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://classcore.onrender.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error Fetching Users:", error);
      }
    };
    fetchUser();
  });

  const countryCounts = users.reduce((acc, user) => {
    acc[user.country] = (acc[user.country] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="bg-darkColor rounded-lg lg:w-2/3 w-full h-smallHplus p-5">
      <p
        className={`text-white text-2xl pb-10 pt-2  ${
          lang === "en"
            ? "flex flex-row justify-start"
            : "flex flex-row-reverse justify-start"
        } items-center gap-2`}
      >
        <FaEarthAmericas />
        {lang === "en" ? "Students Countries" : "دول الطلاب"}
      </p>
      {/* Scrollable section */}
      <div className="max-h-96 overflow-y-auto">
        {Object.entries(countryCounts).map(([country, count], index) => {
          return (
            <div
              className={`flex ${
                lang === "en" ? "flex-row" : "flex-row-reverse"
              } justify-between items-center py-3 border-b border-white border-opacity-15`}
              key={index}
            >
              <p className="text-white lg:text-2xl text-xl px-5 ">{country}</p>
              <p className="text-white lg:text-2xl px-5 ">
                {lang === "en"
                  ? count === 1
                    ? count + " Student"
                    : count + " Students"
                  : count === 2
                  ? count + " طلاب"
                  : count + " طالب"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentsCountries;
