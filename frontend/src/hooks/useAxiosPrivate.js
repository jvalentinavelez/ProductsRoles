// hook that attatches the axios interceptors 

import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            //to check the config of the request 
            config => {
                // not a re-try, first attempt or initial request
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                console.log(config)
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                // 403: Forbidden if our request has failed due to an expired token
                // and if sent does not exist, to prevent loop that could happen with the 403 error
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    // set the new access token
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    // request updated with the refresh token, so we will have a new access token
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        //clean-up function to remove the interceptors to avoid them to pile up
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;