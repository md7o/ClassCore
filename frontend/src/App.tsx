import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const DashboardPage = lazy(() => import("./pages/dashboard_page"));
const EventsPage = lazy(() => import("./pages/events_page"));
const CoursesPage = lazy(() => import("./pages/courses_page"));
const CourseSubjects = lazy(
  () => import("./components/students_options/courses/course_subjects")
);
const AnalyzingPage = lazy(() => import("./pages/analyzing_page"));
const CreateCard = lazy(() => import("./pages/create_card"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="w-14 h-14 border-8 border-t-primary border-gray-300 rounded-full animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/subjects_course" element={<CourseSubjects />} />
          <Route path="/analyzing" element={<AnalyzingPage />} />
          <Route path="/card" element={<CreateCard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
