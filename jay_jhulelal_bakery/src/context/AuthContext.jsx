import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

// Reads a cookie value by name
const getCookie = (name) => {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
};

export const AuthProvider = ({ children }) => {
  const navigate=useNavigate()
  const [user, setUser]       = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // On app load — restore user from localStorage + read isAdmin cookie
  // This keeps the user logged in on page refresh
  useEffect(() => {
    const stored = localStorage.getItem("bakery_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("bakery_user");
      }
    }

    // isAdmin cookie is set by your backend on login
    setIsAdmin(getCookie("isAdmin") === "true");

    setLoading(false);
  }, []);

  // Called from LoginPage after successful API response
  // userData = response.data = { _id, name, email, isAdmin, ... }
  const login = (userData) => {
    setTimeout(() => {                          // ← ADD this wrapper
  if (userData.isAdmin) {
    navigate('/admin')
  } else {
    navigate('/')
  }
}, 50) 
    setUser(userData);
    localStorage.setItem("bakery_user", JSON.stringify(userData));

    // Backend already set the cookie, but we also sync state from
    // response.data.isAdmin so the UI updates instantly without waiting
    // for a cookie read
    setIsAdmin(userData.isAdmin === true);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("bakery_user");

    // Clear the isAdmin cookie
    document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      isLoggedIn: !!user,
      loading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};