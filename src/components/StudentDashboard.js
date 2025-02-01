import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../style/StudentDashboard.css";
import MarksForm from './MarksForm';
import { API_URL } from '../Config';

const StudentDashboard = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState({});
  const [marks, setMarks] = useState([]);
  const [selectedMarkId, setSelectedMarkId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [total, setTotal] = useState();
  const [sub, setSub] = useState();
  
  // Assuming we have a list of subjects assigned to the teacher (could be fetched or hardcoded)
  const teacherSubjects = ["Mathematics", "Science", "English"]; // Replace this with actual data
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${API_URL}/student/${studentId}/dasboard/`);
        setStudentData(response.data.student_info);
        setMarks(response.data.marks);
        setTotal(response.data.total_marks);
        setSub(response.data.total_subject);
      } catch (error) {
        console.error('Error fetching student data', error);
      }
    };

    if (studentId) {
      fetchStudentData();
    }
  }, [studentId]);

  const handleEditMarks = (markId) => {
    setSelectedMarkId(markId);
    setIsEditing(true);
  };

  const handleCreateMarks = () => {
    setSelectedMarkId(null);
    setIsEditing(true);
  };

  const handleFormSubmit = (newMarkData) => {
    if (selectedMarkId) {
      const updatedMarks = marks.map((mark) => (mark.id === newMarkData.id ? newMarkData : mark));
      setMarks(updatedMarks);
    } else {
      setMarks([newMarkData, ...marks]);
    }
    setIsEditing(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{studentData.name}</h1>
        <h3 className="total-score">{total}</h3>
      </div>

      <div className="student-info">
        <h2 className="section-title">Student Information</h2>
        <p><strong>Registration Number:</strong> {studentData.reg_number}</p>
        <p><strong>Date of Birth:</strong> {studentData.dob}</p>
        <p><strong>Gender:</strong> {studentData.sex}</p>
        <p><strong>Class:</strong> {studentData.student_class_name}</p>
      </div>

      <div className="marks-section">
        <h2 className="section-title">Marks</h2>
        <button className="btn btn-primary" onClick={handleCreateMarks}>Add New Marks</button>
        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assignment Marks</th>
              <th>Seminar Marks</th>
              <th>Behaviour Marks</th>
              <th>Assessment Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr key={mark.id}>
                <td>{mark.subject}</td>
                <td>{mark.assigment_marks}</td>
                <td>{mark.seminar_marks}</td>
                <td>{mark.behaviour_marks}</td>
                <td>{mark.assessment_marks}</td>
                <td>
                  {/* Show the Edit button only for the subjects assigned to the teacher */}
                  {teacherSubjects.includes(mark.subject) && (
                    <button className="btn btn-warning" onClick={() => handleEditMarks(mark.id)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <MarksForm
          studentId={studentId}
          markId={selectedMarkId}
          existingMarkData={marks.find(mark => mark.id === selectedMarkId)}
          onFormSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
