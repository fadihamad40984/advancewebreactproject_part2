/* import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import '../styles/dash.css';

const Dashboard = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <button className="menu-toggle">
        <img style={{ padding: 3, backgroundColor: 'white', width: 40, height: 40 }} src="" alt="Menu" />
      </button>

      <nav className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link className="link" to="/overview">Overview</Link></li>
          <li><Link className="link" to="/village-management">Village Management</Link></li>
          <li><Link className="link" to="/chat">Chat</Link></li>
          <li><Link className="link" to="/gallery">Gallery</Link></li>
        </ul>
        <div className="admin-info">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${user?.avatar ?? '/images/admin.png'})` }}
          />
          <span id="adminName">{user?.name || 'Guest'}</span>
          <a href="#" onClick={handleLogout} className="logout">Logout</a>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Dashboard;
 */


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import '../styles/dash.css';

const Dashboard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for toggling sidebar
  const navigate = useNavigate(); 

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar state
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <button className="menu-toggle" onClick={toggleSidebar}>
        <img
          style={{ padding: 3, backgroundColor: 'white', width: 40, height: 40 }}
          src="/images/menu-icon.png" // Replace with burger menu icon
          alt="Menu"
        />
      </button>

      <nav className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <h2>Dashboard</h2>
        <ul>
          <li><Link className="link" to="/overview">Overview</Link></li>
          <li><Link className="link" to="/village-management">Village Management</Link></li>
          <li><Link className="link" to="/chat">Chat</Link></li>
          <li><Link className="link" to="/gallery">Gallery</Link></li>
        </ul>
        <div className="admin-info">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${user?.avatar ?? '/images/admin.png'})` }}
          />
          <span id="adminName">{user?.name || 'Guest'}</span>
          <a href="#" onClick={handleLogout} className="logout">Logout</a>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Dashboard;

