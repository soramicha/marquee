import { useAuth } from "@/context/AuthContext";
import { axiosPrivate } from "@/api/axios";

const useRefreshToken = () => {
    const { setAuth, initializeFirebaseAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axiosPrivate.get("/refresh");
            setAuth((prev) => ({
                ...prev,
                username: response.data.username,
                access_token: response.data.access_token,
            }));
            initializeFirebaseAuth(response.data.access_token);
            return response.data.access_token;
        } catch (error) {
            console.error("Token refresh failed:", error);
            setAuth({}); // Clear auth state
            throw new Error("Failed to refresh token"); // Transform error
        }
    };

    return refresh;
};

export default useRefreshToken;
