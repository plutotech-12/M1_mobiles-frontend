"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../../../lib/api";
import MultipleImageUploader from "../../../../../components/MultipleImageUploader";
import { Loader2 } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const applianceTypes = [
    "Smart TV",
    "Air Conditioner",
    "Speakers",
    "Induction",
    "Cookware"
  ];

  const [loading, setLoading] = useState(true);

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

  const [images, setImages] = useState([]); // NEW FILES
  const [existingImages, setExistingImages] = useState([]); // OLD URLS

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);

        setForm({
          name: data.name || "",
          brand: data.brand || "",
          price: data.price ?? "",
          original_price: data.original_price ?? "",
          stock: data.stock ?? "",
          category: data.category || "Phones",
          subCategory: data.subCategory || "",
          type: data.type || "",
          description: data.description || ""
        });

        setExistingImages(data.image || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      category: value,
      subCategory:
        value === "Phones" || value === "Tablets" ? "New" : "",
      type: value === "Home Appliances" ? prev.type || "Smart TV" : ""
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const fd = new FormData();

      // Text fields
      fd.append("name", form.name);
      fd.append("brand", form.brand);
      fd.append("category", form.category);
      fd.append("subCategory", form.subCategory || "");
      fd.append("type", form.type || "");
      fd.append("description", form.description);

      // ✅ Numbers (VERY IMPORTANT)
      fd.append("price", Number(form.price));
      fd.append(
        "original_price",
        form.original_price ? Number(form.original_price) : 0
      );
      fd.append("stock", form.stock ? Number(form.stock) : 0);

      // Existing images
      existingImages.forEach((url) =>
        fd.append("existingImages", url)
      );

      // New images
      images.forEach((file) => fd.append("images", file));

      await api.put(`/products/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-900">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-10 space-y-8"
      >
        {/* BASIC INFO */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="font-semibold text-gray-700">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input-field mt-2"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Brand</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="input-field mt-2"
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

            {(form.category === "Phones" ||
              form.category === "Tablets") ? (
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

          {/* APPLIANCE TYPE */}
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
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Stock</label>
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="input-field mt-2"
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
          />
        </section>

        {/* IMAGES */}
        <MultipleImageUploader
          images={images}
          setImages={setImages}
          existingImages={existingImages}
          setExistingImages={setExistingImages}
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-orange-500"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
