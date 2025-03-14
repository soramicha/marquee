import { useAuth } from "@/context/AuthContext";
import { axiosPrivate } from "@/api/axios";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosPrivate.get("/refresh", {
            withCredentials: true,
        });
        setAuth((prev) => {
            return {
                ...prev,
                username: response.data.username,
                access_token: response.data.access_token,
            };
        });
        return response.data.access_token;
    };

    return refresh;
};

export default useRefreshToken;
