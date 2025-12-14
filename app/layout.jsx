"use client";

import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import api from "../lib/api";

function LayoutContent({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { user, cart, setCart } = useAuth();

  // Open cart from header
  useEffect(() => {
    const openCartHandler = () => setCartOpen(true);
    document.addEventListener("openCart", openCartHandler);
    return () => document.removeEventListener("openCart", openCartHandler);
  }, []);

  // 🔥 Load cart on page refresh (IF user exists)
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    (async () => {
      try {
        const res = await api.get("/cart");
        setCart(res.data);
      } catch (err) {
        console.error("Initial cart load failed:", err);
      }
    })();
  }, [user, setCart]);

  // Global Add-to-Cart handler
  useEffect(() => {
    const handler = async (event) => {
      const product = event.detail;

      if (!user) {
        alert("Please login to add items to cart.");
        return;
      }

      try {
        await api.post("/cart", {
          productId: product._id,
          quantity: 1,
        });

        const res = await api.get("/cart");
        setCart(res.data);
        setCartOpen(true);
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    };

    document.addEventListener("addToCart", handler);
    return () => document.removeEventListener("addToCart", handler);
  }, [user, setCart]);

  return (
    <>
      <Header
        cartCount={cart?.length || 0}
        onCartClick={() => setCartOpen(true)}
        onSearch={(query) =>
          document.dispatchEvent(
            new CustomEvent("searchEvent", { detail: query })
          )
        }
      />

      <main className="min-h-screen bg-white">{children}</main>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart || []}
        onUpdateQuantity={async (productId, qty) => {
          try {
            await api.put("/cart", { productId, quantity: qty });
            const res = await api.get("/cart");
            setCart(res.data);
          } catch (err) {
            console.error("Update cart failed:", err);
          }
        }}
        onRemove={async (productId) => {
          try {
            await api.delete("/cart", { data: { productId } });
            const res = await api.get("/cart");
            setCart(res.data);
          } catch (err) {
            console.error("Remove cart failed:", err);
          }
        }}
      />

      <Footer />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
