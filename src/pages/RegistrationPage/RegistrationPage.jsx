import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import './RegistrationPage.css';

function RegistrationPage() {
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    async function handleRegistration(credentials) {
        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (response.status === 422) {
            setErrors(data.errors);
        } else if (response.status === 201) {
            navigate("/login");
        }
    }

    return (
        <div className="registration-page">
            <h2>Registration</h2>
            <RegistrationForm onSubmit={handleRegistration} errors={errors} />
        </div>
    );
}

export default RegistrationPage;