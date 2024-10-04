import CollegeStudentsMajors from "./widget/college_students_majors";
import StudentsCountries from "./widget/students_countries";
import TotalStudents from "./widget/total_students";

interface analyzingLanguage {
  lang: string;
}
const StudentsAnalyzing: React.FC<analyzingLanguage> = ({ lang }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-3 w-full px-24">
        <CollegeStudentsMajors />
        <StudentsCountries />
      </div>
      <div className="flex justify-center items-center gap-3 py-3 w-full px-24">
        <StudentsCountries />
        <StudentsCountries />
        <TotalStudents />
      </div>
    </div>
  );
};

export default StudentsAnalyzing;
