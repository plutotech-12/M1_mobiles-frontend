"use client";

import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";
import api from "../lib/api"; // axios instance

export default function SearchResults({
  isOpen,
  onClose,
  searchQuery,
  onAddToCart,
}) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reference to modal
  const modalRef = useRef(null);

  // CLICK OUTSIDE TO CLOSE (Guaranteed working)
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      // If click happens outside modal → close
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (searchQuery.trim()) {
      searchProducts();
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const searchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products");
      const allProducts = res.data;

      const q = searchQuery.toLowerCase();

      const filtered = allProducts.filter((p) => {
        return (
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
        );
      });

      setResults(filtered);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30" />

      {/* Modal Container */}
      <div className="fixed inset-0 z-40 flex items-start justify-center pt-24">

        {/* MODAL BOX WITH REF */}
        <div
          ref={modalRef}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Search Results{" "}
              {searchQuery && (
                <span className="text-lg text-gray-500 ml-2">
                  for "{searchQuery}"
                </span>
              )}
            </h2>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
