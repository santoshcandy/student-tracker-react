import React from 'react';
import {  HashRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherRegister from './components/TeacherRegister';
import TeacherLogin from './components/TeacherLogin';
import ClassList from './components/ClassList';
import StudentList from './components/StudentList';
import StudentDashboard from './components/StudentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage';
import StudentLogin from './student/StudentLogin';
import StdDashboard from './student/StdDashboard';
import ClassRegister from './components/ClassRegister';
import StudentRegister from './student/StudentRegister';
const App = () => {
    return (
        <Router>
         
            <Routes>
                <Route path="/teacher/register" element={<TeacherRegister/>} />
                <Route path="/class/register" element={< ClassRegister/>} />
                <Route path="/student/register" element={< StudentRegister/>} />

                <Route path="/teacher/login" element={<TeacherLogin/>} />
                <Route path="/student/login" element={< StudentLogin/>} />

                <Route path="" element={<Homepage/>} />

                <Route path="/teacher/classes" element={<ClassList/>} />
                <Route path="/teacher/classes/:classId/students" element={<StudentList/>} />
                <Route path="/teacher/students/:studentId/dashboard" element={<StudentDashboard/>} />
                <Route path="/teacher/students/:studentId/dashboard2" element={<StdDashboard/>} />

            </Routes>
        </Router>
    );
};

export default App;
