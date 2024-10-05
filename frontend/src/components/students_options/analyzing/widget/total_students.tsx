import { useState, useEffect } from "react";
import { RiDonutChartFill } from "react-icons/ri";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Pie-related components in Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface Student {
  _id?: string;
  name: string;
  birth: string;
  college: string;
  country: string;
  status: string;
  phone: string;
}

const TotalStudents = () => {
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

  // Group users by college for the pie chart
  const collegeCount = users.reduce((acc, user) => {
    acc[user.status] = (acc[user.status] || 0) + 1;
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
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderColor: "#FFFFFFFF",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-darkColor rounded-lg lg:w-2/3 w-full h-smallHplus p-5">
      <p className="text-white text-2xl pb-2 pt-2 flex items-center gap-2">
        <RiDonutChartFill />
        Total Students
      </p>

      <div className="h-96">
        <Pie
          data={collegeMajors}
          options={{
            maintainAspectRatio: false,

            plugins: {
              legend: {
                display: true,
                position: "top", // Customize legend position if needed

                labels: {
                  color: "#ffffff", // Set legend text color to white
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || "";
                    const value = context.raw || 0;
                    return `${label}: ${value} students`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TotalStudents;
