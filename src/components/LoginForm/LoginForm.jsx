import React, {useState} from 'react';
import axios from 'axios';
import api from "../../api";
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('http://localhost:8000/api/login', {
            email: email,
            password: password,
        })
            .then(response => {
                console.log(response.data);

                // Здесь можно сохранить токен в localStorage
                console.log("Saving token to localStorage...");

                localStorage.setItem('token', response.data.token);

                console.log("Token saved to localStorage!");
                // Получаем токен из локального хранилища и выводим его в консоль

                // Добавляем токен к заголовкам
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;

                // Выводим сохраненный токен из localStorage в консоль
                console.log("Token saved to localStorage:", response.data.token);

                // Перенаправляем пользователя на страницу /products
                window.location.href = '/products';
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} id="loginForm" className="login-form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}
                           value={password} required/>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className="login-button">Log in</button>
            </form>
        </div>
    );
};

export default LoginForm;