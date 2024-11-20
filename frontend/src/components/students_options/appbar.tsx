import MenuButton from "../widget/menu_button";
import DropDownButton from "../widget/dropDownButton";

interface AppBarProps {
  onLanguageChange: (language: string) => void;
  currentPage: string;
  toggleSidebar: () => void;
  language: string;
}

const AppBar: React.FC<AppBarProps> = ({
  onLanguageChange,
  currentPage,
  toggleSidebar,
  language,
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
        return language === "en" ? "Home" : "الصفحة الرئيسية";
    }
  };

  const handleLanguageChange = (lang: string) => {
    onLanguageChange(lang);
  };

  return (
    <div className="mb-20 xl:mt-4 mt-0 relative z-40">
      <div
        className="flex justify-between items-center xl:static xl:bg-transparent bg-darkColor bg-opacity-55 fixed w-full"
        style={{ direction: language === "en" ? "ltr" : "rtl" }}
      >
        <div className="flex justify-center items-center">
          <MenuButton onClick={toggleSidebar} />
          <p
            className={`p-4 sm:mx-2 mx-0 font-bold flex justify-between items-center ${
              language === "ar"
                ? "xl:text-4xl  text-white text-2xl"
                : "xl:text-4xl text-white text-2xl"
            }`}
          >
            {getPageTitle()}
          </p>
        </div>
        <div className={`sm:px-10 px-2`}>
          <DropDownButton onLanguageChange={handleLanguageChange} />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
