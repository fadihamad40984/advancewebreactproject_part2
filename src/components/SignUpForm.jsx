import React from "react";
import { useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";

const ADD_USER = gql`
  mutation addUser($input: userInput!) {
    addUser(input: $input)
  }
`;

const SignUpForm = ({ switchToLogin }) => {
  const [addUserMutation, { loading, error }] = useMutation(ADD_USER);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target.fullname.value;
    const user_name = e.target.username.value;
    const password = e.target.password.value;

    const input = { name, user_name, password };

    try {
      await addUserMutation({ variables: { input } });
      Swal.fire({
        title: "Success!",
        text: "Registered successfully!",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Failed to Register",
      });
      console.error("Error adding User:", err);
    }
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

          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <a href="#" onClick={switchToLogin}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
