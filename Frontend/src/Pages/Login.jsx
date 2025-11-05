import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import { handleSuccess } from "../utils"; 

function Login() {
  const [logininfo, setLogininfo] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLogininfo = { ...logininfo };
    copyLogininfo[name] = value;
    setLogininfo(copyLogininfo);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;
    console.log("Logging in with:", email, password);
    if (!email || !password) {
      return handleError("Please fill in all fields");
    }
    // Further processing like API calls can be done here
    try {
      // Simulate successful login
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logininfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, username, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem('loggedInUser', username);
        setTimeout(() => {
          window.location.href = "/home";
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
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            placeholder="Enter Email"
            name="email"
            value={logininfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
            name="password"
            value={logininfo.password}
          />
        </div>
        <button type="submit">Submit</button>
        <br />
        <span>
          Don't have an account? <a href="/signup">Sign Up</a>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
