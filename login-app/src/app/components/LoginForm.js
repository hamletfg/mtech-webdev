import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function LoginForm() {
  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Access global user context
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update global user state (simulate login)
    setUser({ email });
    alert("Logged in as ${email}!"); // Means you're logged in! 🎉
  };

  return (
    <form onSubmit={handleSubmit} className="my-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
