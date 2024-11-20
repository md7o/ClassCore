import React, { useState, useEffect } from "react";
import AddModal from "../../../../modal/add_modal";
import axios from "axios";

interface Student {
  _id?: string;
  name: string;
  birth: string;
  college: string;
  country: string;
  status: string;
  phone: string;
}

interface AddStudentsProps {
  showModal: boolean;
  handleCloseModal: () => void;
  onAddStudent?: (studentData: Student) => void;
  onEditStudent?: (updateData: Partial<Student>) => void;
  isEditMode?: boolean;
  studentDataToEdit?: Student | null;
}

const initialFormData: Student = {
  name: "",
  birth: "",
  college: "",
  country: "",
  status: "",
  phone: "",
};

const AddStudents: React.FC<AddStudentsProps> = ({
  showModal,
  handleCloseModal,
  onAddStudent,
  isEditMode = false,
  onEditStudent,
  studentDataToEdit,
}) => {
  const [countries, setCountries] = useState<any[]>([]);
  const [formData, setFormData] = useState<Student>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isButtonDisabled] = useState(false);

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
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();

    // Set form data if editing
    if (isEditMode && studentDataToEdit) {
      setFormData({
        name: studentDataToEdit.name,
        birth: studentDataToEdit.birth,
        college: studentDataToEdit.college,
        country: studentDataToEdit.country,
        status: studentDataToEdit.status,
        phone: studentDataToEdit.phone,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isEditMode, studentDataToEdit]);

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "name") {
      // Set form data and reset errors for name
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));

      // Trigger validation after full name is written (simulate blur event)
      // if (value.trim().length > 0) {
      //   const isNameTaken = await checkNameInDatabase(value);
      //   if (isNameTaken) {
      //     setErrors((prevErrors) => ({
      //       ...prevErrors,
      //       name: "The name has been taken",
      //     }));
      //     setIsButtonDisabled(true); // Disable button if name is taken
      //   } else {
      //     setIsButtonDisabled(false); // Enable button if name is valid
      //   }
      // }
    } else {
      // For other fields
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "birth",
      "college",
      "country",
      "status",
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
    if (validateForm() && !isButtonDisabled) {
      const trimmedData = {
        ...formData,
        country: formData.country.trim(),
      };
      if (isEditMode && onEditStudent) {
        onEditStudent(trimmedData);
      } else if (onAddStudent) {
        onAddStudent(trimmedData);
      }
      handleCloseModal();
    }
  };

  if (!showModal) return null;

  const educationMajors = [
    { name: "Computer Science" },
    { name: "Mechanical Engineering" },
    { name: "Business Administration" },
    { name: "Electrical Engineering" },
    { name: "Psychology" },
    { name: "English" },
    { name: "Environmental Science" },
    { name: "Fine Arts" },
  ];

  const studentStatus = [
    { name: "Year 1" },
    { name: "Year 2" },
    { name: "Year 3" },
    { name: "Year 4" },
    { name: "Year 5" },
    { name: "Graduate" },
    { name: "Suspend" },
    { name: "Remote" },
    { name: "Deprived" },
  ];

  return (
    <AddModal show={showModal} onClose={handleCloseModal}>
      <h2 className="text-3xl text-center md:my-10 my-5 text-white">
        {isEditMode ? "Edit Student" : "Add Student"}
      </h2>
      <form
        className="flex flex-col cursor-auto xl:px-20 px-5"
        onSubmit={handleSubmit}
      >
        {renderInput("Name", "name")}
        {renderInput("Date of Birth", "birth", "date")}
        {renderInput("College Major", "college", "select", educationMajors)}
        {renderInput("Country", "country", "select", countries)}
        {renderInput("Status", "status", "select", studentStatus)}
        {renderInput("Phone", "phone")}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className={`${
              isButtonDisabled || Object.keys(errors).length > 0
                ? "cursor-pointer"
                : "cursor-pointer"
            } bg-gradient-to-r duration-500 from-primary to-purple-500 shadowing text-white w-full md:mx-14 py-3 md:my-10 my-5 rounded-roundedButt`}
          >
            {isEditMode ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </AddModal>
  );

  function renderInput(
    label: string,
    name: keyof Student,
    type: string = "text",
    options?: any[]
  ) {
    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const input = e.currentTarget.querySelector("input") as HTMLInputElement;
      if (input && type === "date") {
        input.showPicker();
      }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Allow only digits and limit the length to 10 characters
      const phoneRegex = /^\d{0,10}$/;
      if (phoneRegex.test(value)) {
        handleChange(e); // Proceed with the normal change handler
      }
    };

    return (
      <div onClick={handleWrapperClick}>
        <label className="block text-gray-400 font-medium text-sm md:py-2 py-1 tracking-[1.5px]">
          {label}
        </label>

        {type === "select" ? (
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`w-full md:h-12 h-7 px-3 my-2 rounded-roundedButt text-sm tracking-[1.5px] text-white font-light ${
              errors[name] ? "ring-[#F34235]" : "ring-gray-300"
            } bg-background`}
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options?.map((option) => (
              <option
                key={
                  name === "country"
                    ? `${option.flag} ${" "} ${option.name}`
                    : `${option.name}`
                }
                value={
                  name === "country"
                    ? `${option.flag} ${option.name}`
                    : `${option.name}`
                }
                className="flex items-center"
              >
                <span>{option.flag}</span>
                <span>{option.name}</span>
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={name === "phone" ? handlePhoneChange : handleChange}
            className={`w-[100%] px-3 md:h-12 h-8 my-2 rounded-md text-md tracking-[1.5px] text-white font-medium ${
              errors[name] ? "ring-[#F34235]" : "ring-gray-300"
            } bg-background focus:ring-2 focus:ring-primary focus:outline-none`}
          />
        )}
        {errors[name] && <p className="text-[#F34235]">{errors[name]}</p>}
      </div>
    );
  }
};

export default AddStudents;
