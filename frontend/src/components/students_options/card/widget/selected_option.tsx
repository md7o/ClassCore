import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import search from "../../../../assets/images/search.png";
import useSearch from "../../../../hooks/useSearch";

interface Student {
  _id?: string;
  name: string;
  birth: string;
  college: string;
  country: string;
  status: string;
  card: boolean;
  phone: string;
}

interface SelecteOptionProps {
  lang: string;
  onSelectStudent: (student: Student) => void; // Add this prop
}

const SelecteOption: React.FC<SelecteOptionProps> = ({
  lang,
  onSelectStudent,
}) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filterFn = (student: Student, searchTerm: string) => {
    return student.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredUsers = useSearch(users, searchTerm, filterFn);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    onSelectStudent(student);
  };

  return (
    <div className="bg-darkColor w-1/3 rounded-roundedButt">
      <div className="relative m-10">
        <img
          src={search}
          alt="Search icon"
          className={`absolute top-1/2 ${
            lang === "en" ? "right-3" : "left-3"
          } transform -translate-y-1/2 w-6`}
          style={{ direction: lang === "en" ? "ltr" : "rtl" }}
        />

        <input
          type="text"
          value={searchTerm} // Bind searchTerm state to input
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          placeholder={t("search_place_holder")}
          className={`w-full  py-2 rounded-xl px-5 text-xl ${
            lang === "en" ? "text-left" : "text-right"
          }`}
        />
      </div>
      <div className="bg-white space-y-2 rounded-lg divide-y divide-gray-200 cursor-pointer select-none m-10 px-5 py-2">
        {filteredUsers.slice(0, 8).map((item, index) => (
          <div
            onClick={() => handleStudentClick(item)}
            className={`flex justify-between text-xl py-1 px-2 rounded-lg duration-400 hover:bg-gray-300 ${
              selectedStudent?.name === item.name ? "bg-gray-300" : ""
            }`}
          >
            <p key={index} className={`text-xl py-1 px-2 rounded-lg`}>
              {item.name}
            </p>
            <p className={`text-xl py-1 px-2 text-gray-500`}>
              {item.card === true ? "created" : ""}
            </p>
          </div>
        ))}
        <div />
      </div>
      <p className="text-white text-3xl px-10">Selected Student</p>
      <div className="mx-10 h-hightLine bg-white my-2" />
      {selectedStudent ? (
        <div className="grid grid-cols-2 justify-center items-center text-2xl text-white space-y-2 font-light px-10 py-5 pb-10">
          <div>
            <p className="font-bold">Name:</p>
            <p>{selectedStudent.name}</p>
          </div>
          <div>
            <p className="font-bold">College Major:</p>
            <p>{selectedStudent.college}</p>
          </div>
          <div>
            <p className="font-bold">Born:</p>
            <p>{selectedStudent.birth}</p>
          </div>
          <div>
            <p className="font-bold">From:</p>
            <p>{selectedStudent.country}</p>
          </div>
        </div>
      ) : (
        <p className="text-3xl px-10 py-10 pb-16 text-white opacity-40 font-medium">
          No student selected
        </p>
      )}
    </div>
  );
};

export default SelecteOption;
