// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("skillshala-token") || "");

  // 🔄 Fetch user from /me using token
  const fetchUser = async (storedToken) => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch user");
      setUser(data);
    } catch (err) {
      console.error("Error loading user:", err);
      logout();
    }
  };

  // 🟡 Load user on mount if token exists
  useEffect(() => {
    if (token) fetchUser(token);
  }, [token]);

  // ✅ Signup
  const signup = async (name, email, password) => {
    const res = await fetch("http://localhost:8000/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");

    localStorage.setItem("skillshala-token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  // ✅ Login
  const login = async (email, password) => {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("skillshala-token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("skillshala-token");
    setToken("");
    setUser(null);

    localStorage.setItem("skillshala-user", JSON.stringify({
      user: {
        ...data.user,
        token: data.token, // ✅ include token with user
      },
    }));
    setUser({ ...data.user, token: data.token });

  };



  return (
    <AuthContext.Provider value={{ user, signup, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
