import { useEffect, useState } from "react";
import user from "../../../../assets/images/user.png";

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

interface IdentityCardProps {
  lang: string;
  selectedStudent: Student | null;
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

  const handleConfirmCreated = async () => {
    if (selectedStudent && selectedStudent._id) {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${selectedStudent._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ card: true }),
          }
        );

        if (response.ok) {
          const updatedUsers = users.map((user) =>
            user._id === selectedStudent._id ? { ...user, card: true } : user
          );
          setUsers(updatedUsers);
          window.location.reload();
        } else {
          console.error("Failed to update card status.");
        }
      } catch (error) {
        console.error("Error while confirming card:", error);
      }
    }
  };

  const printAlert = () => {
    alert("There is no printer detected");
  };

  return (
    <div>
      <div className="bg-gray-700 rounded-roundedButt py-8 w-megaW">
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
      <div className="flex justify-center items-center gap-10 my-14">
        {selectedStudent ? (
          <button
            className={` ${
              selectedStudent.card
                ? "bg-gray-700 text-white cursor-not-allowed opacity-50"
                : "bg-blue-600 text-white hover:bg-blue-500 hover:scale-95 duration-200"
            }  text-3xl w-48 px-10 py-2 rounded-lg `}
            onClick={handleConfirmCreated}
          >
            <p>{selectedStudent.card === true ? "Created" : "Create"}</p>
          </button>
        ) : (
          <button
            className={` bg-gray-700 cursor-not-allowed text-white  text-3xl w-48 px-10 py-2 rounded-lg`}
            onClick={handleConfirmCreated}
          >
            <p>Create</p>
          </button>
        )}
        {selectedStudent ? (
          <button
            className={` ${
              selectedStudent.card ? "block" : "hidden"
            } bg-green-700 text-white text-3xl w-48 px-10 py-2 rounded-lg hover:bg-green-500 hover:scale-95 duration-200`}
            onClick={printAlert}
          >
            <p>Print</p>
          </button>
        ) : null}
        <button className=" bg-red-600 text-white text-3xl w-48 px-10 py-2 rounded-lg hover:bg-red-500 hover:scale-95 duration-200">
          Clear
        </button>
      </div>
    </div>
  );
};

export default IdentityCard;
