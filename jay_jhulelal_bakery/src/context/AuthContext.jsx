import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // ✅ import cart context

const AuthContext = createContext(null);

const getCookie = (name) => {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
};

export const AuthProvider = ({ children }) => {
  const navigate           = useNavigate();
  const { refreshCart }    = useCart();           // ✅ refresh cart on login
  const [user, setUser]       = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── restore session on page refresh ───────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem("bakery_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setIsAdmin(parsed.isAdmin === true); // ✅ read from stored object, not cookie
      } catch {
        localStorage.removeItem("bakery_user");
      }
    }
    setLoading(false);
  }, []);

  // ── login ──────────────────────────────────────────────────────────
  const login = useCallback((userData) => {
    // ✅ set state first, then navigate — no setTimeout needed
    setUser(userData);
    setIsAdmin(userData.isAdmin === true);
    localStorage.setItem("bakery_user", JSON.stringify(userData));

    refreshCart(); // ✅ load cart immediately after login

    if (userData.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  }, [navigate, refreshCart]);

  // ── logout ─────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("bakery_user");

    // ✅ properly clear cross-origin cookies
    const cookieOptions = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure";
    document.cookie = `isAdmin=; ${cookieOptions}`;
    document.cookie = `token=; ${cookieOptions}`;

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