"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";
import api from "../lib/api";



export default function ProductGrid({ title, categorySlug, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // New / Refurbished / All

  useEffect(() => {
    fetchProducts();
  }, [categorySlug ?? null, filter]);


  const fetchProducts = async () => {
    try {
      setLoading(true);

      let query = "";

      // Handle main category
      if (categorySlug) {
        query += `?category=${categorySlug}`;
      }

      // Handle subcategory only if Phones
      if (categorySlug === "Phones" && filter !== "all") {
        query += `${query ? "&" : "?"}subCategory=${
          filter === "new" ? "New" : "Refurbished"
        }`;
      }

      const res = await api.get(`/products`);

      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only show filter buttons on Phones
  const showPhoneFilters = categorySlug === "Phones";

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header + Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>

          {/* Filters for Phones only */}
          {showPhoneFilters && (
            <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
              {["all", "new", "refurbished"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    filter === f
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white"
                      : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  {f === "all"
                    ? "All"
                    : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products List */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
