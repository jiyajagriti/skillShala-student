import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("skillshala-user");
    return stored ? JSON.parse(stored).user : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("skillshala-token") || "");

  // ✅ Optional: Re-validate user on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Token expired");
        setUser(data);
      } catch (err) {
        console.warn("Auto-login failed, logging out:", err.message);
        logout(); // Expired or invalid token
      }
    };

    if (token) fetchUser();
  }, [token]);

  const signup = async (name, email, password) => {
    const res = await fetch("http://localhost:8000/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");

    localStorage.setItem("skillshala-token", data.token);
    localStorage.setItem("skillshala-user", JSON.stringify({ user: data.user }));
    setToken(data.token);
    setUser(data.user);
  };

  const login = async (email, password) => {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("skillshala-token", data.token);
    localStorage.setItem("skillshala-user", JSON.stringify({ user: data.user }));
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("skillshala-token");
    localStorage.removeItem("skillshala-user");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
