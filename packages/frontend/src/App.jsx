import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";   // Your SignUp page
import ProfilePage from "./pages/ProfilePage"; // Your Profile Page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />       {/* Default page is SignUp */}
        <Route path="/signup" element={<SignUp />} /> {/* Signup Page */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page */}
      </Routes>
    </Router>
  );
};

export default App;
