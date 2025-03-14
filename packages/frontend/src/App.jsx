// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PersistLogin from "@/components/PersistLogin";
import RequireAuth from "@/components/RequireAuth";
import Home from "@/pages/Home";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import IndivEmail from "./pages/IndivEmail";
import ListingDetail from "./pages/ListingDetail";
import Favorites from "./pages/Favorites"; // we'll create this page below
import SendEmail from "./pages/SendEmail";
import ViewAllEmails from "./pages/ViewAllEmails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="listing/:id" element={<ListingDetail />} />
                {/* Protected routes wrapper (for future use) */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        {/* Place your protected routes here, e.g.:
                            <Route path="dashboard" element={<Dashboard />} />
                        */}
                        <Route
                            path="listing/create"
                            element={<CreateListing />}
                        />
                        <Route path="email" element={<ViewAllEmails />} />
                        <Route path="email/create" element={<SendEmail />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="email/:id" element={<IndivEmail />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
