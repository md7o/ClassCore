import CollegeStudentsMajors from "./widget/college_students_majors";
import StudentsCountries from "./widget/students_countries";

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
        <StudentsCountries />
      </div>
    </div>
  );
};

export default StudentsAnalyzing;
