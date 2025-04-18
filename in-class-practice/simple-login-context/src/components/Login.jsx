import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import the custom hook

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Get the login function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const success = login(username, password); // Call the login function from context
    if (!success) {
      setError("Invalid username or password.");
    }
    // No need to redirect here, App component will re-render based on isAuthenticated
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        <small>Hint: Use user / password</small>
      </p>
    </div>
  );
}

export default Login;
