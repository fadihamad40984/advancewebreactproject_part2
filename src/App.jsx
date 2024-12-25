import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import Overview from './Pages/Overview';
import VillageManagement from './Pages/VillageManagement';
import Chat from './Pages/Chat';
import Gallery from './Pages/Gallery';
import './styles/authentication.css';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const switchToSignUp = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  const loginHandler = () => {
    setIsAuthenticated(true);  
  };

  const logoutHandler = () => {
    setIsAuthenticated(false); 
  };

  return (
    <Router>
      <Routes>
       
        <Route
          path="/login"
          element={<LoginForm switchToSignUp={switchToSignUp} loginHandler={loginHandler} />}
        />
        <Route
          path="/signup"
          element={<SignUpForm switchToLogin={switchToLogin} />}
        />
       
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/overview" /> : <Navigate to="/login" />}
        />
        <Route
          path="/overview"
          element={isAuthenticated ? <Dashboard><Overview /></Dashboard> : <Navigate to="/login" />}
        />
        <Route
          path="/village-management"
          element={isAuthenticated ? <Dashboard><VillageManagement /></Dashboard> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <Dashboard><Chat /></Dashboard> : <Navigate to="/login" />}
        />
        <Route
          path="/gallery"
          element={isAuthenticated ? <Dashboard><Gallery /></Dashboard> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
