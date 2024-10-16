// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login_page";
import DashboardPage from "./pages/dashboard_page";
import UserSettingPage from "./pages/user_setting_page";
import EventsPage from "./pages/events_page";
import CoursesPage from "./pages/courses_page";
import AnalyzingPage from "./pages/analyzing_page";
import CreateCard from "./pages/create_card";
import SubjectsCourse from "./components/students_options/courses/course_subjects";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/students" element={<StudentsTable />} /> */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/analyzing" element={<AnalyzingPage />} />
        <Route path="/card" element={<CreateCard />} />
        <Route
          path="/user_setting_page/:userId"
          element={<UserSettingPage />}
        />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
