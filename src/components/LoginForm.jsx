import React from 'react';
import Swal from 'sweetalert2';
import users from '/data/admins.json';

const LoginForm = ({ switchToSignUp }) => {

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;


    const user = users.find((user) => user.user_name === username);

    if (user && user.password === password) {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/overview'; 
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid username or password',
        text: 'Please check your credentials and try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <a href="#" onClick={switchToSignUp}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
