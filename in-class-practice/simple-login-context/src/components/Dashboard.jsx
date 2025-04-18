import React from "react";
import { useAuth } from "../context/AuthContext"; // Import the custom hook

function Dashboard() {
  const { logout } = useAuth(); // Get the logout function from context
  // const { user } = useAuth(); // Get user info if stored

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Welcome, {user ? user.name : 'User'}! */}
      <p>Welcome! You are logged in.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
