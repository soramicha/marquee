import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ListingCard from "./components/ui/ListingCard";

function App() {
    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/">
              <Route path="listingcard" element={<ListingCard name="Gray Hoodie" price = "$50.00" location="PCV Corralitos"/>} />                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </>
    );
}

export default App;
