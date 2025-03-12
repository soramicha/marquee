import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useAuth } from "@/context/AuthContext";
import { Heading } from "@chakra-ui/react";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div>
                <Heading>Loading...</Heading>
            </div>
        );
    }

    return <Outlet />;
};

export default PersistLogin;
