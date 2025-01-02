/* import React from "react";
import { Link } from "react-router-dom";
import '../styles/dash.css';

const Dashboard = ({ children }) => {
  return (
<div className="dashboard">
  <button className="menu-toggle">
    <img style={{padding: 3, backgroundColor: 'white', width: 40, height: 40}} src="" alt="Menu" /> 
  </button>
<div className="switch">
  <input id="toggle" type="checkbox" />
  <label className="toggle" htmlFor="toggle">
    <i />
  </label>
  &nbsp;&nbsp;</div>

  <nav className="sidebar">
  
    <h2>Dashboard</h2>
           <ul>
          <li><Link className="link" to="/overview">Overview</Link></li>
          <li><Link className="link" to="/village-management">Village Management</Link></li>
          <li><Link className="link" to="/chat">Chat</Link></li>
          <li><Link className="link" to="/gallery">Gallery</Link></li>
        </ul>
    <div className="admin-info">
      <div className="avatar" style={{backgroundImage: 'url("")'}} />
      <span id="adminName">Admin Name</span>
      <a href="#" className="logout">Logout</a>
    </div>
  </nav>
  {children}
</div>
  );
};

export default Dashboard;
 */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/dash.css';

const Dashboard = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to toggle dark mode on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Handle toggle change
  const handleToggleChange = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="dashboard">
      <button className="menu-toggle">
        <img style={{ padding: 3, backgroundColor: 'white', width: 40, height: 40 }} src="" alt="Menu" />
      </button>

      {/* Dark mode switch */}
      <div className="switch">
        <input
          id="toggle"
          type="checkbox"
          checked={isDarkMode}
          onChange={handleToggleChange}
        />
        <label className="toggle" htmlFor="toggle">
          <i />
        </label>
      </div>

      <nav className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link className="link" to="/overview">Overview</Link></li>
          <li><Link className="link" to="/village-management">Village Management</Link></li>
          <li><Link className="link" to="/chat">Chat</Link></li>
          <li><Link className="link" to="/gallery">Gallery</Link></li>
        </ul>
        <div className="admin-info">
          <div className="avatar" style={{ backgroundImage: 'url("")' }} />
          <span id="adminName">Admin Name</span>
          <a href="#" className="logout">Logout</a>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Dashboard;
