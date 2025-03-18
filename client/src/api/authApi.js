import { useEffect, useRef } from "react";
import request from "../utils/request.js"

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