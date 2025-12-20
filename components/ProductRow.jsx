import { useState } from "react";
import ProductGrid from "./ProductGrid";

export default function ProductRow({ title, category, condition, rows = 1 }) {
  const [isEmpty, setIsEmpty] = useState(false);

  const PRODUCTS_PER_ROW = 4;
  const limit = rows * PRODUCTS_PER_ROW;

  const isHomeAppliance =
    category?.toLowerCase() === "home appliances";

  if (isEmpty) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-4 md:p-5">
        {title && (
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
            {title}
            </h3>
            <a
              href={`/category/${category}?sub=${encodeURIComponent(condition)}`}
              className="text-sm font-medium text-orange-600 hover:underline"
            >
              View all
            </a>
        </div>
        )}

        <ProductGrid
        category={category}
        subCategory={!isHomeAppliance ? condition : undefined}
        type={isHomeAppliance ? condition : undefined}
        limit={limit}
        onEmpty={setIsEmpty}
        />
    </div>
    );

}
