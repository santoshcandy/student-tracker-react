import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Homepage.css'; // Custom CSS for the homepage

const Homepage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="homepage-container">
      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className={`line ${sidebarOpen ? 'open' : ''}`}></div>
        <div className={`line ${sidebarOpen ? 'open' : ''}`}></div>
        <div className={`line ${sidebarOpen ? 'open' : ''}`}></div>
      </div>

      {/* Sidebar Section */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/student/register" className="sidebar-link">Student Register</Link>
          </li>
          <li>
            <Link to="/teacher/register" className="sidebar-link">Teacher Register</Link>
          </li>
          <li>
            <Link to="/class/register" className="sidebar-link">Class Register</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <h1 className="ch animate__animated animate__fadeIn">Welcome to the Student Tracker</h1>
        <p className="cp animate__animated animate__fadeIn animate__delay-1s">Please choose your login option:</p>
        <div>
          <Link to="/teacher/login" className="btn btn-teacher m-3 animate__animated animate__fadeIn animate__delay-2s">
            Login as Teacher
          </Link>
          <Link to="/student/login" className="btn btn-student m-3 animate__animated animate__fadeIn animate__delay-3s">
            Login as Student
          </Link>
        </div>
      </div>
      
      {/* What is this project Section */}
      <section className="project-info">
        <h2 className="section-title animate__animated animate__fadeInUp">What is this Project?</h2>
        <p className="project-description animate__animated animate__fadeIn animate__delay-1s">
          This project is designed to help track students, teachers, and their related information in an intuitive dashboard. It includes functionalities like logging in as a student or teacher, managing classes, viewing student lists, and much more!
        </p>
        
        <div className="feature-list">
          <div className="feature-item animate__animated animate__fadeInLeft">
            <p>Teacher Login</p>
          </div>
          <div className="feature-item animate__animated animate__fadeInRight">
            <p>Student Login</p>
          </div>
          <div className="feature-item animate__animated animate__fadeInLeft">
            <p>Class List</p>
          </div>
          <div className="feature-item animate__animated animate__fadeInRight">
            <p>Student List</p>
          </div>
          <div className="feature-item animate__animated animate__fadeInLeft">
            <p>Dashboard</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Student Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
