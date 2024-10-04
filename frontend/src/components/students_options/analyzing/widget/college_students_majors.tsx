import { useState, useEffect } from "react";
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

const CollegeStudentsMajors = () => {
  const [users, setUsers] = useState<Student[]>([]);

  // ====FETCH USERS====
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
    <div className="bg-darkColor rounded-lg w-full p-5">
      <p className="text-white text-2xl pb-10 pt-2">College Students Majors</p>

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
