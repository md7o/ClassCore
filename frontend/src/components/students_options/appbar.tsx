import { useState } from "react";
import MenuButton from "../widget/menu_button";
import DropDownButton from "../widget/dropDownButton";
import profile from "../../assets/images/metro.jpg";

interface AppBarProps {
  onLanguageChange: (language: string) => void;
  currentPage: string;
  toggleSidebar: () => void; // Accept the toggle function
  language: string; // Include language prop for accessing the current language
}

const AppBar: React.FC<AppBarProps> = ({
  onLanguageChange,
  currentPage,
  toggleSidebar,
  language, // Use the language prop directly
}) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return language === "en" ? "Dashboard" : "لوحة التحكم";
      case "events":
        return language === "en" ? "Events" : "الفعاليات";
      case "courses":
        return language === "en" ? "Courses" : "الدورات";
      default:
        return language === "en" ? "Home" : "الصفحة الرئيسية"; // Default case
    }
  };

  const handleLanguageChange = (lang: string) => {
    onLanguageChange(lang); // Call the function passed from the parent
  };

  return (
    <div className="my-3 mb-14">
      <div
        className="flex justify-between items-center"
        style={{ direction: language === "en" ? "ltr" : "rtl" }}
      >
        <div className="flex justify-center items-center">
          <MenuButton onClick={toggleSidebar} />
          <p
            className={`p-4 sm:mx-2 mx-0 font-bold flex justify-between items-center ${
              language === "ar"
                ? "xl:text-4xl pr-10 text-white"
                : "xl:text-3xl text-white"
            }`}
          >
            {getPageTitle()}
          </p>
        </div>
        <div className="sm:px-10 px-2">
          <DropDownButton onLanguageChange={handleLanguageChange} />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
