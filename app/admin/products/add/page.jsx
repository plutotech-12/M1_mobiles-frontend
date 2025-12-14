"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../lib/api";
import MultipleImageUploader from "../../../../components/MultipleImageUploader";
import { Loader2 } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const applianceTypes = [
    "Smart TV",
    "Air Conditioner",
    "Speakers",
    "Induction",
    "Cookware"
  ];

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    original_price: "",
    stock: "",
    category: "Phones",
    subCategory: "New",
    type: "",
    description: ""
  });

  const [images, setImages] = useState([]);

  /* ---------------- CATEGORY CHANGE ---------------- */
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      category: value,
      subCategory:
        value === "Phones" || value === "Tablets" ? "New" : "",
      type: value === "Home Appliances" ? "Smart TV" : ""
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Product name and price are required");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();

      // ✅ Ensure numbers are sent correctly
      fd.append("name", form.name);
      fd.append("brand", form.brand);
      fd.append("category", form.category);
      fd.append("subCategory", form.subCategory || "");
      fd.append("type", form.type || "");
      fd.append("description", form.description);

      fd.append("price", Number(form.price));
      fd.append(
        "original_price",
        form.original_price ? Number(form.original_price) : 0
      );
      fd.append("stock", form.stock ? Number(form.stock) : 0);

      images.forEach((img) => fd.append("images", img));

      await api.post("/products", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-900">
      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text">
        Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-10 space-y-10"
      >
        {/* PRODUCT INFO */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="font-semibold text-gray-700">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input-field mt-2"
              placeholder="iPhone 14, Samsung TV..."
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Brand</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="input-field mt-2"
              placeholder="Apple, Samsung..."
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Category</label>
            <select
              value={form.category}
              onChange={handleCategoryChange}
              className="input-field mt-2"
            >
              <option value="Phones">Phones</option>
              <option value="Tablets">Tablets</option>
              <option value="Accessories">Accessories</option>
              <option value="Home Appliances">Home Appliances</option>
            </select>
          </div>

          {/* CONDITION */}
          <div>
            <label className="font-semibold text-gray-700">Condition</label>

            {form.category === "Phones" || form.category === "Tablets" ? (
              <select
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                className="input-field mt-2"
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Demo-OpenBox">Demo-OpenBox</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            ) : (
              <input
                disabled
                className="input-field mt-2 bg-gray-100 text-gray-500"
                placeholder="No condition applicable"
              />
            )}
          </div>

          {/* ⭐ APPLIANCE TYPE */}
          {form.category === "Home Appliances" && (
            <div>
              <label className="font-semibold text-gray-700">
                Appliance Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="input-field mt-2"
              >
                {applianceTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}
        </section>

        {/* PRICE */}
        <section className="grid md:grid-cols-3 gap-8">
          <div>
            <label className="font-semibold text-gray-700">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input-field mt-2"
              placeholder="₹"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Original Price
            </label>
            <input
              name="original_price"
              value={form.original_price}
              onChange={handleChange}
              className="input-field mt-2"
              placeholder="₹ (optional)"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Stock Quantity
            </label>
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="input-field mt-2"
              placeholder="0"
            />
          </div>
        </section>

        {/* DESCRIPTION */}
        <section>
          <label className="font-semibold text-gray-700">
            Product Description
          </label>
          <textarea
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            className="textarea-field mt-2"
            placeholder="Features, specs, warranty..."
          />
        </section>

        {/* IMAGES */}
        <section>
          <label className="font-semibold text-gray-700 mb-2 block">
            Product Images
          </label>
          <MultipleImageUploader images={images} setImages={setImages} />
        </section>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all flex justify-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Add Product"}
        </button>
      </form>
    </div>
  );
}
