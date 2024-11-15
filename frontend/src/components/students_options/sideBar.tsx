import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboardIcon from "../../assets/images/dashboard.png";
import event from "../../assets/images/event.png";
import openBook from "../../assets/images/open-book.png";
import userAva from "../../assets/images/user.png";
import presentation from "../../assets/images/presentation.png";
import cretidcard from "../../assets/images/credit-card.png";
import logout from "../../assets/images/logout.png";
import LogoutModal from "../modal/logout_modal";
import "../../App.css";

interface SideBarProps {
  setActiveComponent: (component: string) => void;
  showSideBar: boolean;
  toggleSidebar: () => void;
  onLogoutClick: () => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

// interface StudentsDataProps {
//   lang: string;
// }

const SideBar: React.FC<SideBarProps> = ({
  setActiveComponent,
  showSideBar,
  toggleSidebar,
  onLogoutClick,
  language,
  onLanguageChange,
}) => {
  const navigate = useNavigate();

  const optionsButton = [
    {
      icon: dashboardIcon,
      name: language === "en" ? "Dashboard" : "لوحة تحكم الطلاب",
      route: "/dashboard",
    },
    {
      icon: event,
      name: language === "en" ? "Event" : "الفعاليات",
      route: "/events",
    },
    {
      icon: openBook,
      name: language === "en" ? "Courses" : "الدورات",
      route: "/courses",
    },
    {
      icon: presentation,
      name: language === "en" ? "Students Analyzing" : "تحليل الطلاب",
      route: "/analyzing",
    },
    {
      icon: cretidcard,
      name: language === "en" ? "Create Card" : "إنشاء بطاقة",
      route: "/card",
    },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
    if (!showSideBar) {
      toggleSidebar();
    }
  };

  return (
    <div>
      <div
        className={`xl:relative fixed top-0 ${
          language === "en" ? " left-0" : "right-0"
        } transform ${
          showSideBar
            ? "translate-x-0"
            : `xl:translate-x-0
            ${language === "en" ? "-translate-x-full" : "translate-x-full"} `
        } transition-transform duration-300 ease-in-out z-50`}
        style={{ direction: language === "en" ? "ltr" : "rtl" }}
      >
        <div className="h-screen flex flex-col justify-between xl:m-3 m-0 bg-darkColor rounded-xl">
          <div className="mx-5">
            <div className="flex justify-between items-center">
              <p className="text-4xl text-white font-bold mb-10 mt-5">
                App Logo
              </p>
              <button
                onClick={toggleSidebar}
                className="xl:hidden block text-2xl text-white font-bold mb-10 mt-5"
              >
                X
              </button>
            </div>
            {/* Account */}
            <div className="my-5">
              <button className="group flex justify-start items-center w-72 shadow-md shadow-shadowBlock bg-background rounded-lg p-4 hover:scale-95 duration-500">
                <img
                  src={userAva}
                  alt="userAva"
                  className="w-12 h-12 object-cover rounded-xl mx-3"
                />
                <div className="flex flex-col items-start">
                  <p className="text-xl text-white ">Mohammed Ayman</p>
                  <p className="text-md text-white opacity-40">
                    {language === "en" ? "admin" : "sdasd"}
                  </p>
                </div>
              </button>
            </div>
            {/* Option categories */}
            <p className="text-2xl text-white font-bold my-5">Options</p>
            {optionsButton.map((items, index) => (
              <div key={index} className="my-5">
                <button
                  onClick={() => handleNavigation(items.route)}
                  className="group flex justify-start items-center  w-72 bg-background rounded-lg p-4 hover:bg-primary shadowing duration-200"
                  style={{ direction: language === "en" ? "ltr" : "rtl" }}
                >
                  <img
                    src={items.icon}
                    alt="Logout"
                    className="w-6 opacity-60 group-hover:opacity-100"
                  />
                  <p className="text-xl text-white opacity-60 group-hover:opacity-100 px-6">
                    {items.name}
                  </p>
                </button>
              </div>
            ))}
            {/* Other categories */}
            <p className="text-2xl text-white font-bold my-5 pt-5">Others</p>
            <div className="my-5">
              <button
                onClick={onLogoutClick}
                className="group flex justify-start items-center  w-72 bg-background rounded-lg p-4 hover:bg-primary shadowing duration-200"
                style={{ direction: language === "en" ? "ltr" : "rtl" }}
              >
                <img
                  src={logout}
                  alt="Logout"
                  className="w-6 opacity-60 group-hover:opacity-100"
                />
                <p className="text-xl text-white opacity-60 group-hover:opacity-100 px-6">
                  {language === "en" ? " Logout" : "تسجيل الخروج"}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
