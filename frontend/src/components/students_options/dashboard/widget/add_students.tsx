import React, { useState, useEffect, useRef } from "react";
import AddModal from "../../../modal/add_modal";
import axios from "axios";
import university from "../../../assets/images/school.png";

interface Student {
  studentName: string;
  birthDate: string;
  collegeMajor: string;
  country: string;
  phone: string;
  id?: string;
}

interface AddStudentsProps {
  showModal: boolean;
  handleCloseModal: () => void;
  onAddStudent: (studentData: Student) => void;
  isEditMode?: boolean;
  onEditStudent?: (studentData: Student) => void;
  studentDataToEdit?: Student | null;
}

const initialFormData: Student = {
  studentName: "",
  birthDate: "",
  collegeMajor: "",
  country: "",
  phone: "",
};

const AddStudents: React.FC<AddStudentsProps> = ({
  showModal,
  handleCloseModal,
  onAddStudent,
  isEditMode,
  studentDataToEdit,
}) => {
  const [countries, setCountries] = useState<any[]>([]); // To store countries
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<Student>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch countries using REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryResponse = await axios.get(
          "https://restcountries.com/v3.1/all"
        );
        const countryData = countryResponse.data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
          flag: country.flag,
        }));
        setCountries(countryData); // Set countries data
        console.log("Fetched countries:", countryData); // Log the fetched countries
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();

    // Set form data if editing
    setFormData(studentDataToEdit || initialFormData);
  }, [studentDataToEdit]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const requiredFields = [
      "studentName",
      "birthDate",
      "grade",
      "country",
      "phone",
    ];
    const newErrors = requiredFields.reduce((acc, field) => {
      if (!formData[field as keyof Student]) {
        acc[field] = "This field is required";
      }
      return acc;
    }, {} as Record<string, string>);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddStudent(formData);
      handleCloseModal();
    }
  };

  const renderInput = (
    label: string,
    name: keyof Student,
    type: string = "text",
    options?: any[]
  ) => (
    <div>
      <label className="block text-gray-400 font-medium text-sm py-2 tracking-[1.5px]">
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-3 py-5 my-2 rounded-md text-sm tracking-[1.5px] text-white font-light  ${
            errors[name] ? "ring-[#F34235]" : "ring-gray-300"
          } bg-background`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map((option) => (
            <option
              key={option.code}
              value={option.code}
              className="flex items-center"
            >
              <p>{option.flag}</p>
              <p> {option.name}</p>
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          ref={name === "birthDate" ? dateInputRef : undefined}
          className={`w-full px-3 py-4 my-2 rounded-md text-md tracking-[1.5px] text-white font-medium  ${
            errors[name] ? "ring-[#F34235]" : "ring-gray-300"
          } bg-background focus:ring-2 focus:ring-primary focus:outline-none`}
        />
      )}
      {errors[name] && <p className="text-[#F34235]">{errors[name]}</p>}
    </div>
  );

  if (!showModal) return null;

  return (
    <AddModal show={showModal} onClose={handleCloseModal}>
      <h2 className="text-3xl text-center my-10 text-white">
        {isEditMode ? "Edit Student" : "Add Student"}
      </h2>
      <form
        className="flex flex-col cursor-auto xl:px-20 px-5 "
        onSubmit={handleSubmit}
      >
        {renderInput("StudentName", "studentName")}
        {renderInput("Date of Birth", "birthDate", "date")}
        {renderInput("College Major", "collegeMajor")} {/* Optional */}
        {renderInput("Country", "country", "select", countries)}
        {/* Render countries */}
        {renderInput("Phone", "phone")}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r duration-500 from-primary to-purple-500 text-white w-full mx-14 py-4 my-10 rounded-xl"
          >
            {isEditMode ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </AddModal>
  );
};

export default AddStudents;

//{========== with gender and grades=========}

// import React, { useState, useEffect, useRef } from "react";
// import AddModal from "../../../modal/add_modal";
// import axios from "axios";

// interface Student {
//   firstName: string;
//   lastName: string;
//   birthDate: string;
//   grade: string;
//   gender: string;
//   country: string;
//   city: string;
//   phone: string;
//   remarks: string;
//   id?: string;
// }

// interface AddStudentsProps {
//   showModal: boolean;
//   handleCloseModal: () => void;
//   onAddStudent: (studentData: Student) => void;
//   isEditMode?: boolean;
//   onEditStudent?: (studentData: Student) => void;
//   studentDataToEdit?: Student | null;
// }

// const initialFormData: Student = {
//   firstName: "",
//   lastName: "",
//   birthDate: "",
//   grade: "",
//   gender: "",
//   country: "",
//   city: "",
//   phone: "",
//   remarks: "",
// };

// const AddStudents: React.FC<AddStudentsProps> = ({
//   showModal,
//   handleCloseModal,
//   onAddStudent,
//   isEditMode,
//   studentDataToEdit,
// }) => {
//   const [genders, setGenders] = useState<any[]>([]);
//   const [grades, setGrades] = useState<any[]>([]);
//   const [countries, setCountries] = useState<any[]>([]); // To store countries
//   const dateInputRef = useRef<HTMLInputElement | null>(null);
//   const [formData, setFormData] = useState<Student>(initialFormData);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Fetch genders, grades, and countries on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [genderResponse, gradeResponse, countryResponse] =
//           await Promise.all([
//             axios.get(
//               "https://taxiapp.easybooks.me:8283/Settings/GetAllGenders"
//             ),
//             axios.get(
//               "https://taxiapp.easybooks.me:8283/Settings/GetAllGrades"
//             ),
//             axios.get("https://restcountries.com/v3.1/all"), // Fetch countries
//           ]);
//         setGenders(genderResponse.data);
//         setGrades(gradeResponse.data);
//         // Transform country data
//         const countryData = countryResponse.data.map((country: any) => ({
//           name: country.name.common,
//           code: country.cca2,
//         }));
//         setCountries(countryData);
//       } catch (error) {
//         console.error("Error fetching genders, grades, or countries:", error);
//       }
//     };
//     fetchData();

//     // Set form data if editing
//     setFormData(studentDataToEdit || initialFormData);
//   }, [studentDataToEdit]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       "firstName",
//       "lastName",
//       "birthDate",
//       "grade",
//       "country",
//       "city",
//       "phone",
//       "gender",
//     ];
//     const newErrors = requiredFields.reduce((acc, field) => {
//       if (!formData[field as keyof Student]) {
//         acc[field] = "This field is required";
//       }
//       return acc;
//     }, {} as Record<string, string>);
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onAddStudent(formData);
//       handleCloseModal();
//     }
//   };

//   const renderInput = (
//     label: string,
//     name: keyof Student,
//     type: string = "text",
//     options?: any[]
//   ) => (
//     <div>
//       <label className="block text-gray-400 font-medium text-md">
//         {label}
//         {name !== "remarks" && <span className="text-2xl">*</span>}
//       </label>
//       {type === "select" ? (
//         <select
//           name={name}
//           value={formData[name]}
//           onChange={handleChange}
//           className={`w-full px-3 py-3 my-2 border rounded-xl text-white font-medium ring-1 ${
//             errors[name] ? "ring-[#F34235]" : "ring-gray-300"
//           } bg-[#00000010]`}
//         >
//           <option value="">Select {label.toLowerCase()}</option>
//           {options?.map((option) => (
//             <option key={option.code} value={option.code}>
//               {option.name}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           type={type}
//           name={name}
//           value={formData[name]}
//           onChange={handleChange}
//           ref={name === "birthDate" ? dateInputRef : undefined}
//           className={`w-full px-3 py-3 my-2 border rounded-xl text-white font-medium ring-1 ${
//             errors[name] ? "ring-[#F34235]" : "ring-gray-300"
//           } bg-[#00000010]`}
//         />
//       )}
//       {errors[name] && <p className="text-[#F34235]">{errors[name]}</p>}
//     </div>
//   );

//   if (!showModal) return null;

//   return (
//     <AddModal show={showModal} onClose={handleCloseModal}>
//       <h2 className="text-4xl py-3 font-bold mb-4 text-white">
//         {isEditMode ? "Edit Student" : "Add Student"}
//       </h2>
//       <form
//         className="grid grid-cols-2 gap-4 cursor-auto"
//         onSubmit={handleSubmit}
//       >
//         {renderInput("First Name", "firstName")}
//         {renderInput("Last Name", "lastName")}
//         {renderInput("Date of Birth", "birthDate", "date")}
//         {renderInput("Educational Level", "grade", "select", grades)}
//         {renderInput("Country", "country", "select", countries)}
//         {renderInput("City", "city")}
//         {renderInput("Phone", "phone")}
//         {renderInput("Gender", "gender", "select", genders)}
//         <div className="col-span-2">
//           {renderInput("Remarks", "remarks", "textarea")}
//         </div>
//         <div className="col-span-2 flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             {isEditMode ? "Update Student" : "Add Student"}
//           </button>
//         </div>
//       </form>
//     </AddModal>
//   );
// };

// export default AddStudents;
