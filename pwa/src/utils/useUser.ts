import { useState } from 'react';
import User from '../models/user-type';

export default function useUser() {
    const getUser = () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : user;
    };

    const [user, saveUser] = useState(getUser());

    const setUser = (user: User) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        saveUser(user);
    };

    return { user, setUser };
}