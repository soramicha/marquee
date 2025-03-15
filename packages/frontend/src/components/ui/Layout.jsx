import { Outlet } from "react-router-dom";
import Navbar from "@/pages/Navbar";

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout;