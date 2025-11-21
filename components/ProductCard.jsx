"use client";

import { ShoppingCart, CheckCircle } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) * 100
      )
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={product.image || product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Condition Badges */}
        {product.condition === "refurbished" && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Refurbished
          </span>
        )}

        {product.condition === "new" && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            New
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Pricing + Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-orange-600">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              {product.original_price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.original_price.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {product.stock > 0 ? (
              <div className="flex items-center space-x-1 text-green-600 text-sm mt-1">
                <CheckCircle className="h-4 w-4" />
                <span>In Stock ({product.stock})</span>
              </div>
            ) : (
              <span className="text-red-600 text-sm mt-1">Out of Stock</span>
            )}
          </div>

          {/* FIXED Add to Cart Button */}
          <button
            onClick={() =>
              document.dispatchEvent(
                new CustomEvent("addToCart", { detail: product })
              )
            }
            disabled={product.stock === 0}
            className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-3 rounded-lg"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>

        </div>
      </div>
    </div>
  );
}
