import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        //setting that will allow to send cookies with the request
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        // we'll get a new accessToken
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;