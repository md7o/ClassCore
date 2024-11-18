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
      <h1 className="text-white font-light text-4xl w-2/3 mx-auto my-5">
        Courses
      </h1>
      <div className="bg-darkColor rounded-roundedButt  max-w-96 md:max-w-6xl mx-auto mt-14 ">
        <table className="min-w-full bg-darkColor rounded-roundedButt ">
          <thead>
            <tr>
              <div className="mb-10">
                <button
                  onClick={handleBackHistoryButton}
                  className="text-white text-xl opacity-55 hover:opacity-100 duration-200 py-1 rounded-full flex items-center gap-2 p-3 m-5 bg-red-400 "
                >
                  X
                </button>
                <div className="flex justify-center items-center gap-5 mx-auto  ">
                  <img
                    src={major.imageUrl}
                    alt={major.imageUrl}
                    className="w-10"
                  />
                  <h1 className="text-white font-light md:text-4xl ">
                    {major.name}
                  </h1>
                </div>
              </div>
            </tr>
            <tr className="bg-darkColor text-white uppercase text-md ">
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
