import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();

    async function isAuthenticated() {
        const token = localStorage.getItem('token');
        if (!token) return false;
        try {
            const response = await fetch('http://localhost:8000/api/check-token', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data.authenticated;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    useEffect(() => {
        isAuthenticated().then((authenticated) => {
            if (!authenticated) {
                navigate('/login');
            }
        });
    }, [navigate]);

    return null;
}

export default Auth;
