import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/teacherregister.css";
import { API_URL } from '../Config';

const TeacherRegister = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [subjects, setSubjects] = useState([]); // To store subjects fetched from API

    // Fetch subjects from API when the component mounts
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${API_URL}/subject/list/`);
                setSubjects(response.data); // Assuming response is an array of subjects
            } catch (error) {
                setMessage('Failed to load subjects');
            }
        };
        fetchSubjects();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/teacher/register/`, {
                name,
                phone_number: phoneNumber,
                subject,
                password
            });
            setMessage('Registration Successful');
        } catch (error) {
            setMessage('Registration Failed');
        }
    };

    return (
        <div className="registration-form-container">
            <h2 className="section-title">Teacher Registration</h2>
            <form className="registration-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="form-control"
                />
                
                {/* Subject dropdown */}
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="">Select Subject</option>
                    {subjects.map((subjectItem) => (
                        <option key={subjectItem.id} value={subjectItem.id}>
                            {subjectItem.name}
                        </option>
                    ))}
                </select>
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                />
                <button type="submit" className="btn-submit">Register</button>
            </form>
            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default TeacherRegister;
