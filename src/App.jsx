import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import Overview from './Pages/Overview';
import VillageManagement from './Pages/VillageManagement';
import Chat from './Pages/Chat';
import Gallery from './Pages/Gallery';
import './styles/authentication.css';
import './styles/main.css';


const App = () => {
  const AppContent = () => {
    const navigate = useNavigate();

    const switchToSignUp = () => navigate('/signup');
    const switchToLogin = () => navigate('/login');

    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<LoginForm switchToSignUp={switchToSignUp} />}
        />
        <Route
          path="/signup"
          element={<SignUpForm switchToLogin={switchToLogin} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/village-management" element={<VillageManagement />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
