import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth?.access_token) {
            navigate('/login', { state: { from: location } });
        }
    }, [auth, navigate, location]);

    return auth?.access_token ? <Outlet /> : null;
}

export default RequireAuth;