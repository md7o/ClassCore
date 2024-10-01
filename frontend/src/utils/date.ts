export const formatDate = (
  date: Date,
  format: string = "MM/DD/YYYY"
): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekdayName = weekdays[date.getDay()]; // Get the weekday name

  switch (format) {
    case "MM/DD/YYYY":
      return `${weekdayName}, ${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")}/${year}`;
    case "YYYY-MM-DD":
      return `${weekdayName}, ${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
    default:
      return `${weekdayName}, ${month}/${day}/${year}`; // Default fallback
  }
};

// Function to get the current date as a formatted string
export const getCurrentDate = (format: string = "MM/DD/YYYY"): string => {
  const today = new Date();
  return formatDate(today, format);
};

// Function to add a specific number of days to a date
export const addDaysToDate = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Function to subtract a specific number of days from a date
export const subtractDaysFromDate = (date: Date, days: number): Date => {
  return addDaysToDate(date, -days);
};
