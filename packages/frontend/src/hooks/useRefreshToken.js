import { useAuth } from '@/context/AuthContext';
import { axiosPrivate } from '@/api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axiosPrivate.get('/refresh');
            setAuth((prev) => {
                return { ...prev, access_token: response.data.access_token};
            });
            return response.data.access_token;            
        } catch (error) {
            throw error;
        }

    }
    
    return refresh;
};

export default useRefreshToken;