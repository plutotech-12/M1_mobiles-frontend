"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import ProductCard from "./ProductCard";

export default function ProductGrid({ category, subCategory, onEmpty, type, limit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/products", {
          params: {
            category,
            subCategory,
            type,
            limit
          },
        });
        setProducts(res.data);

        if (onEmpty) {
          onEmpty(res.data.length === 0);
        }

      } catch (err) {
        console.error("Failed to load products:", err);
        if (onEmpty) onEmpty(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, subCategory, limit]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }


  return (
    <div className="
      grid
      grid-cols-2
      sm:grid-cols-3
      lg:grid-cols-4
      gap-4
    ">

      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
