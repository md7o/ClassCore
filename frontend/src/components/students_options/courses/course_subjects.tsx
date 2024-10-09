import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

type Subject = {
  name: string;
  hours: number;
  doctor: string;
};

const handleBackHistoryButton = () => {
  window.history.back();
};

const CourseSubjects: React.FC = () => {
  const location = useLocation();
  const { major } = location.state || {};

  if (!major) {
    return <div className="text-white">No major selected</div>;
  }

  return (
    <div>
      <h1 className="text-white font-light text-4xl w-2/3 mx-auto  my-5">
        Courses
      </h1>
      <div className="bg-darkColor rounded-roundedButt w-2/3 mx-auto mt-14">
        <div className="flex justify-between items-center mb-10 pt-16 mx-16">
          <button
            onClick={handleBackHistoryButton}
            className="text-white text-xl opacity-55 hover:opacity-100 duration-200 py-1 rounded-lg flex items-center gap-2"
          >
            <IoIosArrowBack /> Back
          </button>
          <div className="flex justify-center items-center gap-5 mx-auto">
            <img src={major.imageUrl} alt={major.imageUrl} className="w-10" />
            <h1 className="text-white font-light text-4xl">{major.name}</h1>
          </div>
          <div className="text-transparent">
            <IoIosArrowBack /> Back
          </div>
        </div>

        <table className="min-w-full bg-darkColor  rounded-roundedButt ">
          <thead>
            <tr className="bg-darkColor text-white  uppercase text-lg ">
              <th className="px-20 py-3 text-left font-light tracking-wider">
                Subject
              </th>
              <th className="px-20 py-3 text-left font-light tracking-wider">
                Hours
              </th>
              <th className="px-20 py-3 text-left font-light tracking-wider">
                Doctor
              </th>
            </tr>
          </thead>
          <tbody>
            {major.subjects.map((subject: Subject, index: number) => (
              <tr
                key={index}
                className="border-t border-white border-opacity-15 text-lg font-light cursor-pointer hover:bg-primary duration-200"
              >
                <td className="px-20 py-5 text-white">{subject.name}</td>
                <td className="px-20 py-5 text-white">{subject.hours}</td>
                <td className="px-20 py-5 text-white">{subject.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseSubjects;
