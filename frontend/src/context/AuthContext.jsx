import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // ✅ Added missing import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("skillshala-user");
    return stored ? JSON.parse(stored).user : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("skillshala-token") || "");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Token expired");
        setUser(data);
      } catch (err) {
        console.warn("Auto-login failed:", err.message);
        logout();
      }
    };

    if (token) fetchUser();
  }, [token]);

  const signup = async (name, email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/signup`, {
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
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
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

  const refreshUser = async () => {
    const token = localStorage.getItem("skillshala-token");
    if (!token) {
      console.warn("❌ No token found in localStorage");
      return;
    }
  
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
  
      // ✅ Update localStorage with latest user data
      localStorage.setItem("skillshala-user", JSON.stringify({ user: res.data }));
  
    } catch (err) {
      console.error("❌ Failed to refresh user:", err.message);
    }
  };

  
  return (
    <AuthContext.Provider value={{ user, setUser, token, signup, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
