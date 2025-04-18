import { createContext, useState, useContext } from "react";

// Create context
const UserContext = createContext();

// Create Provider Component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Global user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom Hook for easy access
export function useUser() {
  return useContext(UserContext);
}
