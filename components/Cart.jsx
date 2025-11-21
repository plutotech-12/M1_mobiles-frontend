"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-orange-600 font-semibold hover:text-orange-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex space-x-4 bg-gray-50 rounded-lg p-4"
                >
                  <img
                    src={item.image || item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-orange-600 font-bold mt-1">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item._id || item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>

                      <span className="font-semibold text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item._id || item.id,
                            Math.min(item.stock || 99, item.quantity + 1)
                          )
                        }
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>

                      <button
                        onClick={() => onRemove(item._id || item.id)}
                        className="ml-auto text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-900">Total:</span>
              <span className="text-orange-600">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-4 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
