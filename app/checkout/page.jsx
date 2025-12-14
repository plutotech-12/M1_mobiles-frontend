export const dynamic = "force-dynamic";

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../lib/api";




export default function CheckoutPage() {
  const params = useSearchParams();
  const productId = params.get("productId");
  const qty = Number(params.get("qty") || 1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productId) return;
    (async () => {
      const { data } = await api.get(`/products/${productId}`);
      setProduct(data);
    })();
  }, [productId]);

  if (!product) return <div className="py-20 text-center">Loading...</div>;

  const total = product.price * qty;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="flex gap-4">
          <img src={Array.isArray(product.image) ? product.image[0] : product.image} className="w-28 h-28 object-contain" />
          <div>
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm text-gray-500">Qty: {qty}</div>
            <div className="text-lg font-bold mt-2">₹{total.toLocaleString("en-IN")}</div>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-orange-600 text-white px-4 py-2 rounded">Proceed to Payment (placeholder)</button>
        </div>
      </div>
    </div>
  );
}
