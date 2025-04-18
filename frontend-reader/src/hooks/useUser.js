import { useEffect, useState } from 'react';
import { getRequest } from '../api/api.js';

const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // if token exists, fetch user data
        const token = localStorage.getItem('token');
        const abortController = new AbortController();
        if (token) {
            getRequest('/users', abortController.signal, {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
                .then((user) => setUser(user))
                .catch((error) => {
                    // if unauthorized error, delete expired token
                    if (error.code == 401) {
                        localStorage.removeItem('token');
                        return null;
                    }
                });
        }

        return () => abortController.abort();
    }, []);

    return user;
};

export { useUser };
