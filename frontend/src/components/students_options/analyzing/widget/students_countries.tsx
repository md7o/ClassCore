import { useState, useEffect } from "react";

interface Student {
  _id?: string;
  name: string;
  birth: string;
  college: string;
  country: string;
  phone: string;
}

const StudentsCountries = () => {
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

  const countryCounts = users.reduce((acc, user) => {
    acc[user.country] = (acc[user.country] || 0) + 1; // Increment count for each country
    return acc;
  }, {} as { [key: string]: number }); // Type for the accumulator

  return (
    <div className="bg-darkColor rounded-lg w-2/3 h-smallHplus p-5">
      <p className="text-white text-2xl p-5">Students Countries</p>
      {/* Scrollable section */}
      <div className="max-h-96 overflow-y-auto">
        {Object.entries(countryCounts).map(([country, count], index) => {
          return (
            <div className="flex justify-between items-center py-3" key={index}>
              <p className="text-white text-2xl px-5 ">{country}</p>
              <p className="text-white text-2xl px-5 ">{count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentsCountries;
