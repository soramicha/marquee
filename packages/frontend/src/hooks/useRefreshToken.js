import axiosPrivate from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axiosPrivate.get('/refresh');
            setAuth((prev) => {
                return { ...prev, username: response.data.username, access_token: response.data.access_token};
            });
            return response.data.access_token;            
        } catch (error) {
            throw error;
        }

    }
    
    return refresh;
};

export default useRefreshToken;