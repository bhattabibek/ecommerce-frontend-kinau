// components/admin/Product/ProductList.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/redux/thunk/product.thunk";
import type { AppDispatch } from "@/redux/store";
import type { RootState } from "@/redux/root-reducer";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, isLoading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load products</p>;
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">NPR {p.price}</td>
              <td className="p-2 border">{p.category?.name}</td>
              <td className="p-2 border space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
