import React, {useState} from "react";

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: ''});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('log in with', formData)
        //authentication logic goes here
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
                <button type='submit'>Login</button>

            </form>
        </>
    )
}

export default LoginForm