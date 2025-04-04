import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    const handleLogout = async () => {
        try {
            const response = await fetch('FAKE URL', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                }
            })
            if (!response.ok) {
                throw new Error('couldnt log out');
            }
            
            localStorage.removeItem('authToken');
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
        
    };

    const isLoggedIn = !!localStorage.getItem('authToken');

    return (
        <nav>
            <Link to="/">Home</Link>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default NavBar;

