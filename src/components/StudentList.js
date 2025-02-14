import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../Config';
import { FaEye } from 'react-icons/fa'; // Import icon
import "../style/StudentList.css"; // Import the CSS file

const StudentList = () => {
    const { classId } = useParams();
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${API_URL}/class/${classId}/students/`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students');
            }
        };
        fetchStudents();
    }, [classId]);

    const handleStudentClick = (studentId) => {
        navigate(`/teacher/students/${studentId}/dashboard`);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Students in Class</h2>
            <div className="row">
                {students.map((student, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={student.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title">
                                        <span className="badge bg-primary mr-2">{index + 1}</span> {student.name}
                                    </h5>
                                    <button
                                        className="btn btn-outline-primary d-md-none "
                                        onClick={() => handleStudentClick(student.id)}
                                    >
                                        <FaEye /> {/* Eye icon for mobile view */}
                                    </button>
                                </div>
                                <button
                                    className="btn btn-outline-primary w-100 d-none d-md-block"
                                    onClick={() => handleStudentClick(student.id)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentList;
