import CollegeStudentsMajors from "./widget/college_students_majors";
import StudentsCountries from "./widget/students_countries";
import TotalStudents from "./widget/total_students";
import GraduateStudents from "./widget/graduate_students";

interface analyzingLanguage {
  lang: string;
}
const StudentsAnalyzing: React.FC<analyzingLanguage> = ({ lang }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col 2.5xl:flex 2.5xl:flex-row justify-center items-center gap-3 w-full lg:px-24">
        <CollegeStudentsMajors lang={lang} />
        <StudentsCountries lang={lang} />
      </div>
      <div className="flex flex-col 2.5xl:flex 2.5xl:flex-row justify-center items-center gap-3 py-3 w-full lg:px-24">
        <GraduateStudents lang={lang} />
        <StudentsCountries lang={lang} />
        <TotalStudents lang={lang} />
      </div>
    </div>
  );
};

export default StudentsAnalyzing;
