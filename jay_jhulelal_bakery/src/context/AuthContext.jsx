import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate        = useNavigate();
  const { refreshCart } = useCart();
  const [user, setUser]       = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  //  restore session on page refresh 
  useEffect(() => {
    const stored = localStorage.getItem("bakery_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAdmin(parsed.isAdmin === true);
      } catch {
        localStorage.removeItem("bakery_user");
      }
    }
    setLoading(false);
  }, []);

  //  login 
  const login = useCallback((userData) => {
    setUser(userData);
    setIsAdmin(userData.isAdmin === true);
    localStorage.setItem("bakery_user", JSON.stringify(userData)); //  token is inside userData
    refreshCart();
    navigate(userData.isAdmin ? '/admin' : '/');
  }, [navigate, refreshCart]);

  // logout 
  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("bakery_user"); // clears token too since it's inside user object
    navigate('/');
  }, [navigate]);

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