import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import university from "../../../assets/images/school.png";
import desktop from "../../../assets/images/desktop.png";
import engineering from "../../../assets/images/engineering.png";
import briefcase from "../../../assets/images/briefcase.png";
import gear from "../../../assets/images/gear.png";
import palette from "../../../assets/images/palette.png";
import research from "../../../assets/images/research.png";
import science from "../../../assets/images/science-book.png";
import end from "../../../assets/images/eng.png";

type Subject = {
  name: string;
  hours: number;
  doctor: string;
};

type Major = {
  name: string;
  imageUrl: string;
  subjects: Subject[];
  studentsCount: number;
};

interface User {
  college: string;
}

interface CoursesLanguage {
  lang: string;
}

const GeneralCourses: React.FC<CoursesLanguage> = ({ lang }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [majors, setMajors] = useState<Major[]>([
    {
      name: lang === "en" ? "Computer Science" : "علوم الحاسب",
      imageUrl: desktop,
      subjects: [
        {
          name: "Data Structures and Algorithms",
          hours: 4,
          doctor: "Doctor A",
        },
        { name: "Operating Systems", hours: 3, doctor: "Doctor B" },
        { name: "Database Systems", hours: 8, doctor: "Doctor C" },
        { name: "Artificial Intelligence", hours: 4, doctor: "Doctor D" },
        { name: "Computer Networks", hours: 3, doctor: "Doctor E" },
        { name: "Software Engineering", hours: 8, doctor: "Doctor F" },
        { name: "Web Development", hours: 3, doctor: "Doctor G" },
        { name: "Cybersecurity", hours: 4, doctor: "Doctor H" },
      ],
      studentsCount: 0,
    },
    {
      name: lang === "en" ? "Mechanical Engineering" : "هندسة ميكانيكية",
      imageUrl: engineering,
      subjects: [
        { name: "Thermodynamics", hours: 3, doctor: "Doctor A" },
        { name: "Fluid Mechanics", hours: 4, doctor: "Doctor B" },
        { name: "Mechanics of Materials", hours: 8, doctor: "Doctor C" },
        { name: "Machine Design", hours: 4, doctor: "Doctor D" },
        { name: "Robotics", hours: 3, doctor: "Doctor E" },
        { name: "Heat Transfer", hours: 4, doctor: "Doctor F" },
        { name: "Engineering Materials", hours: 8, doctor: "Doctor G" },
        { name: "Manufacturing Processes", hours: 3, doctor: "Doctor H" },
      ],
      studentsCount: 0,
    },
    {
      name: lang === "en" ? "Business Administration" : "إدارة أعمال",
      imageUrl: briefcase,
      subjects: [
        { name: "Principles of Management", hours: 4, doctor: "Doctor A" },
        { name: "Marketing", hours: 3, doctor: "Doctor B" },
        { name: "Business Law", hours: 8, doctor: "Doctor C" },
        { name: "Financial Accounting", hours: 4, doctor: "Doctor D" },
        { name: "Human Resource Management", hours: 3, doctor: "Doctor E" },
        { name: "Organizational Behavior", hours: 4, doctor: "Doctor F" },
        { name: "Strategic Management", hours: 8, doctor: "Doctor G" },
        { name: "Entrepreneurship", hours: 3, doctor: "Doctor H" },
      ],
      studentsCount: 0,
    },
    {
      name: lang === "en" ? "Electrical Engineering" : "الهندسة الكهربائية",
      imageUrl: gear,
      subjects: [
        { name: "Circuit Analysis", hours: 4, doctor: "Doctor A" },
        { name: "Digital Signal Processing", hours: 4, doctor: "Doctor B" },
        { name: "Electromagnetic Fields", hours: 8, doctor: "Doctor C" },
        { name: "Power Systems", hours: 4, doctor: "Doctor D" },
        { name: "Microelectronics", hours: 4, doctor: "Doctor E" },
        { name: "Control Systems", hours: 3, doctor: "Doctor F" },
        { name: "Analog Electronics", hours: 4, doctor: "Doctor G" },
        { name: "Renewable Energy Systems", hours: 3, doctor: "Doctor H" },
      ],
      studentsCount: 0,
    },
    {
      name: lang === "en" ? "Psychology" : "علم النفس",
      imageUrl: research,
      subjects: [
        { name: "Cognitive Psychology", hours: 3, doctor: "Doctor A" },
        { name: "Developmental Psychology", hours: 4, doctor: "Doctor B" },
        { name: "Abnormal Psychology", hours: 8, doctor: "Doctor C" },
        { name: "Social Psychology", hours: 4, doctor: "Doctor D" },
        { name: "Behavioral Neuroscience", hours: 4, doctor: "Doctor E" },
        {
          name: "Research Methods in Psychology",
          hours: 3,
          doctor: "Doctor F",
        },
        { name: "Clinical Psychology", hours: 8, doctor: "Doctor G" },
        {
          name: "Psychological Testing and Assessment",
          hours: 4,
          doctor: "Doctor H",
        },
      ],
      studentsCount: 0,
    },
    {
      name: lang === "en" ? "English" : "لغة انجليزية",
      imageUrl: end,
      subjects: [
        { name: "Introduction to Literature", hours: 4, doctor: "Doctor A" },
        { name: "Shakespearean Studies", hours: 3, doctor: "Doctor B" },
        { name: "Creative Writing", hours: 4, doctor: "Doctor C" },
        { name: "Literary Theory", hours: 4, doctor: "Doctor D" },
        { name: "American Literature", hours: 3, doctor: "Doctor E" },
        { name: "Postcolonial Literature", hours: 8, doctor: "Doctor F" },
        {
          name: "English Grammar and Linguistics",
          hours: 4,
          doctor: "Doctor G",
        },
        { name: "Modern Poetry", hours: 3, doctor: "Doctor H" },
      ],
      studentsCount: 0,
    },
    {
      name: lang === "en" ? "Environmental Science" : "العلوم البيئية",
      imageUrl: science,
      subjects: [
        { name: "Environmental Chemistry", hours: 4, doctor: "Doctor A" },
        { name: "Ecology and Conservation", hours: 3, doctor: "Doctor B" },
        { name: "Environmental Policy", hours: 4, doctor: "Doctor C" },
        { name: "Climate Change", hours: 8, doctor: "Doctor D" },
        { name: "Renewable Energy", hours: 3, doctor: "Doctor E" },
        {
          name: "Environmental Impact Assessment",
          hours: 4,
          doctor: "Doctor F",
        },
        {
          name: "Geographic Information Systems (GIS)",
          hours: 4,
          doctor: "Doctor G",
        },
        { name: "Natural Resource Management", hours: 3, doctor: "Doctor H" },
      ],
      studentsCount: 0,
    },
    {
      name: lang === "en" ? "Fine Arts" : "الفنون الجميلة",
      imageUrl: palette,
      subjects: [
        { name: "Drawing and Painting", hours: 3, doctor: "Doctor A" },
        { name: "Art History", hours: 4, doctor: "Doctor B" },
        { name: "Sculpture", hours: 8, doctor: "Doctor C" },
        { name: "Digital Media", hours: 4, doctor: "Doctor D" },
        { name: "Photography", hours: 4, doctor: "Doctor E" },
        { name: "Printmaking", hours: 3, doctor: "Doctor F" },
        { name: "Ceramics", hours: 4, doctor: "Doctor G" },
        { name: "Contemporary Art Theory", hours: 4, doctor: "Doctor H" },
      ],
      studentsCount: 0,
    },
  ]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const totalStudents = users.length;

  const handleNavigateClick = (major: Major) => {
    navigate("/courses/subjects_course", { state: { major } });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://classcore.onrender.com/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: User[] = await response.json();
        setUsers(data);

        const updatedMajors = majors.map((major) => ({
          ...major,
          studentsCount: data.filter((user) => user.college === major.name)
            .length,
        }));

        setMajors(updatedMajors);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [majors]);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="w-14 h-14 border-8 border-t-primary border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return <div className=" text-white text-3xl text-center">{error}</div>;

  return (
    <div
      className="flex justify-center gap-5"
      style={{ direction: lang === "en" ? "ltr" : "rtl" }}
    >
      <div>
        {/* ========CoursesCard======== */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 sm:justify-center justify-stretch text-white rounded-xl ">
          {majors.map((major, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center bg-darkColor rounded-xl py-20 space-y-5 ${
                lang === "en" ? "2.8xl:px-12 px-5" : "2.8xl:px-16 px-5"
              }`}
            >
              <img src={major.imageUrl} alt={university} className="w-24" />
              <p className="sm:text-lg text-xl">{major.name}</p>
              <button
                onClick={() => handleNavigateClick(major)}
                className="group bg-background text-xl px-10 py-1.5 rounded-lg shadowing hover:bg-primary duration-300"
              >
                <p className="text-white opacity-60 group-hover:opacity-100 duration-200">
                  {lang === "en" ? "Courses" : "الدورات"}
                </p>
              </button>
            </div>
          ))}
        </div>

        {/* ========MostRegistered======== */}
        <div className="bg-darkColor rounded-xl my-5 pb-5 text-white">
          <p className="text-3xl p-5">
            {lang === "en" ? "Most Registered Courses" : "أكثر الدورات المسجلة"}
          </p>
          {majors.map((major, index) => {
            const percentage =
              totalStudents > 0
                ? (major.studentsCount / totalStudents) * 100
                : 0;

            return (
              <div
                key={index}
                className="flex flex-row md:justify-start justify-between items-center space-x-6 py-5 px-14"
              >
                <p className="text-lg w-52">{major.name}</p>
                <div className="md:block hidden flex-1 h-6 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="md:text-base text-xl">
                  {Math.round(percentage)}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralCourses;
