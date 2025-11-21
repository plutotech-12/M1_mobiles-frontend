"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";   // 👈 THIS FIXES EVERYTHING
import api from "../../../lib/api";

export default function ProductDetails() {
  const { id } = useParams();  // 👈 Get route params correctly in client component
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 text-white">
      <img
        src={product.image}
        className="w-80 h-80 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl mt-2">₹{product.price}</p>
      <p className="mt-4 text-gray-300">{product.description}</p>
    </div>
  );
}
