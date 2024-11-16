import React, { useState } from "react";
import SelecteOption from "./widget/selected_option";
import IdentityCard from "./widget/identity_card";

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

interface StudentsTableDataProps {
  lang: string;
}

const CreateStudentCard: React.FC<StudentsTableDataProps> = ({ lang }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <div className="flex 2xl:flex-row flex-col-reverse justify-center 2xl:items-start items-center md:gap-20 gap-5">
      <IdentityCard lang={lang} selectedStudent={selectedStudent} />

      <SelecteOption lang={lang} onSelectStudent={setSelectedStudent} />
    </div>
  );
};

export default CreateStudentCard;
