import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
    });
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', formData);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                setFormErrors(Object.values(error.response.data));
            } else {
                console.error(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="password_confirmation">Confirm password:</label>
                <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
            </div>
            {formErrors.length > 0 && (
                <div>
                    {formErrors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
            )}
            <button type="submit" className="register-button">Register</button>
        </form>
    );
};

export default RegistrationForm;