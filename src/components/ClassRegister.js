import React, { useState } from 'react';
import axios from 'axios';
import "../style/classregister.css";
import { API_URL } from '../Config';

const ClassRegister = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(` ${API_URL}/class/register/`, {
                name
            });
            setMessage('Class Registration Successful');
        } catch (error) {
            setMessage('Class Registration Failed');
        }
    };

    return (
        <div className="registration-form-container">
            <h2 className="section-title">Class Registration</h2>
            <form className="registration-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Class Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                />
                <button type="submit" className="btn-submit">Register Class</button>
            </form>
            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default ClassRegister;
