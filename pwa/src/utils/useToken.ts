import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const token = sessionStorage.getItem('token');
        return token;
    };

    const [token, saveToken] = useState(getToken());

    const setToken = (token: string) => {
        sessionStorage.setItem('token', token);
        saveToken(token);
    };

    return {token, setToken};
}