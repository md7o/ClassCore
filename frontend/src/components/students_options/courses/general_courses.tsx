import { useNavigate, Link } from "react-router-dom";
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
};

interface coursesLanguage {
  lang: string;
}

const totalStudents = 200; // Total number of students
const studentsPerSpecialty = [65, 5, 50, 15, 15, 20, 10, 20]; // Number of students in each specialty

const GeneralCourses: React.FC<coursesLanguage> = ({ lang }) => {
  const navigate = useNavigate();

  const handleNavigateClick = (major: Major) => {
    navigate("/students/subjects_course", { state: { major } });
  };

  const majors: Major[] = [
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
    },
  ];

  return (
    <div
      className="flex justify-center gap-5"
      style={{ direction: lang === "en" ? "ltr" : "rtl" }}
    >
      <div>
        {/* Courses Card */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 sm:justify-center justify-stretch text-white rounded-xl ">
          {majors.map((items, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center bg-darkColor rounded-xl py-20  space-y-5 ${
                lang === "en" ? "2.8xl:px-12 px-5" : "2.8xl:px-16 px-5"
              }`}
            >
              <img src={items.imageUrl} alt={university} className="w-24" />
              <p className="sm:text-lg text-xl">{items.name}</p>
              <button
                onClick={() => handleNavigateClick(items)}
                className="group bg-background text-xl px-10 py-1.5 rounded-lg shadowing hover:bg-primary duration-300"
              >
                <p className="text-white opacity-60 group-hover:opacity-100 duration-200">
                  {lang === "en" ? "Courses" : "الدورات"}
                </p>
              </button>
            </div>
          ))}
        </div>
        {/* Most registered  */}
        <div className=" bg-darkColor rounded-xl mt-5 pb-5 text-white">
          <p className="text-3xl p-5">
            {lang === "en" ? "Most registered courses" : "أكثر الدورات المسجلة"}
          </p>
          {majors.map((items, index) => {
            const percentage =
              (studentsPerSpecialty[index] / totalStudents) * 100;
            return (
              <div
                key={index}
                className="flex flex-row md:justify-start justify-between items-center space-x-6 py-5 px-14 "
              >
                <p className="text-lg w-52">{items.name}</p>
                <div className="md:block hidden flex-1 h-6 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="md:text-base  text-xl ">
                  {Math.round(percentage)}%
                </p>
              </div>
            );
          })}
        </div>
        {/* Countries Percentage Mobile Statue */}
        <div className="2.8xl:hidden block mx-2 w-full bg-darkColor rounded-roundedButt">
          <p className="m-6 pt-10 text-white text-2xl">
            {lang === "en" ? "Student nationality ratio" : "نسبة جنسيات الطلاب"}
          </p>
          <div className="space-y-5">
            <div className="flex justify-between items-center mx-10">
              <div className="flex justify-center items-center gap-5 hover:scale-95 duration-700 cursor-default ">
                <div className="w-5 h-5 bg-red-500 rounded-full" />
                <div>
                  <p className="text-white opacity-50 text-xl">Events Laeder</p>
                  <p className="text-white text-xl">10% </p>
                </div>
              </div>
              <p className="text-white text-2xl">62</p>
            </div>
          </div>
        </div>
      </div>
      {/* Countries Percentage */}
      <div
        className={`2.5xl:block hidden w-1/4 bg-darkColor rounded-roundedButt ${
          lang === "en" ? "mr-10" : "mr-0"
        }`}
      >
        <p className="m-6 text-white text-2xl">
          {lang === "en" ? "Student nationality ratio" : "نسبة جنسيات الطلاب"}
        </p>
        <div className="space-y-5">
          <div className="flex justify-between items-center mx-10">
            <div className="flex justify-center items-center gap-5 hover:scale-95 duration-700 cursor-default ">
              <div className="w-5 h-5 bg-red-500 rounded-full" />
              <div>
                <p className="text-white opacity-50 text-xl">Events Laeder</p>
                <p className="text-white text-xl">10% </p>
              </div>
            </div>
            <p className="text-white text-2xl">62</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralCourses;
