import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import Provider and hook
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

// Inner component that consumes the context
function AppContent() {
  const { isAuthenticated } = useAuth(); // Get the state from context

  return (
    <div className="App">
      <h1>Simple Login with Context API</h1>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}

// Main App component that provides the context
function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the content with the Provider */}
      <AppContent /> {/* Render the component that uses the context */}
    </AuthProvider>
  );
}

export default App;
