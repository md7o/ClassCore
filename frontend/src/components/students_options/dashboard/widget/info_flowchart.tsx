import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const predefinedColors = [
  'red',
  'lightblue',
  'lime',
  'green',
  'orange',
  'pink'
];

const InfoFlowChart = () => {
  const getCycledColors = (count: number) => {
    return Array(count).fill('').map((_, index) => predefinedColors[index % predefinedColors.length]);
  };

  
  //  "Counties" chart
  const countriesData = {
    labels: [
      "Country A",
      "Country B",
      "Country C",
      "Country D",
      "Country E",
      "Country F",
      "Country G",
    ],
    datasets: [
      {
        label: "Population",
        data: [1200, 1900, 3000, 2200, 400, 400],
        backgroundColor: getCycledColors(7), 
        borderColor: getCycledColors(7),
      },
    ],
  };

  //  "College Majors" chart
  const majorsData = {
    labels: ["Engineering", "Business", "Arts"],
    datasets: [
      {
        label: "Students Enrolled",
        data: [500, 700, 300],
        backgroundColor: ['#124435', "#124435"],
      },
    ],
  };

  return (
    <div className="flex justify-start items-center gap-5 mx-10 mb-5 ">
      {/* Bar chart for Counties */}
      <div className="h-smallH w-3/4 bg-darkColor flex justify-center items-center p-4 rounded-2xl">
        <Bar data={countriesData} options={{ maintainAspectRatio: false }} />
      </div>
      {/* Pie chart for College Majors */}
      <div className="h-smallH w-1/3 bg-darkColor flex justify-center items-center p-10 rounded-2xl">
        <Doughnut data={majorsData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default InfoFlowChart;
