import React from 'react';

const SignUpForm = ({ switchToLogin }) => {
  const handleSignUp = (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log({ fullname, username, password }); 
  };

  return (
    <div className="signUp-container">
      <div className="signUp-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter your full name"
            required
          />

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

          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <a href="#" onClick={switchToLogin}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
