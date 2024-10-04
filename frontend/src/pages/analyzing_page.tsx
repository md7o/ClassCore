import { useState } from "react";
import AppBar from "../components/students_options/appbar";
import SideBar from "../components/students_options/sideBar";
import StudentsAnalyzing from "../components/students_options/analyzing/students_analyzing";
import LogoutModal from "../components/modal/logout_modal";

const AnalyzingPage = () => {
  const [language, setLanguage] = useState<string>("en");
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const handleShowModal = () => {
    setShowLogoutModal(true);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleSideBarShow = () => {
    setShowSideBar((prevState) => !prevState);
  };

  return (
    <div className="bg-background">
      <div className="flex justify-between">
        <SideBar
          setActiveComponent={() => {}}
          showSideBar={showSideBar}
          toggleSidebar={handleSideBarShow}
          onLogoutClick={handleShowModal}
          onLanguageChange={handleLanguageChange}
          language={language}
        />
        <div className="w-full justify-between items-start">
          <AppBar
            onLanguageChange={handleLanguageChange}
            currentPage="courses"
            toggleSidebar={handleSideBarShow}
            language={language}
          />
          <StudentsAnalyzing lang={language} />
        </div>
        {showLogoutModal && (
          <LogoutModal
            show={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
            message="Are you sure you want to log out of your account?"
          />
        )}
      </div>
    </div>
  );
};

export default AnalyzingPage;
