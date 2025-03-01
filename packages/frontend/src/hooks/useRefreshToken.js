import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('http://localhost:8000/refresh', {
                withCredentials: true
            });
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