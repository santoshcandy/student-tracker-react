import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../Config';
import "../style/markform.css"
const MarksForm = ({ studentId, markId, existingMarkData, onFormSubmit }) => {
    const [subject, setSubject] = useState(existingMarkData ? existingMarkData.subject : '');
    const [assignmentMarks, setAssignmentMarks] = useState(existingMarkData ? existingMarkData.assigment_marks : 0);
    const [seminarMarks, setSeminarMarks] = useState(existingMarkData ? existingMarkData.seminar_marks : 0);
    const [assessmentMarks, setAssessmentMarks] = useState(existingMarkData ? existingMarkData.assessment_marks : 0);
    const [behaviourMarks, setBehaviourMarks] = useState(existingMarkData ? existingMarkData.behaviour_marks : 0);
    const [teacher, setTeacher] = useState(existingMarkData ? existingMarkData.teacher : '');
    const [student, setStudent] = useState(studentId);
    const [subjectList, setSubjectList] = useState([]); // State to store subjects list

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${API_URL}/subject/list/`); // API call to fetch the list of subjects
                setSubjectList(response.data); // Assuming response.data is an array of subjects
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const marksData = {
            teacher,
            student,
            subject,
            assigment_marks: assignmentMarks,
            seminar_marks: seminarMarks,
            assessment_marks: assessmentMarks,
            behaviour_marks: behaviourMarks,
        };

        const marksDataa = {
            teacher_id: teacher,
            student,
            subject,
            assigment_marks: assignmentMarks,
            seminar_marks: seminarMarks,
            assessment_marks: assessmentMarks,
            behaviour_marks: behaviourMarks,
        };

        try {
            let response;
            if (markId) {
                // If markId exists, we are updating an existing mark
                response = await axios.put(`${API_URL}/marks/${markId}/`, marksDataa);
            } else {
                // If markId doesn't exist, create a new mark
                response = await axios.post(`${API_URL}/marks/`, marksData);
            }

            onFormSubmit(response.data); // Pass the response data back to the parent component
        } catch (error) {
            console.error('Error submitting the marks:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="marks-form">
            <h2>{markId ? 'Update' : 'Add'} Marks</h2>

            <div>
                <label>Subject</label>
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                >
                    <option value="">Select Subject</option>
                    {subjectList.map((subjectItem) => (
                        <option key={subjectItem.id} value={subjectItem.name}>
                            {subjectItem.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Assignment Marks</label>
                <input
                    type="number"
                    value={assignmentMarks}
                    onChange={(e) => setAssignmentMarks(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Seminar Marks</label>
                <input
                    type="number"
                    value={seminarMarks}
                    onChange={(e) => setSeminarMarks(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Test Marks</label>
                <input
                    type="number"
                    value={assessmentMarks}
                    onChange={(e) => setAssessmentMarks(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Attitude Marks</label>
                <input
                    type="number"
                    value={behaviourMarks}
                    onChange={(e) => setBehaviourMarks(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Teacher</label>
                <input
                    type="text"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    required
                />
            </div>

            <button type="submit">{markId ? 'Update' : 'Create'} Marks</button>
        </form>
    );
};

export default MarksForm;
