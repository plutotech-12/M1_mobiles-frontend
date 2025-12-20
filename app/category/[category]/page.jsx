"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import api from "../../../lib/api";
import ProductCard from "../../../components/ProductCard";

/* ---------------- CATEGORY CONFIG ---------------- */

const CATEGORY_CONFIG = {
  Phones: ["New", "Like New", "Demo-OpenBox", "Refurbished"],
  Tablets: ["New", "Like New", "Demo-OpenBox", "Refurbished"],
  Accessories: [],
  "Home Appliances": ["Smart TV", "AC", "Speakers", "Cookware"],
};

export default function CategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------------- STATE ---------------- */
  const [activeCategory, setActiveCategory] = useState(category);
  const [subFilter, setSubFilter] = useState("All");
  const [hydrated, setHydrated] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const subCategories = CATEGORY_CONFIG[activeCategory] || [];

  /* ---------------- HYDRATE FROM URL + localStorage ---------------- */
  useEffect(() => {
    const urlSub = searchParams.get("sub");
    const savedSub = localStorage.getItem("lastSubFilter");

    setActiveCategory(category); // 🔥 ROUTE IS KING
    setSubFilter(urlSub || savedSub || "All");

    setHydrated(true);
   }, [category]);



  /* ---------------- SAVE STATE + UPDATE URL ---------------- */
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("lastSubFilter", subFilter);

    const params = new URLSearchParams();
    if (subFilter !== "All") params.set("sub", subFilter);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [subFilter, hydrated]);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    if (!hydrated) return;

    setLoading(true);

    const params = { category: activeCategory };

    // Phones / Tablets
    if (activeCategory !== "Home Appliances") {
    if (subFilter !== "All") {
        params.subCategory = subFilter;
    }
    }

    // Home Appliances
    if (activeCategory === "Home Appliances") {
    if (subFilter !== "All") {
        params.type = subFilter;
    }
    // ✅ when "All", DO NOT add type → backend returns all appliances
    }


    api
      .get("/products", { params })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch error", err))
      .finally(() => setLoading(false));
  }, [activeCategory, subFilter, hydrated]);

  if (!hydrated) return null;

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">

      {/* ================= STICKY FILTER BAR ================= */}
      <div className="sticky top-16 z-40 bg-white border-b">

        {/* MAIN CATEGORY */}
        <div className="flex gap-3 overflow-x-auto px-1 pt-4 snap-x snap-mandatory">
          {Object.keys(CATEGORY_CONFIG).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                router.push(`/category/${cat}`);
                setSubFilter("All");
              }}
              className={`snap-start px-5 py-2 rounded-full whitespace-nowrap font-medium transition ${
                activeCategory === cat
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SUB CATEGORY */}
        {subCategories.length > 0 && (
          <div className="flex gap-3 overflow-x-auto px-1 pb-4 mt-3 snap-x snap-mandatory">
            {["All", ...subCategories].map((sub) => (
              <button
                key={sub}
                onClick={() => setSubFilter(sub)}
                className={`snap-start px-4 py-1.5 rounded-full text-sm transition ${
                  subFilter === sub
                    ? "bg-orange-100 text-orange-700 font-semibold"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className="mt-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found in this category
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ================= MOBILE FILTER BUTTON ================= */}
      <button
        onClick={() => setFilterOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-orange-600 text-white px-5 py-3 rounded-full shadow-lg z-50"
      >
        Filters
      </button>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute bottom-0 w-full bg-white rounded-t-2xl p-5">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Categories */}
            <div className="space-y-2">
              {Object.keys(CATEGORY_CONFIG).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSubFilter("All");
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    activeCategory === cat
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sub filters */}
            {subCategories.length > 0 && (
              <div className="mt-4 space-y-2">
                {["All", ...subCategories].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubFilter(sub)}
                    className={`block w-full text-left px-4 py-2 rounded-lg ${
                      subFilter === sub
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setFilterOpen(false)}
              className="mt-6 w-full bg-orange-600 text-white py-3 rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
