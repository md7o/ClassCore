import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditUserSetting from "./widget/user_setting_widget/edit_user_setting";
import EditCollegeMajor from "./widget/user_setting_widget/edit_college_major";
import EditUserStatu from "./widget/user_setting_widget/edit_user_statu";

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

const UserSetting: React.FC<StudentsTableDataProps> = ({ lang }) => {
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
    <div>
      {user ? (
        <div className="flex 2xl:flex-row flex-col justify-center items-center gap-2">
          <EditUserSetting lang={lang} />
          <EditCollegeMajor lang={lang} />
          <EditUserStatu lang={lang} />
        </div>
      ) : (
        <div className="text-white">No user data available.</div>
      )}
    </div>
  );
};

export default UserSetting;
