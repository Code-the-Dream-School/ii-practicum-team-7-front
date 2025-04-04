import React, {useEffect} from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmpassword: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmpassword) {
            alert('Passwords do not match')
        }
        setLoading(true)
        setError('')

        try {
            const response = await fetch('Fake url', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json()
            if (!response.ok) throw new Error(response.message || 'failed to register')
                localStorage.setItem('authToken', result.token)
        }  catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
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
                <input
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {error && <p>{error}</p>}
            </form>
            <p>
                Already have an account? <Link to='/login'>Log in here</Link>
            </p>
        </>
    );
}

export default RegisterForm;
