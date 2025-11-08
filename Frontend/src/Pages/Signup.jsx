import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import { handleSuccess } from "../utils"; 

function Signup() {
  const [signupinfo, setSignupinfo] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupinfo = { ...signupinfo };
    copySignupinfo[name] = value;
    setSignupinfo(copySignupinfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Add signup logic here
    const { username, email, password } = signupinfo;
    console.log("Signing up with:", username, email, password);
    if (!username || !email || !password) {
      return handleError("Please fill in all fields");
    }
    // Further processing like API calls can be done here
    try {
      // Simulate successful signup
      const url = "http://localhost:3000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupinfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="username">UserName</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter UserName"
            name="username"
            autoFocus
            value={signupinfo.username}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            placeholder="Enter Email"
            name="email"
            value={signupinfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
            name="password"
            value={signupinfo.password}
          />
        </div>
        <button type="submit">Submit</button>
        <br />
        <span>
          Already have an account? <a href="/login">Login</a>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
