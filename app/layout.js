"use client";

import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

export default function RootLayout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Listen for "openCart" event (Header cart icon)
  useEffect(() => {
    const open = () => setCartOpen(true);
    document.addEventListener("openCart", open);
    return () => document.removeEventListener("openCart", open);
  }, []);

  // ⭐ Listen for addToCart events (GLOBAL CART SYSTEM)
  useEffect(() => {
    const handler = (event) => {
      const product = event.detail;

      setCartItems((prev) => {
        // check if product already exists
        const existing = prev.find((item) => item._id === product._id);

        if (existing) {
          // increase quantity
          return prev.map((item) =>
            item._id === product._id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        }

        // add new product
        return [...prev, { ...product, quantity: 1 }];
      });
    };

    document.addEventListener("addToCart", handler);

    return () => document.removeEventListener("addToCart", handler);
  }, []);

  return (
    <html lang="en">
      <body className="bg-white">
        <AuthProvider>
        <Header
          cartCount={cartItems.length}
          onCartClick={() => setCartOpen(true)}
          onSearch={(query) => {
            document.dispatchEvent(
              new CustomEvent("searchEvent", { detail: query })
            );
          }}
        />

        <div className="min-h-screen bg-white">{children}</div>

        {/* ⭐ GLOBAL CART DRAWER */}
        <Cart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={(id, qty) => {
            setCartItems(
              cartItems.map((item) =>
                item._id === id ? { ...item, quantity: qty } : item
              )
            );
          }}
          onRemove={(id) => {
            setCartItems(cartItems.filter((item) => item._id !== id));
          }}
        />

        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
