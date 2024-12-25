import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="/overview">Overview</Link></li>
          <li><Link to="/village-management">Village Management</Link></li>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
        </ul>
        <div className="admin-info">
          <div
            className="avatar"
            style={{
              backgroundImage: "url('C:\\Users\\fadih\\advanceWebProject\\images\\avatar.jpg')",
            }}
          ></div>
          <span id="adminName">Admin Name</span>
          <a href="#" className="logout">Logout</a>
        </div>
      </nav>

     
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
