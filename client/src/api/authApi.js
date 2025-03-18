import { useContext, useEffect, useRef } from "react";
import request from "../utils/request.js"
import { UserContext } from "../contexts/UserContext.js";

const baseUrl = 'http://localhost:3030/users'

export const useLogin = () => {
    // const abortRef = useRef(new AbortController())

    const login = (email, password) => {
        const result = request.post(
            `${baseUrl}/login`, 
            {email, password}, 
            // { signal: abortRef.current.signal}
        );

        return result;
    }

    // useEffect(() => {
    //     const abortController = abortRef.current;

    //     return () => abortController.abort();
    // }, []);

    return {
        login
    }
}

export const useRegister = () => {
    const register = (email, password) => {
        return request.post(`${baseUrl}/register`, { email, password })
    }

    return {
        register
    }
}

export const useLogout = () => {
    const {accessToken, userLogoutHandler} = useContext(UserContext);

    useEffect(() => {
        console.log(accessToken);
        if(!accessToken) {
            return
        };
        console.log(accessToken);
        
        const options = {
            headers: {
                'X-Authorization': accessToken
            }
        }
        request.get(`${baseUrl}/logout`, null, options)  
            .then(userLogoutHandler)   
    }, [accessToken]);

    return {
        isLoggedOut: !!accessToken,
    }
}