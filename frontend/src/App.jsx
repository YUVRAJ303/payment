import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import AllCourses from "./pages/allCourses";
import EnrollCourse from "./pages/enrollPage";
import AllWorkshops from "./pages/allWorkshops"; 
import ContactUs from "./pages/contactUs";   // ✅ fixed path
import AllImages from "./pages/allImages";
import StudentPortal from "./components/StudentPortal";
import HelpCenter from "./components/HelpCenter";
import TermsOfService from "./pages/terms-of-service";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/courses" element={<AllCourses />} />
        <Route path="/enroll" element={<EnrollCourse />} />
        <Route path="/workshops" element={<AllWorkshops />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/allimages" element={<AllImages />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/terms-of-service" element={<TermsOfService />} /> */}


        
       




      </Routes>
    </BrowserRouter>
  );
}

export default App;
