import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import './styles/authentication.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/signup" element={<SignUpForm />} /> 
      </Routes>
    </Router>
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignUp = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div>
      {isLogin ? (
        <LoginForm switchToSignUp={switchToSignUp} />
      ) : (
        <SignUpForm switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default App;
