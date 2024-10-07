import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get userId from URL

interface Student {
  _id: string;
  name: string;
  birth: string;
  country: string;
  college: string;
  status: string;
  phone: string;
}

interface StudentsTableDataProps {
  lang: string;
}

const EditCollegeMajor: React.FC<StudentsTableDataProps> = ({ lang }) => {
  const { userId } = useParams<{ userId: string }>(); // Extract userId from the URL
  const [user, setUser] = useState<Student | null>(null); // State to hold the user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUser(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-2xl">Error: {error}</div>;
  }

  return (
    <div className="">
      {user ? (
        <div className="text-white text-2xl  bg-darkColor rounded-lg p-5 h-smallHplus md:w-biggW w-large">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-3xl font-bold mb-5">
              College major
            </h1>
            <button className="text-white text-3xl hover:bg-primary duration-200 px-4 py-1 rounded-md">
              Edit
            </button>
          </div>
          <div>
            <p>
              <strong>College:</strong> {user.college}
            </p>
            <div className="w-full h-hightLine bg-gray-500 my-5" />
            <p className="font-bold">Material books:</p>
          </div>
        </div>
      ) : (
        <div className="text-white">No user data available.</div>
      )}
    </div>
  );
};

export default EditCollegeMajor;
