import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export const LoginMenu = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(currentUser => setUser(currentUser))
            .catch(() => setUser(null));
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await Auth.signOut();
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <div>
            {user ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
}
