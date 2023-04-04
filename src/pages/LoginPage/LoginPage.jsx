import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import './LoginPage.css';

function LoginPage() {
    const [formType, setFormType] = useState("login");

    const handleFormTypeChange = (type) => {
        setFormType(type);
    };

    return (
        <div className="login-page">
            <h1>Login Page</h1>
            {formType === "login" ? (
                <LoginForm onFormTypeChange={handleFormTypeChange} />
            ) : (
                <RegistrationForm onFormTypeChange={handleFormTypeChange} />
            )}
        </div>
    );
}

export default LoginPage;