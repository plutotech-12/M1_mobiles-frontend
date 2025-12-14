"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../lib/api";
import { Loader2, Trash2, Edit2, Plus } from "lucide-react";

export default function AdminProducts() {
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return router.push("/login");
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete this product");
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>

        <button
          onClick={() => router.push("/admin/products/add")}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => {
          // Fix multi-image support
          const mainImage = Array.isArray(p.image)
            ? p.image[0]
            : p.image || p.image_url || "/placeholder.png";

          return (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 border border-gray-100"
            >
              <div className="flex gap-4">

                {/* IMAGE */}
                <div className="w-24 h-24 bg-white rounded-lg border flex items-center justify-center overflow-hidden">
                  <img
                    src={mainImage}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {p.name}
                  </h3>

                  <p className="text-sm text-gray-600">{p.brand}</p>

                  {/* PRICE */}
                  <p className="text-orange-600 font-bold text-lg mt-1">
                    ₹{p.price?.toLocaleString("en-IN")}
                  </p>

                  {/* CATEGORY + STOCK */}
                  <div className="flex gap-2 mt-1">
                    {p.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                        {p.category}
                      </span>
                    )}

                    {p.stock > 0 ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        In Stock ({p.stock})
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-auto flex gap-2 pt-3">
                    <button
                      onClick={() => router.push(`/admin/products/edit/${p._id}`)}
                      className="flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                    >
                      <Edit2 size={15} /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
