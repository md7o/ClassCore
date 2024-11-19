import React, { useState, useEffect } from "react";
import RegisterModal from "../../modal/register_modal";
import NoteBook from "../../../assets/images/notebook.png";
import university from "../../../assets/images/school.png";

import {
  formatDate,
  getCurrentDate,
  addDaysToDate,
  subtractDaysFromDate,
} from "../../../utils/date";

interface eventsLanguage {
  lang: string;
}

const currentDate = getCurrentDate("YYYY/MM/DD");

const eventDatePlus6Days = formatDate(
  addDaysToDate(new Date(), 6),
  "YYYY/MM/DD"
);

const getEventDate = (daysToSubtract: number) =>
  formatDate(subtractDaysFromDate(new Date(), daysToSubtract), "YYYY/MM/DD");

const EventAppointments: React.FC<eventsLanguage> = ({ lang }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [confirmRegistering, setConfirmRegistering] = useState<number | null>(
    null
  );
  const [registeredEvents, setRegisteredEvents] = useState<{
    [key: number]: boolean;
  }>({});

  const eventsSchedule = [
    {
      eventName: lang === "en" ? " Research Exhibition" : "معرض البحوث",
      eventDate: getEventDate(3),
      participantsNum: 23,
    },
    {
      eventName: lang === "en" ? "Student Art Show" : "معرض فني للطلاب",
      eventDate: getEventDate(2),
      participantsNum: 15,
    },
    {
      eventName: lang === "en" ? "Developer Hackathons" : "هاكاثون المطورين",
      eventDate: getEventDate(1),
      participantsNum: 74,
    },
    {
      eventName: lang === "en" ? "Invention competition" : "مسابقة الاختراعات",
      eventDate: currentDate,
      participantsNum: 54,
    },
    {
      eventName: lang === "en" ? "Graduation" : "التخرج",
      eventDate: eventDatePlus6Days,
      participantsNum: 23,
    },
  ];
  const handleOpenModalForAdd = (index: number) => {
    setConfirmRegistering(index);
    setShowRegisterModal(true);
  };

  const handleCloseModal = () => {
    setShowRegisterModal(false);
    // setConfirmRegistering(null);
  };

  const handleConfirmRegister = () => {
    if (confirmRegistering !== null) {
      setRegisteredEvents((prev) => ({
        ...prev,
        [confirmRegistering]: true,
      }));
      setShowRegisterModal(false);
    }
  };

  return (
    <div
      className="flex flex-row-reverse justify-between items-start mb-10"
      style={{ direction: lang === "en" ? "ltr" : "rtl" }}
    >
      <div
        className={`2.8xl:block hidden pb-10 mt-5  w-1/3 bg-darkColor rounded-roundedButt ${
          lang === "en" ? "mr-10" : "ml-10"
        }`}
      >
        <p className="m-6 text-white text-xl">
          {lang === "en" ? "For contact and inquiries" : "للتواصل والاستفسار"}
        </p>
        <div className="space-y-5">
          {/* Events leader */}
          <div className="flex justify-between items-center mx-10">
            <div className="flex justify-center items-center gap-5 hover:scale-95 duration-700 cursor-default ">
              <img src={NoteBook} alt={NoteBook} className="w-14" />
              <div>
                <p className="text-white text-xl">
                  {lang === "en" ? "Events Laeder" : "مدير الفعاليات"}
                </p>
                <p className="text-white text-md">
                  {lang === "en"
                    ? "Work hours: 8am - 4pm"
                    : "ساعات العمل: 8 صباحًا - 4 مساءً"}
                </p>
              </div>
            </div>
            <a
              href="mailto:md7ohe@gmail.com"
              className="group bg-background text-xl px-5 py-1 rounded-lg shadowing hover:bg-primary duration-300"
            >
              <p className="text-white opacity-60 group-hover:opacity-100 duration-200">
                {lang === "en" ? "Email" : "ايميل"}
              </p>
            </a>
          </div>
          {/* Events official */}
          <div className="flex justify-between items-center mx-10">
            <div className="flex justify-center items-center gap-5 hover:scale-95 duration-700 cursor-default">
              <img src={university} alt={university} className="w-14" />
              <div>
                <p className="text-white text-xl">
                  {lang === "en" ? "Events official" : "مسؤول الفعاليات"}
                </p>
                <p className="text-white text-md">
                  {lang === "en"
                    ? "Work hours: 8am - 4pm"
                    : "ساعات العمل: 8 صباحًا - 4 مساءً"}
                </p>
              </div>
            </div>
            <button className="group bg-background text-xl px-5 py-1 rounded-lg shadowing hover:bg-primary duration-300">
              <p className="text-white opacity-60 group-hover:opacity-100 duration-200">
                {lang === "en" ? "Email" : "ايميل"}
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="md:mx-14 mx-2 w-full flex flex-col-reverse">
        {eventsSchedule.map((items, index) => (
          <div
            key={index}
            className={`flex justify-between h-52 rounded-roundedButt my-5
    ${
      items.eventDate === eventDatePlus6Days && currentDate
        ? "bg-gradient-to-r duration-500 from-primary to-red-500"
        : "bg-darkColor opacity-40"
    }
    ${
      items.eventDate === currentDate
        ? "flex ring-4 ring-blue-500 opacity-95"
        : ""
    }`}
          >
            <div className="flex flex-col justify-between p-5 text-white">
              <div>
                <p className="md:text-3xl text-2xl">{items.eventName}</p>
                <p className="md:text-xl text-lg">{items.eventDate}</p>
              </div>
              <p className="md:text-2xl text-xl">
                {lang === "en"
                  ? `Number of participants: ${items.participantsNum}`
                  : `عدد الحضور: ${items.participantsNum}`}
              </p>
            </div>
            <div className="flex flex-col justify-between items-end p-5">
              <p className="flex justify-center items-center text-2xl bg-primary w-10 h-10 rounded-full text-white">
                {index + 1}
              </p>
              {/* <button
              onClick={handleOpenModalForAdd}
              className={`group bg-background rounded-lg p-4 hover:bg-primary hover:scale-95 shadowing duration-200 text-white text-2xl px-7 py-2 ${
                items.eventDate === eventDatePlus6Days ? "flex" : "hidden"
              }`}
              Registration
            >
            </button> */}
              {!registeredEvents[index] ? ( // Check if event is registered
                <button
                  onClick={() => handleOpenModalForAdd(index)}
                  className={`group bg-background rounded-lg p-4 hover:bg-primary hover:scale-95 shadowing duration-200 text-white md:text-2xl px-7 py-2 ${
                    items.eventDate === eventDatePlus6Days ? "flex" : "hidden"
                  }`}
                >
                  {lang === "en" ? "Registration" : "تسجيل"}
                </button>
              ) : (
                <button
                  disabled
                  className="bg-darkColor opacity-40 cursor-not-allowed rounded-lg p-4 text-white text-2xl px-7 py-2"
                >
                  {lang === "en" ? "Registered" : "مسجل"}
                </button>
              )}
            </div>
          </div>
        ))}
        <RegisterModal
          show={showRegisterModal}
          onClose={handleCloseModal}
          confirm={handleConfirmRegister}
          // children={}
        />
      </div>
    </div>
  );
};

export default EventAppointments;
