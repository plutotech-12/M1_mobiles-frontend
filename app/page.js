"use client";

import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import SearchResults from "../components/SearchResults";
import BuybackForm from "../components/BuybackForm";

export default function Page() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Listen for search
  useEffect(() => {
    const searchListener = (e) => {
      setSearchQuery(e.detail);
      setSearchOpen(true);
    };

    document.addEventListener("searchEvent", searchListener);
    return () => document.removeEventListener("searchEvent", searchListener);
  }, []);

  return (
    <>
      <Hero />

      <div id="phones">
        {/* ❌ NO onAddToCart HERE */}
        <ProductGrid title="Featured Phones" />
      </div>

      <div id="buyback">
        <BuybackForm />
      </div>

      {/* ❌ NO onAddToCart HERE */}
      <SearchResults
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchQuery={searchQuery}
      />
    </>
  );
}
