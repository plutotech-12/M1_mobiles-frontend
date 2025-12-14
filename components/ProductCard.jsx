"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) /
          product.original_price) *
          100
      )
    : 0;

  const mainImage = Array.isArray(product.image)
    ? product.image[0]
    : product.image || product.image_url;

  return (
    <div className="
      bg-white
      rounded-xl
      border border-gray-100
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
      flex
      flex-col
      h-full
    ">
      {/* IMAGE */}
      <Link
        href={`/products/${product._id}`}
        className="relative flex items-center justify-center h-44 bg-white"
      >
        <img
          src={mainImage}
          alt={product.name}
          className="max-h-40 object-contain transition-transform duration-300 hover:scale-105"
        />

        {/* CONDITION */}
        {product.subCategory && (
          <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
            {product.subCategory}
          </span>
        )}

        {/* DISCOUNT */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4">
        {/* BRAND + NAME */}
        <Link href={`/products/${product._id}`}>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.brand}
          </p>

          <h3 className="text-base font-semibold text-gray-900 mt-1 leading-snug line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* RATINGS (RESERVED SPACE) */}
        <div className="mt-1 min-h-[1.5rem]">
          {product.ratingsAverage > 0 ? (
            <span className="text-sm text-yellow-500">
              ⭐ {product.ratingsAverage.toFixed(1)}
            </span>
          ) : (
            <span className="text-sm text-gray-400">
              No ratings yet
            </span>
          )}
        </div>

        {/* PRICE + CART */}
        <div className="pt-1 flex items-end justify-between gap-3">
          
          {/* PRICE BLOCK */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:gap-3
            "
          >
            {/* SELLING PRICE (BIG) */}
            <span className="text-xl font-extrabold text-orange-600 leading-none">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {/* ORIGINAL PRICE */}
            {product.original_price && (
              <span
                className="
                  text-sm
                  text-gray-400
                  line-through
                  sm:text-base
                "
              >
                ₹{product.original_price.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => {
              document.dispatchEvent(
                new CustomEvent("addToCart", { detail: product })
              );

              const cartIcon =
                document.querySelector("#cart-icon");
              if (cartIcon) {
                cartIcon.classList.add("cart-shake");
                setTimeout(
                  () => cartIcon.classList.remove("cart-shake"),
                  400
                );
              }

              const toast = document.createElement("div");
              toast.innerText = "Added to Cart!";
              toast.className =
                "fixed top-5 right-5 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in";
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 1500);
            }}
            className="
              flex
              items-center
              justify-center
              w-11
              h-11
              bg-orange-600
              text-white
              rounded-lg
              hover:bg-orange-700
              transition
            "
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
