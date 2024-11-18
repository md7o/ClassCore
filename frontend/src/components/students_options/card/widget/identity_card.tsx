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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://classcore.onrender.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error Fetching Users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleConfirmCreated = async () => {
    if (selectedStudent && selectedStudent._id) {
      try {
        const response = await fetch(
          `https://classcore.onrender.com/users/${selectedStudent._id}`,
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
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCleareCard = async () => {
    if (selectedStudent && selectedStudent._id) {
      try {
        const response = await fetch(
          `https://classcore.onrender.com/users/${selectedStudent._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ card: false }),
          }
        );

        if (response.ok) {
          const updatedUsers = users.map((user) =>
            user._id === selectedStudent._id ? { ...user, card: false } : user
          );
          setUsers(updatedUsers);
          window.location.reload();
        } else {
          console.error("Failed to update the card status.");
        }
      } catch (error) {
        console.error("Error while updating card status:", error);
      }
    }
  };

  const printAlert = () => {
    alert("There is no printer detected");
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="w-14 h-14 border-8 border-t-primary border-gray-300 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div>
      <div className="bg-gray-700 rounded-roundedButt md:py-8 py-4 md:w-megaW w-large">
        <div className="flex justify-between items-center mx-10">
          <p className="md:text-4xl text-2xl text-white">
            {lang === "en" ? "Student" : "طالب"}
          </p>
          <p className="md:text-2xl text-lg text-white">
            {lang === "en" ? "University card" : "بطاقة جامعية"}
          </p>
        </div>

        <div className="mx-10 h-hightLine bg-white my-2" />

        <div
          className="flex justify-between items-center mx-10"
          style={{ direction: lang === "en" ? "ltr" : "rtl" }}
        >
          <div>
            {selectedStudent ? (
              <div className="md:text-2xl text-white space-y-3 font-light py-5">
                <div>
                  <p className="font-medium">
                    {lang === "en" ? "Name:" : "الإسم :"}
                  </p>
                  <p>{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="font-medium">
                    {lang === "en" ? "College Major:" : "التخصص الجامعي :"}
                  </p>
                  <p>{selectedStudent.college}</p>
                </div>
                <div>
                  <p className="font-medium">
                    {lang === "en" ? "birth day:" : "تاريخ الولادة :"}
                  </p>
                  <p>{selectedStudent.birth}</p>
                </div>
              </div>
            ) : (
              <p className="md:text-3xl text-xl px-10 text-white opacity-40 font-medium">
                No student selected
              </p>
            )}
          </div>

          <div
            className={`bg-gray-400 rounded-roundedButt md:px-8 px-6 md:pt-20 pt-16 mr-5 ${
              selectedStudent ? "my-0" : "my-5"
            }`}
          >
            <img className="md:w-32 w-16" src={user} alt={user} />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center md:gap-10 gap-3 md:my-14 my-8">
        {selectedStudent ? (
          <button
            className={` ${
              selectedStudent.card
                ? "bg-gray-700 text-white cursor-not-allowed opacity-50"
                : "bg-blue-600 text-white hover:bg-blue-500 hover:scale-95 duration-200"
            }  md:text-3xl text-2xl md:w-48 px-10 py-2 rounded-roundedButt`}
            onClick={handleConfirmCreated}
          >
            <p>
              {selectedStudent.card === true
                ? lang === "en"
                  ? "Created"
                  : "تم الإنشاء"
                : lang === "en"
                ? "Created"
                : "إنشاء"}
            </p>
          </button>
        ) : (
          <button
            className={` bg-gray-700 cursor-not-allowed text-white md:text-3xl text-2xl md:w-48 px-10 py-2 rounded-roundedButt`}
            onClick={handleConfirmCreated}
          >
            <p>{lang === "en" ? "Create" : "إنشاء"}</p>
          </button>
        )}
        {selectedStudent ? (
          <button
            className={` ${
              selectedStudent.card ? "block" : "hidden"
            } bg-green-700 text-white md:text-3xl text-2xl md:w-48 px-10 py-2 rounded-roundedButt hover:bg-green-500 hover:scale-95 duration-200`}
            onClick={printAlert}
          >
            <p>{lang === "en" ? "Print" : "طباعة"}</p>
          </button>
        ) : null}
        <button
          onClick={handleCleareCard}
          className=" bg-red-600 text-white md:text-3xl text-2xl md:w-48 px-10 py-2 rounded-roundedButt hover:bg-red-500 hover:scale-95 duration-200"
        >
          {lang === "en" ? "Clear" : "إزالة"}
        </button>
      </div>
    </div>
  );
};

export default IdentityCard;
