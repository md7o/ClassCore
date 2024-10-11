import { useEffect, useState } from "react";
import user from "../../../../assets/images/user.png";

interface Student {
  _id?: string;
  name: string;
  birth: string;
  college: string;
  country: string;
  status: string;
  phone: string;
}

interface IdentityCardProps {
  lang: string;
  selectedStudent: Student | null; // Accept selected student as a prop
}

const IdentityCard: React.FC<IdentityCardProps> = ({
  lang,
  selectedStudent,
}) => {
  const [users, setUsers] = useState<Student[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error Fetching Users:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-gray-600 rounded-roundedButt py-8 w-megaW">
      <div className="flex justify-between items-center mx-10">
        <p className="text-4xl text-white">Student</p>
        <p className="text-2xl text-white">IDENTITY CARD</p>
      </div>

      <div className="mx-10 h-hightLine bg-white my-2" />

      <div className="flex justify-between items-center mx-10">
        <div>
          {selectedStudent ? (
            <div className=" text-2xl text-white space-y-3 font-light py-5">
              <div>
                <p className="font-medium">Name:</p>
                <p>{selectedStudent.name}</p>
              </div>
              <div>
                <p className="font-medium">College Major:</p>
                <p>{selectedStudent.college}</p>
              </div>
              <div>
                <p className="font-medium">Born:</p>
                <p>{selectedStudent.birth}</p>
              </div>
            </div>
          ) : (
            <p className="text-3xl px-10 text-white opacity-40 font-medium">
              No student selected
            </p>
          )}
        </div>

        <div
          className={`bg-gray-400 rounded-lg px-8 pt-20 mr-5 ${
            selectedStudent ? "my-0" : "my-5"
          }`}
        >
          <img src={user} alt={user} />
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
