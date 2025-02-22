import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import PersistLogin from "@/components/PersistLogin";
import RequireAuth from "@/components/RequireAuth";
import Home from "@/pages/Home";

function App() {
    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route element={<PersistLogin />}>
                {/* protected routes */}
                  <Route element={<RequireAuth />}>
                    <Route path="/home" element={<Home />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </>
    );
}

export default App;
