import React,{useState} from "react";
import { Link } from "react-router-dom";

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefualt()
        setLoading(true)
        setError('')
       try {
        const response = await fetch('FAKE URL', {
            method: 'POST',
            headers: {
                'conetnt -type' : 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json()
        if (!response.ok) throw new Error(response.message || 'Failed to Log In')
            localStorage.setItem('authToken', result)
            fetchUserData();
       } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchUserData = async () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const response = await fetch('FAKE URL', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const userData = await response.json();
            console.log("User data fetched:", userData);
            // Store or display user data as needed
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        console.log("User logged out");
        // Redirect to login page or handle post-logout behavior
        window.location.href = "/login";
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p>{error}</p>}
            </form>
            <button onClick={handleLogout}>Logout</button>
            <p>
                Dont have an account? <Link to='/register'>Register Here</Link>
            </p>
        </>
    )
}

export default LoginForm