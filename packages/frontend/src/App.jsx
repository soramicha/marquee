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
import SendMessage from "./pages/SendMessage";
import IndivEmailComponent from "./components/ui/IndivEmailComponent";
import ListingDetail from "./pages/ListingDetail"; 

function App() {
    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                {/* add into protected route later */}
                {/* 2) Add a new route for listing detail */}
                <Route path="listing/:id" element={<ListingDetail />} />

                {/* This is for quick testing your ListingCard */}
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
                <Route path="message/create" element={<SendMessage/>}/>
                <Route path="filternavbar" element={<FilterNavbar/>}></Route>
                <Route path="email" element={<IndivEmailComponent/>}/>
                <Route path="navbar" element={<Navbar/>}></Route>
                <Route path="listing/create" element={<CreateListing/>}/>
                <Route path="listing/edit" element={<EditListing/>}/>
                <Route path="email/id" element={<IndivEmail/>}/> {/* replace id with actual email id */}
                <Route path="listingcard" element={<ListingCard name="Gray Hoodie" price = "$50.00" location="PCV Corralitos"/>} />
                <Route path="/home" element={<Home />} />
                {/* add to protected routes later */}
                <Route path="profile" element={<Profile/>}/>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route element={<PersistLogin />}>
                {/* protected routes */}
                  <Route element={<RequireAuth />}>
                    {/*<Route path="/home" element={<Home />} />*/}
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </>
    );
}

export default App;
