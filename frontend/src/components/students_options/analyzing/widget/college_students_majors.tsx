import { useState, useEffect } from "react";
import { IoStatsChart } from "react-icons/io5";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

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

const CollegeStudentsMajors: React.FC<CoursesLanguage> = ({ lang }) => {
  const [users, setUsers] = useState<Student[]>([]);

  // ====FETCH USERS====
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
  }, []);

  // Group users by college for the bar chart
  const collegeCount = users.reduce((acc, user) => {
    acc[user.college] = (acc[user.college] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const collegeLabels = Object.keys(collegeCount);
  const collegeData = Object.values(collegeCount);

  const collegeMajors = {
    labels: collegeLabels,
    datasets: [
      {
        label: "Number of Students",
        data: collegeData,
        backgroundColor: "#6048E8",
        borderColor: "#ffffff",
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-darkColor rounded-lg md:w-4/5 w-full md:p-5 p-2">
      <p
        className={`text-white text-2xl pb-10 pt-2  ${
          lang === "en"
            ? "flex flex-row justify-start"
            : "flex flex-row-reverse justify-start"
        } items-center gap-2`}
      >
        <IoStatsChart />
        {lang === "en" ? "College Students Majors" : "تخصصات طلاب الكلية"}
      </p>

      <div className="h-96">
        <Bar
          data={collegeMajors}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                grid: {
                  color: "#FFFFFF34",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CollegeStudentsMajors;
