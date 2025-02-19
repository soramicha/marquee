import { BrowserRouter, Routes, Route } from "react-router-dom";
//import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FilterNavbar from "./pages/FilterNavbar";

function App() {
    return (
        <>
        <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="filternavbar" element={<FilterNavbar/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
        </>
    );
}

export default App;
