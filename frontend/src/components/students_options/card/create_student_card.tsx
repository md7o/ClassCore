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
    <div className="flex justify-center items-start gap-20">
      {/* Pass the selectedStudent to IdentityCard */}
      <IdentityCard lang={lang} selectedStudent={selectedStudent} />

      {/* Pass setSelectedStudent to SelecteOption */}
      <SelecteOption lang={lang} onSelectStudent={setSelectedStudent} />
    </div>
  );
};

export default CreateStudentCard;
