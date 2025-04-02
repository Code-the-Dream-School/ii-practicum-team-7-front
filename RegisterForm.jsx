import React, {useState} from "react";

function RegisterForm() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmpassword: ''});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            alert('Passwords do not match')
            return;
        };
        console.log('Register with', formData)
        //Register logic goes here
    };

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
                <button type='submit'>Register</button>
            </form>
        </>
    )
}

export default RegisterForm