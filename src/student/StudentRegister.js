import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/studentregister.css";
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../Config';

const StudentRegister = () => {
    const [name, setName] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [dob, setDob] = useState('');
    const [sex, setSex] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [classes, setClasses] = useState([]);  // To store fetched classes
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // Fetch the classes from the API when the component mounts
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`${API_URL}/teacher/classes`);
                setClasses(response.data);  // Store the classes in the state
            } catch (error) {
                setMessage('Failed to fetch classes');
                setError(true);
            }
        };

        fetchClasses();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!name || !regNumber || !dob || !sex || !studentClass) {
            setError(true);
            setMessage('All fields are required');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/student/register/`, {
                name,
                reg_number: regNumber,
                dob,
                sex,
                Student_class: studentClass
            });
            setMessage('Student Registration Successful');
            setError(false);
            navigate('/student/login');
        } catch (error) {
            setMessage('Student Registration Failed');
            setError(true);
        }
    };

    return (
        <div className="registration-form-container">
            <h2 className="section-title">Student Registration</h2>
            <form className="registration-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                />
                <input
                    type="text"
                    placeholder="Registration Number"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    className="form-control"
                    required
                />
                <input
                    type="date"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="form-control"
                    required
                />
                <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="">Select Class</option>
                    {classes.map((classItem) => (
                        <option key={classItem.id} value={classItem.id}>
                            {classItem.name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="btn-submit">Register Student</button>
            </form>
            {message && <p className={`message ${error ? 'error' : 'success'}`}>{message}</p>}
        </div>
    );
};

export default StudentRegister;
