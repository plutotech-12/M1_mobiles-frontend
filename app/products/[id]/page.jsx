"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../lib/api";
import { CheckCircle, Star } from "lucide-react";
import ImageZoomGallery from "../../../components/ImageZoomGallery";

/* ---------------------- SMALL SPEC ROW ---------------------- */
function SpecRow({ name, value }) {
  return (
    <div className="flex justify-between border-b py-2">
      <span className="text-gray-600">{name}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

const animateAddToCart = (e, imgSrc) => {
  const cartIcon = document.querySelector("#cart-icon");
  if (!cartIcon) return;

  // Clone image
  const img = document.createElement("img");
  img.src = imgSrc;
  img.className = "fly-img";

  const rect = e.target.getBoundingClientRect();
  img.style.left = rect.left + "px";
  img.style.top = rect.top + "px";

  document.body.appendChild(img);

  // Cart icon position
  const cartRect = cartIcon.getBoundingClientRect();

  img.style.transform = `translate(${cartRect.left - rect.left}px, ${
    cartRect.top - rect.top
  }px) scale(0.2)`;
  img.style.opacity = "0";

  setTimeout(() => img.remove(), 900);

  // Shake
  cartIcon.classList.add("cart-shake");
  setTimeout(() => cartIcon.classList.remove("cart-shake"), 600);

  // Toast
  const toast = document.createElement("div");
  toast.innerText = "Added to Cart!";
  toast.className =
    "fixed top-5 right-5 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
};


/* ---------------------- AUTO SPEC PARSER ---------------------- */
function extractSpecs(description) {
  if (!description) return [];

  const lines = description.split("\n").map((l) => l.trim());
  const specs = [];

  for (let line of lines) {
    if (!line) continue;
    if (line.includes(":")) {
      const [key, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      if (key && value) specs.push({ key: key.trim(), value });
    }
  }

  return specs;
}

/* ---------------------- SHORT DESCRIPTION ---------------------- */
function extractShortDescription(description) {
  if (!description) return "";

  const lines = description.split("\n").map((l) => l.trim());
  const paragraphLines = [];

  for (let line of lines) {
    if (!line) continue;

    // STOP when the next section begins
    if (/^[A-Za-z ]+$/.test(line) && line.length < 30) break;
    if (line.includes(":")) break;

    paragraphLines.push(line);

    if (line.endsWith(".")) break;
  }

  return paragraphLines.join(" ");
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  /* ---------------------- FETCH PRODUCT ---------------------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setReviews(data.reviews || []);

        const firstImg = Array.isArray(data.image) ? data.image[0] : data.image;
        setSelectedImage(firstImg);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!product) return <div className="py-20 text-center">Product not found</div>;

  /* ---------------------- VALUES ---------------------- */
  const discount =
    product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100
        )
      : 0;

  const images = Array.isArray(product.image) ? product.image : [product.image];

  const specs = extractSpecs(product.description);
  const shortDescription = extractShortDescription(product.description);

  const average = product.ratingsAverage || 0;
  const total = product.ratingsCount || 0;

  /* STAR COUNTING */
  const starCounts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) starCounts[r.rating - 1]++;
  });

  const percentages = starCounts.map((count) =>
    total ? Math.round((count / total) * 100) : 0
  );

  /* ---------------------- REVIEW SUBMIT ---------------------- */
  const submitReview = async (e) => {
    e.preventDefault();
    if (!name || !rating) return alert("Please provide name and rating");

    try {
      const res = await api.post(`/products/${product._id}/reviews`, {
        name,
        rating,
        comment,
      });

      setReviews(res.data.product.reviews);
      setName("");
      setRating(5);
      setComment("");
    } catch (err) {
      console.error("Review error", err);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* ---------------------- GRID ---------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ================= LEFT SIDE: IMAGE GALLERY ================= */}
        <div className="
          w-full
          flex
          flex-col
          lg:flex-row
          lg:gap-6
        ">

          <ImageZoomGallery
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

        </div>


        {/* ================= RIGHT SIDE: DETAILS ================= */}
        <div className="px-2">

          {/* Tags */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full">
              {product.category}
            </span>

            {product.subCategory && (
              <span className="px-3 py-1 text-xs font-semibold bg-orange-600 text-white rounded-full">
                {product.subCategory}
              </span>
            )}
          </div>

          {/* NAME */}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* BRAND */}
          {product.brand && (
            <p className="mt-1 text-gray-700 text-lg">
              by <span className="font-semibold">{product.brand}</span>
            </p>
          )}

          {/* RATING */}
          <div className="flex items-center gap-3 mt-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(average) ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-700">{average.toFixed(1)} / 5</span>
            <span className="text-sm text-gray-500">({total} reviews)</span>
          </div>

          {/* PRICE BLOCK */}
          <div className="mt-6 bg-orange-50 border border-orange-200 p-5 rounded-xl shadow-sm inline-block w-full">
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-orange-600">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              {discount > 0 && (
                <>
                  <p className="line-through text-gray-500 text-lg">
                    ₹{product.original_price.toLocaleString("en-IN")}
                  </p>
                  <span className="text-red-500 font-semibold text-lg">
                    {discount}% OFFs
                  </span>
                </>
              )}
            </div>

            {product.stock > 0 ? (
              <p className="mt-1 text-green-600 font-medium flex items-center gap-1">
                <CheckCircle className="h-4 w-4" /> In Stock ({product.stock})
              </p>
            ) : (
              <p className="text-red-600 font-medium">Out of Stock</p>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            <button
              onClick={(e) => {
                document.dispatchEvent(
                  new CustomEvent("addToCart", { detail: { ...product, quantity: 1 } })
                );
                animateAddToCart(e, selectedImage);
              }}
              className="bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold shadow-md w-full"
            >
              Add to Cart
            </button>

            <button
              onClick={() => router.push(`/checkout?productId=${product._id}&qty=1`)}
              className="border-2 border-orange-600 text-orange-600 py-4 rounded-xl text-lg font-semibold hover:bg-orange-50 w-full"
            >
              Buy Now
            </button>

          </div>
        </div>
      </div>

      {/* ========= PRODUCT DESCRIPTION ========= */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Product Description
        </h2>

        <div className="bg-white p-6 rounded-xl border shadow-sm text-lg leading-relaxed text-gray-800 whitespace-pre-line">
          {shortDescription || "No description available."}
        </div>
      </div>

      {/* ========= PRODUCT DETAILS ========= */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Product Details
        </h2>

        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <SpecRow name="Brand" value={product.brand || "—"} />
          <SpecRow name="Condition" value={product.subCategory || "—"} />

          {specs.length > 0 && (
            <div className="pt-4 mt-4 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Technical Specifications
              </h3>

              {specs.map((s, idx) => (
                <SpecRow key={idx} name={s.key} value={s.value} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========= RATING PANEL ========= */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Ratings & Reviews
        </h2>

        <div className="bg-white rounded-xl border p-8 shadow-sm flex flex-col lg:flex-row gap-10">
          {/* Circular Rating */}
          <div className="flex flex-col items-center justify-center w-full lg:w-1/3">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                <circle
                  cx="80" cy="80" r="70"
                  stroke="#f97316"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(average / 5) * 440} 440`}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">
                  {average.toFixed(1)}
                </span>
                <span className="text-sm text-gray-900">out of 5</span>
              </div>
            </div>

            <p className="text-gray-900 mt-3 text-sm">
              {total} Ratings • {reviews.length} Reviews
            </p>
          </div>

          {/* Ratings Breakdown */}
          <div className="flex-1 space-y-3">
            {[5, 4, 3, 2, 1].map((star, idx) => (
              <div key={star} className="flex items-center gap-4">
                <span className="w-10 text-gray-900">{star}★</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-600 rounded-full"
                    style={{ width: `${percentages[idx]}%` }}
                  ></div>
                </div>
                <span className="w-12 text-right text-sm text-gray-900">{percentages[idx]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========= CUSTOMER REVIEWS ========= */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Customer Reviews
        </h2>

        {/* Review Form */}
        <form onSubmit={submitReview} className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              className="border rounded-lg px-3 py-2 text-gray-900"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 text-gray-900"
            >
              <option value={5}>⭐ 5 Excellent</option>
              <option value={4}>⭐ 4 Very Good</option>
              <option value={3}>⭐ 3 Good</option>
              <option value={2}>⭐ 2 Poor</option>
              <option value={1}>⭐ 1 Terrible</option>
            </select>

            <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg px-4 py-2">
              Submit Review
            </button>
          </div>

          <textarea
            className="border rounded-lg w-full px-3 py-3 mt-4 text-gray-900"
            rows={4}
            placeholder="Write a short review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </form>

        <div className="space-y-4 mt-6">
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet — be the first!</p>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-yellow-500 text-lg">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>
                </div>

                {r.comment && (
                  <p className="mt-2 text-gray-800">{r.comment}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
