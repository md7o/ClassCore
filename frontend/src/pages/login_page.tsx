import people from "../assets/images/people.png";
import DropDownButton from "../components/widget/dropDownButton";
import spin from "../assets/images/loading.png";
import React, { useEffect, useState, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface StudentsDataProps {
  lang: string;
}

const LoginPage: React.FC<StudentsDataProps> = ({ lang }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const onLanguageChange = (newLang: string) => {
    i18n.changeLanguage(newLang);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch(
        "https://taxiapp.easybooks.me:8283/User/SignIn",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      const data = await response.json();
      console.log("Sign-in successful:", data);

      const { token } = data;

      document.cookie = `authToken=${token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }`;

      console.log("Sign-in successful:", token);

      setRedirect(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (redirect) {
    // Use Navigate to redirect if redirection state is true
    return <Navigate to="/students" />;
  }

  return (
    <div className="flex h-screen">
      <div className=" hidden flex-1 lg:flex justify-center items-center">
        <div className="flex flex-col h-screen">
          <DropDownButton onLanguageChange={onLanguageChange} />
          <div className="flex-1 flex items-center justify-center ">
            <img src={people} alt="People" className="w-2/3 mx-auto" />
          </div>
        </div>
      </div>
      <div className="flex-1.5 bg-[#2148C0] flex justify-center items-center">
        <div
          className={`bg-white rounded-xl sm:px-24 px-5 py-20 w-full 2.5xl:max-w-6xl 2xl:max-w-3xl md:max-w-xl max-w-3xl ${
            i18n.language === "en" ? "text-start" : "text-end"
          }`}
        >
          <p className="text-black  text-5xl font-bold mb-20 ">
            {t("Login_title")}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label
                htmlFor="username"
                className="block text-2xl text-black opacity-60"
              >
                {t("Username_label")}
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-5 mt-5 rounded-xl text-left px-3 ring-1 ring-gray-300 focus:ring- text-3xl"
              />
            </div>
            <div className="mb-12">
              <label
                htmlFor="password"
                className="block text-2xl text-black opacity-60"
              >
                {t("Password_label")}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-5 mt-5 rounded-xl text-left px-3 ring-1 ring-gray-300 focus:ring- text-3xl"
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button
              className="w-full bg-primary text-white py-5 px-4 rounded-xl text-3xl hover:bg-blue-600 transition"
              type="submit"
              disabled={isLoading} // Correctly using the `disabled` attribute
            >
              {isLoading ? (
                <img
                  src={spin}
                  alt="Loading spinner"
                  className="w-8 h-8 mx-auto animate-spin"
                />
              ) : (
                t("sign_in", "Sign In")
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
