"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // ⭐ NEW: CART STATE
  const [loadingCart, setLoadingCart] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const userData = JSON.parse(saved);
      setUser(userData);
    }
  }, []);

  // ⭐ Load cart from backend when user logs in
  useEffect(() => {
    if (!user) {
      setCart([]); // if logged out → empty cart
      return;
    }

    (async () => {
      try {
        setLoadingCart(true);
        const res = await api.get("/cart"); // requires token auth (you already have auth middleware)
        setCart(res.data);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoadingCart(false);
      }
    })();
  }, [user]);

  // Login
  const login = (userData) => {
    // userData = { token, id, name, email, role }
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };



  // Logout
  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cart,
        setCart,  // ⭐ expose setter so Cart UI and product pages can update it
        login,
        logout,
        loadingCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
