import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropDownButtonProps {
  onLanguageChange: (language: string) => void;
}

const DropDownButton: React.FC<DropDownButtonProps> = ({
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      onLanguageChange(savedLanguage === "English" ? "en" : "ar");
    }
  }, [onLanguageChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (language: string, label: string) => {
    setSelectedLanguage(label);
    setIsOpen(false);
    setIsLoading(true);

    localStorage.setItem("selectedLanguage", label);

    setTimeout(() => {
      onLanguageChange(language);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div onClick={toggleDropdown} className="relative cursor-pointer">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="w-14 h-14 border-8 border-t-primary border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="text-white xl:text-lg text-md min-w-28 px-4 py-2 hover:scale-95 duration-300 bg-primary rounded-lg flex justify-center items-center gap-2">
        <button>{selectedLanguage}</button>
        <IoIosArrowDown />
      </div>

      {!isLoading && isOpen && (
        <div className="group absolute xl:min-w-[118px] min-w-[110px] mt-2 bg-white rounded-md z-50 shadow-md">
          <p
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:rounded-md cursor-pointer"
            onClick={() => handleOptionClick("en", "English")}
          >
            English
          </p>
          <p
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:rounded-md cursor-pointer"
            onClick={() => handleOptionClick("ar", "Arabic")}
          >
            Arabic
          </p>
        </div>
      )}
    </div>
  );
};

export default DropDownButton;
