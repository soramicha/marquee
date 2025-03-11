// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FilterNavbar from "./pages/FilterNavbar";
import ListingCard from "./components/ui/ListingCard";
import PersistLogin from "@/components/PersistLogin";
import RequireAuth from "@/components/RequireAuth";
import Home from "@/pages/Home";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import EditListing from "./pages/EditListing";
import Navbar from "./pages/Navbar";
import IndivEmail from "./pages/IndivEmail";
import ListingDetail from "./pages/ListingDetail";
import Favorites from "./pages/Favorites"; // we'll create this page below
import SendEmail from "./pages/SendEmail";
import ViewAllEmails from "./pages/ViewAllEmails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home Page as the root route */}
                <Route path="/home" element={<Home />} />

                {/* Other routes */}
                <Route path="listing/:id" element={<ListingDetail />} />
                <Route
                    path="listingcard"
                    element={
                        <ListingCard
                            name="Gray Hoodie"
                            price="$50.00"
                            location="PCV Corralitos"
                        />
                    }
                />
                <Route path="email/create" element={<SendEmail />} />
                <Route path="filternavbar" element={<FilterNavbar />} />
                <Route path="email" element={<ViewAllEmails />} />
                <Route path="listing/create" element={<CreateListing />} />
                <Route path="listing/edit" element={<EditListing />} />
                <Route path="/favorites" element={<Favorites />} />
                {/* Use a URL parameter for email id */}
                <Route path="navbar" element={<Navbar />} />

                <Route path="email/:id" element={<IndivEmail />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />

                {/* Protected routes wrapper (for future use) */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        {/* Place your protected routes here, e.g.:
                <Route path="dashboard" element={<Dashboard />} />
            */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
