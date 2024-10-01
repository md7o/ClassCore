import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      Add_Student: "Add New Student",
      Students_Data: "Students' Data",
      Filter_By: "Filter By:",
      search_place_holder: "Search by name",
      Equal_to: "Equal to",
      Greater_than: "Greater than",
      Less_than: "Less than",
      Student_Name: "Name",
      Date_of_Birth: "Birth Date",
      Gender: "Gender",
      Country: "Country",
      College_Majors: "College Majors",
      Phone: "Phone",
      Actions: "Actions",
      Rows_Per_Page: "Rows_Per_Page:",

      // Login part //

      Login_title: "Login",
      Username_label: "Username",
      Password_label: "Password",
      sign_in: "Sign In",
    },
  },
  ar: {
    translation: {
      Add_Student: "إضافة طالب جديد",
      Students_Data: "بيانات الطلاب",
      search_place_holder: "البحث بالاسم الأول",
      Filter_By: "تصفية حسب",
      Equal_to: "مساوي الى",
      Greater_than: "أكبر من",
      Less_than: "أقل من",
      Student_Name: "الإسم",
      Date_of_Birth: "تاريخ الميلاد",
      Gender: "الجنس",
      Country: "البلد",
      College_Majors: "التخصص",
      Phone: "الهاتف",
      Actions: "الإجراءات",
      Rows_Per_Page: ":النتائج لكل صفحة",

      // Login part //

      Login_title: "تسجيل الدخول",
      Username_label: "اسم المستخدم",
      Password_label: "كلمة المرور",
      sign_in: "تسجيل الدخول",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
