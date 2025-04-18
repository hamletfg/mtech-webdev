import React, { createContext, useState, useContext } from "react";

// Create context
const AuthContext = createContext(null);

// Create provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login function
  const login = (username, password) => {
    // -- Very Simple Mock Authentication --
    if (username === "user" && password === "password") {
      setIsAuthenticated(true);
      console.log("Login successful");
      return true; // Indicate success
    }
    console.log("Login failed: Invalid credentials");
    setIsAuthenticated(false);
    return false; // Indicate failure
    // --- End Mock Authentication --
  };

  //Logout function
  const logout = () => {
    setIsAuthenticated(false);
    // setUser(null);
    console.log("Logged out");
  };

  const value = {
    isAuthenticated,
    //user, // Include if you store user details
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
